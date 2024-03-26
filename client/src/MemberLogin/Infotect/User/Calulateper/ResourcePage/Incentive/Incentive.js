import React, { useEffect,useRef,useState } from 'react'
import axios from 'axios';
const Incentive = () => {


    useEffect(() => {
        getData();
    })

    const [data, setData] = useState([]);
    const getData = () => {
        axios({
            url: `http://localhost:3001/api/opportunity`,
            method: 'GET',
        }).then((res) => {
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }
    const opportunity_id=useRef();
    const designation=useRef();
    const incentivepercentage=useRef();
const Addmebers=()=>{
const playload={opportunity_id:opportunity_id.current.value,designation:designation.current.value,incentivepercentage:incentivepercentage.current.value}
console.log(playload);
axios({
    url:`http://localhost:3001/api/opportunity_incentive`,
    method: 'POST',
    data: playload,
    contentType: 'application/json',
}).then((res)=>{
    alert("Success");
}).catch((err)=>{
    alert(err);
})

}


    return (
        <>
            <div>
                <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                    <div class="container max-w-screen-lg mx-auto">
                        <div>
                            <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div class="text-gray-600">
                                        <p class="font-medium text-lg">opportunity incentive</p>
                                        <p></p>
                                    </div>
                                    <div class="lg:col-span-2">
                                        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                           
                                            <div class="md:col-span-5">
                                                <label>Select Opportunity</label>
                                                <select class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={opportunity_id} >
                                                    <option>Select Membership Type</option>
                                                    {
                                                        data.map((d, k) => (
                                                            <option value={d.id}>{d.opportunity_name}</option>

                                                        ))
                                                    }
                                                </select>
                                            </div>

                                            <div class="md:col-span-3">
                                                <label for="membership_duration">designation</label>
                                                <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" ref={designation} />
                                            </div>

                                            <div class="md:col-span-2">
                                                <label for="membership_frequency_renewal">incentive percentage</label>
                                                <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" ref={incentivepercentage} />
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
        </>
    )
}

export default Incentive