import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EcosystemTable = () => {
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const [data, setdata] = useState([]);

  const getData = () => {
    axios({
      url: "http://localhost:8100/ecosystems",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setdata(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const Delete = (id) => {
    axios({
      url: `http://localhost:8100/ecosystems/${id}`,
      method: 'DELETE',
    })
      .then((res) => {
        alert("Deleted successfully");
        getData();
      })
      .catch((err) => {
        alert("Delete failed");
      });
  };

  const View = (id) => {
    // alert(id)
    localStorage.setItem("user_id", id);
    navigate("/ecosystem/view")
  }
  const Edit = (id) => {
    // alert(id)
    localStorage.setItem("user_id", id);
    navigate("/ecosystem/edit")
  }
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Link to="/ecosystem/add">
          <center> <button className="btn btn-contact">Add Ecosystem</button></center>
        </Link>
        <br />
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Ecosystem Name </th>
              <th style={{ textAlign: "center" }}>Address</th>
              <th style={{ textAlign: "center" }}>Location</th>
              <th style={{ textAlign: "center" }}>State</th>
              <th style={{ textAlign: "center" }}>Country</th>
              <th style={{ textAlign: "center" }}>Action</th>
              {/* <th style={{ textAlign: "center" }}>opportunity </th> */}
            </tr>
          </thead>
          <tbody>
            {
              data.map((d, k) => (
                <tr key={k}>
                  <th>{d.ecosystem_id}</th>
                  <td>{d.ecosystem_name}</td>
                  <td>{d.address}</td>
                  <td>{d.location}</td>
                  <td>{d.state}</td>
                  <td>{d.country}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => Edit(d.ecosystem_id)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => Delete(d.ecosystem_id)}>Delete</button>
                    <button className="btn btn-view" onClick={() => View(d.ecosystem_id)}>View</button>
                  </td>
                  {/* <td>
                    <button className="btn btn-edit" onClick={() => Edit(d.ecosystem_id)}>Edit</button>
                    </td> */}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EcosystemTable;
