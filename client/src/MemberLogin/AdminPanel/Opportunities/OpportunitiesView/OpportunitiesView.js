import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const OpportunitiesView = () => {
  const [member, setMember] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("member_id");
    if (id) {
      GetMember(id);
    }
  }, []);

  const GetMember = (id) => {
    axios({
      url: `http://localhost:3001/api/opportunity/${id}`,
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
      url: `http://localhost:3001/api/delete/opportunities/${id}`,
      method: 'delete',
    }).then((res) => {
      alert("Delete member successfully");
      navigate("/admin/oppo")
    }).catch((err) => {
      alert("Member not deleted ")
    })
  }
  const GoBack=()=>{
    navigate("/admin/oppo")
  }
  return (
    <>
    <div className="py-16 bg-[#F7F7F7]  h-screen">
      <div className="container px-6 m-auto text-gray-500 md:px-12 xl:px-0">
        <div className="grid gap-6 mx-auto md:w-3/6 lg:w-full lg:grid-cols-1">
          <div className="bg-[white] rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
            <div className="mb-12 space-y-4">
              {member.map((d, k) => (
                <div key={k}>
                  <h5 className="text-xl font-semibold">Opportunity Id :{d.id}</h5>
                  <div className="grid grid-cols-1 gap-4 member-details sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="flex flex-col">
                      <span className="font-bold">Opportunity Id :</span>
                      <span>{d.id}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Opportunity Type :</span>
                      <span>{d.opportunity_type}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Opportunity Name :</span>
                      <span>{d.opportunity_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Opportunity Description :</span>
                      <span>{d.opportunity_description}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Opportunity Provider :</span>
                      <span>{d.opportunity_provider}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Start Date :</span>
                      <span>{d.opportunity_start_date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">End Date :</span>
                      <span>{d.opportunity_end_date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Problem Statement :</span>
                      <span>{d.opportunity_problem_statement}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Solution :</span>
                      <span>{d.opportunity_expected_solution}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Expected Work Zone :</span>
                      <span>{d.opportunity_expected_work_zone}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Expected Work Time :</span>
                      <span>{d.opportunity_expected_work_time}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Work Type :</span>
                      <span>{d.opportunity_work_type}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Available Budget :</span>
                      <span>{d.opportunity_budget_available}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Estimate Budget :</span>
                      <span>{d.opportunity_estimate_budget}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Budget Currency :</span>
                      <span>{d.budget_currency}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Resource Volume :</span>
                      <span>{d.opportunity_resource_volume}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Status :</span>
                      <span>{d.opportunity_status}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">Opportunity Code :</span>
                      <span>{d.opportunity_code}</span>
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

export default OpportunitiesView
 
