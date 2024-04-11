import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Incentive = () => {
    const [type, setType] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getType();
    }, []);
    const [tid, setTypeid] = useState([]);
    const getData = (id) => {
        setTypeid(id)
        axios.get(`http://localhost:3001/api/opportunitys/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const opportunity_id = useRef();
    const designation = useRef();
    const incentivepercentage = useRef();

    const AddMembers = () => {
        const categories = tid;
        console.log(categories)
        const payload = {
            opportunity_id: opportunity_id.current.value,
            designation: designation.current.value,
            incentivepercentage: incentivepercentage.current.value,
            categoryid:categories,
        };
        console.log(payload);
        axios.post(`http://localhost:3001/api/opportunity_incentive`, payload)
            .then((res) => {
                alert("Success");
            })
            .catch((err) => {
                alert(err);
            });
    };

    const getType = () => {
        axios.get(`http://localhost:3001/api/opportunity_types`)
            .then((res) => {
                setType(res.data);
            })
            .catch((err) => {
                alert("Error");
            });
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600">
                            <p className="font-medium text-lg">Opportunity Incentive</p>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-2">
                                    <label>Category</label>
                                    <select className="h-[40px] border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => getData(e.target.value)}>
                                        <option>Select</option>
                                        {type.map((d, k) => (
                                            <option key={k} value={d.id}>{d.opportunity_type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label>Select Opportunity</label>
                                    <select className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_id}>
                                        <option>Select Membership Type</option>
                                        {data.map((d, k) => (
                                            <option key={k} value={d.id}>{d.opportunity_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="designation">Designation</label>
                                    <input type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={designation} />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="incentivepercentage">Incentive Percentage</label>
                                    <input type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" ref={incentivepercentage} />
                                </div>
                                <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={AddMembers}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Incentive;
