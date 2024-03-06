import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResarchView = () => {
  const [member, setMember] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
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
      if (Array.isArray(res.data)) {
        setMember(res.data);
      } else if (typeof res.data === 'object') {
        setMember([res.data]);
      } else {
        console.error('Invalid API response:', res.data);
      }
    }).catch((error) => {
      console.error('Error fetching member:', error);
    });
  };
  
  const navigate = useNavigate();

  const DeleteMember = (id) => {
    axios({
      url: `/research/${id}`,
      method: 'delete',
    }).then((res) => {
      alert("Delete Student successfully");
      navigate("/admin/resarchtable")
    }).catch((err) => {
      alert("Member not deleted ")
    })
  }
  const GoBack = () => {
    navigate("/admin/resarchtable")
  }
  return (
    <>
      <div className="py-16 bg-[#d6d6d5] h-full">
        <div className="container px-6 m-auto text-gray-500 md:px-12 xl:px-0">
          <div className="grid gap-6 mx-auto md:w-3/6 lg:w-full lg:grid-cols-1">
            <div className="bg-[white] rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
              <div className="mb-12 space-y-4">
                {member.map((d, k) => (
                  <div key={k}>
                    <h5 className="text-xl font-semibold text-purple-900">Id :{d.id}</h5>
                    <div className="grid grid-cols-1 gap-4 member-details sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <div className="flex flex-col">
                        <span className="font-bold">Name :</span>
                        <span>{d.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Designation :</span>
                        <span>{d.designation}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Organization :</span>
                        <span>{d.organization}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Phone Number :</span>
                        <span>{d.phone_no}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Email :</span>
                        <span>{d.email}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Discipline :</span>
                        <span>{d.discipline}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Research Topic :</span>
                        <span>{d.research_topic}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Research Category :</span>
                        <span>{d.research_category}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Sub Research Ctegory :</span>
                        <span>{d.sub_research_category}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Abstract :</span>
                        <span>{d.abstract}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Methodology :</span>
                        <span>{d.methodology}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Expected Outcome :</span>
                        <span>{d.expected_outcome}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">File :</span>
                        <span>{d.file_upload}</span>
                      </div>
                    </div>
                    <div className='flex items-center justify-center p-4'>
                      <button class="bg-[#f73636] text-[white] hover:bg-[orange] hover:text-[black] font-bold py-2 px-4 rounded-full" onClick={() => DeleteMember(d.id)}>
                        Delete
                      </button>
                      <div className='flex items-center justify-center p-3'>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => GoBack()}>
                          &#8592; Go Back
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default ResarchView
