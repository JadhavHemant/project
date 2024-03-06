import React, { useEffect,  useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EcosystemEdit = () => {
  const id = localStorage.getItem('user_id');

  const ecosystem_name = useRef();
  const address = useRef();
  const location = useRef();
  const state = useRef();
  const country = useRef();
  const geo_coordinates = useRef();
  const contact_name = useRef();
  const contact_designation = useRef();
  const website_link = useRef();
  const phone_number = useRef();
  const email_address = useRef();
  const pincode = useRef();
  const sector = useRef();
  const areas_of_interest = useRef();

  useEffect(() => {
    axios({
      url: `http://localhost:8100/ecosystems/${id}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const data = res.data;
        // Set the form fields with the retrieved data
        ecosystem_name.current.value = data.ecosystem_name;
        address.current.value = data.address;
        location.current.value = data.location;
        state.current.value = data.state;
        country.current.value = data.country;
        geo_coordinates.current.value = data.geo_coordinates;
        contact_name.current.value = data.contact_name;
        contact_designation.current.value = data.contact_designation;
        website_link.current.value = data.website_link;
        phone_number.current.value = data.phone_number;
        email_address.current.value = data.email_address;
        pincode.current.value = data.pincode;
        sector.current.value = data.sector;
        areas_of_interest.current.value = data.areas_of_interest;
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, [id]);

  const UpdateData = () => {
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
      alert('Please enter all fields');
      return;
    }

    const datax = {
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
      url: `http://localhost:8100/ecosystems/${id}`,
      method: 'PUT',
      data: datax,
      contentType: 'application/json',
    })
      .then((res) => {
        alert('Successfully updated');
      })
      .catch((err) => {
        alert('Error');
      });
  };
  const navigate = useNavigate();

  const GoBack = () => {
    navigate('/ecosystem');
  };

  return (
    <>
      <div>
        <div style={{ paddingTop: "20px" }}>
          <form>
            <div>
              <label >ecosystem_name:</label>
              <input type="text" ref={ecosystem_name} required />
            </div>

            <div>
              <label for="studentClass">address:</label>
              <input type="text" ref={address} required />
            </div>

            <div>
              <label>location:</label>
              <input type="text" ref={location} required />
            </div>
            <div>
              <label >state:</label>
              <textarea type="text" ref={state} required />
            </div>

            <div>
              <label >country:</label>
              <input type="text" ref={country} required />
            </div>


            <div>
              <label>geo_coordinates:</label>
              <input type="text" ref={geo_coordinates} required />
            </div>
            <div>
              <label >contact_name:</label>
              <input type='text'  ref={contact_name} required></input>
            </div>
            <div>
              <label >contact_designation:</label>
              <input  style={{ height: "40px" }} type="text" ref={contact_designation} required />
            </div>

            <div>
              <label >website_link:</label>
              <input type='text'  ref={website_link} required></input>
            </div>

            <div>
              <label >phone_number:</label>
              <input type='text'  ref={phone_number} required></input>
            </div>

            <div>
              <label>email_address:</label>
              <input type='email' ref={email_address} required></input>
            </div>
            
            <div>
              <label >pincode:</label>
              <input type='text'  ref={pincode} required></input>
            </div>
            
            <div>
              <label >sector:</label>
              <input type='text'  ref={sector} required></input>
            </div>
            
            <div>
              <label for="problemStatement">areas_of_interest:</label>
              <input type='text'  ref={areas_of_interest} required></input>
            </div>

            <button type="button" onClick={() => UpdateData()} >
              Add Ecosystem
            </button>
          </form>
        </div>
      </div>
      <br></br>
      <div>
        <button type="button" onClick={() => GoBack()} >Go Back</button>
      </div>
    </>
  )
}

export default EcosystemEdit
