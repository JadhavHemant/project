import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
  
const Group = () => {
  useEffect(() => {
    GetData();
  }, []);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const GetData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/groups');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  const DeleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/groups/${id}`);
      console.log('Data deleted successfully');
      GetData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle error
    }
  };

  const CreateGroup = () => {
    navigate("/user/addgroup");
  }


  const MemberTable = () => {
    navigate("/user/membergroup");
  }

 
  return (
    <>
      <div>
        <div className='p-4 '>
          <button onClick={() => CreateGroup()} className='bg-[#4d70d1] rounded-[10px] p-1 border-[black] hover:rounded-[20px] hover:bg-[#7474bb] hover:text-white'>Create Group</button>
          <div className='p-4 inline'>
            <button onClick={() => MemberTable()} className='bg-[#4d70d1] rounded-[10px] p-1 border-[black] hover:rounded-[20px] hover:bg-[#7474bb] hover:text-white'>Group Members</button>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto pt-[30px] pb-[100px]">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-[#7f7ff5] dark:bg-[#8b8bf7]">
                    <tr>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Member Id
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Group Name
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Group Caption
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-start text-gray-700 uppercase dark:text-gray-400">
                        Group Logo
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {data.map((d, k) => (
                      <tr key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 dark:text-gray-400">{d.memberid}</td>
                        <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 dark:text-gray-400">{d.groupname}</td>
                        <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 dark:text-gray-400">{d.groupcaption}</td>
                        <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 dark:text-gray-400  items-center">
                          <img src={`http://localhost:3001/${d.grouplogo.replace(/\\/g, '/')}`} alt={d.groupname} className="rounded-[50%] h-[50px] w-[50px] hover:scale-125 transition-transform duration-500 cursor-pointer" />
                        </td>
                        <td className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 dark:text-gray-400">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-1" onClick={() => DeleteData(d.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;
