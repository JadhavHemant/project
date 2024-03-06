import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Table.css';
import axios from 'axios';

const ReferneceTable = () => {
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, []);

    const [data, setdata] = useState([]);

    const getData = () => {
        axios({
            url: "http://localhost:3001/todos",
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
            url: `http://localhost:3001/delete/todos/${id}`,
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
        navigate("/student/studentview")
    }
    const Edit = (id) => {
        // alert(id)
        localStorage.setItem("user_id", id);
        navigate("/student/studentedit")
    }
    return (
        <>
            <div style={{ marginTop: "100px" }}>
                <Link to="/student/studentidea">
                    <center> <button className="btn btn-contact">Student Ideation Form</button></center>
                </Link>
                <br />
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>No</th>
                            <th style={{ textAlign: "center" }}>Student Name</th>
                            <th style={{ textAlign: "center" }}>College Name</th>
                            <th style={{ textAlign: "center" }}>Description</th>
                            <th style={{ textAlign: "center" }}>Problem Statement</th>
                            <th style={{ textAlign: "center" }}>Solution</th>
                            <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, k) => (
                                <tr key={k}>
                                    <th>{k+1}</th>
                                    <td>{d.student_name}</td>
                                    <td>{d.student_college}</td>
                                    <td>{d.description}</td>
                                    <td>{d.problem_statement}</td>
                                    <td>{d.solution}</td>
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
    );
}

export default ReferneceTable;
