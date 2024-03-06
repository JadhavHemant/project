import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EditRes = () => {
  const namex = useRef();
  const designation = useRef();
  const organization = useRef();
  const phone_no = useRef();
  const email = useRef();
  const discipline = useRef();
  const research_topic = useRef();
  const research_category = useRef();
  const sub_research_category = useRef();
  const methodology = useRef();
  const abstract = useRef();
  const expected_outcome = useRef();
  const file_upload = useRef();

  const navigate = useNavigate();



  useEffect(() => {
    getdataid()
  }, []);
  const [xid, setImid] = useState([]);
  const getdataid = () => {
    var id = localStorage.getItem("r_id");
    setImid(id)
    axios({
      url: `http://localhost:3001/research/${id}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // alert('Success')
        namex.current.value = res.data.name;
        designation.current.value = res.data.designation;
        organization.current.value = res.data.organization;
        phone_no.current.value = res.data.phone_no;
        email.current.value = res.data.email;
        discipline.current.value = res.data.discipline;
        research_topic.current.value = res.data.research_topic;
        research_category.current.value = res.data.research_category;
        sub_research_category.current.value = res.data.sub_research_category;
        methodology.current.value = res.data.methodology;
        abstract.current.value = res.data.abstract;
        expected_outcome.current.value = res.data.expected_outcome;
        file_upload.current.value = res.data.file_upload;
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  const AddRes = () => {
    var X = {
      name: namex.current.value, designation: designation.current.value, organization: organization.current.value, phone_no: phone_no.current.value,
      email: email.current.value, discipline: discipline.current.value, research_topic: research_topic.current.value, research_category: research_category.current.value,
      sub_research_category: sub_research_category.current.value, methodology: methodology.current.value, abstract: abstract.current.value,
      expected_outcome: expected_outcome.current.value, file_upload: file_upload.current.value
    }
    console.log(X)
    var id = xid;
    axios({
      url: `http://localhost:3001/put/research/${id}`,
      method: 'put',
      data: X,
      contentType: 'application/json',
    }).then((res) => {
      alert('Success');
    }).catch((err) => {
      alert("error")
    })
  }

  const GoBack = () => {
    navigate("/resarch/researchtable")
  }
  return (
    <>
    <div style={{ paddingBottom: "20px" }}>
      <center>
      <h4>Edit Research Form</h4>
      </center>
      <form encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input type="text" ref={namex} required />
        </div>

        <div>
          <label>Designation:</label>
          <input type="text" ref={designation} required />
        </div>

        <div>
          <label>Organization:</label>
          <input type="text" ref={organization}/>
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="text" ref={phone_no}/>
        </div>

        <div>
          <label>Email ID:</label>
          <input type="email" ref={email}/>
        </div>

        <div>
          <label>Discipline</label>
          <input type="text" ref={discipline}/>
        </div>

        <div>
          <label>Research Topic:</label>
          <input  type="text" ref={research_topic}/>
        </div>

        <div>
          <label>Research Category:</label>
          <input type="text" ref={research_category}/>
        </div>

        <div>
          <label>Sub Research Category:</label>
          <input type="text" ref={sub_research_category}  />
        </div>

        <div>
          <label for="solution">Methodology:</label>
          <input type="text" ref={methodology}/>
        </div>

        <div>
          <label for="technologyIntract">Abstract:</label>
          <textarea ref={abstract} rows="3" required></textarea>
        </div>

        <div>
          <label for="githubLink">Expected Outcome:</label>
          <textarea ref={expected_outcome} rows="3" required></textarea>
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
              ref={file_upload}
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
        <button type="button" onClick={() => AddRes()}>
          Submit
        </button>
      </form>
      <br /><br />
      <button className="btn btn-edit" onClick={() => GoBack()}>Go Back</button>
    </div>
  </>
  )
}

export default EditRes
