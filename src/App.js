import { useState, useEffect } from 'react';
import { Typography, Spin, Slider } from 'antd';
import StatusCard from './components/StatusCard';
import { useFetchAllApiStatuses } from './helpers/queries';
import { DEFAULT_RETRY_DELAY_MILLISECONDS, MAX_REFRESH_INTERVAL_SECONDS, MIN_REFRESH_INTERVAL, MIN_REFRESH_INTERVAL_SECONDS } from './helpers/constants';
import { useQueryClient } from 'react-query';
const { Title, Text } = Typography;

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'left',
};

const App = () => {
  const [refetchInterval, setRefetchInterval] = useState(DEFAULT_RETRY_DELAY_MILLISECONDS);
  const queryResults = useFetchAllApiStatuses(refetchInterval)
  const [initialLoad, setInitialLoad] = useState(true);
  const queryClient = useQueryClient();

  // Only show loading spinner on initial load
  useEffect(() => {
    const allLoaded = queryResults.every(query => query.isLoading === false);
    if (allLoaded) {
      setInitialLoad(false);
    }
  }, [queryResults]);

  if (initialLoad) {
    return <Spin />
  }

  const results = queryResults
    .map(query => {
      const { title, success, hostname, time, error } = query.data || {}

      return <StatusCard key={title} title={title} success={success} hostname={hostname} time={time} error={error} />
    })

  return (
    <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Title>Status Dashboard</Title>

      <div style={{ width: 400 }}>
        <Text>Refresh Interval</Text>
        <Slider
          min={MIN_REFRESH_INTERVAL_SECONDS}
          max={MAX_REFRESH_INTERVAL_SECONDS}
          defaultValue={refetchInterval / 1000}
          onChange={(value) => setRefetchInterval(value * 1000)}
          onChangeComplete={() => queryClient.invalidateQueries('apiStatus')}
          marks={{ 5: '5s', 15: '15s', 30: '30s', 45: '45s', 60: '60s' }}
        />
      </div>

      <div style={listStyle}>
        {results}
      </div>
    </div>
  );
}

export default App;
