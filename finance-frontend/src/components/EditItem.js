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
          label="ชนิด"
          rules={[{ required: true, message: "เลือกประเภท" }]}
        >
          <Select>
            <Option value="income">รายรับ</Option>
            <Option value="expense">รายจ่าย</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="จำนวนเงิน"
          rules={[{ required: true, message: "ใส่จำนวนเงิน" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="note" label="หมายเหตุ">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
