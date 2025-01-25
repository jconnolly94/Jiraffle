// pages/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { Table, Button, Card } from 'antd';
import api from '../services/api';

interface AdminDashboardProps {
    isAuthenticated: boolean;
  }

  const AdminDashboard: React.FC<AdminDashboardProps> = ({ isAuthenticated }) => {
    const [entries, setEntries] = useState([]);
  

  useEffect(() => {
    api.get('/admin/entries')
      .then(res => setEntries(res.data))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { title: 'Table', dataIndex: 'tableId' },
    { title: 'Numbers', dataIndex: 'numbers', render: (nums: any[]) => nums.join(', ') },
    { title: 'Status', dataIndex: 'paymentStatus' }
  ];

  return (
    <Card title="Raffle Administration" style={{ margin: 20 }}>
      <Table 
        dataSource={entries} 
        columns={columns} 
        rowKey="_id"
      />
      
      <Button type="primary" danger style={{ marginTop: 20 }}>
        Draw Winners
      </Button>
    </Card>
  );
};
export default AdminDashboard;