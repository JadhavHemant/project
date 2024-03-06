import React, { useRef,useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';
const ResearchUpdate = () => {
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

  const [data,setData]=useState()
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
        setData(id)
      GetMember(id);
    }
  }, []);

  const GetMember = (id) => {
    axios({
      url: `/research/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      namex.current.value=res.data.name;
      designation.current.value=res.data.designation;
      organization.current.value=res.data.organization;
      phone_no.current.value=res.data.phone_no;
      email.current.value=res.data.email;
      discipline.current.value=res.data.discipline;
      research_topic.current.value=res.data.research_topic;
      research_category.current.value=res.data.research_category;
      sub_research_category.current.value=res.data.sub_research_category;
      abstract.current.value=res.data.abstract;
      methodology.current.value=res.data.methodology;
      expected_outcome.current.value=res.data.expected_outcome;
      file_upload.current.value=res.data.file_upload;
        }).catch((error) => {
      console.error('Error fetching member:', error);
    });
  };
  

  const AddRes = () => {
    var id=data;

    const X = {
      name: namex?.current?.value,
      designation: designation?.current?.value,
      organization: organization?.current?.value,
      phone_no: phone_no?.current?.value,
      email: email?.current?.value,
      discipline: discipline?.current?.value,
      research_topic: research_topic?.current?.value,
      research_category: research_category?.current?.value,
      sub_research_category: sub_research_category?.current?.value,
      methodology: methodology?.current?.value,
      abstract: abstract?.current?.value,
      expected_outcome: expected_outcome?.current?.value,
      file_upload: file_upload?.current?.value
    };

    console.log(X);
    axios({
      url: `/research/${id}`,
      method: 'put',
      data: X,
      contentType: 'application/json',
    }).then((res) => {
      alert('Success');
      navigate("/admin/resarchtable")
    }).catch((err) => {
      alert('Error');
    });
  };


  
  const GoBack = () => {
    navigate("/admin/resarchtable")
  }

  const Refernce = () => {
    navigate("/resarch/referenceresearch")
  }
    return (
        <>
            <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div class="container max-w-screen-lg mx-auto">
                    <div>
                        <img src={logo} alt='logo' class="w-[150px]" />
                        <p class="text-gray-500 mb-6">Research Form.</p>

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

export default ResearchUpdate
