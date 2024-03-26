import React, { useState, useEffect } from 'react'
import axios from 'axios';
const Calulateper = () => {

  useEffect(() => {
    GetData();
  }, [])

  const [data, setData] = useState([])
  const GetData = () => {
    axios({
      url: `http://localhost:3001/api/opportunity_incentive`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      console.log(res);
      setData(res.data);
    }).catch((err) => {
      alert(err);
    })
  }

  const DeteteData = (id) => {
    axios({
      url: `http://localhost:3001/api/opportunity_incentive/${id}`,
      method: 'delete',
    }).then((res) => {
      console.log("done");
      GetData();
    }).catch((err) => {
      alert(err);
    })

  }
  const UpdateDate=(id)=>{
    alert(id)
  }


  return (
    <>
      <div class="max-w-5xl mx-auto pt-[30px] ">

        <div class="flex flex-col">
          <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden ">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead class="bg-[#7f7ff5] dark:bg-[#8b8bf7]">
                    <tr>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                       Id
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                      opportunity id
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                      designation
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                      incentive percentage
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">

                    {
                      data.map((d, k) => (
                        <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.incentive_id}</td>
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.opportunity_id}</td>
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.designation}</td>
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">{d.incentivepercentage}</td>
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1 " onClick={() => DeteteData(d.incentive_id)}>Delete</button>
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1 " onClick={() => UpdateDate(d.incentive_id)}>Update</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calulateper