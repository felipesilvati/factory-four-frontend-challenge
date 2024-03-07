import { Typography } from 'antd';
import StatusCard from './components/StatusCard';
import { useFetchAllApiStatuses } from './helpers/queries';
const { Title } = Typography;

const App = () => {
  const queryResults = useFetchAllApiStatuses()
  console.log('queryResults', queryResults)
  return (
    <>
      <Title>Status Dashboard</Title>

      <StatusCard title='Accounts' success={true} hostname='accounts-9368cf6fc17d' time='14:47:06' />
    </>
  );
}

export default App;
