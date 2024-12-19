import '../App.css';
import TransactionList from "../components/TransactionList";
import EditItem from "../components/EditItem";
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Divider, Spin, Typography, message, Button } from 'antd';
import AddItem from '../components/AddItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const URL_TXACTIONS = '/api/txactions';

function FinanceScreen() {
  const [summaryAmount, setSummaryAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // เก็บข้อมูลรายการที่กำลังแก้ไข
  const [isEditing, setIsEditing] = useState(false); // สถานะแสดง modal

  const navigate = useNavigate(); // Initialize useNavigate hook

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS);
      setTransactionData(response.data.data.map(row => ({
        id: row.id,
        key: row.id,
        ...row.attributes
      })));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async (item) => {
    try {
      setIsLoading(true);
      const params = { ...item, action_datetime: dayjs() };
      const response = await axios.post(URL_TXACTIONS, { data: params });
      const { id, attributes } = response.data.data;
      setTransactionData([
        ...transactionData,
        { id: id, key: id, ...attributes }
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = async (item) => {
    try {
      setIsLoading(true);
      await axios.put(`${URL_TXACTIONS}/${item.id}`, { data: item });
      setTransactionData(prevData =>
        prevData.map(transaction =>
          transaction.id === item.id ? { ...transaction, ...item } : transaction
        )
      );
      message.success("Transaction updated successfully!");
    } catch (err) {
      message.error("Error updating transaction");
      console.error(err);
    } finally {
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  const handleRowDeleted = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${URL_TXACTIONS}/${id}`);
      setTransactionData(prevData => prevData.filter(transaction => transaction.id !== id));
    } catch (err) {
      message.error("Error deleting transaction");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setSummaryAmount(transactionData.reduce(
      (sum, transaction) => (
        transaction.type === "income" ? sum + transaction.amount : sum - transaction.amount
      ), 0)
    );
  }, [transactionData]);

  const handleBackToDashboard = () => {
    navigate('/'); 
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="App-header" style={{ flex: 1 }}>
        <Spin spinning={isLoading}>
          <Typography.Title>
            จำนวนเงินปัจจุบัน {summaryAmount} บาท
          </Typography.Title>

          <AddItem onItemAdded={handleAddItem} />
          <Divider>บันทึก รายรับ - รายจ่าย</Divider>
          <TransactionList
            data={transactionData}
            onTransactionDeleted={handleRowDeleted}
            onEditItem={(item) => {
              setEditingItem(item);
              setIsEditing(true);
            }}
          />
        </Spin>
      </header>

      <EditItem
        visible={isEditing}
        item={editingItem}
        onCancel={() => setIsEditing(false)}
        onSave={handleEditItem}
      />

      <Button id='1'
        type="primary"
        onClick={handleBackToDashboard}
        style={{ position: 'sticky' , bottom: 10 , width:"700 px"  }}
      > 
        Back to Dashboard
      </Button>
      <br></br>
    </div>
  );
}

export default FinanceScreen;
