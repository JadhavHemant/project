import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
const InterviewAdd = () => {
    useEffect(() => {
        GetOpp();
        GetUser();
    }, []);

    const [opp, setOpp] = useState([]);
    const [user, setUser] = useState([]);

    const GetUser = () => {
        axios({
            url: "http://localhost:3001/api/members",
            method: "GET",
            contentType: "application/json",
        }).then((res) => {
            setUser(res.data);
        }).catch((err) => {
            alert(err.message)
        })
    }



    const GetOpp = () => {
        axios({
            url: 'http://localhost:3001/api/get/opportunities',
            method: 'GET',
            contentType: 'application/json',
        })
            .then((res) => {
                setOpp(res.data);
            })
            .catch((err) => {
                console.error('Error fetching opportunities', err);
                alert('Error fetching opportunities');
            });
    };

    const interviewed_by = useRef();
    const interview_assessment = useRef();
    const interview_score = useRef();
    const interview_video_link = useRef();
    const opportunity_id = useRef();
    const AddInterviewInfo = () => {
        var playload = {
            interviewed_by: interviewed_by.current.value,
            interview_assessment: interview_assessment.current.value,
            interview_score: interview_score.current.value,
            interview_video_link: interview_video_link.current.value,
            opportunity_id: opportunity_id.current.value

        }
        console.log(playload)

        axios({
            url: 'http://localhost:3001/api/post/memberinterviewrecords',
            method: 'POST',
            data: playload,
            contentType: 'application/json'
        }).then((res) => {
            alert("done")
        }).catch((err) => {
            alert("error: " + err)
        })


        console.log(playload)

    }

    return (
        <>
            <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div class="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 class="font-semibold text-xl text-gray-600">InterView Form</h2>
                        <p class="text-gray-500 mb-6">InterView.</p>

                        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div class="text-gray-600">
                                    <p class="font-medium text-lg">InterView Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div class="lg:col-span-2">
                                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div class="md:col-span-5">
                                            <label>Interviewed By </label>
                                            <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={interviewed_by}>
                                                <option value="option1">select</option>
                                                {
                                                    user.map((d,k)=>(
                                                        <option value={d.member_id}>{d.member_name}</option>  
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="email">Interview Assessment</label>
                                            <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={interview_assessment} />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="full_name">Interview Score</label>
                                            <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={interview_score} />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="email">Interview Video Link</label>
                                            <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={interview_video_link} />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="opportunity_id">Opportunity </label>
                                            <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_id}>
                                                <option value="">Select Opportunity </option>
                                                {
                                                    opp.map((d, k) => (
                                                        <option key={k} value={d.opportunity_id}>{d.opportunity_name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div class="md:col-span-5 text-right">
                                            <div class="inline-flex items-end">
                                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => AddInterviewInfo()}>Submit</button>
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

export default InterviewAdd
 
