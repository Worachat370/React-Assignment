import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Button } from 'antd'; 
import { useNavigate } from 'react-router-dom'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartPage = () => {
  const [chartData, setChartData] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/txactions');
        const txactions = response.data.data;

        const labels = txactions.map((item) =>
          new Date(item.attributes.action_datetime).toLocaleString()
        );

        const incomeData = txactions.map((item) =>
          item.attributes.type === 'income' ? item.attributes.amount : 0
        );

        const expenseData = txactions.map((item) =>
          item.attributes.type === 'expense' ? item.attributes.amount : 0
        );

        setChartData({
          labels,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4,
              borderWidth: 2,
            },
            {
              label: 'Expense',
              data: expenseData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
              tension: 0.4,
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error('การดึงข้อมูลจากเซิฟเวอร์มีข้อผิดพลาด:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const handleBackToDashboard = () => {
    navigate('/'); 
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expense',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '80vw', height: '80vh', flexDirection: 'column' }}>
      <div style={{ flex: 1, width: '100%', height: '100%', padding: '10px' }}>
        <Line data={chartData} options={options} />
      </div>
      <Button
        type="primary"
        onClick={handleBackToDashboard}
        style={{
          position: 'relative',
          bottom: '20px',
          width:"1000px",
          marginTop: '20px',
        }}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default ChartPage;
