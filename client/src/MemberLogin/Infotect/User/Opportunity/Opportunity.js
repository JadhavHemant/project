import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Opportunity = () => {
  const [type, setType] = useState([]);
  const [names, setNames] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const firstHighlightRef = useRef(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [member_id, setMemberId] = useState([]);
  console.log(member_id)

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    scrollFirstHighlightIntoView();
  };



  const highlightText = (text) => {
    if (!searchKeyword) return text;
    const regex = new RegExp(`(${searchKeyword})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchKeyword.toLowerCase() ?
        <span key={index} style={{ backgroundColor: 'yellow' }} ref={index === 0 ? firstHighlightRef : null}>{part}</span> :
        part
    );
  };


  const scrollFirstHighlightIntoView = () => {
    if (firstHighlightRef.current) {
      firstHighlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  useEffect(() => {
    Calling();
    getAllData();
  }, []);


  const Calling = () => {
    getOpporu();
    getOppor();
    scrollFirstHighlightIntoView();
    getOpportunityTypes();
    // DateFilter();
    GetMemberData();
  }
  const getOpportunityTypes = () => {
    axios({
      url: 'http://localhost:3001/api/opportunity_types',
      method: 'GET',
      contentType: 'application/json',
    })
      .then((res) => {
        setType(res.data);
        getOppor()
      })
      .catch((err) => {
        console.error('Error fetching opportunity types', err);
      });
  };

  const getOppor = () => {
    axios({
      url: 'http://localhost:3001/api/opportunity',
      method: 'GET',
      contentType: 'application/json',
    })
      .then((res) => {
        setNames(res.data);
        const initialCheckboxStates = {};
        res.data.forEach((opportunity) => {
          initialCheckboxStates[opportunity.id] = false;
        });
        setCheckboxStates(initialCheckboxStates);
        const emails = res.data.map((opportunity) => opportunity.email);
        const memberIds = res.data.map((opportunity) => opportunity.member_id);

        if (emails.length > 0) {
          console.log(emails[0]);
        }
        if (memberIds.length > 0) {
          setMemberId(memberIds[0]);
        }
      })
      .catch((err) => {
        console.error('Error fetching opportunity names', err);
      });
  };

  const [op, setOp] = useState([]);
  const getAllData = () => {
    axios({
      url: 'http://localhost:3001/api/opportunity',
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      setOp(res.data);
    })
  }

  const handleSelectChange = (e) => {
    const { value } = e.target;
    const id = value
    axios({
      url: `http://localhost:3001/api/opportunitys/${id}`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      setNames(res.data);
    })
      .catch((err) => {
        console.error('Error fetching opportunity names', err);
      });
  };

  const handleSelectDate = (gap) => {
    const { value } = gap.target;
    const g = value
    axios({
      url: `http://localhost:3001/api/opportunity/date-gap/${g}}`,
      method: 'GET',
      contentType: 'application/json',
    })
      .then((res) => {
        setNames(res.data);
      })
      .catch((err) => {
        console.error('Error fetching opportunity names', err);
      });
  };

  const handleSelectProvider = (y) => {
    const { value } = y.target;
    const i = value
    axios({
      url: `http://localhost:3001/api/opportunity/provider/${i}`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      setNames(res.data);


    })
      .catch((err) => {
        console.error('Error fetching opportunity names', err);
      });
  }


  const handleSelectZone = (z) => {
    const { value } = z.target;
    const d = value
    axios({
      url: `http://localhost:3001/api/opportunity/work-zone/${d}`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      console.log(res.data);
      setNames(res.data);


    })
      .catch((err) => {
        console.error('Error fetching opportunity names', err);
      });
  }

  const getOpporu = () => {
    axios({
      url: `http://localhost:3001/api/opportunity`,
      method: 'GET',
      contentType: 'application/json',
    })
      .then((res) => {
        setNames(res.data);


      })
      .catch((err) => {
        console.error('Error fetching opportunity names', err);
      });
  }

  const handleCheckboxChange = (id, name, email, member_id) => {
    setCheckboxStates((prevCheckboxStates) => ({
      ...prevCheckboxStates,
      [id]: !prevCheckboxStates[id],
    }));

    setSelectedOpportunities((prevSelectedOpportunities) => {
      if (checkboxStates[id]) {
        return prevSelectedOpportunities.filter((opportunity) => opportunity.id !== id);
      } else {
        return [...prevSelectedOpportunities, { id, name, email, member_id }];
      }
    });
  };

  const handleSelectAllChange = () => {
    const updatedCheckboxStates = {};
    const updatedSelectedOpportunities = [];

    Object.keys(checkboxStates).forEach((id) => {
      updatedCheckboxStates[id] = !selectAllChecked;
      const opportunity = names.find((opportunity) => opportunity.id === parseInt(id));
      if (opportunity) {
        updatedSelectedOpportunities.push({ id, name: opportunity.opportunity_name, email: opportunity.email, memberid: member_id });
      }
    });

    console.log(updatedSelectedOpportunities)
    setCheckboxStates(updatedCheckboxStates);
    setSelectAllChecked(!selectAllChecked);
    setSelectedOpportunities(updatedSelectedOpportunities);
  };


  const sendMail = () => {
    if (selectedOpportunities.length === 0) {
      alert('Please enter recipient emails and select opportunities');
      return;
    }

    const filteredOpportunities = selectedOpportunities.filter(opportunity => checkboxStates[opportunity.id]);

    if (filteredOpportunities.length === 0) {
      alert('Please select at least one opportunity');
      return;
    }

    const recipientEmails = filteredOpportunities.map(opportunity => opportunity.email);

    axios.post('http://localhost:3001/send-email', {
      selectedOpportunities: filteredOpportunities,
      recipientEmails
    })
      .then(response => {
        console.log('Email sent successfully:', response.data);
        alert('Email sent successfully');
        intrest();
        setSelectAllChecked(false);
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert('Error sending email');
      });
  };

  const [mid, setMid] = useState([]);
  const [mname, setMName] = useState([]);
  const [phonem, setMPhone] = useState([]);
  const [firstmail, setMEmail] = useState([]);
  const intrest = () => {
    const id = mid;
    const name = mname;
    const phone = phonem;
    const member_email = firstmail
    selectedOpportunities.forEach(opportunity => {
      const opportunity_id = opportunity.id;
      const opportunity_name = opportunity.name;
      const recipientEmails = opportunity.email;
      const member_id = opportunity.memberid;
      const datax = {
        interest_id: id,
        interested_name: name,
        phonenumber: phone,
        email: recipientEmails,
        opportunity_id: opportunity_id,
        opportunity_name: opportunity_name,
        memberid: member_id,
        member_email: member_email,
      };
      console.log(datax);

      axios({
        url: `http://localhost:3001/api/interestedpeople`,
        method: 'POST',
        data: datax,
        contentType: 'application/json'
      }).then((res) => {
        console.log('Success:', res.data);
      }).catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit interest');
      });
    });
  };

  const GetMemberData = () => {
    const userId = localStorage.getItem("user_id");
    axios({
      url: `http://localhost:3001/api/members/${userId}`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      setMid(res.data.id);
      setMName(res.data.member_name);
      setMEmail(res.data.member_email);
      setMPhone(res.data.member_phone);
    }).catch((err) => {
      alert("error: ")
    });
  }




  return (
    <>

      <div className="pt-[2px]">
        <div className=" p-4 fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#a1a1a1] px-[10px] overflow-y-auto rounded-[20px]">

          <>
            <div>
              <input type="text" placeholder="Search..." value={searchKeyword} onChange={handleSearchChange} className='border  rounded-[10px] p-1' style={{ width: '230px' }} />
            </div>
            <div className="dropdown pt-[4px] border-[black]">
              <label className='px-[5px]'>categories :</label>
              <select onChange={handleSelectChange} className="border-black pl-2 rounded-[10px] p-1" style={{ width: '230px' }}>
                <option>Select categories</option>
                {type.map((d, k) => (
                  <option key={d.id} value={d.id}>{d.opportunity_type}</option>
                ))}
              </select>
            </div>
            <div className="dropdown pt-[4px] border-[black]">
              <label className='px-[5px]'> Provider :</label>
              <br />
              <select onChange={handleSelectProvider} className="border-black pl-2 rounded-[10px] p-1" style={{ width: '230px' }}>
                <option>Select Provider</option>
                {op.map((d, k) => (
                  <option key={d.id} value={d.opportunity_provider}>{d.opportunity_provider}</option>
                ))}
              </select>
            </div>
            <div className="dropdown pt-[4px] border-[black]">
              <label className='px-[5px]'>Zone :</label>
              <br />
              <select onChange={handleSelectZone} className="border-black pl-2 rounded-[10px] p-1" style={{ width: '230px' }}>
                <option>Select Zone</option>
                {op.map((d, k) => (
                  <option key={d.id} value={d.opportunity_expected_work_zone}>{d.opportunity_expected_work_zone}</option>
                ))}
              </select>
            </div>
            <div className="dropdown pt-[4px] border-[black] ">
              <label className='px-[5px]'>Date :</label><br />
              <select onChange={handleSelectDate} className="border-black pl-2 rounded-[10px] p-1" style={{ width: '230px' }}>
                <option>Select Date</option>
                {op.map((d, k) => (
                  <option key={d.id} value={d.opportunity_expected_work_zone}>Working on it</option>
                ))}
              </select>
            </div>
          </>
        </div>

        <div className="p-4 sm:ml-64 bg-[white] ">
          <div className='pb-[20px] first-letter:'>
            <div className='p-4 bg-[#c4c4c4]   '>
              <input type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              <label className='pl-[9px] hover:underline'>Select All</label>
              <button className='pl-[10px] hover:underline' onClick={sendMail}>Send Mail</button>
              <Link to="/user/createoppo">
                <button className='pl-4 hover:underline'>Add</button>
              </Link>
              <Link to="/user/viewint">
                <button className='pl-4 hover:underline' >View Eol</button>
              </Link>
            </div>
          </div>
            <div className="grid grid-cols-1 gap-4">
              {names !== null &&
                names.map((d, k) => (
                  
                  <div className="border-solid border-2 border-[black] rounded-lg p-4 bg-[#ffffff]">
                    <input type="checkbox" checked={checkboxStates[d.id]} onChange={() => handleCheckboxChange(d.id, d.opportunity_name, d.email, d.member_id)} />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.revised_budget))}</p>
                      <p className="text-sm text-gray-600">{highlightText(String(d.create_date))}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <p className="text-xl font-bold text-gray-800 mb-2 ">{highlightText(d.opportunity_name)}</p>
                        <p className="text-sm text-gray-600 mb-2">{highlightText(d.opportunity_provider)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.opportunity_start_date))}</p>
                        <p className="text-sm text-gray-600">{highlightText(String(d.opportunity_end_date))}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.opportunity_problem_statement))}</p>
                        <p className="text-sm text-gray-600">{highlightText(String(d.opportunity_expected_solution))}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.opportunity_expected_work_zone))}</p>
                        <p className="text-sm text-gray-600">{highlightText(String(d.opportunity_expected_work_time))}</p>
                    
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.opportunity_work_type))}</p>
                        <p className="text-sm text-gray-600">{highlightText(String(d.opportunity_budget_available))}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.opportunity_estimate_budget))}</p>
                        <p className="text-sm text-gray-600">{highlightText(String(d.budget_currency))}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.opportunity_resource_volume))}</p>
                        <p className="text-sm text-gray-600">{highlightText(String(d.opportunity_status))}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.opportunity_code))}</p>
                        <p className="text-sm text-gray-600">{highlightText(String(d.revised_volume))}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.revised_budget))}</p>
                        <p className="text-sm text-gray-600">{highlightText(String(d.create_date))}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700">{highlightText(String(d.opportunity_type_id))}</p>
                        <p className="text-sm text-gray-600">{highlightText(String(d.flag))}</p>
                      </div>
                    </div>
                    <div className="flex justify-end ">
                        <img src={`http://localhost:3001/uploads/${d.photos}`} alt='hello' className="h-[120px]" />
                      </div>
                  </div>
                ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default Opportunity;

