import React, { useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EcosystemAdd = () => {
  const ecosystem_name=useRef();
  const address=useRef();
  const location=useRef();
  const state=useRef();
  const country=useRef();
  const geo_coordinates=useRef();
  const contact_name=useRef();
  const contact_designation=useRef();
  const website_link=useRef();
  const phone_number=useRef();
  const email_address=useRef();
  const pincode=useRef();
  const sector=useRef();
  const areas_of_interest=useRef();


  const AddData = () => {
    // Basic form validation
    if (
      !ecosystem_name.current.value ||
      !address.current.value ||
      !location.current.value ||
      !state.current.value ||
      !country.current.value ||
      !geo_coordinates.current.value ||
      !contact_name.current.value ||
      !contact_designation.current.value ||
      !website_link.current.value ||
      !phone_number.current.value ||
      !email_address.current.value ||
      !pincode.current.value ||
      !sector.current.value ||
      !areas_of_interest.current.value
    ) {
     alert("Please enter all fields")
      return;
    }

    var datax = {
      ecosystem_name: ecosystem_name.current.value,
      address: address.current.value,
      location: location.current.value,
      state: state.current.value,
      country: country.current.value,
      geo_coordinates: geo_coordinates.current.value,
      contact_name: contact_name.current.value,
      contact_designation: contact_designation.current.value,
      website_link: website_link.current.value,
      phone_number: phone_number.current.value,
      email_address: email_address.current.value,
      pincode: pincode.current.value,
      sector: sector.current.value,
      areas_of_interest: areas_of_interest.current.value,
    };

    axios({
      url: `http://localhost:8100/ecosystems`,
      method: 'POST',
      data: datax,
      contentType: 'application/json',
    })
      .then((res) => {
        alert('Successfully submitted');
        ecosystem_name.current.value = '';
        address.current.value = '';
        location.current.value = '';
        state.current.value = '';
        country.current.value = '';
        geo_coordinates.current.value = '';
        contact_name.current.value = '';
        contact_designation.current.value = '';
        website_link.current.value = '';
        phone_number.current.value = '';
        email_address.current.value = '';
        pincode.current.value = '';
        sector.current.value = '';
        areas_of_interest.current.value = '';
        
      })
      .catch((err) => {
        alert('Error');
      });
  };

     
const navigate = useNavigate();

const GoBack=()=>{
    navigate("/ecosystem")
}

  return (
   <>
    <div style={{paddingTop:"20px"}}>
                <form>
                    <div>
                        <label for="studentName">ecosystem_name:</label>
                        <input type="text" ref={ecosystem_name} required />
                    </div>

                    <div>
                        <label for="studentClass">address:</label>
                        <input type="text" ref={address} required />
                    </div>

                    <div>
                        <label for="studentRollNumber">location:</label>
                        <input type="text" ref={location} required />
                    </div>
                    <div>
                        <label for="emailId">state:</label>
                        <textarea type="text" ref={state} required />
                    </div>

                    <div>
                        <label for="studentPhoneNo">country:</label>
                        <input type="text" ref={country} required />
                    </div>


                    <div>
                        <label for="studentCollege">geo_coordinates:</label>
                        <input type="text" ref={geo_coordinates} required />
                    </div>
                    <div>
                        <label for="description">contact_name:</label>
                        <input  rows="2" ref={contact_name} required></input>
                    </div>
                    <div>
                        <label for="githubLink">contact_designation:</label>
                        <input style={{ height: "40px" }} type="text"  ref={contact_designation} required />
                    </div>
                    <div>
                        <label for="problemStatement">website_link:</label>
                        <input  rows="2" ref={website_link} required></input>
                    </div>
                    <div>
                        <label for="problemStatement">phone_number:</label>
                        <input  rows="2" ref={phone_number} required></input>
                    </div><div>
                        <label for="problemStatement">email_address:</label>
                        <input  rows="2" ref={email_address} required></input>
                    </div><div>
                        <label for="problemStatement">pincode:</label>
                        <input  rows="2" ref={pincode} required></input>
                    </div><div>
                        <label for="problemStatement">sector:</label>
                        <input  rows="2" ref={sector} required></input>
                    </div><div>
                        <label for="problemStatement">areas_of_interest:</label>
                        <input  rows="2" ref={areas_of_interest} required></input>
                    </div>
              
                        <button type="button" onClick={() => AddData()} >
                            Add Ecosystem
                        </button>
                    
                    
                </form>
                <br></br>
                <button type="button" onClick={() => GoBack()} >
                            Go Back
                        </button>
                    
            </div>
    <div>
    </div>
   </>
  )
}

export default EcosystemAdd
