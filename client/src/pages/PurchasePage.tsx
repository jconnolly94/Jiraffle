import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import RaffleNumberGrid from '../components/RaffleNumberGrid';
import useSumUpScript from '../hooks/useSumUpScript';
import axios from 'axios';

interface PurchasePageProps {
  tableId?: string;
}

const PurchasePage: React.FC<PurchasePageProps> = ({ tableId }) => {
  const { tableId: paramId } = useParams<{ tableId: string }>();
  const activeTableId = tableId || paramId;
  const isScriptLoaded = useSumUpScript();

  const [selectedLines, setSelectedLines] = useState(0);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const totalAmount = selectedLines >= 5 ? selectedLines * 2 : selectedLines * 3;

  // Call backend to create checkout
  useEffect(() => {
    const createCheckout = async () => {
      try {
        const response = await axios.post('/create-checkout', {
          amount: totalAmount * 100,
          currency: 'EUR',
          description: `Table ${activeTableId} Raffle`,
          checkout_reference: `${activeTableId}_${uuidv4()}`,
          return_url: window.location.origin + '/confirmation',
        });
        setCheckoutId(response.data.id);
      } catch (error) {
        console.error('Checkout creation failed:', error);
        alert('Failed to initialize payment. Please try again.');
      }
    };

    if (isScriptLoaded && selectedLines > 0 && totalAmount > 0) {
      createCheckout();
    }
  }, [isScriptLoaded, selectedLines, totalAmount, activeTableId]);

  // Initialize payment form
  useEffect(() => {
    if (isScriptLoaded && checkoutId) {
      (window as any).SumUpCard.mount({
        id: 'sumup-card',
        checkoutId,
        onResponse: (type: any, body: any) => {
          console.log('Payment response:', type, body);
        },
      });
    }
    return () => {
      const sumUpCardDiv = document.getElementById('sumup-card');
      if (sumUpCardDiv) {
        sumUpCardDiv.innerHTML = '';
      }
    };
  }, [isScriptLoaded, checkoutId]);

  return (
    <Card title={`Table ${activeTableId} Raffle`} style={{ margin: 20 }}>
      <RaffleNumberGrid
        selectedLines={selectedLines}
        onSelectLines={setSelectedLines}
      />
      <div id="sumup-card" />
      {(!isScriptLoaded || !checkoutId) && (
        <p>{!isScriptLoaded ? 'Loading payment system...' : 'Preparing payment form...'}</p>
      )}
    </Card>
  );
};

export default PurchasePage;