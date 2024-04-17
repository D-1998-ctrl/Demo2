
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
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const JobTemplateUpdate = () => {
  const navigate = useNavigate();

  const { _id } = useParams();

  const [templateData, setTemplateData] = useState(null);
  const [tempvalues, setTempValues] = useState();

  useEffect(() => {
    fetchidwiseData();
  }, []);

  //get id wise template Record 

  const fetchidwiseData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/workflow/jobtemplate/jobtemplateList/' + _id);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // console.log('Fetched data:', data);
      setTemplateData(data.jobTemplate)
      setTempValues(data.jobTemplate)

      // Extract assignees data and set it to assigneesOptions state
      if (data.jobTemplate && data.jobTemplate.jobassignees) {
        const assigneesData = data.jobTemplate.jobassignees.map(assignee => ({
          value: assignee._id,
          label: assignee.username
        }));
        setAssigneesNew(assigneesData);
      }

      tempallvalue()

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (tempvalues) {
      tempallvalue();
    }
  }, [tempvalues]);

  const [tempNameNew, setTempNameNew] = useState("");
  const [JobNameNew, setJobNameNew] = useState();
  const [AssigneesNew, setAssigneesNew] = useState([]);
  const [PriorityNew, setPriorityNew] = useState();
  const [JobDescriptionNew, setJobDescriptionNew] = useState();
  const [StartsInNew, setStartsInNew] = useState();
  const [DueInNew, setDueInNew] = useState();
  const [StartsDateNew, setStartsDateNew] = useState();
  const [DueDateNew, setDueDateNew] = useState();
  const [StartsInDurationNew, setStartsInDurationNew] = useState();
  const [DueInDurationNew, setDueInDurationNew] = useState();
  const [AbsoluteDateNew, setAbsoluteDateNew] = useState();

  const tempallvalue = () => {
    setTempNameNew(tempvalues.templatename);
    setJobNameNew(tempvalues.jobname);
    setPriorityNew(tempvalues.priority);
    setJobDescriptionNew(tempvalues.description);
    setStartsInNew(tempvalues.startsin);
    setDueInNew(tempvalues.duein);
    setStartsDateNew(tempvalues.startdate);
    setDueDateNew(tempvalues.enddate);
    setStartsInDurationNew(tempvalues.startsinduration);
    setDueInDurationNew(tempvalues.dueinduration);
    setAbsoluteDateNew(tempvalues.absolutedates)
  };

 const handleAbsolutesDates = (checked) => {
    setAbsoluteDateNew(checked)
  }
console.log(AbsoluteDateNew)

  const handleStartDateChange = (date) => {
    setStartsDateNew(date);
  };

  const handleDueDateChange = (date) => {
    setDueDateNew(date);
  };
  //integration 
  //   react Select =>
  const animatedComponents = makeAnimated();
  const [userdata, setUserData] = useState([]);
  const [combinedValues, setCombinedValues] = useState([]);

console.log(AssigneesNew)


  const handleuserChange = (AssigneesNew) => {
    setAssigneesNew(AssigneesNew);
    // Map selected options to their values and send as an array
    const selectedValues = AssigneesNew.map((option) => option.value);
    console.log(selectedValues)
    setCombinedValues(selectedValues);
  
  }

