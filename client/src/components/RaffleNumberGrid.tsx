import React from 'react';
import { Button, Card, Space, Typography } from 'antd';

interface LineSelectionProps {
  selectedLines: number;
  onSelectLines: (lines: number) => void;
}

/**
 * Allows selection of raffle lines with bulk pricing
 * €3 for 1 line or 5 lines for €10
 */
const RaffleNumberGrid: React.FC<LineSelectionProps> = ({ selectedLines, onSelectLines }) => {
  const pricingTiers = [
    { lines: 1, price: 3, label: '1 Line - €3' },
    { lines: 5, price: 10, label: '5 Lines - €10 (€2 each)' }
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography.Title level={4} style={{ marginBottom: 24 }}>
        Choose Your Raffle Lines
      </Typography.Title>
      
      <Space wrap>
        {pricingTiers.map((tier) => (
          <Card
            key={tier.lines}
            hoverable
            style={{
              width: 200,
              borderColor: selectedLines === tier.lines ? '#1890ff' : '#f0f0f0',
              cursor: 'pointer'
            }}
            onClick={() => onSelectLines(tier.lines)}
          >
            <div style={{ 
              border: `2px solid ${selectedLines === tier.lines ? '#1890ff' : 'transparent'}`,
              padding: 16,
              borderRadius: 8
            }}>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {tier.lines} {tier.lines > 1 ? 'Lines' : 'Line'}
              </Typography.Title>
              <Typography.Text strong style={{ fontSize: 18 }}>
                €{tier.price}
              </Typography.Text>
              {tier.lines > 1 && (
                <Typography.Text type="secondary">
                  (€{(tier.price / tier.lines).toFixed(2)}/line)
                </Typography.Text>
              )}
            </div>
          </Card>
        ))}
      </Space>

      <Typography.Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
        Each line contains a unique set of 5 random numbers
      </Typography.Text>
    </div>
  );
};

export default RaffleNumberGrid;