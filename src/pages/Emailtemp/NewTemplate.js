import React, { useState, useRef, useEffect } from 'react';
import "../../pages/Emailtemp/email.css"
import Select from 'react-select';
import { RiAddCircleLine } from 'react-icons/ri';

import { useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BsQuestionCircle } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-toastify/dist/ReactToastify.css';
import makeAnimated from 'react-select/animated';

const NewTemplate = () => {
    const navigate = useNavigate();

    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const toggleHelp = () => {
        setIsHelpOpen(!isHelpOpen);
        // Add your logic here to toggle the help content or perform any other action
    };



    const [selectedOption, setSelectedOption] = useState('contacts'); // Default selected option


    const [shortcuts, setShortcuts] = useState([]);

    
    useEffect(() => {
        if (selectedOption === 'contacts') {
            // Set contact shortcuts
            const contactShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Contact Shortcodes', isBold: true,  },
                { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
                { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
                { title: 'Middle Name', isBold: false , value: 'MIDDLE_NAME'},
                { title: 'Last Name', isBold: false , value: 'LAST_NAME'},
                { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
                { title: 'Country', isBold: false, value: 'COUNTRY' },
                { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
                { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
                { title: 'City', isBold: false, value: 'CITY' },
                { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
                { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
                { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },
        
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value:'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME'},
                { title: 'Current week', isBold: false, value:'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false , value:'CURRENT_MONTH_NUMBER'},
                { title: 'Current month name', isBold: false , value:'CURRENT_MONTH_NAME'},
                { title: 'Current quarter', isBold: false , value: 'CURRENT_QUARTER'},
                { title: 'Current year', isBold: false, value:'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value:'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value:'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value:'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value:'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
        
        
        
            ]; 
            setShortcuts(contactShortcuts);
        } else if (selectedOption === 'account') {
            // Set account shortcuts
            const accountShortcuts =[
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value:'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME'},
                { title: 'Current week', isBold: false, value:'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false , value:'CURRENT_MONTH_NUMBER'},
                { title: 'Current month name', isBold: false , value:'CURRENT_MONTH_NAME'},
                { title: 'Current quarter', isBold: false , value: 'CURRENT_QUARTER'},
                { title: 'Current year', isBold: false, value:'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value:'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value:'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value:'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value:'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
        
        
        
            ];setShortcuts(accountShortcuts);
        }
    }, [selectedOption]);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
     
    };

 

    //     setSelectedOptions(e.target.value);
    //     console.log(templateName)

    // };




    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownhtml, setShowDropdownhtml] = useState(false);
    const [selectedShortcut, setSelectedShortcut] = useState('');
    const [selectedShortcuthtml, setSelectedShortcuthtml] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const [inputText, setInputText] = useState('');
    const dropdownRef = useRef(null);

  // Define your shortcut options here

    useEffect(() => {
        setFilteredShortcuts(shortcuts.filter(shortcut => shortcut.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, shortcuts]);


    const handleAddShortcut = (shortcut) => {
        setInputText(prevText => prevText + `[${shortcut}]`);
        setShowDropdown(false);
      
       
    };

    const handleAddShortcuthtml = (shortcut) => {
        setTextareaValue(prevText => prevText + `[${shortcut}]`);
        setShowDropdownhtml(false);
    };
    

    

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
            setShowDropdownhtml(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        setSearchTerm(''); // Clear search term when showing the dropdown
    };
    const toggleDropdownhtml = () => {
        setShowDropdownhtml(!showDropdownhtml);
        setSearchTerm(''); // Clear search term when showing the dropdown
    };
 

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputText(value); // Update inputText state with the new value
        // console.log("Email Subject:", value); // Log the value to the console
    };





    const [mode, setMode] = useState('wysiwyg'); // State to track the current mode

    const handleModeChange = (newMode) => {
        setMode(newMode);
        console.log("Mode:", newMode); // Log the selected mode to the console
    };







    const [textareaValue, setTextareaValue] = useState('');
    const onTextareaChange = (e) => {
        const { value } = e.target;
        setTextareaValue(value);
        console.log(textareaValue  )
    
    };





    const [templateName, setTemplateName] = useState("");

    const handleInputChange1 = (e) => {
        setTemplateName(e.target.value);


    };




    const animatedComponents = makeAnimated();
    const [userdata, setUserData] = useState([]);
    const [selecteduser, setSelectedUser] = useState();
  


    const handleuserChange = (selectedOptions) => {
        setSelectedUser(selectedOptions);
        // Map selected options to their values and send as an array
       
    }




    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/common/user/");
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // console.log(userdata);
    const option = userdata.map((user) => ({
        value: user._id,
        label: user.username
    }));



    const handleValidation = () => {
        if (!inputText.trim() || !textareaValue.trim()) {
            toast.error('Please fill in all fields');
            return false;
        }
        return true;
    };


    const SendData = () => {
        // Validation checks
        if (handleValidation()) {
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            templatename: templateName,
            from: selecteduser.value,
            emailsubject: inputText ,
            wysiwyg: "true",
            html: "false",
            emailbody: textareaValue  ,
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        fetch("http://127.0.0.1:8080/workflow/emailtemplate", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((result) => {
                // Show success message
                
                toast.success('Data sent successfully');
                 
                navigate('/emailtemplate');     
            })
            .catch((error) => {
                // Show error message
                
                console.error(error);
            });
        }
    }



    //integration 
    //   react Select =>







    return (
        <div className="panel">
        
            <div className="panel__header">
                <h1 className="panel__title">Create email template</h1>
            </div>
            <div className="panel__content">
                <form noValidate="">
                    <div className="form">
                        {/* Template Name */}
                        <section className="form__section">
                            <div className="form__row">
                                <div className="form_col form_col_100">
                                    <label className="_input_1k08l_1">
                                        <span className="_inputLabel_1k08l_46">Template Name</span>


                                        <div className="_field_1k08l_14" >
                                            <input

                                                className="simple-input"
                                                placeholder="Template Name"
                                                type="text"

                                                onChange={handleInputChange1}

                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Mode */}
                        <div className="m-t-15 m-b-10">
                            <h2 className="panel__subtitle d-flex flex-center-align">
                                Mode
                                <button style={{background:"none",border:'none'}}
                                    type="button"
                                    className="help-block__link"
                                    onClick={toggleHelp}
                                >
                                    <BsQuestionCircle className={`v2-icon ${isHelpOpen ? 'active' : ''}`} color="#007bff" />
                                </button>
                                {/* Render your help content conditionally based on isHelpOpen state */}
                                {isHelpOpen && (
                                    <div className="help-content">
                                        {/* Your help content goes here */}
                                    </div>
                                )}
                            </h2>
                            <div className="form__row">
                                <div className="form_col form_col_100 m-t-10">
                                    <label className="radio" data-test="import-shared-radio-component">
                                        <div className="radio__header">
                                            <input
                                                className="radio__input"
                                                type="radio"
                                                data-test="shared-radio-input"
                                                value="contacts"
                                                checked={selectedOption === 'contacts'}
                                                onChange={() => handleOptionChange('contacts')}
                                            />
                                            <div className="radio__border">
                                                <div className="radio__dot"></div>
                                            </div>
                                            <div className="radio__label" data-test="shared-radio-label">
                                                Use contact shortcodes
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="form__row">
                                <div className="form_col form_col_100 m-t-15">
                                    <label className="radio" data-test="import-shared-radio-component">
                                        <div className="radio__header">
                                            <input
                                                className="radio__input"
                                                type="radio"
                                                data-test="shared-radio-input"
                                                value="account"
                                                checked={selectedOption === 'account'}
                                                onChange={() => handleOptionChange('account')}
                                            />
                                            <div className="radio__border">
                                                <div className="radio__dot"></div>
                                            </div>
                                            <div className="radio__label" data-test="shared-radio-label">
                                                Use account shortcodes
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="form__row">
                            <div className="form_col form_col_100">
                                <div className="_select_5n3c2_115">
                                    <label className="_selectLabel_5n3c2_221">From</label>
                                    <div className="react-select-container css-b62m3t-container">
                                        <div className="select-container">
                                            <Select className='job-template-select-dropdown'
                                                placeholder="Form"
                                                options={option}
                                                components={animatedComponents}
                                                isMulti ={false} // Enable multi-select
                                                value={selecteduser}
                                               isClearable
                                               
                                               isSearchable
                                                onChange={handleuserChange}
                                            />

                                        </div>
                                        <div className="react-select__indicators css-tlfecz-indicators">
                                            <div className="react-select__indicator css-1wy0on6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="form__section">
                            <div className="form__row">
                                <div className="form_col form_col_100">
                                    <label className="_input_1k08l_1">
                                        <span className="_inputLabel_1k08l_46">Email Subject</span>
                                        <div className="_field_1k08l_14" data-test="input-wrapper">
                                            <input
                                                autoCapitalize="off"
                                                className="simple-input"
                                                placeholder="Email Subject"
                                                type="text"
                                                value={inputText + selectedShortcut}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </section>

                        <div className="form__row">

                            <button type="button" style={{background:"none",border:'none'}} className="btn  add-shortcut-button" onClick={toggleDropdown}>
                                <RiAddCircleLine className="add-shortcut-icon" /> Add Shortcode
                            </button>
                            {showDropdown && (
                                <div className="dropdown" ref={dropdownRef}>
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder="Search shortcuts"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        <button className="close-icon" style={{fontSize:"20px",marginTop:'4px'}} onClick={toggleDropdown}>
                                        <IoIosCloseCircleOutline />
                                        </button>
                                    </div>
                                    <ul className="dropdown-list">
                                        {filteredShortcuts.map(shortcut => (
                                            <div key={shortcut.title}>
                                                <span
                                                    style={{ fontWeight: shortcut.isBold ? 'bold' : 'normal', cursor: 'pointer' }}
                                                    onClick={() => handleAddShortcut(shortcut.value)}>
                                                    {shortcut.title}
                                                </span>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="mode-selector">
                                <label>
                                    <input
                                        type="radio"
                                        value="wysiwyg"
                                        checked={mode === 'wysiwyg'}
                                        onChange={() => handleModeChange('wysiwyg')}
                                    />
                                    WYSIWYG
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="html"
                                        checked={mode === 'html'}
                                        onChange={() => handleModeChange('html')}
                                    />
                                    HTML
                                </label>
                            </div>

                            {/* WYSIWYG Editor */}
                            {mode === 'wysiwyg' && (
                                <section className="form__section">
                                    <div className="form__row">
                                        <div className="form_col form_col_100">
                                            {/* Apply custom CSS to remove the border */}



                                            <textarea
                                                className="wysiwyg"
                                                id="editor"
                                                name="editor"
                                                placeholder="Body  "
                                                value={textareaValue + selectedShortcuthtml}
                                                onChange={onTextareaChange}// Log the content of the textarea to the console
                                            ></textarea>

                                        </div>
                                    </div>
                                    <button type="button" style={{background:"none",border:'none'}} className="btn  add-shortcut-button" onClick={toggleDropdownhtml}>
                                <RiAddCircleLine className="add-shortcut-icon" /> Add Shortcode
                            </button>
                            {showDropdownhtml && (
                                <div className="dropdown" ref={dropdownRef}>
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder="Search shortcuts"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        <button className="close-icon" style={{fontSize:"20px",marginTop:'4px'}} onClick={toggleDropdown}>
                                        <IoIosCloseCircleOutline />
                                        </button>
                                    </div>
                                    <ul className="dropdown-list">
                                        {filteredShortcuts.map(shortcut => (
                                            <div key={shortcut.title}>
                                                <span
                                                    style={{ fontWeight: shortcut.isBold ? 'bold' : 'normal', cursor: 'pointer' }}
                                                    onClick={() => handleAddShortcuthtml(shortcut.value)}>
                                                    {shortcut.title}
                                                </span>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            )}

                              
                         
                                </section>
                            )}

                            {/* HTML Editor */}
                            {mode === 'html' && (
                                <section className="form__section">
                                    <div className="form__row">
                                        <div className="form_col form_col_100">
                                            <textarea
                                                className="wysiwyg"
                                                id="editor"
                                                name="editor"
                                                placeholder="Body  "
                                                value={textareaValue + selectedShortcuthtml}
                                                onChange={onTextareaChange}// Log the content of the textarea to the console
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button type="button" style={{background:"none",border:'none'}} className="btn  add-shortcut-button" onClick={toggleDropdownhtml}>
                                <RiAddCircleLine className="add-shortcut-icon" /> Add Shortcode
                            </button>
                            {showDropdownhtml && (
                                <div className="dropdown" ref={dropdownRef}>
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            placeholder="Search shortcuts"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        <button className="close-icon"  style={{fontSize:"20px",marginTop:'4px'}} onClick={toggleDropdown}>
                                        <IoIosCloseCircleOutline />
                                        </button>
                                    </div>
                                    <ul className="dropdown-list">
                                        {filteredShortcuts.map(shortcut => (
                                            <div key={shortcut.title}>
                                                <span
                                                    style={{ fontWeight: shortcut.isBold ? 'bold' : 'normal', cursor: 'pointer' }}
                                                    onClick={() => handleAddShortcuthtml(shortcut.value)}>
                                                    {shortcut.title}
                                                </span>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            )}

                                </section>
                            )}

                            

                        </div>



                    </div>
                </form>

            </div>
            <div className="form__row m-t-30 d-flex">
                <div className="form_col form_col_50 d-flex">
                    <button type="submit" onClick={SendData}   href="/listemail"   className="btn btn-success btn-block mr-1">
                        Save & Exit
                    </button>
                    <button onClick={SendData}  className="btn btn-primary btn-block mr-1">
                        Save
                    </button>
                    <button type="button" className="btn btn-secondary btn-block">
                        Cancel
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default NewTemplate;