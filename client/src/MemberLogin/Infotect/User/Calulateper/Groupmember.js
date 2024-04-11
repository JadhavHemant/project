import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Greoupmember = () => {
  const navigate = useNavigate();

  useEffect(() => {
    GetData();

  }, [])

  const [data, setData] = useState([])
  const GetData = () => {
    axios({
      url: `http://localhost:3001/api/group_member`,
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
    alert(id)
    axios({
      url: `http://localhost:3001/api/group_member/${id}`,
      method: 'delete',
    }).then((res) => {
      console.log("done");
      GetData();
    }).catch((err) => {
      alert(err);
    })

  }
  const AddGroupMembers = () => {
    navigate("/user/memberaddgroup");
  }



  return (
    <>
      <div class="max-w-5xl mx-auto pt-[30px] ">
        <div className='p-2'>
          <button className='bg-[#acacf5] p-2 border border-black rounded-[20px] hover:border-[#0a0a0a] hover:bg-[#8a8af5] ' onClick={() => AddGroupMembers()}>Create members</button>
        </div>
        <div class="flex flex-col">
          <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden ">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead class="bg-[#7f7ff5] dark:bg-[#8b8bf7]">
                    <tr>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        member name
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Member email
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Phone Number
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        transactionvalue
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
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700  dark:text-gray-400">{d.membername}</td>
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700  dark:text-gray-400">{d.email}</td>
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700  dark:text-gray-400">{d.phone}</td>
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700  dark:text-gray-400">{d.transactionvalue}</td>
                          <td class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700  dark:text-gray-400">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1 " onClick={() => DeteteData(d.id)}>Delete</button>
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

export default Greoupmember