console.log(combinedValues);


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

  // Handler function to update state when priority changes
  const handlePriorityChange = (selectedOption) => {
    setPriorityNew(selectedOption);
  };


  const updateJobDescription = (description) => {
    setJobDescriptionNew(description);
  };

  // Combine day, month, and year options
  const dayoptions = [
    { label: 'Days', value: 'Days' },
    { label: 'Months', value: 'Months' },
    { label: 'Years', value: 'Years' }
  ];

  // Handler function to update state when dropdown value changes
  const handlestartindateChange = (selectedOption) => {
    setStartsDateNew(selectedOption.value);
  };

  // Handler function to update state when dropdown value changes
  const handledueindateChange = (selectedOption) => {
    setDueInDurationNew(selectedOption.value);
  };

  const [showForm, setShowForm] = useState(false);
  const [tempName, setTempName] = useState('');

  const handleCancel = () => {
    setShowForm(false);
    setTempName('');
  };

  console.log(combinedValues)
  //data send 
  const updatejobtemp = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: tempNameNew,
      jobname: JobNameNew,
      jobassignees: AssigneesNew.value,
      addshortcode: "",
      priority: PriorityNew.value,
      description: JobDescriptionNew,
      absolutedates: AbsoluteDateNew,
      startsin: StartsInNew,
      startsinduration: StartsInDurationNew,
      duein: DueInNew,
      dueinduration: DueInDurationNew,
      comments: "",
      startdate: StartsDateNew,
      enddate: DueDateNew,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/workflow/jobtemplate/" + _id, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((result) => {
    
      // Handle success
      toast.success("Job Template created successfully");
           
        navigate("/job_template");
          

   
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      toast.error("Failed to create Job Template");
    })
  }


  return (
    <>
      <div className='job-template-container col-10'>
        <div className='job-template-header' style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
          <h3>Edit Job Template</h3>
          <button className=' col-1' style={{ border: 'none', backgroundColor: '#e4e9f7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'blue', fontSize: '15px', cursor: 'pointer', }}>
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
              <input type='text' className='job-input'
                onChange={e => setTempNameNew(e.target.value)}
                value={tempNameNew} 
                placeholder="templateName"
                
                />
            </div>
            <div>
              <label style={{ fontSize: '14px' }}>Job name</label>
              <input type='text' className='job-input' value={JobNameNew}
                onChange={e => setJobNameNew(e.target.value)} placeholder='Job name' />
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
                isSearchable // Enable search
                value={AssigneesNew}
                onChange={handleuserChange}
              
              />
            </div>

            <div className='job-template-select-container'>
              <div className='job-template-label-container'>
                <label>Priority</label>
              </div>
              <Priority onPriorityChange={handlePriorityChange} selectedPriority={PriorityNew} className='add-jobs-select-dropdown'
              />
            </div>

            <div style={{ marginTop: '20px', }}>
              <TextEditor onDescriptionChange={updateJobDescription} selectedText = {JobDescriptionNew} />
            </div>

            <div className='job-template-dates-switches col-12' style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3>Start and Due Date</h3>
              <div className="job-template-switch-container" style={{ marginTop: '10px' }}>
                <Switch
                  onChange={handleAbsolutesDates}
                  checked={AbsoluteDateNew}
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
            {AbsoluteDateNew && (


              <div className='col-12 job-template-absoluteDate ' style={{ display: 'flex', gap: '5px', marginTop: '30px' }}>
                <div className='col-6' >
                  <label style={{ fontSize: '14px' }}>Start Date</label>
                  <div>
                    <DatePicker
                      selected={StartsDateNew}
                      onChange={handleStartDateChange}
                      className="date-picker-input "
                      placeholderText='Start Date'
                    />
                  </div>

                </div>
                <div className='col-6'>
                  <label style={{ fontSize: '14px' }}>Due Date</label>
                  <div>
                    <DatePicker selected={DueDateNew} onChange={handleDueDateChange} className="date-picker-input " placeholderText='Due Date' />
                  </div>

                </div>
              </div>


            )}
            {!AbsoluteDateNew && (
              <div className='select-dates-container' style={{ marginTop: '25%' }}>
                <div className='col-12' style={{ display: 'flex', alignItems: 'center', gap: '5px', }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2' placeholder='0'  > <p>Starts In </p>
                    <SlQuestion style={{ color: 'blue' }} />
                  </div>
                  <div className='col-5'>
                    <input type='text' className='date-input' placeholder='0' value={StartsInNew}
                      onChange={e => setStartsInNew(e.target.value)} />
                  </div>
                  <div className='col-5'>
                    <Select className='job-template-select-dropdown '
                      options={dayoptions}
                      value = {dayoptions.find(option => option.value === StartsInDurationNew)}
                      onChange={handlestartindateChange}/>
                  </div>

                </div>
                <div className='col-12' style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'   > <p>Due In </p>
                    <SlQuestion style={{ color: 'blue' }} />
                  </div>
                  <div className='col-5'>
                    <input type='text' className='date-input' placeholder='0' value={DueInNew}
                      onChange={e => setDueInNew(e.target.value)} />
                  </div>
                  <div className='col-5'>
                    <Select className='job-template-select-dropdown '
                      options={dayoptions}
                      value={dayoptions.find(option => option.value === DueInDurationNew)}
                      onChange={e => handledueindateChange(e.target.value)} />
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

            <button type='submit' style={{ padding: '10px', borderRadius: '10px', cursor: 'pointer', background: 'blue', color: '#fff', border: 'none', fontSize: '15px' }} className='col-2' onClick={updatejobtemp} >Save & exit</button>
            <button type='reset' style={{ padding: '10px', borderRadius: '10px', cursor: 'pointer', background: '#fff', color: 'blue', border: '1px solid blue', fontSize: '15px' }} className='col-2'>Save</button>
            <button type='reset' style={{ padding: '10px', borderRadius: '10px', cursor: 'pointer', background: '#fff', color: 'blue', border: '1px solid blue', fontSize: '15px' }} onClick={handleCancel} className='col-2'>Cancle</button>
          </div>
        </div>
        <ToastContainer />
      </div>


    </>
  );
}

export default JobTemplateUpdate;
