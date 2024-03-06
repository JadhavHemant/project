import React, { useRef,useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OpportunitiesUpdate = () => {
const [idx,setId]=useState([])
  useEffect(() => {
    const id = localStorage.getItem("member_id");
    setId(id)
    if (id) {
      GetMember(id);
    }
  }, []);

  const GetMember = (id) => {
    axios({
      url: `/api/opportunity/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      opportunity_type.current.value = res.data.opportunity_type;
      opportunity_name.current.value = res.data.opportunity_name;
      opportunity_description.current.value = res.data.opportunity_description;
      opportunity_provider.current.value = res.data.opportunity_provider;
      opportunity_start_date.current.value = res.data.opportunity_start_date;
      opportunity_end_date.current.value = res.data.opportunity_end_date;
      opportunity_problem_statement.current.value = res.data.opportunity_problem_statement;
      opportunity_expected_solution.current.value = res.data.opportunity_expected_solution;
      opportunity_expected_work_zone.current.value = res.data.opportunity_expected_work_zone;
      opportunity_expected_work_time.current.value = res.data.opportunity_expected_work_time;
      opportunity_work_type.current.value = res.data.opportunity_work_type;
      opportunity_budget_available.current.value = res.data.opportunity_budget_available;
      opportunity_estimate_budget.current.value = res.data.opportunity_estimate_budget;
      budget_currency.current.value = res.data.budget_currency;
      opportunity_resource_volume.current.value = res.data.opportunity_resource_volume;
      opportunity_status.current.value = res.data.opportunity_status;
      opportunity_code.current.value = res.data.opportunity_code;
    }).catch((error) => {
      console.error('Error fetching member:', error);
    });
  };
  const navigate = useNavigate();
  
  const GoBack=()=>{
    navigate("/admin/oppo")
  }

  const opportunity_type = useRef();
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

  const AddData = async () => {
    const playload = {
      opportunity_type: opportunity_type.current.value,
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
    };

    console.log(playload);
    var id=idx;
    axios({
      url: `/api/update/opportunity/${id}`,
      method: 'put',
      data: playload,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        alert("Update successfully");
        GoBack();
      })
      .catch((err) => {
        alert("Error: " + err);
      });
    
  }
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
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_type} />
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

export default OpportunitiesUpdate
