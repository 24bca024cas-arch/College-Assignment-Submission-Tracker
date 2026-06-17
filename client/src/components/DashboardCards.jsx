import React from 'react';
import { Card, Col, Row } from 'antd';
import {
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const DashboardCards = ({ assignments = [] }) => {
  const total = assignments.length;
  const submitted = assignments.filter((a) => a.status === 'Submitted').length;
  const pending = assignments.filter((a) => a.status === 'Pending').length;
  const late = assignments.filter((a) => a.status === 'Late').length;

  const cardData = [
    {
      title: 'Total Assignments',
      value: total,
      icon: <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      bgColor: '#e6f7ff',
      borderColor: '#91d5ff',
      textColor: '#0050b3',
    },
    {
      title: 'Submitted',
      value: submitted,
      icon: <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      bgColor: '#f6ffed',
      borderColor: '#b7eb8f',
      textColor: '#237804',
    },
    {
      title: 'Pending',
      value: pending,
      icon: <ClockCircleOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />,
      bgColor: '#fff7e6',
      borderColor: '#ffd591',
      textColor: '#ad4e00',
    },
    {
      title: 'Late',
      value: late,
      icon: <ExclamationCircleOutlined style={{ fontSize: '24px', color: '#f5222d' }} />,
      bgColor: '#fff1f0',
      borderColor: '#ffa39e',
      textColor: '#a8071a',
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
      {cardData.map((card, index) => (
        <Col xs={24} sm={12} md={6} key={index}>
          <Card
            bordered={true}
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              background: card.bgColor,
              border: `1px solid ${card.borderColor}`,
              transition: 'all 0.3s ease',
            }}
            bodyStyle={{ padding: '20px 24px' }}
            className="hover-card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.65)', fontWeight: '500', marginBottom: '8px' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: card.textColor, lineHeight: 1 }}>
                  {card.value}
                </div>
              </div>
              <div
                style={{
                  background: '#fff',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                }}
              >
                {card.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardCards;
