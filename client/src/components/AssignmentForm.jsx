import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const AssignmentForm = ({ onSave, editingRecord, onCancel }) => {
  const [form] = Form.useForm();
  const [pdfFile, setPdfFile] = useState(null);

  // Reset or fill form when editingRecord changes
  useEffect(() => {
    if (editingRecord) {
      form.setFieldsValue({
        ...editingRecord,
        dueDate: editingRecord.dueDate ? dayjs(editingRecord.dueDate) : null,
      });
      if (editingRecord.pdfData && editingRecord.pdfName) {
        setPdfFile({
          name: editingRecord.pdfName,
          data: editingRecord.pdfData,
        });
      } else {
        setPdfFile(null);
      }
    } else {
      form.resetFields();
      setPdfFile(null);
    }
  }, [editingRecord, form]);

  const handleBeforeUpload = (file) => {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      message.error('You can only upload PDF files!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('PDF must be smaller than 2MB!');
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPdfFile({
        name: file.name,
        data: e.target.result,
      });
      message.success(`${file.name} uploaded successfully.`);
    };
    reader.readAsDataURL(file);

    return false; // Prevent automatic upload to a server
  };

  const handleRemove = () => {
    setPdfFile(null);
  };

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : '',
      id: editingRecord ? editingRecord.id : Date.now().toString(),
      pdfData: pdfFile ? pdfFile.data : null,
      pdfName: pdfFile ? pdfFile.name : null,
    };
    onSave(formattedValues);
    form.resetFields();
    setPdfFile(null);
    message.success(
      editingRecord ? 'Assignment updated successfully!' : 'Assignment added successfully!'
    );
  };

  const handleClear = () => {
    form.resetFields();
    setPdfFile(null);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      requiredMark="optional"
    >
      <Form.Item
        name="title"
        label="Assignment Title"
        rules={[{ required: true, message: 'Please enter the assignment title' }]}
      >
        <Input placeholder="e.g. Database Systems Project" />
      </Form.Item>

      <Form.Item
        name="subject"
        label="Subject"
        rules={[{ required: true, message: 'Please enter or select a subject' }]}
      >
        <Input placeholder="e.g. Computer Science" />
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: 'Please select the due date' }]}
      >
        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select the status' }]}
        initialValue="Pending"
      >
        <Select placeholder="Select assignment status">
          <Option value="Pending">Pending</Option>
          <Option value="Submitted">Submitted</Option>
          <Option value="Late">Late</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Attachment (PDF only, Max 2MB)">
        <Upload
          beforeUpload={handleBeforeUpload}
          onRemove={handleRemove}
          fileList={pdfFile ? [{
            uid: '-1',
            name: pdfFile.name,
            status: 'done',
            url: pdfFile.data,
          }] : []}
          maxCount={1}
          accept=".pdf"
        >
          <Button icon={<UploadOutlined />}>Select PDF from device</Button>
        </Upload>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          {onCancel && (
            <Button onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={handleClear}>
            Clear Form
          </Button>
          <Button type="primary" htmlType="submit">
            {editingRecord ? 'Update Assignment' : 'Save Assignment'}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default AssignmentForm;
