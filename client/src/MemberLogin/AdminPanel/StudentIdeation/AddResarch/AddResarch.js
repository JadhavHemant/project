import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../image/logo.png';
import logox from '../image/logo1.png';
import moment from 'moment'; // Import moment library

const AddResarch = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null); // Use state to store end date

  const [val, setVal] = useState("No");

  const handleStartupChange = (value) => {
    if (value === 'Yes') {
      setVal('Yes');
    } else {
      setVal('No');
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option) {
      setStartDate(new Date());
    } else {
      setStartDate(null);
    }
  };

  useEffect(() => {
    const getEndDate = () => {
      if (startDate && selectedOption) {
        const endDate = new Date(startDate);
        if (selectedOption === 'sevenDays') {
          endDate.setDate(endDate.getDate() + 7);
        } else if (selectedOption === 'thirtyDays') {
          endDate.setDate(endDate.getDate() + 30);
        } else if (selectedOption === 'ninetyDays') {
          endDate.setDate(endDate.getDate() + 90);
        }

        const formattedDate = endDate.toISOString().slice(0, 10);
        setEndDate(formattedDate); 
        return formattedDate;
      }
      return '';
    };

    getEndDate();
  }, [startDate, selectedOption]);

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
  const city = useRef();
  const s_state = useRef();
  const country = useRef();
  const navigate = useNavigate();

  const AddRes = () => {
    const validupto_date = moment(endDate).format('YYYY-MM-DD');

    const data = {
      name: namex.current.value,
      designation: designation.current.value,
      organization: organization.current.value,
      phone_no: phone_no.current.value,
      email: email.current.value,
      discipline: discipline.current.value,
      research_topic: research_topic.current.value,
      research_category: research_category.current.value,
      sub_research_category: sub_research_category.current.value,
      methodology: methodology.current.value,
      abstract: abstract.current.value,
      expected_outcome: expected_outcome.current.value,
      file_upload: file_upload.current.value,
      submit_date: moment().format('YYYY-MM-DD'), // Use moment to get current date
      city: city.current.value,
      state: s_state.current.value, // Corrected s_state
      country: country.current.value,
      validupto_date: validupto_date,
      interested_in_startup: val, 
    };

    console.log(data);

    axios.post('http://localhost:3001/add/research', data)
      .then(res => {
        alert('Success');
      })
      .catch(err => {
        alert('Error');
      });
  };

  const GoBack = () => {
    navigate("/admin/resarchtable");
  };

  const Refernce = () => {
    navigate("/admin/refrence");
  };

  return (
    <>
      <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
          <div>
          <div class="lg:col-span-2 p-2">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                <div class="flex items-center">
                  <img src={logo} alt='logo' class="w-[150px]" />
                </div>
                <div class="hidden md:flex justify-end md:col-span-3">
                  <img src={logox} alt='logo' class="w-[150px]" />
                </div>
              </div>
            </div>
            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div class="text-gray-600">
                  <p class="font-medium text-lg">Research Form</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div class="lg:col-span-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                    <div class="md:col-span-2">
                      <label for="email">Name :</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={namex} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Designation :</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={designation} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Organization :</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={organization} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Phone Number :</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={phone_no} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Email :</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={email} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Discipline :</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={discipline} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Research Topic :</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={research_topic} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Research Category :</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={research_category} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Sub Research Category :</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={sub_research_category} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Abstract</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={abstract} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">City</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={city} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">State</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={s_state} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Country</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={country} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Methodology</label>
                      <textarea type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={methodology} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Githun Link</label>
                      <textarea type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={expected_outcome} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">File Upload</label>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <br />
                        <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={file_upload} />
                        <div style={{ position: "relative" }}></div>
                        <a href="https://drive.google.com/drive/folders/18xEFIS66wqfRQWjcAzJnE19-l39gFZIT?usp=share_link" target="_blank" rel="noopener noreferrer">Upload file here</a>
                      </div>
                    </div>
                    <div class='md:col-span-2'>
                      <label>Interested in Membership</label>
                      <div>
                        <input type="checkbox" id="sevenDays" checked={selectedOption === 'sevenDays'} onChange={() => handleOptionChange('sevenDays')} /><label htmlFor="sevenDays">Free Trial for 7 Days</label>
                      </div>
                      <div>
                        <input type="checkbox" id="thirtyDays" checked={selectedOption === 'thirtyDays'} onChange={() => handleOptionChange('thirtyDays')} /><label htmlFor="thirtyDays">Monthly</label>
                      </div>
                      <div>
                        <input type="checkbox" id="ninetyDays" checked={selectedOption === 'ninetyDays'} onChange={() => handleOptionChange('ninetyDays')} /><label htmlFor="ninetyDays">quarterly</label>
                      </div>
                    </div>
                    <div class='md:col-span-2'>
                      <div>
                        <input type="checkbox" onChange={() => handleStartupChange('Yes')} /><label > Interested in  Startup</label>
                      </div>
                      <div >
                        <label> We will wish to build more awareness about your startup spin and connect you to investor, incubator and accelerators. By selecting this option, you give consent for us to send you information in form of news letter,  whatsapp and sms and also include your name and photo in our website if needed</label>
                      </div>
                    </div>
                    <br />
                    <div class="md:col-span-5 text-right ">
                      <div class="inline-flex items-end gap-x-3">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => AddRes()}>Submit</button>
                      </div>
                      <div class="inline-flex items-end pl-3">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => Refernce()}>Add Reference</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:col-span-5 text-center">
        <div class="inline-flex items-center justify-center p-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => GoBack()}>Go Back</button>
        </div>
      </div>
    </>
  )
}

export default AddResarch
