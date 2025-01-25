import React from 'react';
import { Button } from 'antd';

interface PaymentButtonProps {
  amount: number;     // in cents, e.g. 1000 for €10.00
  lines: number;      // Changed from numbers to lines
  tableId: string;
}

const SumUpPaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  lines,            // Changed prop name
  tableId
}) => {

  const handleOpenSumUp = () => {
    console.log(`Initiating payment for table "${tableId}"...`);
    console.log(`Selected lines: ${lines}`);
    console.log(`Amount: €${(amount / 100).toFixed(2)}`);
    
    // Your payment integration logic here
  };

  return (
    <div>
      <div id="sumup-widget-container" style={{ marginBottom: '1rem' }}>
        {/* SumUp integration elements */}
      </div>

      <Button 
        type="primary"
        size="large"
        onClick={handleOpenSumUp}
        disabled={lines === 0}  // Changed condition to check lines
      >
        Pay €{(amount / 100).toFixed(2)}
      </Button>
    </div>
  );
};

export default SumUpPaymentButton;