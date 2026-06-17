import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider, Modal } from 'antd';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import AssignmentForm from './components/AssignmentForm';

const { Content } = Layout;

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [assignments, setAssignments] = useState(() => {
    const stored = localStorage.getItem('college_assignments');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored assignments', e);
      }
    }
    // Seed default assignments for first-time dashboard presentation
    const defaultData = [
      {
        id: '1',
        title: 'Design Database Schema for E-commerce',
        subject: 'Database Management Systems',
        dueDate: '2026-06-25',
        status: 'Pending',
      },
      {
        id: '2',
        title: 'Implement TCP Socket Server',
        subject: 'Computer Networks',
        dueDate: '2026-06-12',
        status: 'Late',
      },
      {
        id: '3',
        title: 'Build Single Page App using React',
        subject: 'Web Development',
        dueDate: '2026-06-20',
        status: 'Submitted',
      },
    ];
    localStorage.setItem('college_assignments', JSON.stringify(defaultData));
    return defaultData;
  });

  // Save to Local Storage whenever assignments change
  useEffect(() => {
    localStorage.setItem('college_assignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleSaveAssignment = (assignment) => {
    setAssignments((prev) => {
      const exists = prev.some((a) => a.id === assignment.id);
      if (exists) {
        return prev.map((a) => (a.id === assignment.id ? assignment : a));
      } else {
        return [...prev, assignment];
      }
    });
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleDeleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleEditClick = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          borderRadius: 8,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
        <Navbar activeKey={activeTab} onChange={setActiveTab} />
        <Content className="responsive-content">
          {activeTab === 'dashboard' ? (
            <Dashboard
              assignments={assignments}
              onEdit={handleEditClick}
              onDelete={handleDeleteAssignment}
            />
          ) : (
            <Assignments
              assignments={assignments}
              onAddClick={handleAddClick}
              onEdit={handleEditClick}
              onDelete={handleDeleteAssignment}
            />
          )}
        </Content>


        {/* Global Add/Edit Modal */}
        <Modal
          title={
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#002140' }}>
              {editingRecord ? '✏️ Edit Assignment' : '📝 Add New Assignment'}
            </span>
          }
          open={isModalOpen}
          onCancel={handleCancelModal}
          footer={null}
          destroyOnClose
          width={500}
          style={{ top: '80px' }}
        >
          <div style={{ paddingTop: '12px' }}>
            <AssignmentForm
              onSave={handleSaveAssignment}
              editingRecord={editingRecord}
              onCancel={handleCancelModal}
            />
          </div>
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
