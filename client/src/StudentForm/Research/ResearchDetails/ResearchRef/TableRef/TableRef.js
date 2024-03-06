import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom'//
const TableRef = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getData();

  }, []);
  const getData = () => {
    axios({
      url: `http://localhost:3001/researchref`,
      method: 'GET',
      contentType: 'application/json'
    }).then((res) => {
      setData(res.data)
    }).catch((err) => {

    })
  };

  
  const Delete = (id) => { 
      axios({
          url: `http://localhost:3001/researchref/${id}`,
          method: 'DELETE',
          contentType: 'application/json',
        }).then((res) => {
            alert("deleted")
            getData();
        }).catch((err) => {
            alert(err.message)
        })
        
    }
    
    const Edit = (id) => {
      localStorage.setItem("ref_id", id);
      navigate("/resarch/refedit")
    }
  const View = (id) => {
    localStorage.setItem("ref_id", id);
    navigate("/resarch/refview")
  }

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Link to="/resarch/addref">
          <center> <button className="btn btn-contact">Add Reference</button></center>
        </Link>
        <br />
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>id</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>srnumber</th>
              <th style={{ textAlign: "center" }}>Reference Name</th>
              <th style={{ textAlign: "center" }}>college</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((d, k) => (
                <tr key={k}>
                 
                  <th>{d.id}</th>
                  <td>{d.name}</td>
                  <td>{d.srnumber}</td>
                  <td>{d.referencename}</td>
                  <td>{d.college}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => Edit(d.id)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => Delete(d.id)}>Delete</button>
                    <button className="btn btn-view" onClick={() => View(d.id)}>View</button>
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

export default TableRef

