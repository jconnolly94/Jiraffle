// client/src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Button, Space, Typography } from 'antd';
import { QrcodeOutlined, DashboardOutlined, LoginOutlined } from '@ant-design/icons';
import PurchasePage from './pages/PurchasePage';
import AdminDashboard from './pages/AdminDashboard';
import ConfirmationPage from './pages/ConfirmationPage'
import { useState } from 'react';
import './assets/styles/global.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: '0 24px', background: '#fff' }}>
          <Space style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Title level={3} style={{ margin: 0 }}>
              <QrcodeOutlined /> Jiraffle
            </Title>
            
            <Menu mode="horizontal" selectedKeys={[]}>
              <Menu.Item key="admin" icon={<DashboardOutlined />}>
                <Link to="/admin">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="login">
                {isLoggedIn ? (
                  <Button danger onClick={() => setIsLoggedIn(false)}>Logout</Button>
                ) : (
                  <Button type="primary" icon={<LoginOutlined />} onClick={() => setIsLoggedIn(true)}>
                    Admin Login
                  </Button>
                )}
              </Menu.Item>
            </Menu>
          </Space>
        </Header>

        <Content style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={
              <PurchasePage tableId="default" />
            } />
            
            <Route path="/purchase/:tableId" element={
              <PurchasePage />
            } />

            <Route path="/admin/*" element={
              <AdminDashboard isAuthenticated={isLoggedIn} />
            } />

            <Route path="/confirmation" element={
              <ConfirmationPage />
            } />
          </Routes>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Jiraffle Raffle System ©{new Date().getFullYear()} • Built with Ant Design
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;