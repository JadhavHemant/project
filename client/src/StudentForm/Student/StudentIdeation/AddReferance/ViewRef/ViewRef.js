import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewRefs = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getdataid();
  }, []);

  const getdataid = () => {
    const id = localStorage.getItem('ref_id');
    axios({
      url: `http://localhost:3001/students/${id}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert('Error fetching data');
      });
  };

  const GoBack = () => {
    navigate('/student/stableref');
  };

  return (
    <>
    <div style={{ margin: '20px' }}>
      <h2>Reference Information</h2>
      {data && (
        <table style={{ width: '150%', text:"bold" }}>
          <tbody>
            <TableRow label="ID" value={data.id} />
            <TableRow label="Name" value={data.name} />
            <TableRow label="Sr Number" value={data.srnumber} />
            <TableRow label="Reference Name" value={data.referencename} />
            <TableRow label="College" value={data.college} />
            <TableRow label="Discipline" value={data.discipline} />
            <TableRow label="Class" value={data.cla_ss} />
            <TableRow label="Roll Number" value={data.rollnumber} />
            <TableRow label="Reference Email" value={data.referenceemail} />
            <TableRow label="Reference Phone" value={data.referencephone} />
          </tbody>
        </table>
        
      )}
    </div>
     <button type="button" onClick={GoBack}>
     Go Back
   </button>
   </>
  );
};

// Component for table rows
const TableRow = ({ label, value }) => (
  <tr>
    <td style={{ padding: '8px' }}>
      <strong>{label}:</strong>
    </td>
    <td style={{ padding: '8px' }}>{value}</td>
  </tr>
);

export default ViewRefs;