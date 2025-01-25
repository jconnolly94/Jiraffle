import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => (
  <Result
    status="success"
    title="Payment Successful!"
    subTitle="Your raffle entry has been confirmed. Good luck!"
    extra={[
      <Link to="/" key="home">
        <Button type="primary">Return Home</Button>
      </Link>,
      <Button key="print" onClick={() => window.print()}>
        Print Receipt
      </Button>
    ]}
  />
);

export default ConfirmationPage;