import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "hhttps://basic-fullstack-app-808541460346.asia-southeast1.run.app"

function App() {
  const [message, setMessage] = useState('');
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/hello`) 
      .then((res) => {
        console.log('res: ', res);
        console.log('res.data: ', res.data);
        setMessage(res.data.message);
      });
  }, []);
  
  const sendName = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/api/user`, { name })
      .then(res => setGreeting(res.data.greeting));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{message}</h2>
      <form onSubmit={sendName}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button type="submit">Send Name</button>
      </form>
      <p>{greeting}</p>
    </div>
  );
}

export default App;
