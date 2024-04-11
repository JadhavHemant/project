import React, { useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';
const IdeationRef = () => {
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

    const PostData = () => {
        const formData = {
            name: name.current.value.trim(),
            srnumber: srnumber.current.value.trim(),
            referencename: referencename.current.value.trim(),
            college: college.current.value.trim(),
            discipline: discipline.current.value.trim(),
            cla_ss: cla_ss.current.value.trim(),
            rollnumber: rollnumber.current.value.trim(),
            referenceemail: referenceemail.current.value.trim(),
            referencephone: referencephone.current.value.trim()
        };

        // Check if any required field is blank
        if (!formData.name || !formData.srnumber || !formData.referencename || !formData.college || !formData.discipline ||
            !formData.cla_ss || !formData.rollnumber || !formData.referenceemail || !formData.referencephone) {
            alert("Please fill in all the required fields.");
            return;
        }

        // Proceed with form submission if all fields are filled
        axios.post('http://localhost:3001/studentsrefrence', formData)
            .then(() => {
                alert("Reference added successfully");
                clearInputFields();
            })
            .catch(() => {
                alert("Reference addition failed");
            });
    };

    const clearInputFields = () => {
        name.current.value = '';
        srnumber.current.value = '';
        referencename.current.value = '';
        college.current.value = '';
        discipline.current.value = '';
        cla_ss.current.value = '';
        rollnumber.current.value = '';
        referenceemail.current.value = '';
        referencephone.current.value = '';
    };

    const GoBack = () => {
        navigate("/user/ideation")
    }


    return (
        <>
            <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div class="container max-w-screen-lg mx-auto">
                    <div>
                        <img src={logo} alt='logo' class="w-[150px]" />
                        <p class="text-gray-500 mb-6">Reference Form.</p>

                        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div class="text-gray-600">
                                    <p class="font-medium text-lg">Reference Form</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div class="lg:col-span-2">
                                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                                        <div class="md:col-span-2">
                                            <label for="email">Name :</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={name} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="full_name">Sr.Number :</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={srnumber} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="email">Reference Name</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={referencename} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="full_name">College / Organization</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={college} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="email">Discipline</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={discipline} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="full_name">Class / Designation</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={cla_ss} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="email">Roll Number</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={rollnumber} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="email">Reference Email</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={referenceemail} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="email">Reference Phone</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={referencephone} />
                                        </div>

                                        <br />
                                        <div class="md:col-span-5 text-right ">
                                            <div class="inline-flex items-end gap-x-3">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => PostData()}>Add Reference</button>
                                            </div>
                                            <div class="inline-flex items-end pl-3">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => GoBack()}>Go Back</button>
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

export default IdeationRef
