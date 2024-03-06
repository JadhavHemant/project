import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
const View = () => {
  const [data, sespanata] = useState({});

  var id = localStorage.getItem("user_id");

  useEffect(() => {

    axios({
      url: `http://localhost:3001/todos/${id}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        sespanata(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [id]);

  return (
  <>

   <div className="container" style={{paddingTop:"100px"}}>
    <table>
        <tr>
            <td><strong>ID :</strong></td>
            <td><span>{data.student_name}</span></td>
        </tr>
        <tr>
            <td><strong>Class :</strong></td>
            <td><span>{data.student_class}</span></td>
        </tr>
        <tr>
            <td><strong>Student Roll Number :</strong></td>
            <td><span>{data.student_roll_number}</span></td>
        </tr>
        <tr>
            <td><strong>Student Phone Number :</strong></td>
            <td><span>{data.student_phone_no}</span></td>
        </tr>
        <tr>
            <td><strong>Student Email id:</strong></td>
            <td><span>{data.email_id}</span></td>
        </tr>
        <tr>
            <td><strong>Student College :</strong></td>
            <td><span>{data.student_college}</span></td>
        </tr>
        <tr>
            <td><strong>Description :</strong></td>
            <td><span>{data.description}</span></td>
        </tr>
        <tr>
            <td><strong>Problem Statement :</strong></td>
            <td><span>{data.problem_statement}</span></td>
        </tr>
        <tr>
            <td><strong>Solution :</strong></td>
            <td><span>{data.solution}</span></td>
        </tr>
        <tr>
            <td><strong>Technology Interact :</strong></td>
            <td><span>{data.technology_inract}</span></td>
        </tr>
        <tr>
            <td><strong>GitHub Link :</strong></td>
            <td><span>{data.github_link}</span></td>
        </tr>
        <tr>
            <td><strong>PPt :</strong></td>
            <td><span>{data.power_point_document}</span></td>
        </tr>
        <tr>
            <td><strong>Submitted Date :</strong></td>
            <td><span>{data.da_te_submited}</span></td>
        </tr>
    </table>
</div>

  <br/>
<br/>
 <center>
 <Link to="/student/tablestudent">
  <button className="btn btn-edit">Go Back</button>
</Link>
 </center>
  </>

  );
}

export default View;
