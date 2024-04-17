import React, { useState, useEffect } from 'react';
import Select from "react-select";
import Switch from "react-switch";
import { LuPlusCircle, LuPenLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlQuestion } from "react-icons/sl";
import DatePicker from 'react-datepicker'; // Import date picker
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker stylesheet
import { RxDragHandleDots2 } from "react-icons/rx";
import '../pages/createpipeline.css';
import makeAnimated from 'react-select/animated';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const CreatePipeline = () => {

    const [singleSwitch, setSingleSwitch] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [autoMoveJob, setAutoMovejob] = useState(false)
    const [stages, setStages] = useState([]);




    // Fetch pipeline data and set initial stage visibility





    const navigate = useNavigate();
    const { _id } = useParams();

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleDueDateChange = (date) => {
        setDueDate(date);
    };
    const handleSingleSwitchChange = (checked) => {
        setSingleSwitch(checked);
    };
    const handleAutoMoveChange = (checked) => {
        setAutoMovejob(checked)
    }
    const [Account_id, setAccount_id] = useState(false);
    const [Priority, setPriority] = useState(false);
    const [Days_on_stage, setDays_on_stage] = useState(false);
    const [Account_tags, setAccount_tags] = useState(false);
    const [Name, setName] = useState(false);
    const [Due_date, setDue_date] = useState(false);
    const [Description, setDescription] = useState(false);
    const [Assignees, setAssignees] = useState(false);

    const handleAccount_idChange = (checked) => {
        setAccount_id(checked);
    };

    const handlePriorityChange = (checked) => {
        setPriority(checked);
    };
    const handleDays_on_stageChange = (checked) => {
        setDays_on_stage(checked);
    };

    const handleAccount_tagsChange = (checked) => {
        setAccount_tags(checked);
    };
    const handleNameSwitchChange = (checked) => {
        setName(checked);
    };
    const handleDue_dateChange = (checked) => {
        setDue_date(checked);
    };
    const handleDescriptionChange = (checked) => {
        setDescription(checked);
    };
    const handleAssigneesChange = (checked) => {
        setAssignees(checked);
    };
    const handleClose = () => {
        navigate("/createpipeline")
    };
    
    const handleAddStage = () => {
        // Duplicate the last stage and add it to the stages array
        const lastStage = stages[stages.length - 1];
        const newStage = { ...lastStage };
        setStages([...stages, newStage]);
    };

    useState(() => {
        handleAddStage();
    }, []);
    const handleDeleteStage = (index) => {
        const updatedStages = [...stages];
        updatedStages.splice(index, 1);
        setStages(updatedStages);
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

        // Send selectedValues array to your backend
        console.log("Selected Values:", selectedValues);
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

    //SORTS Jobs by get

    const [sortbyjobs, setSortbyJobs] = useState([]);
    const [selectedssortbyjob, setselectedsortbyjob] = useState();

    const handlesortingbyJobs = (selectedOptions) => {
        setselectedsortbyjob(selectedOptions);
    }

    useEffect(() => {
        fetchsortbbyjob();
    }, []);

    const fetchsortbbyjob = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/common/sortjobby");
            const data = await response.json();
            setSortbyJobs(data.sortJobsBy);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const optionsort = sortbyjobs.map((sort) => ({
        value: sort._id,
        label: sort.description

    }));

    //Default Jobt template get 
    const [Defaulttemp, setDefaultTemp] = useState([]);
    const [selectedtemp, setselectedTemp] = useState();
    const handletemp = (selectedOptions) => {
        setselectedTemp(selectedOptions);
    }
    useEffect(() => {
        fetchtemp();
    }, []);

    const fetchtemp = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/workflow/jobtemplate/");
            const data = await response.json();
            setDefaultTemp(data.JobTemplates);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const optiontemp = Defaulttemp.map((temp) => ({
        value: temp._id,
        label: temp.templatename

    }));
    //all data const 
    const [piplineName, setPipeLineName] = useState("");
    const [stageName, setStageName] = useState();



    console.log(stageName)

    //data send 
    const createPipe = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            pipelineName: piplineName,
            availableto: combinedValues,
            sortjobsby: selectedssortbyjob.value,
            defaultjobtemplate: selectedtemp.value,
            accountId: Account_id,
            description: Description,
            duedate: Due_date,
            accounttags: Account_tags,
            priority: Priority,
            days_on_Stage: Days_on_stage,
            assignees: Assignees,
            name: Name,
            startdate: startDate,
            stages: stages,
                
                   
          

        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://127.0.0.1:8080/workflow/pipeline/" + _id, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then((result) => {
                // Display success toast
                toast.success("Pipeline Updated successfully");
                console.log(result)
                navigate("/createpipeline");
                
            })
            .catch((error) => {
                // Display error toast

                toast.error("Failed to create pipeline");
            });
    }


    //************update data get */


    //get all templateName Record 
    const [pipelineData, setPipelineData] = useState([]);
    const [stagedata, setstagedata] = useState([]);


    useEffect(() => {
        const fetchPipelineData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8080/workflow/pipeline/pipelinelist/' + _id);
                if (!response.ok) {
                    throw new Error('Failed to fetch pipeline data');
                }
                const data = await response.json();
                setPipelineData(data.pipelineTemplate);

                setStages(data.pipelineTemplate.stages);
                
            
                // data.pipelineTemplate.stages.forEach(stage => {
                //     setstagedata(stage);
                //     console.log(stage);
                // });

                if (data.pipelineTemplate && data.pipelineTemplate.availableto) {
                    const assigneesData = data.pipelineTemplate.availableto.map(assignee => ({
                        value: assignee._id,
                        label: assignee.username
                    }));
                    setSelectedUser(assigneesData);
                }

                if (data.pipelineTemplate && data.pipelineTemplate.sortjobsby) {
                    const sortjobsbyData = ({
                        value: data.pipelineTemplate.sortjobsby._id,
                        label: data.pipelineTemplate.sortjobsby.description
                    });

                    setselectedsortbyjob(sortjobsbyData);
                }

                if (data.pipelineTemplate && data.pipelineTemplate.defaultjobtemplate) {
                    const defaultjobtemplateData = ({
                        value: data.pipelineTemplate.defaultjobtemplate._id,
                        label: data.pipelineTemplate.defaultjobtemplate.templatename
                    });

                    setselectedTemp(defaultjobtemplateData);
                }
                setPipeLineName(data.pipelineTemplate.pipelineName);

                setAccount_id(data.pipelineTemplate.accountId);
                setPriority(data.pipelineTemplate.priority);
                setDays_on_stage(data.pipelineTemplate.days_on_Stage);
                setAccount_tags(data.pipelineTemplate.accounttags);
                setName(data.pipelineTemplate.name);
                setDue_date(data.pipelineTemplate.duedate);
                setDescription(data.pipelineTemplate.description);
                setAssignees(data.pipelineTemplate.assignees);
                setStartDate(data.pipelineTemplate.startdate);
            } catch (error) {
                console.error('Error fetching pipeline data:', error);
            }
        };

        fetchPipelineData();
    }, []);


    const handleStageNameChange = (e, index) => {
        const newStages = [...stages]; // Create a copy of the stages array
        newStages[index].name = e.target.value; // Update the name of the specific stage
        setStages(newStages); // Update the state with the modified stages array
    };
    


  
          
    return (

        <div className='create-pipeline-container col-10'>
            <h3 style={{ fontSize: "25px" }} className='pipeline-heading'>Pipelines</h3>
            <>

                <div>
                    <div className='pipelines-form col-10'>
                        <div className='form-header'>
                            <h3>Update Pipeline</h3>
                            <hr />
                        </div>
                        <div className='form-area'>
                            <div className='create-form col-6'>
                                <div>
                                    <label style={{ fontSize: '14px' }}>Pipeline Name</label>
                                    <input type='text' value={piplineName} id="pipelineName" onChange={(e) => setPipeLineName(e.target.value)} placeholder='Pipeline Name' className='pipeline-input' />
                                </div>
                                <div className='select-container'>
                                    <div className='label-container'>
                                        <label>Available to</label>
                                    </div>
                                    <Select
                                        className='select-dropdown'
                                        placeholder="Available to"
                                        options={options}
                                        components={animatedComponents}
                                        isMulti // Enable multi-select
                                        value={selecteduser}
                                        onChange={handleuserChange}
                                        isSearchable // Enable search     
                                    />
                                </div>
                                <div className='select-container'>
                                    <div className='label-container'>
                                        <label>Sort jobs by</label>
                                    </div>
                                    <Select
                                        className='select-dropdown'
                                        placeholder="Sort jobs by"
                                        options={optionsort}
                                        value={selectedssortbyjob}
                                        components={animatedComponents}
                                        isMulti={false} // Single selection
                                        isSearchable // Enable search
                                        onChange={handlesortingbyJobs}
                                        isClearable
                                    />
                                </div>
                                <div className='select-container'>
                                    <div className='label-container'>
                                        <label>Default job template</label>
                                    </div>
                                    <Select
                                        className='select-dropdown'
                                        placeholder="Default job template"
                                        options={optiontemp}
                                        components={animatedComponents}
                                        isSearchable // Enable search
                                        isClearable
                                        onChange={handletemp}
                                        value={selectedtemp}
                                    />
                                </div>
                                <div className='job-cards-fields col-10'>
                                    <div className='job-card-header'>
                                        <h3>Job card fields</h3>
                                    </div>
                                    <div>
                                        <div className="switch-container" >
                                            <div >
                                                <Switch
                                                    onChange={handleAccount_idChange}
                                                    checked={Account_id}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label" style={{ cursor: "pointer", marginLeft: '7px', marginRight: '2px' }}>Account ID</span>
                                            </div>

                                            <div >
                                                <Switch
                                                    onChange={handlePriorityChange}
                                                    checked={Priority}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"

                                                />
                                                <span className="switch-label" style={{ cursor: "pointer", marginRight: '1px' }}>Priority</span>
                                            </div>

                                            <div>
                                                <Switch
                                                    onChange={handleDays_on_stageChange}
                                                    checked={Days_on_stage}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label" style={{ cursor: "pointer" }}>Days on stage</span>
                                            </div>
                                        </div>

                                        <div className="switch-container" >
                                            <div>
                                                <Switch
                                                    onChange={handleAccount_tagsChange}
                                                    checked={Account_tags}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label" style={{ cursor: "pointer" }}>Account tags</span>
                                            </div>
                                            <div>
                                                <Switch
                                                    onChange={handleStartDateChange}
                                                    checked={startDate}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label" style={{ cursor: "pointer" }}>Start  date</span>
                                            </div>
                                        </div>
                                        <div className="switch-container" >
                                            <div>
                                                <Switch
                                                    onChange={handleNameSwitchChange}
                                                    checked={Name} onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label" style={{ cursor: "pointer" }}>Name</span>
                                            </div>
                                            <div>
                                                <Switch
                                                    onChange={handleDue_dateChange}
                                                    checked={Due_date}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label" style={{ cursor: "pointer" }}>Due date</span>
                                            </div>

                                        </div>
                                        <div className="switch-container" >
                                            <div>
                                                <Switch
                                                    onChange={handleDescriptionChange}
                                                    checked={Description}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label" style={{ cursor: "pointer" }}>Description</span>
                                            </div>

                                            <div>
                                                <Switch
                                                    onChange={handleAssigneesChange}
                                                    checked={Assignees}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label" style={{ cursor: "pointer" }}>Assignees</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="vl"></div>
                            <div className="col-6" style={{ margin: '10px 0 0 10px', }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className='col-6' style={{ display: 'flex', alignItems: 'center', gap: '20px', }} >
                                        <p>Default recurrence setting</p>
                                        <SlQuestion style={{ cursor: 'pointer', color: 'blue' }} />
                                    </div>
                                    <div className="switch-container" >
                                        <Switch
                                            onChange={handleSingleSwitchChange}
                                            checked={singleSwitch}
                                            onColor="#3A91F5"
                                            onHandleColor="#FFF"
                                            handleDiameter={20}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            height={25}
                                            width={45}
                                            className="react-switch"
                                        />
                                        <span className="switch-label" style={{ cursor: "pointer" }}>Enable recurrence</span>
                                    </div>
                                </div>
                                {/* Conditional rendering for additional options */}
                                {singleSwitch && (
                                    <div >
                                        <ul style={{ display: 'flex', gap: '20px', }} >
                                            <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every year</li>
                                            <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every 3 months</li>
                                            <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every month</li>
                                            <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every week</li>
                                            <li style={{ color: 'blue', fontWeight: 'bold', listStyle: 'none', cursor: 'pointer' }}>Every day</li>
                                        </ul>

                                        <div style={{ marginTop: '20px' }}>
                                            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Recurrence period</h2>
                                            <div className='col-12' style={{ display: 'flex', gap: '5px' }}>
                                                <div className='col-6' >
                                                    <label style={{ fontSize: '14px' }}>Start Date</label>
                                                    <div>
                                                        <DatePicker
                                                            selected={startDate}
                                                            onChange={handleStartDateChange}
                                                            className="date-picker-input "
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    <label style={{ fontSize: '14px' }}>Due Date</label>
                                                    <div>
                                                        <DatePicker selected={dueDate} onChange={handleDueDateChange} className="date-picker-input " />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='col-6' style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '20px 0 10px 0', }}>
                                                <h2 style={{ fontSize: '18px' }}>Repeats every</h2>
                                                <SlQuestion style={{ cursor: 'pointer', color: 'blue' }} />
                                            </div>
                                            <div className='col-12' style={{ display: 'flex', gap: '5px' }}>
                                                <input type='text' className='col-3 day-input' />
                                                <Select className='col-3' />
                                                <p style={{ marginTop: '10px', textAlign: 'center' }} className='col-2'>on the</p>
                                                <Select className='col-4' />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>


                    </div>
                    <div className='create-stages col-10' style={{ margin: '20px 0 10px 10px', }}>
                        <div className='stages-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Stages</h3>

                            <button className=' col-2' onClick={handleAddStage} style={{ border: 'none', backgroundColor: '#e4e9f7' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'blue', fontSize: '15px', cursor: 'pointer', }}>
                                    <LuPlusCircle />
                                    <span>Add stages</span>
                                </div>
                            </button>

                        </div>
                        <hr />

                        <div className='stages col-12' style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                            {stages.map((stage, index) => (
                                <div key={index} className='stage-board col-3' style={{ height: 'auto', marginTop: '20px', borderRadius: '10px', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                                    {/* Render stage content */}
                                    <div style={{ margin: '10px' }}>
                                        <div className='board-header' style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <RxDragHandleDots2 />
                                            <div className="input-icon">
                                                <LuPenLine className="edit-icon" />
                                                <input type="text" value={stage.name} onChange={(e) => handleStageNameChange(e, index)} placeholder="Stage Name" style={{ border: 'none', padding: '10px' }} />
                                            </div>
                                            <RiDeleteBin6Line style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteStage(index)} />
                                        </div>
                                        <hr />
                                        <div className='stage-body'>
                                            <h3 style={{ fontSize: '15px', margin: '5px 0 5px 0' }}>Stage conditions</h3>
                                            <p style={{ fontSize: '14px' }}>First stage can't have conditions</p>
                                            <br />
                                            <h3 style={{ fontSize: '15px', margin: '5px 0 5px 0' }}>Automations</h3>
                                            <p style={{ fontSize: '14px' }}>Triggered when job enters stage</p>
                                            <br />
                                            <li style={{ listStyle: 'none', cursor: 'pointer', color: 'blue', fontWeight: 'bold' }}>add Automations</li>
                                            <br />
                                            <h3 style={{ fontSize: '15px', margin: '5px 0 5px 0' }}>Automove</h3>
                                            <p style={{ fontSize: '14px' }}>Move jobs automatically when linked actions are completed</p>
                                            <div className="switch-container" style={{ marginTop: '10px' }}>
                                                <Switch
                                                    onChange={handleAutoMoveChange}
                                                    checked={autoMoveJob}
                                                    onColor="#3A91F5"
                                                    onHandleColor="#FFF"
                                                    handleDiameter={20}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    height={25}
                                                    width={45}
                                                    className="react-switch"
                                                />
                                                <span className="switch-label" style={{ cursor: "pointer" }}>Automove jobs</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='add-stage-btn col-3' style={{ marginTop: '20px' }}>
                                <button className='col-12' onClick={handleAddStage}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'blue', padding: '15px', fontSize: '15px', cursor: 'pointer' }}>
                                        <LuPlusCircle />
                                        <span>Add stages</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <button onClick={createPipe}>Save</button>
                        <button onClick={handleClose}>cancel</button>
                    </div>
                </div>

            </>
            <ToastContainer />
        </div >
    );

}

export default CreatePipeline;