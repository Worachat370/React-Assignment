import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

export default function EditItem({ visible, onCancel, onSave, item }) {
  const [form] = Form.useForm();


  React.useEffect(() => {
    if (item) {
      form.setFieldsValue(item);
    }
  }, [item, form]);

  return (
    <Modal
      title="Edit Transaction"
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSave({ ...item, ...values }); 
            form.resetFields();
          })
          .catch((info) => {
            console.error("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: "เลือกประเภท" }]}
        >
          <Select>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="note" label="Note">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
