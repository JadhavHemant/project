import React, { useRef } from 'react'
import axios from 'axios';


const MemberShipAdd = () => {
    const member_id = useRef()
    const membership_type = useRef()
    const membership_category = useRef()
    const membership_duration = useRef()
    const membership_frequency_renewal = useRef()
    const membership_status = useRef()

    const Addmebers = () => {
        
        var playloas = {
            member_id: member_id.current.value,
            membership_type: membership_type.current.value,
            membership_category: membership_category.current.value,
            membership_duration: membership_duration.current.value,
            membership_frequency_renewal:membership_frequency_renewal.current.value,
            membership_status: membership_status.current.value,
        }
        console.log(playloas)
        axios({
            url: '/api/add/membershiprecord',
            method: 'POST',
            data: playloas,
            contentType: 'application/json',

        }).then((res)=>{
            alert("done")
        }).catch((err)=>{
            alert("error: " + err)
        })
    }

    return (
        <div>
            <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div class="container max-w-screen-lg mx-auto">
                    <div>
                        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div class="text-gray-600">
                                    <p class="font-medium text-lg">Membership</p>
                                    <p></p>
                                </div>
                                <div class="lg:col-span-2">
                                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div class="md:col-span-5">
                                            <label for="full_name">Member Id</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={member_id} placeholder='Enetr member Id' />
                                        </div>
                                        <div class="md:col-span-5">
                                            <label for="membership_type">Membership Type</label>
                                            <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={membership_type}>
                                                <option>Select Membership Type</option>
                                                <option value="Premium">Premium</option>
                                                <option value="Standard">Standard</option>
                                                <option value="Basic">Basic</option>
                                            </select>
                                        </div>
                                        <div class="md:col-span-5">
                                            <label for="membership_category">Membership Category</label>
                                            <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={membership_category}>
                                                <option>Select Membership Category</option>
                                                <option value="Gold">Gold</option>
                                                <option value="Silver">Silver</option>
                                                <option value="Bronze">Bronze</option>
                                            </select>
                                        </div>
                                        <div class="md:col-span-3">
                                            <label for="membership_duration">Membership Duration</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  ref={membership_duration} />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label for="membership_frequency_renewal">Membership Frequency Renewal</label>
                                            <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" ref={membership_frequency_renewal} />
                                        </div>
                                        <div class="md:col-span-2">
                                            <label for="membership_status">Membership Status</label>
                                            <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={membership_status}>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div class="md:col-span-5 text-right">
                                            <div class="inline-flex items-end">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => Addmebers()}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberShipAdd

