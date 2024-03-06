import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
const AllocationUpdate = () => {
  useEffect(() => {
    GetOpp();
    getMembers();
  }, []);

  const [ids, setIds] = useState();
  useEffect(() => {
    const id = localStorage.getItem("member_id");
    setIds(id)
    if (id) {
      GetMember(id);
    }
  }, []);

  const GetMember = (id) => {
    axios({
      url: `/api/opportunity_allocation/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      opportunity_id.current.value = res.data.opportunity_id;
      opportunity_allocated_by.current.value = res.data.opportunity_allocated_by;
      opportunity_allocated_to.current.value = res.data.opportunity_allocated_to;
      opportunity_for.current.value = res.data.opportunity_for;
      opportunity_allocation_date.current.value = res.data.opportunity_allocation_date;
      opportunity_allocation_status.current.value = res.data.opportunity_allocation_status;
      opportunity_allocation_remark.current.value = res.data.opportunity_allocation_remark;
      opportunity_details_doc.current.value = res.data.opportunity_details_doc;
      memberrole.current.value = res.data.memberrole;
    }).catch((error) => {
      console.error('Error fetching member:', error);
    });
  };



  const [opp, setOpp] = useState([]);
  const [mem, setMem] = useState([]);

  const GetOpp = () => {
    axios({
      url: '/api/get/opportunities',
      method: 'GET',
      contentType: 'application/json',
    })
      .then((res) => {
        setOpp(res.data);
      })
      .catch((err) => {
        alert('Error');
      });
  };

  const getMembers = () => {
    axios({
      url: '/api/members',
      method: 'GET',
      contentType: 'application/json',
    })
      .then((res) => {
        setMem(res.data);
      })
      .catch((err) => {
        alert('Error');
      });
  };

  const opportunity_id = useRef();
  const opportunity_allocated_by = useRef();
  const opportunity_allocated_to = useRef();
  const opportunity_for = useRef();
  const opportunity_allocation_date = useRef();
  const opportunity_allocation_status = useRef();
  const opportunity_allocation_remark = useRef();
  const opportunity_details_doc = useRef();
  const memberrole = useRef();
  const AddData = () => {
    const payload = {
      opportunity_id: opportunity_id.current.value,
      opportunity_allocated_by: opportunity_allocated_by.current.value,
      opportunity_allocated_to: opportunity_allocated_to.current.value,
      opportunity_for: opportunity_for.current.value,
      opportunity_allocation_date: opportunity_allocation_date.current.value,
      opportunity_allocation_status: opportunity_allocation_status.current.value,
      opportunity_allocation_remark: opportunity_allocation_remark.current.value,
      opportunity_details_doc: opportunity_details_doc.current.value,
      memberrole: memberrole.current.value
    };
    var id = ids;
    axios({ 
      url: `/api/update/opportunityallocation/${id}`,
      method: 'PUT',
      data: payload,
      contentType: 'application/json',
    }).then((res) => {
      alert("Success")
    }).catch((err) => {
      alert("failure:")
    })
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="text-lg font-medium">Allocation Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label>Opportunity</label>
                      <select className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={opportunity_id}>
                        <option >Select Opportunity</option>
                        {opp.map((d) => (
                          <option value={d.id}>
                            {d.opportunity_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="opportunity_allocated_by">Allocated By</label>
                      <select className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={opportunity_allocated_by}>
                        <option >Select opportunity_allocated_by</option>
                        {mem.map((d) => (
                          <option value={d.member_id}>
                            {d.member_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="opportunity_allocated_by">Allocated To</label>
                      <select className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={opportunity_allocated_to}>
                        <option value="">Select opportunity_allocated_by</option>
                        {mem.map((d) => (
                          <option key={d.member_id} value={d.member_id}>
                            {d.member_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div class="md:col-span-5">
                      <label for="email">Opportunity For</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_for} />
                    </div>

                    <div class="md:col-span-5">
                      <label for="email">Allocation Date</label>
                      <input type="date" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_allocation_date} />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="opportunity_allocation_status">Status</label>
                      <select className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={opportunity_allocation_status}>
                        <option value="">Select Status</option>
                        <option value="Allocated">Allocated</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div class="md:col-span-5">
                      <label>Remark</label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_allocation_remark} />
                    </div>

                    <div class="md:col-span-5">
                      <label className="block text-sm font-medium leading-6 text-gray-900"> Document :</label>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <br />
                        <input type="text" class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[black] sm:text-sm sm:leading-6" ref={opportunity_details_doc} />
                        <div style={{ position: "relative" }}></div>
                        <a href="https://drive.google.com/drive/folders/18xEFIS66wqfRQWjcAzJnE19-l39gFZIT?usp=share_link" target="_blank" rel="noopener noreferrer" className='text-[blue] text-[12px]'>Upload file here</a>
                      </div>
                    </div>
                    <div class="md:col-span-5">
                      <label>MemberRole </label>
                      <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={memberrole} />
                    </div>
                    <div className="text-center md:col-span-5">
                      <div className="inline-flex items-end">
                        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => AddData()}>
                          Submit
                        </button>
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

export default AllocationUpdate
