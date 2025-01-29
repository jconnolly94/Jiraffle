import React from 'react';
import { Button, Card, Space, Typography } from 'antd';

interface LineSelectionProps {
  selectedLines: number;
  onSelectLines: (lines: number) => void;
}

const RaffleNumberGrid: React.FC<LineSelectionProps> = ({ selectedLines, onSelectLines }) => {
  // Pricing structure
  const PRICE_PER_LINE = 3;
  const BULK_LINE_COUNT = 5;
  const BULK_PRICE_PER_LINE = 2;

  const calculateTotal = (lines: number) =>
    lines >= BULK_LINE_COUNT ? lines * BULK_PRICE_PER_LINE : lines * PRICE_PER_LINE;

  const pricePerLine = selectedLines >= BULK_LINE_COUNT
    ? BULK_PRICE_PER_LINE
    : PRICE_PER_LINE;

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography.Title level={4} style={{ marginBottom: 24 }}>
        Choose Your Raffle Lines
      </Typography.Title>

      <Card
        style={{
          width: 300,
          margin: '0 auto',
          borderColor: '#1890ff',
          backgroundColor: '#fafafa'
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Space direction="vertical" size={16}>
          <Space>
            <Button
              shape="circle"
              size="large"
              onClick={() => onSelectLines(Math.max(1, selectedLines - 1))}
              disabled={selectedLines <= 1}
            >
              -
            </Button>

            <Typography.Text strong style={{ fontSize: 32, width: 60 }}>
              {selectedLines}
            </Typography.Text>

            <Button
              shape="circle"
              size="large"
              onClick={() => onSelectLines(selectedLines + 1)}
            >
              +
            </Button>
          </Space>

          <Typography.Title level={3} style={{ margin: 0 }}>
            Total: €{calculateTotal(selectedLines).toFixed(2)}
          </Typography.Title>

          <Typography.Text type="secondary" style={{ fontSize: 16 }}>
            {selectedLines >= BULK_LINE_COUNT ? (
              <>
                <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>€3.00</span>
                {' '}€2.00 per line (bulk discount)
              </>
            ) : (
              `€${PRICE_PER_LINE.toFixed(2)} per line`
            )}
          </Typography.Text>
        </Space>
      </Card>

      <Typography.Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
        Each line contains a unique set of 5 random numbers
      </Typography.Text>
    </div>
  );
};

export default RaffleNumberGrid;