import {  useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const EditSDetails = () => {
    const navigate = useNavigate();
    const student_name = useRef();
    const student_class = useRef();
    const student_roll_number = useRef();
    const student_phone_no = useRef();
    const email_id = useRef();
    const student_college = useRef();
    const description = useRef();
    const problem_statement = useRef();
    const solution = useRef();
    const technology_inract = useRef();
    const github_link = useRef();
    const power_point_document = useRef();
    
    useEffect(() => {
        GetDetailsId();
    }, []);

    const [ids,setI]=useState([]);
    const GetDetailsId = () => {
        var id = localStorage.getItem("user_id");
        setI(id)
        axios({
            url: `http://localhost:3001/todos/${id}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                const data = res.data;
                student_name.current.value = data.student_name;
                student_class.current.value = data.student_class;
                student_roll_number.current.value = data.student_roll_number;
                student_phone_no.current.value = data.student_phone_no;
                email_id.current.value = data.email_id;
                student_college.current.value = data.student_college;
                description.current.value = data.description;
                problem_statement.current.value = data.problem_statement;
                solution.current.value = data.solution;
                technology_inract.current.value = data.technology_inract;
                github_link.current.value = data.github_link;
                power_point_document.current.value=data.power_point_document;
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    }

    const Updateidea=()=>{
        var id = ids;
        const ide = {student_name:student_name.current.value,student_class:student_class.current.value,student_roll_number:student_roll_number.current.value,student_phone_no:student_phone_no.current.value,email_id:email_id.current.value,student_college:student_college.current.value,description:description.current.value,problem_statement:problem_statement.current.value,solution:solution.current.value,technology_inract:technology_inract.current.value,github_link:github_link.current.value,power_point_document:power_point_document.current.value };
    
    
        axios({
          url: `http://localhost:3001/update/todos/${id}/`,
          method: "put",
          data: ide,
          contentType: "application/json"
        })
          .then((res) => {
            alert("(° ͜ʖ͡°)つ Update successfully");
            student_name.current.value = '';
            student_class.current.value = '';
            student_roll_number.current.value = '';
            student_phone_no.current.value = '';
            email_id.current.value = '';
            student_college.current.value = '';
            description.current.value = '';
            problem_statement.current.value = '';
            solution.current.value = '';
            technology_inract.current.value = '';
            github_link.current.value = '';
            power_point_document.current.value = "";
          })
          .catch((err) => {
            alert("ლ(ಠ益ಠ)ლ Update failed")
          });
      }

    const GoBack = () => {
        navigate("/student/tablestudent");
    }

    return (
        <>
        
            <div style={{ paddingBottom: "20px" }}>

                <h1>Pcombinater Edit Form</h1>
                <form encType="multipart/form-data">
          <div>
            <label for="studentName">Student Name:</label>
            <input type="text" ref={student_name} required />
          </div>

          <div>
            <label for="studentClass">Student Class:</label>
            <input type="text" ref={student_class} required />
          </div>

          <div>
            <label for="studentRollNumber">Student Roll Number:</label>
            <input type="text" ref={student_roll_number} required />
          </div>

          <div>
            <label for="studentPhoneNo">Student Phone Number:</label>
            <input type="text" ref={student_phone_no} required />
          </div>

          <div>
            <label for="emailId">Email ID:</label>
            <input type="email" ref={email_id} required />
          </div>

          <div>
            <label for="studentCollege">Student College:</label>
            <input type="text" ref={student_college} required />
          </div>
          <div>
            <label for="description">Description:</label>
            <textarea ref={description} rows="4" required></textarea>
          </div>
          <div>
            <label for="problemStatement">Problem Statement:</label>
            <textarea ref={problem_statement} rows="4" required></textarea>
          </div>

          <div>
            <label for="solution">Solution:</label>
            <textarea ref={solution} rows="4" required></textarea>
          </div>

          <div>
            <label for="technologyIntract">Technology Interact:</label>
            <textarea ref={technology_inract} rows="4" required></textarea>
          </div>

          <div>
            <label for="githubLink">GitHub Link:</label>
            <input style={{ height: "40px" }} type="text" ref={github_link} required />
          </div>

          <div>
          <label> File Upload</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br />
            <input
              style={{ fontFamily: "Poppins", marginRight: "10px" }}
              type="text"
              id="fileupload"
              name="fileupload"
              placeholder="Enter the file upload link"
              ref={power_point_document}
            />
            <div style={{ position: "relative" }}></div>
            <a
              href="https://drive.google.com/drive/folders/18xEFIS66wqfRQWjcAzJnE19-l39gFZIT?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Upload file here
            </a>
          </div>
           
          </div>
          <button type="button" onClick={()=>Updateidea()}>
            Submit
          </button>
        </form>
                <br /><br />

                <button className="btn btn-edit" onClick={() => GoBack()}>Go Back</button>

            </div>
        </>
    );
}

export default EditSDetails;
