import React from 'react';
import { Table, Tag, Button, Space, Popconfirm, Empty, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';

const AssignmentTable = ({ assignments = [], onEdit, onDelete, showActions = true }) => {
  const handleViewPDF = (pdfData, pdfName) => {
    try {
      const parts = pdfData.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      
      const blob = new Blob([uInt8Array], { type: contentType });
      const blobURL = URL.createObjectURL(blob);
      
      const newWindow = window.open();
      if (newWindow) {
        newWindow.location.href = blobURL;
      } else {
        // Fallback to direct download if popups are blocked
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = pdfName || 'assignment.pdf';
        link.click();
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
      // Fallback: direct window open
      window.open(pdfData, '_blank');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => <span style={{ fontWeight: '500' }}>{text}</span>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Submitted', value: 'Submitted' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Late', value: 'Late' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = 'orange';
        if (status === 'Submitted') color = 'success';
        if (status === 'Late') color = 'error';
        return (
          <Tag color={color} style={{ borderRadius: '4px', fontWeight: '500' }}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Attachment',
      key: 'attachment',
      render: (_, record) => {
        if (record.pdfData) {
          return (
            <Tooltip title="Click to view PDF in new tab">
              <Button
                type="link"
                icon={<FilePdfOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />}
                onClick={() => handleViewPDF(record.pdfData, record.pdfName)}
                style={{
                  padding: 0,
                  height: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontWeight: '500',
                  color: '#1890ff',
                }}
              >
                {record.pdfName.length > 20 
                  ? `${record.pdfName.substring(0, 17)}...` 
                  : record.pdfName
                }
              </Button>
            </Tooltip>
          );
        }
        return <span style={{ color: 'rgba(0,0,0,0.25)', fontStyle: 'italic', fontSize: '13px' }}>No file</span>;
      },
    },
  ];

  if (showActions) {
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#1890ff' }} />}
            onClick={() => onEdit(record)}
            style={{ padding: '4px 8px' }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this assignment?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              style={{ padding: '4px 8px' }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={assignments.map((item) => ({ ...item, key: item.id }))}
      scroll={{ x: 'max-content' }}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No assignments added yet."
            style={{ margin: '32px 0' }}
          />
        ),
      }}
      pagination={{ pageSize: 8, hideOnSinglePage: true }}
      style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
      }}
    />
  );
};

export default AssignmentTable;
