import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { } from 'react-router-dom';
const ResView = () => {
  const [data, sespanata] = useState({});

  var id = localStorage.getItem("r_id");

  useEffect(() => {

    axios({
      url: `http://localhost:3001/research/${id}`,
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
            <td><strong>Research ID :</strong></td>
            <td><span>{data.research_id}</span></td>
        </tr>
        <tr>
            <td><strong>Name :</strong></td>
            <td><span>{data.name}</span></td>
        </tr>
        <tr>
            <td><strong>Designation :</strong></td>
            <td><span>{data.designation}</span></td>
        </tr>
        <tr>
            <td><strong>Organization :</strong></td>
            <td><span>{data.organization}</span></td>
        </tr>
        <tr>
            <td><strong>Phone Number:</strong></td>
            <td><span>{data.phone_no}</span></td>
        </tr>
        <tr>
            <td><strong>email :</strong></td>
            <td><span>{data.email}</span></td>
        </tr>
        <tr>
            <td><strong>Discipline :</strong></td>
            <td><span>{data.discipline}</span></td>
        </tr>
        <tr>
            <td><strong>Research Topic :</strong></td>
            <td><span>{data.research_topic}</span></td>
        </tr>
        <tr>
            <td><strong>Research Category :</strong></td>
            <td><span>{data.research_category}</span></td>
        </tr>
        <tr>
            <td><strong>Sub Research Category :</strong></td>
            <td><span>{data.sub_research_category}</span></td>
        </tr>
        <tr>
            <td><strong>Methodology :</strong></td>
            <td><span>{data.methodology}</span></td>
        </tr>
        <tr>
            <td><strong>Abstract :</strong></td>
            <td><span>{data.abstract}</span></td>
        </tr>
        <tr>
            <td><strong>Expected Outcome :</strong></td>
            <td><span>{data.expected_outcome}</span></td>
        </tr>
        <tr>
            <td><strong>file_upload:</strong></td>
            <td><span>{data.file_upload}</span></td>
        </tr>
    </table>
</div>

  <br/>
<br/>
 <center>
 <Link to="/resarch/researchtable">
  <button className="btn btn-edit">Go Back</button>
</Link>
 </center>
  </>

  );
}

export default ResView;
