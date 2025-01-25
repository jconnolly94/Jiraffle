import { Button, Card } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';

function App() {
  return (
    <Card title="Jiraffle Raffle System" style={{ margin: 20 }}>
      <Button type="primary" icon={<QrcodeOutlined />}>
        Generate QR Code
      </Button>
    </Card>
  );
}

export default App;
