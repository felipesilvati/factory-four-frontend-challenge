import { Typography, Spin } from 'antd';
import StatusCard from './components/StatusCard';
import { useFetchAllApiStatuses } from './helpers/queries';
import { useIsFetching } from 'react-query';
const { Title } = Typography;

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'left',
};

const App = () => {
  const queryResults = useFetchAllApiStatuses()
  const isFetching = useIsFetching()

  if (isFetching) {
    return <Spin />
  }

  const results = queryResults
    .map(query => {
      const { title, success, hostname, time, error } = query.data || {}

      return <StatusCard key={title} title={title} success={success} hostname={hostname} time={time} error={error} />
    })

  return (
    <div style={{ padding: 16 }}>
      <Title>Status Dashboard</Title>
      <div style={listStyle}>
        {results}
      </div>
    </div>
  );
}

export default App;
