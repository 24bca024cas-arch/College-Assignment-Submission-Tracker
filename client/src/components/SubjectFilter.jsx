import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SubjectFilter = ({ assignments = [], value, onChange }) => {
  // Extract unique subjects from assignments list
  const subjects = Array.from(new Set(assignments.map((a) => a.subject).filter(Boolean)));

  return (
    <div 
      className="mobile-flex-col"
      style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}
    >
      <span style={{ fontWeight: '500', color: 'rgba(0, 0, 0, 0.65)' }}>Filter by Subject:</span>
      <Select
        value={value || 'All'}
        onChange={(val) => onChange(val === 'All' ? null : val)}
        className="mobile-full-width"
        style={{ minWidth: '150px', width: '200px' }}
        placeholder="Select subject"
      >
        <Option value="All">All Subjects</Option>
        {subjects.map((sub) => (
          <Option key={sub} value={sub}>
            {sub}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SubjectFilter;
