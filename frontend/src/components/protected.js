import React, { useEffect, useState } from 'react';
import API from '../api';

function Protected() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await API.get('/protected');
        setMessage(res.data.message);
      } catch (err) {
        setMessage('Access denied');
      }
    };
    fetchProtected();
  }, []);

  return (
    <div>
      <h2>Protected Route</h2>
      <p>{message}</p>
    </div>
  );
}

export default Protected;