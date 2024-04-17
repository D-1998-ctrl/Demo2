import React, { useState, useEffect } from "react";
import accounts from "./AccountDumy";
import "./jobdata.css";
import { toast, ToastContainer } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { RiErrorWarningLine } from "react-icons/ri";
import { RiAddCircleLine } from 'react-icons/ri';
import ReactSelect from 'react-select';
import { FiPlusCircle } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextEditor from "./Texteditor";
import makeAnimated from "react-select/animated";
import Priority from '../component/priority';

const JobsData = () => {
  const navigate = useNavigate();
  const [job, setJobs] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showLink, setLink] = useState(false);
  const [SaveExit, setSaveExit] = useState(false);
  const [Save, setSave] = useState(false);


  const handleSaveExitClick = () => {

    updatejobdata();
  
  }

  const handleSaveClick = () => {
    setSave(!Save)
  }


  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/workflow/job/joblist/list/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setJobs(result.jobList);
      })
      .catch((error) => console.error(error));
  }, []);

  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, accounts.length);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/common/tag?=" + tagValues);
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let tagValues = [];



  const handleEdit = (_id) => {
    // Implement logic for editing here
    // console.log("Edit action triggered for template id: ", templateId);
    navigate('AddJobs/' + _id)
  };

  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };




  //delete template
  const handleDelete = (_id) => {



    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/workflow/job/" + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        toast.success('Item deleted successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete item');
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };


  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Handler function to toggle selection of a contact
  const handleRecordCheckboxChange = (id) => {
    setSelectedJobs((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(id)) {
        // If the ID is already in the selectedContacts array, remove it
        return prevSelectedContacts.filter((jobId) => jobId !== id);
      } else {
        // Otherwise, add the ID to the selectedContacts array
        return [...prevSelectedContacts, id];
      }
    });
  };

  const handleCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // If selectAll is false, set all accounts as selected
      const allJobsIds = job.map(job => job.id);

      setSelectedJobs(allJobsIds);
    } else {
      // If selectAll is true, deselect all accounts
      setSelectedJobs([]);
    }
  };



  const filteredJobs = job ? job.filter((job) => {
    const filterLower = filter.toLowerCase();
    const nameMatch = job?.Name?.toLowerCase().includes(filterLower);
    const assigneeMatch = job?.JobAssignee && job.JobAssignee.some(assignee =>
      typeof assignee === 'string' && assignee.toLowerCase().includes(filterLower)
  );
    const pipelineMatch = job.Pipeline && typeof job.Pipeline === 'string' && job.Pipeline.toLowerCase().includes(filterLower);

    // Check if Stage matches the filter (handling null value and non-string value)
    let stageMatch = false;
    if (typeof job.Stage === 'string') {
      stageMatch = job.Stage.toLowerCase().includes(filterLower);
    } else if (Array.isArray(job.Stage) && job.Stage.length > 0 && typeof job.Stage[0] === 'string') {
      // Handle case where Stage is an array of strings (e.g., ["Sudheer's Clients"])
      stageMatch = job.Stage[0].toLowerCase().includes(filterLower);
    }

    const accounts = job.Account || []; // Ensure accounts is an array, defaults to empty array if Account is undefined

    // Check if any of the account values match the filter
    const accountMatch = accounts.some(account =>
      typeof account === 'string' && account.toLowerCase().includes(filterLower)
    );

    // Check if Start Date matches the filter
    const startDateMatch = job.StartDate && job.StartDate.toLowerCase().includes(filterLower);

    // Check if Due Date matches the filter
    const dueDateMatch = job.DueDate && job.DueDate.toLowerCase().includes(filterLower);

    // Treat null Stage as non-matching
    const isStageValid = stageMatch !== null ? stageMatch : false;

    return (
      nameMatch ||
      assigneeMatch ||
      pipelineMatch ||
      isStageValid ||
      accountMatch || startDateMatch || dueDateMatch
    );
  }) : [];


  //************JOB EDIT */

  //****Users */
  const animatedComponents = makeAnimated();
  const [userdata, setUserData] = useState([]);
  const [selecteduser, setSelectedUser] = useState();
  const [combinedValues, setCombinedValues] = useState([]);

  const handleuserChange = (selectedOptions) => {
    setSelectedUser(selectedOptions);
    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);
    setCombinedValues(selectedValues);
  }

  useEffect(() => {
    fetchuserData();
  }, []);

  const fetchuserData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/common/user");
      const data = await response.json();
      console.log(data)
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(userdata);
  const useroptions = userdata.map((user) => ({
    value: user._id,
    label: user.username

  }));

  //****Accounts */
  const [accountdata, setaccountdata] = useState([]);
  const [selectedaccount, setSelectedaccount] = useState();
  const [combinedaccountValues, setCombinedaccountValues] = useState([]);

  const handleAccountChange = (selectedOptions) => {
    setSelectedaccount(selectedOptions);
    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);
    setCombinedaccountValues(selectedValues);
  }

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/admin/accountdetails");
      const data = await response.json();
      setaccountdata(data.accounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(userdata);
  const accountoptions = accountdata.map((account) => ({
    value: account._id,
    label: account.accountName
  }));

  //******Pipeline */

  const [pipelinedata, setpipelinedata] = useState([]);
  const [selectedpipeline, setSelectedpipeline] = useState();

  const handlePipelineChange = (selectedOptions) => {
    setSelectedpipeline(selectedOptions);
  }

  const [selectedstage, setSelectedstage] = useState();
  const handleStageChange = (selectedOptions) => {
    setSelectedstage(selectedOptions);
  }

  useEffect(() => {
    fetchPipelineData();
  }, []);

  const fetchPipelineData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/workflow/pipeline");
      const data = await response.json();
      setpipelinedata(data.pipeline);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const pipelineoptions = Array.isArray(pipelinedata)
    ? pipelinedata.map((pipeline) => ({
      value: pipeline._id,
      label: pipeline.pipelineName,
    }))
    : [];

  //Tag FetchData ================

  useEffect(() => {
    fetchTagData();
  }, []);

  const fetchTagData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/common/tag/");
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  //  for tags
  const calculateWidth = (label) => {
    const textWidth = label.length * 8;
    return Math.min(textWidth, 200);
  };



  const tagoptions = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
    colour: tag.tagColour,

    customStyle: {
      backgroundColor: tag.tagColour,
      color: "#fff",
      borderRadius: "8px",
      alignItems: "center",
      textAlign: "center",
      marginBottom: "5px",
      padding: "2px,8px",

      fontSize: '10px',
      width: `${calculateWidth(tag.tagName)}px`,
      margin: '7px'
    },
  }));


  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      marginBottom: state.data.customStyle.marginBottom,

      fontSize: state.data.customStyle.fontSize,
      padding: state.data.customStyle.padding,
      margin: state.data.customStyle.margin,

    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      textAlign: state.data.customStyle.textAlign,
      fontSize: state.data.customStyle.fontSize,

    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.customStyle.color,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      fontSize: state.data.customStyle.fontSize,

    }),
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);

    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);

    // Send selectedValues array to your backend
    console.log("Selected Values:", selectedValues);
    setCombinedValues(selectedValues);
  };
  const [priority, setPriority] = useState(" ");

  // Handler function to update state when priority changes
  const handlePriorityChange = (selectedOptions) => {
    setPriority(selectedOptions);
  };



  //get all templateName Record 
  const [JobsData, setJobsData] = useState([]);
  const [dataNamejob, setDataNamejob] = useState();
  const [dataAccountjob, setDataAccountjob] = useState();


  const [JobDescription, setJobDescription] = useState();
  const [piplineId, setPipelineId] = useState();

  const updateJobDescription = (Description) => {

    setJobDescription(Description);
  };

  const [jobid , setjobid]=useState();

  const handleAddNewCompanyClick = async (jobid) => {

    setjobid(jobid)

    const response = await fetch('http://127.0.0.1:8080/workflow/job/joblist/listbyid/' + jobid);

    if (!response.ok) {
      throw new Error('Failed to fetch job data');
    }
    const data = await response.json();
    setJobsData(data.jobList);

    if (data.jobList && data.jobList.Pipeline) {
      const pipelineData = ({
        value: data.jobList.Pipeline._id,
        label: data.jobList.Pipeline.Name
      });
      setSelectedpipeline(pipelineData);
      setPipelineId(data.jobList.Pipeline._id)
      fetchPipelineDataid(data.jobList.Pipeline._id);
    }


    setPriority(data.jobList.Priority);

    if (data.jobList && data.jobList.Account) {

      setDataAccountjob(data.jobList.Account[0].accountName);
    }

    if (data.jobList && data.jobList.Account) {
      const tags = data.jobList.Account[0].tags.map(tag => ({
        value: tag._id,
        label: tag.tagName,
        colour: tag.tagColour,

        customStyle: {
          backgroundColor: tag.tagColour,
          color: "#fff",
          borderRadius: "8px",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "5px",
          padding: "2px,8px",

          fontSize: '10px',
          width: `${calculateWidth(tag.tagName)}px`,
          margin: '7px'
        },
      }));

      setSelectedTags(tags);
    }
    setDataNamejob(data.jobList.Name)
    setDueDate(data.jobList.DueDate)
    setStartDate(data.jobList.StartDate)
    setJobDescription(data.jobList.Description)

    // Extract assignees data and set it to assigneesOptions state
    if (data.jobList && data.jobList.JobAssignee) {
      const assigneesData = data.jobList.JobAssignee.map(assignee => ({
        value: assignee._id,
        label: assignee.username
      }));

         setSelectedUser(assigneesData);
         const selectedValues = assigneesData.map((option) => option.value);
         setCombinedValues(selectedValues);
    }
    console.log(data.jobList.Stage)
    if (data.jobList && data.jobList.Stage) {
      const stageData = ({
        value: data.jobList.Stage[0]._id,
        label: data.jobList.Stage[0].name

      });
      setSelectedstage(stageData);
    }
    setIsFormOpen(!isFormOpen);

  };


  const [setpipelineid, setpipelinedataId] = useState();
  const [stages, setstages] = useState();

  useEffect(() => {
    fetchPipelineDataid();
  }, []);

  const fetchPipelineDataid = async (piplineId) => {
    try {
      const response = await fetch("http://127.0.0.1:8080/workflow/pipeline/" + piplineId);
      const data = await response.json();

      setpipelinedataId(data.pipeline);

      if (data.pipeline && data.pipeline.stages) {
        const stagesdata = data.pipeline.stages.map(stage => ({
          value: stage._id,
          label: stage.name
        }));
        setstages(stagesdata);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


console.log(selectedpipeline);
console.log(selectedstage);
console.log(combinedValues);
console.log(priority);
console.log(JobDescription);
console.log(startDate);
console.log(dueDate);



  const updatejobdata = () => {
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({

      pipeline: selectedpipeline.value,
      stageid: selectedstage.value,
      jobassignees: [
        combinedValues
      ],
      priority: priority,
      description: JobDescription,
      startdate: startDate,
      enddate: dueDate,

      // "pipeline": "661e70e2f4a6b0f7f1b445af",
      // "stageid": "661e70e2f4a6b0f7f1b445b0",
      // "jobassignees": [
      //   "65f4331013ff8e3cb4434d61"
      // ],
      // "priority": "High",
      // "description": "content----> <p>bjhkhkjljl</p>",
      // "startdate": "Wed Apr 17 2024 00:00:00 GMT+0530 (India Standard Time)",
      // "enddate": "Thu Apr 25 2024 00:00:00 GMT+0530 (India Standard Time)"

    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/workflow/job/" + jobid  , requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((result) => {

        // Handle success
        toast.success("Job updated successfully");

        window.location.reload();


      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        toast.error("Failed to create Job Template");
      })
  }



  return (

    <div className="form-open" style={{ padding: "20px" }}>
      <span style={{ color: 'blue', cursor: "pointer" }} >
        <RiAddCircleLine />  Filter </span>

      <div style={{ position: "relative", textAlign: "right" }}>
        <input
          className="searchText"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
          style={{ width: "25%", height: "10px", padding: "15px 10px", borderRadius: "20px" }}
        />
      </div>

      <table className="my-table col-12 ">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectAll}
              onChange={handleCheckboxChange} /></th>
            <th>Name</th>
            <th>Job Assignee</th>
            <th>Pipeline</th>
            <th>Stage</th>
            <th>Account</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Time In Current</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.slice(startIndex, endIndex).map((job) => {

            // Check if createdAt exists and is not empty
            if (job.createdAt) {

              // Extract the date part from createdAt
              const createdAtDate = job.createdAt.split('T')[0];
              const startDateFormatted = formatDate(job.StartDate);
              const dueDateFormatted = formatDate(job.DueDate);

              // Calculate time difference
              const startDateParts = createdAtDate.split('-'); // Assuming date format is YYYY-MM-DD
              const startDate = new Date(startDateParts[0], startDateParts[1] - 1, startDateParts[2]); // Subtract 1 from month as it's 0-indexed


              const currentDate = new Date();
              const timeDiff = Math.abs(currentDate - startDate);
              const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

              // Convert days difference to human-readable format
              let timeInCurrent = '';
              if (daysDiff >= 365) {
                const years = Math.floor(daysDiff / 365);
                timeInCurrent = years === 1 ? 'a year' : `${years} years`;
              } else if (daysDiff >= 30) {
                const months = Math.floor(daysDiff / 30);
                timeInCurrent = months === 1 ? 'a month' : `${months} months`;
              } else if (daysDiff >= 7) {
                const weeks = Math.floor(daysDiff / 7);
                timeInCurrent = weeks === 1 ? 'a week' : `${weeks} weeks`;
              } else {
                timeInCurrent = daysDiff === 1 ? 'a day' : `${daysDiff} days`;
              }

              // Check if due date is provided and if it's overdue
              const isOverdue = dueDateFormatted && currentDate > new Date(dueDateFormatted);

              return (

                <tr key={job._id}>
                  <td>
                    <input type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => handleRecordCheckboxChange(job.id)} />

                  </td> {/* Checkbox column */}
                  <td style={{ color: 'blue', cursor: 'pointer' }} onClick={(event) => { handleAddNewCompanyClick(job.id, event) }}>{job.Name}</td>
                  <td>{job.JobAssignee}</td>
                  <td>{job.Pipeline}</td>
                  <td>{job.Stage}</td>
                  <td>{job.Account}</td>
                  <td>{startDateFormatted}</td>
                  {/* <td>{dueDateFormatted}</td> */}

                  <td>
                    <div>{dueDateFormatted}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {isOverdue && <RiErrorWarningLine style={{ color: 'red', marginRight: '5px' }} className="warning-icon" />}
                      {isOverdue && <div className="warning-message">{'This Job is Overdue'}</div>}
                    </div>
                  </td>

                  <td>{timeInCurrent} ago</td> {/* Display time in current */}

                  <td>
                    <div className="data-menu" onClick={() => toggleMenu(job.id)} style={{ cursor: 'pointer', fontSize: '20px' }}>
                      &#8942;
                    </div>
                    {openMenuId === job.id && (
                      <div className="jobdata_menu">
                        <div onClick={(event) => { handleAddNewCompanyClick(job.id, event) }} style={{ color: 'blue', cursor: 'pointer' }}>Edit</div>
                        <div onClick={(txt) => handleDelete(job.id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            } else {
              // Handle the case where StartDate is not provided
              return null; // or display some default value
            }
          })}
        </tbody>
      </table>


      <div className={`job-form-container ${isFormOpen ? "form-open" : ""}`}>
        <div className="main-header">
          <div>

            <div className="form-tittle">
              <h4>{dataNamejob}</h4>
            </div>

            <div className="sub-tittle">
              <h4 style={{ color: 'blue' }}>{dataAccountjob}</h4>
              <span>  a day in the current stage</span>
            </div>
          </div>
          <div>
            <div className="form-icons">

              <div style={{ color: "#2c59fa" }} className="link">
                <FiPlusCircle
                  onClick={() => setLink(!showLink)}
                  style={{
                    fontSize: "20px",

                    cursor: "pointer",
                  }}
                /> Link</div>
              {showLink && (
                <div className="link-dropdown-options">

                  <span style={{ fontSize: '14px' }}>Notes</span>
                  <span style={{ fontSize: '14px' }}>Chat</span>
                  <span style={{ fontSize: '14px' }}>Proposals & ETL</span>
                  <span style={{ fontSize: '14px' }}>Documents</span>
                  <span style={{ fontSize: '14px' }}>Tasks</span>
                  <span style={{ fontSize: '14px' }}>Time Entries</span>
                  <span style={{ fontSize: '14px' }}>Invoices</span>
                  <span style={{ fontSize: '14px' }}>Payments</span>
                  <span style={{ fontSize: '14px' }}>Organizers</span>
                  <span style={{ fontSize: '14px' }}>Wiki pages</span>
                  <span style={{ fontSize: '14px' }}>Jobs</span>
                </div>
              )}


              <div style={{ color: "#2c59fa" }} className="verticaldots">
                <HiDotsVertical
                  onClick={() => setShowOptions(!showOptions)}
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
                {showOptions && (
                  <div className="form-dropdown-options">

                    <span style={{ fontSize: '14px' }}>Archive</span>
                    <span style={{ color: 'red', fontSize: '14px' }}>Delet</span>
                  </div>
                )}


              </div>
              <div onClick={handleFormClose} style={{ color: "#2c59fa" }} className="cross"><RxCross2 /></div>

            </div>
          </div>


        </div>
        <div className="job-form">
          <div style={{ width: '100%' }} className="form">
            <div className="form-row">
              <div className='select-container'>
                <div className='label-container'>
                  <label>Pipeline</label>
                </div>
                <Select className='pipeline'
                  placeholder="Pipeline"
                  options={pipelineoptions}
                  components={animatedComponents}
                  value={selectedpipeline}
                  isSearchable // Enable search
                  isClearable
                  onChange={handlePipelineChange} />
              </div>

              <div className='select-container'>
                <div className='label-container'>
                  <label>Account tags</label>
                </div>
                <Select className='account-tags'
                  options={tagoptions}
                  components={animatedComponents}
                  isMulti // Enable multi-select
                  value={selectedTags}
                  onChange={handleTagChange}
                  placeholder="Select tags..."
                  isSearchable // Enable search
                  styles={customStyles}
                />
              </div>

              <div className="select-container2" style={{ display: 'flex', }}>

                <div className='select-container'>
                  <div className='label-container'>
                    <label>stages</label>
                  </div>

                  <Select className='stages'
                    options={stages}
                    components={animatedComponents}
                    isMulti={false}// Enable multi-select
                    value={selectedstage}
                    onChange={handleStageChange}
                    placeholder="Select stages..."
                    isSearchable // Enable search
                    isClearable
                  />
                </div>


                <div className='select-container'>
                  <div className='label-container'>
                    <label>Assignees</label>
                  </div>
                  <Select className='Assignees'
                    placeholder="Assignees"
                    options={useroptions}
                    components={animatedComponents}
                    isMulti // Enable multi-select
                    value={selecteduser}
                    isSearchable // Enable search
                    onChange={handleuserChange} />
                </div>
              </div>

              <div className='select-container'>
                <div className='label-container'>
                  <label>priority</label>
                </div>
                <Priority selectedPriority={priority} onPriorityChange={handlePriorityChange} className='priority' />
              </div>

              <div className='select-container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div className='label-container' >
                    <label>Start Date</label>
                  </div>
                  <DatePicker

                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    placeholderText="Select Start Date"
                    className='start-date'
                  />
                </div>

                <div>
                  <div className='label-container' >
                    <label>Due Date</label>
                  </div>
                  <DatePicker

                    selected={dueDate}
                    onChange={date => setDueDate(date)}
                    placeholderText="Select Due Date"
                    className='due-date'
                  />
                </div>
              </div>

              <div style={{ marginLeft: '30px', marginRight: '20px', width: '95%', paddingBottom: '10%' }} className="texteditor" >
                <TextEditor onDescriptionChange={updateJobDescription} selectedText={JobDescription} />
              </div>

              <div style={{ marginLeft: '30px', marginRight: '20px', width: '95%', paddingBottom: '10%' }} className="texteditor" >
                <TextEditor onDescriptionChange={updateJobDescription} selectedText={JobDescription} />
              </div>



              <div className="form-btns">
                <button onClick={handleSaveExitClick} style={{ marginLeft: '20px', borderRadius: '10px', padding: '8px' }} type="button" className="button-1" >Save & Exit</button>
                <button onClick={handleSaveClick} style={{ marginLeft: '20px', borderRadius: '10px', padding: '8px' }} type="button" className="button-2" >Save </button>
                <button onClick={handleFormClose} style={{ marginLeft: '20px', border: 'none', background: 'none', color: '#1976d3', fontSize: '14px' }} type="button" className="button-1" >Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>









      {/* Pagination */}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <ToastContainer />

    </div>
  );
};

export default JobsData;