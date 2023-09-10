import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

interface TestHistoryItem {
  _id: string;
  category: string;
  score: number;
}

const TestHistory = () => {
  const [testHistory, setTestHistory] = useState<TestHistoryItem[]>([]);

  useEffect(() => {
    // Fetch test history from the backend when the component mounts
    const fetchHistory = async () => {
       await axios
          .get('/testHistory') // Define the correct backend endpoint
          .then((response) => {
            setTestHistory(response.data);
          })
          .catch((error) => {
            console.error('Error fetching test history:', error);
          });
    }
    fetchHistory();
  }, []);

  return (
    <div>
      <h1>Test History</h1>
      <ul>
        {testHistory.map((item) => (
          <li key={item._id}>
            Category: {item.category}, Score: {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestHistory;
