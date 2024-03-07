import { Typography, Card } from 'antd';
import StatusCard from './components/StatusCard';
const { Title } = Typography;

const App = () => {
  return (
    <>
      <Title>Status Dashboard</Title>

      <StatusCard title='Accounts' />
    </>
  );
}

export default App;
