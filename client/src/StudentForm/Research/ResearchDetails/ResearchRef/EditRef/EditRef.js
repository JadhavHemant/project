import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditRef = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    srnumber: '',
    referencename: '',
    college: '',
    discipline: '',
    cla_ss: '',
    rollnumber: '',
    referenceemail: '',
    referencephone: '',
  });

  useEffect(() => {
    getdataid();
  }, []);

  const getdataid = () => {
    const id = localStorage.getItem('ref_id');
    axios({
      url: `http://localhost:3001/researchref/${id}`,
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

  const PostData = () => {
    const updatedData = {
      name: name.current.value,
      srnumber: srnumber.current.value,
      referencename: referencename.current.value,
      college: college.current.value,
      discipline: discipline.current.value,
      cla_ss: cla_ss.current.value,
      rollnumber: rollnumber.current.value,
      referenceemail: referenceemail.current.value,
      referencephone: referencephone.current.value,
    };

    axios({
      url: `http://localhost:3001/researchref/${localStorage.getItem('ref_id')}`,
      method: 'put',
      data: updatedData,
      contentType: 'application/json',
    })
      .then((res) => {
        alert('Reference updated successfully');
      })
      .catch((err) => {
        alert('Reference update failed');
      });
  };

  const GoBack = () => {
    navigate('/resarch');
  };

  const name = useRef();
  const srnumber = useRef();
  const referencename = useRef();
  const college = useRef();
  const discipline = useRef();
  const cla_ss = useRef();
  const rollnumber = useRef();
  const referenceemail = useRef();
  const referencephone = useRef();

  return (
    <>
      <div style={{ paddingTop: '100px' }}>
        <form>
          <div>
            <label htmlFor="studentName">Name:</label>
            <input type="text" ref={name} defaultValue={data.name} required />
          </div>

          <div>
            <label htmlFor="studentClass">Sr.number:</label>
            <input type="text" ref={srnumber} defaultValue={data.srnumber} required />
          </div>

          <div>
            <label htmlFor="studentRollNumber">Referencename:</label>
            <input type="text" ref={referencename} defaultValue={data.referencename} required />
          </div>

          <div>
            <label htmlFor="emailId">Discipline:</label>
            <textarea ref={discipline} defaultValue={data.discipline} required />
          </div>

          <div>
            <label htmlFor="studentPhoneNo">College:</label>
            <input type="text" ref={college} defaultValue={data.college} required />
          </div>

          <div>
            <label htmlFor="studentCollege">Class:</label>
            <input type="text" ref={cla_ss} defaultValue={data.cla_ss} required />
          </div>

          <div>
            <label htmlFor="description">Reference email:</label>
            <input ref={referenceemail} rows="2" defaultValue={data.referenceemail} required />
          </div>

          <div>
            <label htmlFor="githubLink">Rollnumber:</label>
            <input style={{ height: "40px" }} type="text" ref={rollnumber} defaultValue={data.rollnumber} required />
          </div>

          <div>
            <label htmlFor="problemStatement">Reference phone:</label>
            <input ref={referencephone} rows="2" defaultValue={data.referencephone} required />
          </div>

          <button type="button" onClick={PostData}>
            Update Reference
          </button>
        </form>
        <br />
        <button type="button" onClick={GoBack}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default EditRef;
