import React, { useState } from 'react';
import { Card, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SubjectFilter from '../components/SubjectFilter';
import AssignmentTable from '../components/AssignmentTable';

const { Title } = Typography;

const Assignments = ({ assignments = [], onAddClick, onEdit, onDelete }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Filter assignments by subject
  const filteredAssignments = selectedSubject
    ? assignments.filter((a) => a.subject.toLowerCase() === selectedSubject.toLowerCase())
    : assignments;

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: '600', color: '#002140' }}>
            Assignments Directory
          </Title>
          <span style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px' }}>
            Manage, filter, and track all college assignments
          </span>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddClick}
          size="large"
          style={{
            borderRadius: '6px',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(24, 144, 255, 0.25)',
          }}
        >
          Add Assignment
        </Button>
      </div>

      <Card
        bordered={false}
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <SubjectFilter
            assignments={assignments}
            value={selectedSubject}
            onChange={setSelectedSubject}
          />
        </div>

        <AssignmentTable
          assignments={filteredAssignments}
          onEdit={onEdit}
          onDelete={onDelete}
          showActions={true}
        />
      </Card>
    </div>
  );
};

export default Assignments;
