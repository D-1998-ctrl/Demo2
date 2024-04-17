import React, { useState, useEffect } from 'react';
import Select from "react-select";
import Switch from "react-switch";
import { LuPlusCircle } from "react-icons/lu";
import DatePicker from 'react-datepicker'; // Import date picker
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker stylesheet
import { SlQuestion } from "react-icons/sl";

import makeAnimated from "react-select/animated";
import "./addjobs.css"
import TextEditor from '../component/TextEditor';
import Priority from '../component/priority.js'
import { ToastContainer, toast } from 'react-toastify';

// import { useHistory } from 'react-router-dom';
const AddJobs = () => {
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

    const options = [

        { value: '4', label: 'create a job template', url: './JobTemplate.js' }
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (selectedOption) => {
        setSelectedOption(selectedOption);
        if (selectedOption && selectedOption.url) {
            window.location.href = selectedOption.url;
        }
    };

    const [priority, setPriority] = useState(" ");

    // Handler function to update state when priority changes
    const handlePriorityChange = (selectedOption) => {
        setPriority(selectedOption);
    };


    // Integration//
    //   react Select =>

    //****************Users */
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
    const useroptions = userdata.map((user) => ({
        value: user._id,
        label: user.username

    }));

    //****************Accounts */
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

    //******************************Pipeline */

    const [pipelinedata, setpipelinedata] = useState([]);
    const [selectedpipeline, setSelectedpipeline] = useState();

    const handlePipelineChange = (selectedOptions) => {
        setSelectedpipeline(selectedOptions);
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


    //******************************Job Template */

    const [jobtemplatedata, setjobtemplatedata] = useState([]);
    const [selectedjobtemplate, setSelectedjobtemplate] = useState();

    const handleJobTemplateChange = (selectedOptions) => {
        setSelectedjobtemplate(selectedOptions);
    }

    useEffect(() => {
        fetchJobTemplateData();
    }, []);

    const fetchJobTemplateData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/workflow/jobtemplate");
            const data = await response.json();
            setjobtemplatedata(data.JobTemplates);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const jobtemplateoptions = Array.isArray(jobtemplatedata)
        ? jobtemplatedata.map((jobtemplate) => ({
            value: jobtemplate._id,
            label: jobtemplate.templatename,
        })) : [];



    const [jobDescription, setJobDescription] = useState("");
    const [jobName, setJobName] = useState("");
    const [startsin, setstartsin] = useState("");
    const [startsinduration, setstartsinduration] = useState("");
    const [duein, setduein] = useState("");
    const [dueinduration, setdueinduration] = useState("");
    const [comments, setcomments] = useState("");

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


    console.log(priority?.value);
    console.log(combinedValues);
    console.log(combinedaccountValues);
    console.log(jobDescription);
    console.log(jobName);
    console.log(selectedpipeline);
    console.log(selectedjobtemplate);
    console.log(startDate);
    console.log(dueDate);
    console.log(absoluteDate);
    console.log(startsin);
    console.log(startsinduration);
    console.log(duein);
    console.log(dueinduration);



    const createjob = () => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            accounts: combinedaccountValues,
            pipeline: selectedpipeline.value,
            templatename: selectedjobtemplate.value,
            jobname: jobName,
            jobassignees: combinedValues,
            priority: priority?.value,
            description: jobDescription,
            absolutedates: absoluteDate,
            startsin: startsin,
            startsinduration: startsinduration,
            duein: duein,
            dueinduration: dueinduration,
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

        fetch("http://127.0.0.1:8080/workflow/job/", requestOptions)
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
                
            })
            .catch((error) => {
                // Handle errors
                console.error(error);
                toast.error("Failed to create Job Template");
            })

    }



    return (
        <>
            <div className='add-jobs-container col-10'>
                <div className='add-jobs-header' style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                    <h3>Add Job</h3>
                    <button className=' col-1' style={{ border: 'none', backgroundColor: '#e4e9f7' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'blue', fontSize: '15px', cursor: 'pointer', }}>
                            <LuPlusCircle />
                            <span>Add </span>
                        </div>
                    </button>

                </div>
                <hr style={{ margin: '0 10px 0 10px' }} />
                <div className='add-jobs-form-area'>
                    <div className='add-jobs-create-form col-6' >
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Accounts</label>
                            </div>
                            <Select className='add-jobs-select-dropdown'
                                placeholder="Accounts"
                                options={accountoptions}
                                components={animatedComponents}
                                isMulti // Enable multi-select
                                value={selectedaccount}
                                isSearchable // Enable search
                                onChange={handleAccountChange} />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Pipeline</label>
                            </div>
                            <Select className='add-jobs-select-dropdown'
                                placeholder="Pipeline"
                                options={pipelineoptions}
                                components={animatedComponents}
                                value={selectedpipeline}
                                isSearchable // Enable search
                                isClearable
                                onChange={handlePipelineChange} />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Template</label>
                            </div>
                            <Select className='add-jobs-select-dropdown'
                                placeholder="Template"
                                options={jobtemplateoptions}
                                components={animatedComponents}
                                value={selectedjobtemplate}
                                isSearchable // Enable search
                                isClearable
                                onChange={handleJobTemplateChange} />
                        </div>
                        <div>
                            <label style={{ fontSize: '14px' }}>Name</label>
                            <input type='text' className='job-input' onChange={(e) => setJobName(e.target.value)} />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Job Assignees</label>
                            </div>
                            <Select className='add-jobs-select-dropdown'
                                placeholder="Assignees"
                                options={useroptions}
                                components={animatedComponents}
                                isMulti // Enable multi-select
                                value={selecteduser}
                                isSearchable // Enable search
                                onChange={handleuserChange} />
                        </div>
                        <div className='add-jobs-select-container'>
                            <div className='add-jobs-label-container'>
                                <label>Priority</label>
                            </div>
                            <Priority onPriorityChange={handlePriorityChange} className='add-jobs-select-dropdown' />
                        </div>
                        <div style={{ marginTop: '20px', }}>
                            <TextEditor onDescriptionChange={updateJobDescription} selectedText={jobDescription} />
                        </div>
                        <div className='dates-switches col-12' style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <h3>Start and Due Date</h3>
                            <div className="add-jobs-switch-container" style={{ marginTop: '10px' }}>
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
                                    className="add-jobs-react-switch"
                                />
                                <span className="add-jobs-switch-label" style={{ cursor: "pointer" }}>Absolutes Dates</span>
                            </div>

                        </div>
                        {absoluteDate && (


                            <div className='col-12 absoluteDate ' style={{ display: 'flex', gap: '5px', marginTop: '30px' }}>
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
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'> <p>Starts In </p>
                                        <SlQuestion style={{ color: 'blue' }} />
                                    </div>
                                    <div className='col-5'>
                                        <input type='text' className='date-input' placeholder='0' onChange={(e) => setstartsin(e.target.value)} />
                                    </div>
                                    <div className='col-5'>
                                        <Select className='add-jobs-select-dropdown ' options={dayoptions}
                                            onChange={handlestartindateChange} />
                                    </div>

                                </div>
                                <div className='col-12' style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='col-2'> <p>Due In </p>
                                        <SlQuestion style={{ color: 'blue' }} />
                                    </div>
                                    <div className='col-5'>
                                        <input type='text' className='date-input' placeholder='0' onChange={(e) => setduein(e.target.value)} />
                                    </div>
                                    <div className='col-5'>
                                        <Select className='add-jobs-select-dropdown '
                                            options={dayoptions}
                                            onChange={handledueindateChange} />
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>

                    <div className="vl"></div>

                    <div className='comments-wiki col-6' >
                        <div style={{ margin: '10px' }}>
                            <h3>Comments</h3>
                            <p style={{ textAlign: 'center', margin: '20px', color: 'gray' }}>No comments attached</p>
                        </div>

                        <div style={{ margin: '10px' }}>
                            <h3>Wiki pages</h3>
                            <p style={{ textAlign: 'center', margin: '20px', color: 'gray' }}>No wiki pages attached</p>
                        </div>
                    </div>


                </div>

                <hr style={{ margin: '0 10px 20px 10px' }} />

                <div className='bottom-buttons'>
                    <div className='bottom-buttons-group col-6' style={{ display: 'flex', gap: '10px', marginLeft: '10px', marginBottom: '20px' }}>
                        <button type='submit' style={{ padding: '10px', borderRadius: '10px', cursor: 'pointer', background: 'blue', color: '#fff', border: 'none', fontSize: '15px' }} onClick={createjob} className='col-2'>Add</button>
                        <button type='reset' style={{ padding: '10px', borderRadius: '10px', cursor: 'pointer', background: '#fff', color: 'blue', border: '1px solid blue', fontSize: '15px' }} className='col-2'>Cancle</button>
                    </div>
                </div>
            </div>

<ToastContainer/>
        </>
    );
}

export default AddJobs;
