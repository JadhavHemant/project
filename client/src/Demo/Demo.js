import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [email3, setEmail3] = useState('');
    const [email4, setEmail4] = useState('');
    
    const sendEmails = async () => {
        try {
            const response = await axios.post('http://localhost:3001/send-emailfour/ids', {
                email1: email1,
                email2: email2,
                email3: email3,
                email4: email4
            });
            console.log(response.data);
            alert("Email sent successfully");
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };
    
    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter email ID 1" 
                value={email1} 
                onChange={(e) => setEmail1(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Enter email ID 2" 
                value={email2} 
                onChange={(e) => setEmail2(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Enter email ID 3" 
                value={email3} 
                onChange={(e) => setEmail3(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Enter email ID 4" 
                value={email4} 
                onChange={(e) => setEmail4(e.target.value)}
            />
            <button onClick={sendEmails}>Send Emails</button>
        </div>
    );
};

export default MyComponent;
