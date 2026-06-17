import React from 'react';
import { Card, Typography } from 'antd';
import DashboardCards from '../components/DashboardCards';
import AssignmentTable from '../components/AssignmentTable';

const { Title } = Typography;

const Dashboard = ({ assignments = [], onEdit, onDelete }) => {
  // Sort assignments to show the 5 most recently added ones
  // Since IDs are generated using Date.now().toString(), sorting by ID desc gives latest additions.
  const recentAssignments = [...assignments]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, fontWeight: '600', color: '#002140' }}>
          Overview Dashboard
        </Title>
        <span style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px' }}>
          Real-time statistics and recently added assignments
        </span>
      </div>

      {/* Summary Cards */}
      <DashboardCards assignments={assignments} />

      {/* Recent Assignments Table */}
      <Card
        title={
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#002140' }}>
            📅 Recent Assignments
          </span>
        }
        bordered={false}
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <AssignmentTable
          assignments={recentAssignments}
          onEdit={onEdit}
          onDelete={onDelete}
          showActions={true}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
