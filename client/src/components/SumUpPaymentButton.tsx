import React from 'react';
import { Button } from 'antd';

interface PaymentButtonProps {
  amount: number;     // in cents, e.g. 1000 for €10.00
  numbers: number[];
  tableId: string;
}

const SumUpPaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  numbers,
  tableId
}) => {

  // For demonstration, we'll just log the purchase info.
  const handleOpenSumUp = () => {
    console.log(`Initiating payment for table "${tableId}"...`);
    console.log(`Selected numbers: ${numbers.join(', ')}`);
    console.log(`Amount: €${(amount / 100).toFixed(2)}`);

    // TODO: Insert your SumUp Checkout or Payment Link logic here.
    // This might involve injecting an <iframe>, using sumup-checkout.js, or redirecting.
  };

  return (
    <div>
      {/* 
        1) If you're using a script-based approach, you might place the container here 
           for SumUp's web widget/iframe.
        2) Or, if you want a dedicated button that triggers a SumUp popup/redirect,
           you'd handle that in `handleOpenSumUp`.
      */}
      <div id="sumup-widget-container" style={{ marginBottom: '1rem' }}>
        {/* 
          Example: If SumUp’s web solution offers an embeddable iframe or script, 
          you can place that code here or dynamically inject it. 
        */}
      </div>

      <Button 
        type="primary"
        size="large"
        onClick={handleOpenSumUp}
        disabled={numbers.length === 0}
      >
        Pay €{(amount / 100).toFixed(2)}
      </Button>
    </div>
  );
};

export default SumUpPaymentButton;
