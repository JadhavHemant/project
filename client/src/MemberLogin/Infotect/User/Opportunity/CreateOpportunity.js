import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
const CreateOpportunity = () => {
  const opportunity_type_id = useRef();
  const opportunity_name = useRef();
  const opportunity_description = useRef();
  const opportunity_provider = useRef();
  const opportunity_start_date = useRef();
  const opportunity_end_date = useRef();
  const opportunity_problem_statement = useRef();
  const opportunity_expected_solution = useRef();
  const opportunity_expected_work_zone = useRef();
  const opportunity_expected_work_time = useRef();
  const opportunity_work_type = useRef();
  const opportunity_budget_available = useRef();
  const opportunity_estimate_budget = useRef();
  const budget_currency = useRef();
  const opportunity_resource_volume = useRef();
  const opportunity_status = useRef();
  const opportunity_code = useRef();
  const revised_volume = useRef();
  const revised_budget = useRef();
  const AddData = async () => {
    const id = mid;
  const email = memail;
    const playload = {
      opportunity_type_id: opportunity_type_id.current.value,
      opportunity_name: opportunity_name.current.value,
      opportunity_description: opportunity_description.current.value,
      opportunity_provider: opportunity_provider.current.value,
      opportunity_start_date: opportunity_start_date.current.value,
      opportunity_end_date: opportunity_end_date.current.value,
      opportunity_problem_statement: opportunity_problem_statement.current.value,
      opportunity_expected_solution: opportunity_expected_solution.current.value,
      opportunity_expected_work_zone: opportunity_expected_work_zone.current.value,
      opportunity_expected_work_time: opportunity_expected_work_time.current.value,
      opportunity_work_type: opportunity_work_type.current.value,
      opportunity_budget_available: opportunity_budget_available.current.value,
      opportunity_estimate_budget: opportunity_estimate_budget.current.value,
      budget_currency: budget_currency.current.value,
      opportunity_resource_volume: opportunity_resource_volume.current.value,
      opportunity_status: opportunity_status.current.value,
      opportunity_code: opportunity_code.current.value,
      revised_volume:revised_volume.current.value,
      revised_budget:revised_budget.current.value,
      email:email,
      member_id:id
      };

    console.log(playload);
    axios({
      url: `http://localhost:3001/api/opportunity`,
      method: 'POST',
      data: playload,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        alert("Done");
      })
      .catch((err) => {
        alert("Error: " + err);
      });

  }
  const [selectedType, setSelectedType] = useState('');
  const [newOpportunityType, setNewOpportunityType] = useState('');
  const [opportunityTypes, setOpportunityTypes] = useState([]);

  useEffect(() => {
    GetMemberData();
    fetchOpportunityTypes();
  }, []);

  const [mid, setMid] = useState('');
const [memail, setMEmail] = useState('');

  const GetMemberData=()=>{
    const userId = localStorage.getItem("user_id");
    axios({
      url: `/api/members/${userId}`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res)=>{
      setMid(res.data.id);
      setMEmail(res.data.member_email);
    }).catch((err)=>{
      alert("error: " )
    });
  }


  const fetchOpportunityTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/opportunity_types');
      setOpportunityTypes(response.data);
    } catch (error) {
      console.error('Error fetching opportunity types:', error);
    }
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setSelectedType(value);
    setNewOpportunityType('');
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewOpportunityType(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedType === 'custom') {
        await axios.post('http://localhost:3001/api/opportunity_types', { opportunity_type: newOpportunityType });
        setNewOpportunityType('');
        fetchOpportunityTypes();
      } else {
        alert("select");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div class="container max-w-screen-lg mx-auto">
          <div>

            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div class="text-gray-600">
                  <p class="font-medium text-lg">opportunity</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div class="lg:col-span-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                    <div class="md:col-span-2">
                      <label >Opportunity Type</label>
                      <select value={selectedType} onChange={handleSelectChange} ref={opportunity_type_id} class="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                        <option value="">Select an opportunity type</option>
                        {
                        opportunityTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.opportunity_type}</option>
                        ))
                        }
                        <option value="custom">Custom</option>
                      </select>
                      {
                      selectedType === 'custom' && (
                        <div>
                          <input type="text" value={newOpportunityType} onChange={handleInputChange} placeholder="Enter custom option" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                          <button type="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                      )}
                    </div>

                    <div class="md:col-span-2">
                      <label >Opportunity Name</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_name} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="address">Description</label>
                      <textarea type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_description} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="city">Opportunity Provider</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_provider} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="full_name">Opportunity Start Date</label>
                      <input type="date" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_start_date} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="email">Opportunity End Date</label>
                      <input type="date" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_end_date} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="address"> Problem Statement</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_problem_statement} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="city">Expected Solution</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_expected_solution} />
                    </div>
                    <div class="md:col-span-2">
                      <label >Expected Work Zone</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_expected_work_zone} />
                    </div>

                    <div class="md:col-span-2">
                      <label >Expected Work Time</label>
                      <input type="date" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_expected_work_time} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="opportunity_estimate_budget">Opportunity Estimate Budget</label>
                      <input
                        type="number"
                        step="0.01"  // Allows decimal values
                        class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        ref={opportunity_estimate_budget}
                      />
                    </div>

                    <div class="md:col-span-2">
                      <label for="email">Work Type</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_work_type} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="opportunity_budget_available">Opportunity Budget Available</label>
                      <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_budget_available}>
                        <option value="">Select Option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div class="md:col-span-2">
                      <label for="budget_currency">Budget Currency</label>
                      <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={budget_currency}>
                        <option value="">Select Currency</option>
                        <option value="USD">USD - United States Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound Sterling</option>
                      </select>
                    </div>

                    <div class="md:col-span-2">
                      <label >Revised volume</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={revised_volume} />
                    </div>
                    <div class="md:col-span-2">
                      <label >Revised budget</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={revised_budget} />
                    </div>
                   
                        
                    <div class="md:col-span-2">
                      <label >Resource volume</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_resource_volume} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="opportunity_status">Opportunity Status</label>
                      <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_status}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div class="md:col-span-2">
                      <label for="address">Opportunity code</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_code} />
                    </div>
                   {/*  */}
                    <div class="md:col-span-2">
                      <label for="address">file</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_code} />
                    </div>

                    <div class="md:col-span-2">
                      <label for="address">photo</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_code} />
                    </div>
                    {/*  */}
                    <div class="md:col-span-5 text-right">
                      <div class="inline-flex items-end">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => AddData()}>Submit</button>
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

export default CreateOpportunity;

 