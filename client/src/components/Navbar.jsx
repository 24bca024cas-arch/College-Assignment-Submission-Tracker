import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, FileTextOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = ({ activeKey, onChange }) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'assignments',
      icon: <FileTextOutlined />,
      label: 'Assignments',
    },
  ];

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#002140', // Deep professional college blue
        padding: '0 16px',
        height: '64px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, overflow: 'hidden' }}>
        <span
          className="brand-title-desktop"
          style={{
            color: '#fff',
            fontSize: '18px',
            fontWeight: '600',
            marginRight: '20px',
            letterSpacing: '0.5px',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          🎓 College Assignment Submission Tracker
        </span>
        <span
          className="brand-title-mobile"
          style={{
            color: '#fff',
            fontSize: '18px',
            fontWeight: '600',
            marginRight: '12px',
            letterSpacing: '0.5px',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          🎓 Tracker
        </span>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[activeKey]}
        onClick={({ key }) => onChange(key)}
        items={menuItems}
        style={{
          background: 'transparent',
          borderBottom: 'none',
          minWidth: '180px',
          flexShrink: 0,
        }}
      />
    </Header>
  );
};

export default Navbar;
