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
      url: '/api/opportunity_types',
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
      url: '/api/opportunity',
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

  const getOpportunityNames = (id) => {
    axios({
      url: `/api/opportunitys/${id}`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      setNames(res.data);
    })
      .catch((err) => {
        console.error('Error fetching opportunity names', err);
      });
  };


  const DateFilter = () => {
    axios({
      url: `/api/opportunity/date-gap/${7}}`,
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


  const ProviderFilter = (y) => {
    axios({
      url: `/api/opportunity/provider/${y}`,
      method: 'GET',
      contentType: 'application/json',
    }).then((res) => {
      setNames(res.data);


    })
      .catch((err) => {
        console.error('Error fetching opportunity names', err);
      });
  }


  const ZoneFilter = (z) => {
    axios({
      url: `/api/opportunity/work-zone/${z}`,
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
      url: `/api/opportunity`,
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
  const [showOptions, setShowOptions] = useState(false);


  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const [showOptions1, setShowOptions1] = useState(false);


  const toggleOptions1 = () => {
    setShowOptions1(!showOptions1);
    getOpporu();
  };
  const [showOptions2, setShowOptions2] = useState(false);



  const toggleOptions2 = () => {
    setShowOptions2(!showOptions2);
  };

  const [showOptions3, setShowOptions3] = useState(false);


  const toggleOptions3 = () => {
    setShowOptions3(!showOptions3);
  };
  const [showOptions4, setShowOptions4] = useState(false);


  const toggleOptions4 = () => {
    setShowOptions4(!showOptions4);
  };

  const [showOptions5, setShowOptions5] = useState(false);
  const [selectedOption5, setSelectedOption5] = useState('');

  console.log(selectedOption5)

  const toggleOptions5 = () => {
    setShowOptions5(!showOptions5);
  };


  const handleCheckboxChange = (id, name, email, member_id) => {
    setCheckboxStates((prevCheckboxStates) => ({
      ...prevCheckboxStates,
      [id]: !prevCheckboxStates[id],
    }));
  
    setSelectedOpportunities((prevSelectedOpportunities) => {
      if (checkboxStates[id]) {
        return prevSelectedOpportunities.filter((opportunity) => opportunity.id !== id);
      } else {
        return [...prevSelectedOpportunities, { id, name, email,member_id }];
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
        updatedSelectedOpportunities.push({ id, name: opportunity.opportunity_name, email: opportunity.email,memberid:member_id });
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
  
    // Filter out the opportunities that are not selected
    const filteredOpportunities = selectedOpportunities.filter(opportunity => checkboxStates[opportunity.id]);
  
    if (filteredOpportunities.length === 0) {
      alert('Please select at least one opportunity');
      return;
    }
  
    const recipientEmails = filteredOpportunities.map(opportunity => opportunity.email);
  
    axios.post('/send-email', {
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
    const member_email=firstmail
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
        member_email:member_email,
      };
  console.log(datax);

      axios({
        url: `/api/interestedpeople`,
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
      url: `/api/members/${userId}`,
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
      <div className="pt-[2px] ">
        <div className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#ebe9e9] px-[10px] overflow-y-auto">
          <div className='p-[8px]'>
            <div className="dropdown pt-[7px]">
              <button className="dropdown-toggle uppercase text-[14px] font-bold" onClick={toggleOptions}>
                {'opportunity categories'}
              </button>
              {showOptions && (
                <ul className="dropdown-menu text-[14px] pt-[10px] pl-[15px]">
                  <li><label><input type="checkbox" onClick={() => getOppor()} />Show all</label></li>
                  {
                    type.map((d, k) => (
                      <li><label><input type="checkbox" onClick={() => getOpportunityNames(d.id)} /> {d.opportunity_type}</label></li>
                    ))
                  }
                </ul>
              )}
            </div>
            <div className="dropdown pt-[7px]">
              <button className="dropdown-toggle uppercase text-[14px] font-bold" onClick={toggleOptions1}>
                {'Provider'}
              </button>
              {showOptions1 && (
                <ul className="dropdown-menu text-[14px] pt-[10px] pl-[15px]">
                  <li><label><input type="checkbox" onClick={() => getOppor()} />Show all</label></li>
                  {
                    names.map((d, k) => (
                      <li><label><input type="checkbox" onClick={() => ProviderFilter(d.opportunity_provider)} />{d.opportunity_provider}</label></li>
                    ))
                  }
                </ul>
              )}
            </div>

            <div className="dropdown pt-[7px]">
              <button className="dropdown-toggle uppercase text-[14px] font-bold" onClick={toggleOptions2}>
                {'Zone'}
              </button>
              {showOptions2 && (
                <ul className="dropdown-menu text-[14px] pt-[10px] pl-[15px]">
                  <li><label><input type="checkbox" onClick={() => getOppor()} />Show all</label></li>
                  {
                    names.map((d, k) => (
                      <li><label><input type="checkbox" onClick={() => ZoneFilter(d.opportunity_expected_work_zone)} />{d.opportunity_expected_work_zone}</label></li>
                    ))
                  }
                </ul>
              )}
            </div>

            <div className="dropdown pt-[7px]">
              <button className="dropdown-toggle uppercase text-[14px] font-bold" onClick={toggleOptions3}>
                {'Keyword'}
              </button>
              {showOptions3 && (
                <ul className="dropdown-menu">
                  <li className='border rounded-sm'>
                    <input type="text" placeholder="Search..." value={searchKeyword} onChange={handleSearchChange} className='border rounded-sm' />
                  </li>
                </ul>
              )}
            </div>
            <div className="dropdown pt-[7px]">
              <button className="dropdown-toggle" onClick={toggleOptions4}>
                {'Select Date'}
              </button>
              {showOptions4 && (
                <ul className="dropdown-menu">
                  <li><label><input type="checkbox" onClick={() => DateFilter(7)} /> Last 7 days</label></li>
                  <li><label><input type="checkbox" onClick={() => DateFilter(14)} /> Last 14 days</label></li>
                  <li><label><input type="checkbox" onClick={() => DateFilter(21)} /> Last 21 days</label></li>
                  <li><label><input type="checkbox" onClick={() => DateFilter(30)} /> Last 30 days</label></li>
                </ul>
              )}
            </div>
            <div className="dropdown pt-[7px]">
              <button className="dropdown-toggle" onClick={toggleOptions5}>
                {'selelect Provider'}
              </button>
              {showOptions5 && (
                <ul className="dropdown-menu">
                  <li onClick={() => setSelectedOption5('Option 1')}>Option 1</li>
                  <li onClick={() => setSelectedOption5('Option 2')}>Option 2</li>
                  <li onClick={() => setSelectedOption5('Option 3')}>Option 3</li>
                </ul>
              )}
            </div>
          </div>
          {/*  */}
        </div>
        <div className="p-4 sm:ml-64 bg-[white]">
          <div className='pb-[20px] first-letter:'>
            <div className='p-4 bg-[#c4c4c4] rounded-[20px] '>
              <input type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
              <label className='pl-[9px]'>Select All</label>
              <button className='pl-[10px]' onClick={sendMail}>Send Mail</button>
              <Link to="/user/createoppo">
                <button className='pl-4'>Add</button>
              </Link>
              <Link to="/user/viewint">
                <button className='pl-4'>View Eol</button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 ">
            {names !== null &&
              names.map((d, k) => (
                <div className="border-solid border-2 border-[black] rounded-lg p-4 bg-[#ffffff]">
                  <input
                    type="checkbox"
                    checked={checkboxStates[d.id]}
                    onChange={() => handleCheckboxChange(d.id, d.opportunity_name, d.email,d.member_id)}
                  />
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Opportunity;

