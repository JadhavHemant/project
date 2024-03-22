import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';

const EditRefrence = () => {
  const navigate = useNavigate();
  const name = useRef();
  const srnumber = useRef();
  const referencename = useRef();
  const college = useRef();
  const discipline = useRef();
  const cla_ss = useRef();
  const rollnumber = useRef();
  const referenceemail = useRef();
  const referencephone = useRef();
  const [ids, Setid] = useState('');
  useEffect(() => {
    const id = localStorage.getItem('user_id');
    if (id) {
      Setid(id);
      GetMember(id);
    }
  }, []);

  const GetMember = (id) => {
    axios.get(`http://localhost:3001/studentsrefrence/${id}`)
      .then((res) => {
        const data = res.data;
        name.current.value = data.name;
        srnumber.current.value = data.srnumber;
        referencename.current.value = data.referencename;
        college.current.value = data.college;
        discipline.current.value = data.discipline;
        cla_ss.current.value = data.cla_ss;
        rollnumber.current.value = data.rollnumber;
        referenceemail.current.value = data.referenceemail;
        referencephone.current.value = data.referencephone;
      })
      .catch((err) => {
        alert('Error fetching data');
      });
  };

  const PostData = () => {
    const formData = {
      id: ids,
      name: name.current.value.trim(),
      srnumber: srnumber.current.value.trim(),
      referencename: referencename.current.value.trim(),
      college: college.current.value.trim(),
      discipline: discipline.current.value.trim(),
      cla_ss: cla_ss.current.value.trim(),
      rollnumber: rollnumber.current.value.trim(),
      referenceemail: referenceemail.current.value.trim(),
      referencephone: referencephone.current.value.trim(),
    };

    if (!formData.name || !formData.srnumber || !formData.referencename || !formData.college || !formData.discipline ||
      !formData.cla_ss || !formData.rollnumber || !formData.referenceemail || !formData.referencephone) {
      alert("Please fill in all the required fields.");
      return;
    }

    axios.put(`http://localhost:3001/studentsrefrence/${ids}`, formData)
      .then(() => {
        alert("Reference updated successfully");
        navigate('/admin/refrencetable');
      })
      .catch(() => {
        alert("Reference update failed");
      });
  };

  const GoBack = () => {
    navigate('/admin/refrencetable');
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <img src={logo} alt='logo' className="w-[150px]" />
            <p className="mb-6 text-gray-500">Ideation Form.</p>

            <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="text-lg font-medium">Ideation Form</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-4">
                    <div className="md:col-span-2">
                      <label htmlFor="email">Name :</label>
                      <input type="text" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={name} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="full_name">Sr.Number :</label>
                      <input type="text" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={srnumber} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">Reference Name</label>
                      <input type="text" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={referencename} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="full_name">College</label>
                      <input type="text" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={college} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">Discipline</label>
                      <input type="text" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={discipline} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="full_name">Class</label>
                      <input type="text" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={cla_ss} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">Roll Number</label>
                      <input type="text" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={rollnumber} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">Reference Email</label>
                      <input type="text" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={referenceemail} />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">Reference Phone</label>
                      <input type="text" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" ref={referencephone} />
                    </div>

                    <br />
                    <div className="text-right md:col-span-5">
                      <div className="inline-flex items-end gap-x-3">
                        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={PostData}>Update</button>
                      </div>
                      <div className="inline-flex items-end pl-3">
                        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={GoBack}>Go Back</button>
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
  );
};

export default EditRefrence;
