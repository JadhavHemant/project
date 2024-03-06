import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const TableRes = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getData();

  }, []);
  const getData = () => {
    axios({
      url: `http://localhost:3001/research`,
      method: 'GET',
      contentType: 'application/json'
    }).then((res) => {
      setData(res.data)
    }).catch((err) => {

    })
  };

  const Edit = (id) => {
    localStorage.setItem("r_id", id);
    navigate("/resarch/researchedit")
  }

  const Delete = (id) => { 
    axios({
      url: `http://localhost:3001/delete/research/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
    }).then((res) => {
      alert("deleted")
      getData();
    }).catch((err) => {
      alert(err.message)
    })

  }

  const View = (id) => {
    localStorage.setItem("r_id", id);
    navigate("/resarch/researchview")
  }

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Link to="/resarch/researchadd">
          <center> <button className="btn btn-contact">Add Research</button></center>
        </Link>
        <br />
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Research Id</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Designation</th>
              <th style={{ textAlign: "center" }}>Organization</th>
              <th style={{ textAlign: "center" }}>Research Topic</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((d, k) => (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <th>{d.research_id}</th>
                  <td>{d.name}</td>
                  <td>{d.designation}</td>
                  <td>{d.organization}</td>
                  <td>{d.research_topic}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => Edit(d.research_id)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => Delete(d.research_id)}>Delete</button>
                    <button className="btn btn-view" onClick={() => View(d.research_id)}>View</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableRes

