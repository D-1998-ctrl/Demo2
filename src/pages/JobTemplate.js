
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import Switch from "react-switch";
import { LuPlusCircle } from "react-icons/lu";
import DatePicker from 'react-datepicker'; // Import date picker
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker stylesheet
import { SlQuestion } from "react-icons/sl";
import { TfiWrite } from "react-icons/tfi";
import makeAnimated from "react-select/animated";

import "./jobtemplate.css"
import TextEditor from '../component/TextEditor';
import Priority from '../component/priority';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const JobTemplate = () => {

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [absoluteDate, setAbsoluteDates] = useState(false)

  const handleAbsolutesDates = (checked) => {
    setAbsoluteDates(checked)
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };
  //integration 
  //   react Select =>
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/common/user");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(userdata);
  const options = userdata.map((user) => ({
    value: user._id,
    label: user.username
  }));


  const [templatename, settemplatename] = useState("");
  const [jobname, setjobname] = useState("");
  const [startsin, setstartsin] = useState("");
  const [startsinduration, setstartsinduration] = useState("");
  const [duein, setduein] = useState("");
  const [dueinduration, setdueinduration] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [priority, setPriority] = useState(" ");

  // Handler function to update state when priority changes
  const handlePriorityChange = (selectedOption) => {
      setPriority(selectedOption);
  };


  const updateJobDescription = (description) => {
    setJobDescription(description);
  };

  // Combine day, month, and year options
  const dayoptions = [
    { label: 'Days', value: 'Days' },
    { label: 'Months', value: 'Months' },
    { label: 'Years', value: 'Years' }
  ];

  // Handler function to update state when dropdown value changes
  const handlestartindateChange = (selectedOption) => {
    setstartsinduration(selectedOption.value);
  };

  // Handler function to update state when dropdown value changes
  const handledueindateChange = (selectedOption) => {
    setdueinduration(selectedOption.value);
  };

  const [showForm, setShowForm] = useState(false);
  const [tempName, setTempName] = useState('');
  
  const handleCreateTemplate = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setTempName('');
  };

  //get all templateName Record 
  const [JobTemplates, setJobTemplates] = useState([]);

  useEffect(() => {
    async function fetchJobTemplates() {
      try {
        const response = await fetch('http://127.0.0.1:8080/workflow/jobtemplate/');
        if (!response.ok) {
          throw new Error('Failed to fetch job templates');
        }
        const data = await response.json();
        setJobTemplates(data.JobTemplates);
        console.log(data);
      } catch (error) {
        console.error('Error fetching job templates:', error);
      }
    }
    fetchJobTemplates();
  }, []);

  console.log(JobTemplates);

  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };

  const handleEdit = (_id) => {
    // Implement logic for editing here
    // console.log("Edit action triggered for template id: ", templateId);
    navigate('JobTemplateUpdate/'+_id)
  };


  
//delete template
const handleDelete = (_id) => {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:8080/workflow/jobtemplate/" + _id, requestOptions)
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



//data send 
const createjobtemp = () => {
    
  if (absoluteDate === true)
  {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: templatename,
      jobname: jobname,
      jobassignees: combinedValues,
      addshortcode: "",
      priority: "Urgent",
      description: jobDescription,
      absolutedates: absoluteDate,
      comments: "",
      startdate: startDate,
      enddate: dueDate,
    });
   

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/workflow/jobtemplate", requestOptions)

    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((result) => {
      // Handle success
      toast.success("Job Template created successfully");
      window.location.reload()
      setShowForm(false);
      
      // Additional logic after successful creation if needed
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      toast.error("Failed to create Job Template");
    })
   
  }
else if(absoluteDate === false)
{
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  templatename: templatename,
  jobname: jobname,
  jobassignees: combinedValues,
  addshortcode: "",
  priority: "Urgent",
  description: jobDescription,
  absolutedates: absoluteDate,
  startsin: startsin,
  startsinduration: startsinduration,
  duein: duein,
  dueinduration: dueinduration,
  comments: "",
  });


const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://127.0.0.1:8080/workflow/jobtemplate", requestOptions)

.then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text();
})
.then((result) => {
  // Handle success
  toast.success("Job Template created successfully");
  window.location.reload()
  setShowForm(false);
  
  // Additional logic after successful creation if needed
})
.catch((error) => {
  // Handle errors
  console.error(error);
  toast.error("Failed to create Job Template");
})

}
  
}


  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  

  const totalPages = Math.ceil(JobTemplates.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, JobTemplates.length);
  const currentTemplates = JobTemplates.slice(startIndex, endIndex);
  






  return (
    <div className="job-temp-container col-12" style={{marginLeft:'15px',marginTop:'10px' ,height:'90vh',overflowY:'auto'}}>
    <h1>Job Template</h1>
    <div className="button-container">
        {!showForm &&
         <div>
         <button onClick={handleCreateTemplate}>Create Template</button>
         <table className="list-container">
           <thead>
             <tr>
               <th>Name</th>
               <th></th>
             </tr>
           </thead>
           <tbody>
             {currentTemplates.map(template => (
               <tr key={template._id}>
                 <td onClick={() => handleEdit(template._id)} style={{ cursor: "pointer", color: 'blue' }}>{template.templatename}</td>
                 <td>
                   <div className="ci-menu-kebab" onClick={() => toggleMenu(template._id)} style={{ cursor: 'pointer', fontSize: '20px' }}>
                     &#8942;
                   </div>
                   {openMenuId === template._id && (
                         <div className="menu-options">
                         <div onClick={() => handleEdit(template._id)} style={{color:'blue',cursor:'pointer'}}>Edit</div>
                         <div onClick={(txt) => handleDelete(template._id)} style={{color:'red',cursor:'pointer'}}>Delete</div>
                       </div>
                   )}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
         <div>
  <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
    Previous
  </button>
  <span> Page {currentPage} of {totalPages} </span>
  <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
    Next
  </button>
</div>
       </div>
               }
      </div>
    <>
    {showForm && (
      <div className='job-template-container col-12'>
        <div className='job-template-header' style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
          <h3>Create Job Template</h3>
          <button className=' col-1' style={{ border: 'none', backgroundColor: '#e4e9f7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'blue', fontSize: '15px', cursor: 'pointer', marginLeft:'auto'}}>
              <LuPlusCircle />
              <span>Add </span>
            </div>
          </button>

        </div>
        <hr style={{ margin: '0 10px 0 10px' }} />
        <div className='job-template-form-area'>
          <div className='job-template-create-form col-6' >
            <div>
              <label style={{ fontSize: '14px' }}>Template name</label>
              <input type='text' className='job-input' onChange={(e) => settemplatename(e.target.value)} placeholder='Template name' />
            </div>
            <div>
              <label style={{ fontSize: '14px' }}>Job name</label>
              <input type='text' className='job-input' onChange={(e) => setjobname(e.target.value)} placeholder='Job name' />
            </div>
            <div style={{ margin: '10px 0 30px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'blue', fontSize: '15px', cursor: 'pointer', }}>
                <LuPlusCircle />
                <span>Add shortcode </span>
              </div>
            </div>
            <div className='job-template-select-container'>
              <div className='job-template-label-container'>
                <label>Assignees</label>
              </div>
              <Select className='job-template-select-dropdown'
                placeholder="Assignees"
                options={options}
                components={animatedComponents}
                isMulti // Enable multi-select
                value={selecteduser}
                isSearchable // Enable search
                onChange={handleuserChange}
              />
            </div>
            <div className='job-template-select-container'>
              <div className='job-template-label-container'>
                <label>Priority</label>
              </div>
              <Priority onPriorityChange={handlePriorityChange} className='add-jobs-select-dropdown' />
            </div>

            <div style={{ marginTop: '20px', }}>
            <TextEditor onDescriptionChange={updateJobDescription} selectedText = {jobDescription} />
            </div>

            <div className='job-template-dates-switches col-12' style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

              <h3>Start and Due Date</h3>
              <div className="job-template-switch-container" style={{ marginTop: '10px' }}>
                <Switch
                  onChange={handleAbsolutesDates}
                  checked={absoluteDate}
                  onColor="#3A91F5"
                  onHandleColor="#FFF"
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={25}
                  width={45}
                  className="job-template-react-switch"
                />
                <span className="job-template-switch-label" style={{ cursor: "pointer" }}>Absolutes Dates</span>
              </div>

            </div>
            {absoluteDate && (


              <div className='col-12 job-template-absoluteDate ' style={{ display: 'flex', gap: '5px', marginTop: '30px' }}>
                <div className='col-6' >
                  <label style={{ fontSize: '14px' }}>Start Date</label>
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      className="date-picker-input "
                      placeholderText='Start Date'
                    />
                  </div>

                </div>
                <div className='col-6'>
                  <label style={{ fontSize: '14px' }}>Due Date</label>
                  <div>
                    <DatePicker selected={dueDate} onChange={handleDueDateChange} className="date-picker-input " placeholderText='Due Date' />
                  </div>

                </div>
              </div>


            )}
            {!absoluteDate && (
              <div className='select-dates-container' style={{ marginTop: '25%' }}>
                <div className='col-12' style={{ display: 'flex', alignItems: 'center', gap: '5px', }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2' placeholder='0'  > <p>Starts In </p>
                    <SlQuestion style={{ color: 'blue' }} />
                  </div>
                  <div className='col-5'>
                    <input type='text' className='date-input' placeholder='0' onChange={(e) => setstartsin(e.target.value)} />
                  </div>
                  <div className='col-5'>
                    <Select className='job-template-select-dropdown '
                      options={dayoptions}
                      onChange={handlestartindateChange} />
                  </div>

                </div>
                <div className='col-12' style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'   > <p>Due In </p>
                    <SlQuestion style={{ color: 'blue' }} />
                  </div>
                  <div className='col-5'>
                    <input type='text' className='date-input' placeholder='0' onChange={(e) => setduein(e.target.value)} />
                  </div>
                  <div className='col-5'>
                    <Select className='job-template-select-dropdown '
                      options={dayoptions}
                      onChange={handledueindateChange} />
                  </div>

                </div>
              </div>
            )}
          </div>

          <div className="vl"></div>

          <div className='job-template-comments-wiki col-6' style={{ textAlign: 'center', margin: '20% 0 0 0' }} >
            <TfiWrite style={{ fontSize: '100px', color: 'gray' }} />
            <p style={{ margin: '30px 0 0 30px' }}>There are no comments or wiki pages yet</p>
          </div>


        </div>

        <hr style={{ margin: '0 10px 20px 10px' }} />

        <div className='bottom-buttons'>
          <div className='bottom-buttons-group col-6' style={{ display: 'flex', gap: '10px', marginLeft: '10px', marginBottom: '20px' }}>

            <button type='submit' style={{ padding: '8px', borderRadius: '5px', cursor: 'pointer', background: '#007bff', color: '#fff', border: 'none', fontSize: '15px'}} className='col-2' onClick={createjobtemp} >Save </button>
            <button type='reset' style={{ padding: '8px', borderRadius: '5px', cursor: 'pointer', background: '#fff', color: 'blue',  fontSize: '15px',backgroundColor:'#007bff' ,color:"#fff"}} onClick={handleCancel} className='col-2'>Cancle</button>
          </div>
        </div>
      </div>
)}
  <ToastContainer />

    </>
    </div>
  );
}

export default JobTemplate;
