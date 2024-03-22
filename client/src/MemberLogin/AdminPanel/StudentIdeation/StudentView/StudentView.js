import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentView = () => {
    const [member, setMember] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
      GetMember(id);
    }
  }, []);

  const GetMember = (id) => {
    axios({
      url: `http://localhost:3001/ideation/${id}`,
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
      url: `http://localhost:3001/delete/ideation/${id}`,
      method: 'delete',
    }).then((res) => {
      alert("Delete Student successfully");
      navigate("/admin/studenttable")
    }).catch((err) => {
      alert("Member not deleted ")
    })
  }
  const GoBack=()=>{
    navigate("/admin/studenttable")
  }

  const Opportunity = (id) => {
        var xdata = id
        var data = {
            "id_student": xdata
        };
        console.log('Data to be sent:', data);

        axios({
            url: `http://localhost:3001/add/members/studentids`,
            method: "post",
            data: data,
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            console.log(res.data);
            alert("success");
        }).catch((err) => {
            alert("check again");
        });
    };

  return (
    <>
    <div className="py-16 bg-[#d6d6d5] h-full">
      <div className="container px-6 m-auto text-gray-500 md:px-12 xl:px-0">
        <div className="grid gap-6 mx-auto md:w-3/6 lg:w-full lg:grid-cols-1">
          <div className="bg-[white] rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
            <div className="mb-12 space-y-4">
              {member.map((d, k) => (
                <div key={k}>
                  <h5 className="text-xl font-semibold text-purple-900">{d.id}</h5>
                  <div className="grid grid-cols-1 gap-4 member-details sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="flex flex-col">
                      <span className="font-bold">Student Name:</span>
                      <span>{d.student_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Class:</span>
                      <span>{d.student_class}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Roll Number:</span>
                      <span>{d.student_roll_number}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Phone Number:</span>
                      <span>{d.student_phone_no}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Email:</span>
                      <span>{d.email_id}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">College:</span>
                      <span>{d.student_college}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Problem Statement:</span>
                      <span>{d.problem_statement}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Solution:</span>
                      <span>{d.solution}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Organization:</span>
                      <span>{d.student_college}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-bold">City :</span>
                      <span>{d.city}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Discipline :</span>
                      <span>{d.discipline}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">State :</span>
                      <span>{d.s_state}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Country :</span>
                      <span>{d.country}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Inserted In Membership :</span>
                      <span>{d.interested_in_membership}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Inserted In Startup :</span>
                      <span>{d.interested_in_startup}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Membership Valid Upto :</span>
                      <span>{d.membervaliddate}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-bold">Technology:</span>
                      <span>{d.technology_inract}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Github :</span>
                      <a href={d.github_link}>{d.github_link}</a>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Ppt :</span>
                      <a href={d.power_point_document}>{d.power_point_document}</a>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Submited Date :</span>
                      <span>{d.da_te_submited}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Discipline :</span>
                      <span>{d.discipline}</span>
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
                  <div className='flex items-center justify-center p-3'>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => Opportunity(d.id)}>
                    &#8592; Add Opportunity
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

export default StudentView
