import { useState, useEffect } from 'react';
import { Typography, Spin, Slider } from 'antd';
import { useFetchAllApiStatuses } from './helpers/queries';
import {
  DEFAULT_REFETCH_INTERVAL_MILLISECONDS,
  MAX_REFRESH_INTERVAL_SECONDS,
  MIN_REFRESH_INTERVAL_SECONDS
} from './helpers/constants';
import { useQueryClient } from 'react-query';
import { StatusCardList } from './components/StatusCardList';
const { Title, Text } = Typography;

const mainDivStyle = {
  paddingLeft: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 16
};

const App = () => {
  const [refetchInterval, setRefetchInterval] = useState(DEFAULT_REFETCH_INTERVAL_MILLISECONDS);
  const queryResults = useFetchAllApiStatuses(refetchInterval)
  const [initialLoad, setInitialLoad] = useState(true);
  const queryClient = useQueryClient();
  const isFetching = queryClient.isFetching();

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

  return (
    <div style={mainDivStyle}>
      <Title>Status Dashboard</Title>

      <div style={{ width: 400 }}>
        <Text>Refresh Interval</Text>
        {isFetching ? <Spin style={{ marginLeft: 10 }} size='small' /> : null}
        <Slider
          min={MIN_REFRESH_INTERVAL_SECONDS}
          max={MAX_REFRESH_INTERVAL_SECONDS}
          defaultValue={refetchInterval / 1000}
          onChange={(value) => setRefetchInterval(value * 1000)}
          onChangeComplete={() => queryClient.invalidateQueries('apiStatus')}
          marks={{ 5: '5s', 15: '15s', 30: '30s', 45: '45s', 60: '60s' }}
        />
      </div>

      <StatusCardList statusCards={queryResults} />
    </div>
  );
}

export default App;
