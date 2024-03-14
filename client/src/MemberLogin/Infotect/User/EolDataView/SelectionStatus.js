import React, { useEffect, useState } from 'react'
import axios from 'axios'
const SelectionStatus = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    getData();
  })

  const getData = () => {
    axios({
      url: `/api/selection_status/result`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      setData(res.data);
    }).catch((err) => {
      alert("failed")
    })
  }
  const SelectData = () => {
    axios({
      url: `/api/selection_status/result`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      setData(res.data);
    }).catch((err) => {
      alert("failed")
    })
  }
  return (
    <>
      {data.map((d, k) => (
        <div key={k}>
          <h1>{d.id}</h1>
        </div>
      ))}
    </>
  )
}

export default SelectionStatus
