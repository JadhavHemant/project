import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from './Image/logos.png';
import logo2 from './Image/logo2nd.png';

const StudentForm = () => {
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
  const discipline = useRef();


  const Addidea = () => {
    if (
      !student_name.current.value ||
      !student_class.current.value ||
      !student_roll_number.current.value ||
      !student_phone_no.current.value ||
      !email_id.current.value ||
      !student_college.current.value ||
      !description.current.value ||
      !problem_statement.current.value ||
      !solution.current.value ||
      !technology_inract.current.value ||
      !github_link.current.value ||
      !power_point_document.current.value || !discipline.current.value
    ) {
      alert("Please fill in all the required fields and select a file.");
      return;
    }

    const ide = { student_name: student_name.current.value, student_class: student_class.current.value, student_roll_number: student_roll_number.current.value, student_phone_no: student_phone_no.current.value, email_id: email_id.current.value, student_college: student_college.current.value, description: description.current.value, problem_statement: problem_statement.current.value, solution: solution.current.value, technology_inract: technology_inract.current.value, github_link: github_link.current.value, power_point_document: power_point_document.current.value, discipline: discipline.current.value };
    console.log(ide)
    axios({
      url: "http://localhost:3001/add/ideation",
      method: "post",
      data: ide,
      contentType: "application/json",
    }).then((res) => {
      alert("Form submit successfully");
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
      discipline.current.value = "";
    }).catch((err) => {
      alert("Check details");
    });
  };

  const Refernce = () => {
    navigate("/student/refe")
  }
  return (
    <>
      <div style={{ display: 'inline', paddingTop: "60px" }}>
        <center>
          <img src={logo1} alt='logo' width={'80px'} />
          <h4 style={{ display: 'inline', margin: 0, marginLeft: '10px' }}>StudentIdeation Form</h4>
          <img src={logo2} alt='logo' width={'80px'} style={{ display: 'inline', paddingLeft: '10px' }} />
        </center>
      </div>
      <div style={{ paddingBottom: "20px" }}>

        <form encType="multipart/form-data">
          <div>
            <label for="studentName">Student Name:</label>
            <input type="text" ref={student_name} required />
          </div>
          <div>
            <label for="Discipline">Discipline</label>
            <input type="text" ref={discipline} required />
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
            <textarea ref={description} rows="2" required></textarea>
          </div>
          <div>
            <label for="problemStatement">Problem Statement:</label>
            <textarea ref={problem_statement} rows="2" required></textarea>
          </div>

          <div>
            <label for="solution">Solution:</label>
            <textarea ref={solution} rows="3" required></textarea>
          </div>

          <div>
            <label for="technologyIntract">Technology Interact:</label>
            <textarea ref={technology_inract} rows="3" required></textarea>
          </div>

          <div>
            <label for="githubLink">GitHub Link:</label>
            <input style={{ height: "40px" }} type="text" ref={github_link} required />
          </div>

          <div>
            <label> File Upload :</label>
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '30px' }}>
            <button type="button" onClick={() => Addidea()} style={{ width: '48%' }}>
              Submit
            </button>
            <button type="button" onClick={() => Refernce()} style={{ width: '48%' }}>
              Reference
            </button>
          </div>
        </form>
        <br /><br />


      </div>
    </>
  )
}
export default StudentForm
