import React from "react";
import { Button, Table, Space, Tag, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

export default function TransactionList(props) {
  const columns = [
    {
      title: "Date-Time",
      dataIndex: "action_datetime",
      key: "action_datetime",
      render: (_, record) => dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, record) => (
        <Tag color={record.type === "income" ? "green" : "red"}>
          {record.type}
        </Tag>
      ),
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Note", dataIndex: "note", key: "note" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => props.onEditItem(record)} 
          />
          <Popconfirm
            title="Delete the transaction"
            description="กดยืนยันเพื่อลบ?"
            onConfirm={() => {
              if (typeof props.onTransactionDeleted === "function") {
                props.onTransactionDeleted(record.id);
              } else {
                console.error("Something Error");
              }
            }}
          >
            <Button
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              loading={props.isLoading} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={props.data} rowKey="id" />
  );
}
