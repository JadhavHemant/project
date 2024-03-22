import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../image/logo.png';
import logox from '../image/logo1.png';
const Ideation = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setFormattedDate] = useState([]);

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
        setFormattedDate(formattedDate);


        return formattedDate;
      }
      return '';
    };

    getEndDate();
  }, [startDate, selectedOption]);


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
  const city = useRef();
  const s_state = useRef();
  const country = useRef();
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
      !power_point_document.current.value ||
      !discipline.current.value ||
      !city.current.value ||
      !s_state.current.value ||
      !country.current.value
    ) {
      alert("Please fill in all the required fields and select a file.");
      return;
    }
    var x = endDate
    var y = val
    const ide = {
      student_name: student_name.current.value, student_class: student_class.current.value,
      student_roll_number: student_roll_number.current.value, student_phone_no: student_phone_no.current.value, email_id: email_id.current.value,
      student_college: student_college.current.value, description: description.current.value, problem_statement: problem_statement.current.value, solution: solution.current.value,
      technology_inract: technology_inract.current.value, github_link: github_link.current.value, power_point_document: power_point_document.current.value,
      discipline: discipline.current.value, city: city.current.value, s_state: s_state.current.value, country: country.current.value, membervaliddate: x, interested_in_startup: y,
    };
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
    navigate("/user/ideationref")
  }
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
                  <p class="font-medium text-lg">Ideation Form</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div class="lg:col-span-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                    <div class="md:col-span-2">
                      <label for="email">Student Name</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={student_name} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Class</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={student_class} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Roll Number</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={student_roll_number} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Phone Number</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={student_phone_no} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Email</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={email_id} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Organization</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={student_college} />
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
                      <label for="email">Description</label>
                      <textarea type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={description} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Problem Statement</label>
                      <textarea type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={problem_statement} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Solution</label>
                      <textarea type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={solution} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Discipline / Branch</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={discipline} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="full_name">Technology</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={technology_inract} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Github Link</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={github_link} />
                    </div>
                    <div class="md:col-span-2">
                      <label for="email">Power Point Document</label>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <br />
                        <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={power_point_document} />
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
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => Addidea()}>Submit</button>
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
    </>
  )
}

export default Ideation
 