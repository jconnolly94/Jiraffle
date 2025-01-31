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

  // Add these states
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>({});

  // Modify the createCheckout function
  const createCheckout = async () => {
    try {
      const payload = {
        amount: totalAmount * 100,
        currency: 'EUR',
        description: `Table ${activeTableId} Raffle`,
        checkout_reference: `${activeTableId}_${uuidv4()}`,
        return_url: window.location.origin + '/confirmation',
      };

      console.log('Sending payload:', payload);
      // With:
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/create-checkout',
        payload
      );
      if (!response.data.id) {
        throw new Error('Invalid checkout ID');
      }

      setCheckoutId(response.data.id);
      setDebugInfo({
        request: payload,
        response: response.data
      });

    } catch (error) {
      console.error('Full client error:', error);
      if (axios.isAxiosError(error)) {
        setDebugInfo({
          error: error.response?.data || error.message,
          config: error.config
        });
      } else {
        setDebugInfo({
          error: (error as Error).message,
        });
      }
      const errorMessage = axios.isAxiosError(error) ? error.response?.data?.error || error.message : (error as Error).message;
      alert(`Payment failed: ${errorMessage}`);
    }
  };

  // Call backend to create checkout
  useEffect(() => {


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