import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';

import RaffleNumberGrid from '../components/RaffleNumberGrid';
import SumUpPaymentButton from '../components/SumUpPaymentButton';

interface PurchasePageProps {
  tableId?: string;
}

const PurchasePage: React.FC<PurchasePageProps> = ({ tableId }) => {

  // The route might look like "/purchase/:tableId"
  const { tableId: paramId } = useParams<{ tableId: string }>();

  // Keep track of which numbers have been chosen
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedLines, setSelectedLines] = useState<number>(0);
const totalAmount = selectedLines >= 5 
  ? selectedLines * 2 
  : selectedLines * 3;

  return (
    <Card title={`Table ${tableId} Raffle`} style={{ margin: 20 }}>

      
      
      {/* The grid for selecting raffle numbers */}
      <RaffleNumberGrid
  selectedLines={selectedLines}
  onSelectLines={setSelectedLines}
/>

      {/* Payment button (e.g., €10 per ticket, or 1000 cents) */
      }
      <SumUpPaymentButton
      
  amount={totalAmount * 100}
  lines={selectedLines}  // Changed prop name and value
  tableId={tableId ?? ''}
/>
    </Card>
  );
};

export default PurchasePage;
