import React, { useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRefs = () => {
    const navigate = useNavigate();

    const name = useRef();
    const srnumber = useRef();
    const referencename = useRef();
    const college = useRef();
    const discipline = useRef();
    const cla_ss = useRef();
    const rollnumber = useRef();
    const referenceemail = useRef();
    const referencephone = useRef();

    const PostData = () => {
        var d = {
            name: name.current.value, srnumber: srnumber.current.value, referencename: referencename.current.value, college: college.current.value,
            discipline: discipline.current.value, cla_ss: cla_ss.current.value, rollnumber: rollnumber.current.value, referenceemail: referenceemail.current.value,
            referencephone: referencephone.current.value
        }
        axios({
            url: `http://localhost:3001/students`,
            method: 'POST',
            data: d,
            contentType: 'application/json'
        }).then((res) => {
            alert("Reference added successfully")
            name.current.value = '';
            srnumber.current.value = '';
            referencename.current.value = '';
            college.current.value = '';
            discipline.current.value = '';
            cla_ss.current.value = '';
            rollnumber.current.value = '';
            referenceemail.current.value = '';
            referencephone.current.value = '';
        }).catch((err) => {
            alert("reference added failed")
        })

    }

    const GoBack = () => {
        navigate("/student/stableref")
    }

    return (
        <>
            <div style={{paddingTop:"100px"}}>
                <form>
                    <div>
                        <label for="studentName">Name:</label>
                        <input type="text" ref={name} required />
                    </div>

                    <div>
                        <label for="studentClass">Sr.number:</label>
                        <input type="text" ref={srnumber} required />
                    </div>

                    <div>
                        <label for="studentRollNumber">Referencename:</label>
                        <input type="text" ref={referencename} required />
                    </div>
                    <div>
                        <label for="emailId">Discipline:</label>
                        <textarea ref={discipline} required />
                    </div>

                    <div>
                        <label for="studentPhoneNo">College:</label>
                        <input type="text" ref={college} required />
                    </div>


                    <div>
                        <label for="studentCollege">Class:</label>
                        <input type="text" ref={cla_ss} required />
                    </div>
                    <div>
                        <label for="description">Reference email:</label>
                        <input ref={referenceemail} rows="2" required></input>
                    </div>
                    <div>
                        <label for="githubLink">Rollnumber:</label>
                        <input style={{ height: "40px" }} type="text" ref={rollnumber} required />
                    </div>
                    <div>
                        <label for="problemStatement">Reference phone:</label>
                        <input ref={referencephone} rows="2" required></input>
                    </div>
              
                        <button type="button" onClick={() => PostData()} >
                            Add Reference
                        </button>
                    
                    
                </form>
                <br></br>
                <button type="button" onClick={() => GoBack()} >
                            Go Back
                        </button>
                    
            </div>
        </>
    )
}

export default AddRefs
