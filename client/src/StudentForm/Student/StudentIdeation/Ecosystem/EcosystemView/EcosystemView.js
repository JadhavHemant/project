import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EcosystemView = () => {
  var id = localStorage.getItem("user_id");
  const [data, sespanata] = useState({});
  console.log(data)
  useEffect(() => {

    axios({
      url: `http://localhost:8100/ecosystems/${id}`,
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


  const navigate = useNavigate();

  const GoBack=()=>{
      navigate("/ecosystem")
  }

  return (
    <>
      <div className="container" style={{ paddingTop: "100px" }}>
        <table>
          <tr>
            <td><strong>ID :</strong></td>
            <td><span>{data.ecosystem_id}</span></td>
          </tr>
          <tr>
            <td><strong> Ecosystem Name:</strong></td>
            <td><span>{data.ecosystem_name}</span></td>
          </tr>
          <tr>
            <td><strong>Address :</strong></td>
            <td><span>{data.address}</span></td>
          </tr>
          <tr>
            <td><strong>Location :</strong></td>
            <td><span>{data.location}</span></td>
          </tr>
          <tr>
            <td><strong>State:</strong></td>
            <td><span>{data.state}</span></td>
          </tr>
          <tr>
            <td><strong>Country :</strong></td>
            <td><span>{data.country}</span></td>
          </tr>
          <tr>
            <td><strong>Geo Coordinates :</strong></td>
            <td><span>{data.geo_coordinates}</span></td>
          </tr>
          <tr>
            <td><strong>Contact Name :</strong></td>
            <td><span>{data.contact_name}</span></td>
          </tr>
          <tr>
            <td><strong>Contact Designation :</strong></td>
            <td><span>{data.contact_designation}</span></td>
          </tr>
          <tr>
            <td><strong>Website link :</strong></td>
            <td><span>{data.website_link}</span></td>
          </tr>
          <tr>
            <td><strong>Phone Number :</strong></td>
            <td><span>{data.phone_number}</span></td>
          </tr>
          <tr>
            <td><strong>Email :</strong></td>
            <td><span>{data.email_address}</span></td>
          </tr>
          <tr>
            <td><strong>Pincode :</strong></td>
            <td><span>{data.pincode}</span></td>
          </tr>
          <tr>
            <td><strong>Sector :</strong></td>
            <td><span>{data.sector}</span></td>
          </tr>
          <tr>
            <td><strong>Areas of interest :</strong></td>
            <td><span>{data.areas_of_interest}</span></td>
          </tr>
        </table>
      </div>
      <br/>
      <br/>

      <button type="button" onClick={() => GoBack()} >
                            Go Back
                        </button>
    </>
  )
}

export default EcosystemView
