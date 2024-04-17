import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { RiAddCircleLine } from 'react-icons/ri';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsQuestionCircle } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EmailTempsend = () => {
  const animatedComponents = makeAnimated();
  const [selectsortcode, setSelectShortcode] = useState("");
  const [userdata, setUserData] = useState([]);
  const [email, setEmail] = useState("");





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
        { title: 'Custom field:Account', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
        { title: 'Contact Shortcodes', isBold: true, value: 'Contact_Shortcodes' },
        { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
        { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
        { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
        { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
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
        { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
        { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
        { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
        { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
        { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
        { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
        { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
        { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
        { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
        { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
        { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
        { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
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
      const accountShortcuts = [
        { title: 'Account Shortcodes', isBold: true },
        { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
        { title: 'Custom field:Account', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
        { title: 'Date Shortcodes', isBold: true },
        { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
        { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
        { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
        { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
        { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
        { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
        { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
        { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
        { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
        { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
        { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
        { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
        { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
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



      ]; setShortcuts(accountShortcuts);
    }
  }, [selectedOption]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);

  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownhtml, setShowDropdownhtml] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShortcuts, setFilteredShortcuts] = useState([]);

  const dropdownRef = useRef(null);

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


  const [textareaValue, setTextareaValue] = useState('');

  const onTextareaChange = (e) => {
    const { value } = e.target;
    setTextareaValue(value);
    console.log(textareaValue)

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


  const handleemail = (e) => {
    setEmail(e.target.value);
  };


  const [selecteduser, setSelectedUser] = useState();
  const [selectaccId, setselectaccId] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/admin/accountdetails");
      const data = await response.json();
      setUserData(data.accounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(userdata);
  const option = userdata.map((user) => ({
    value: user._id,
    label: user.accountName
  }));



  const handleuserChange = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSelectedUser(selectedOption);
    } else {
      console.error("Invalid selected options:", selectedOption);
    }
  };

  useEffect(() => {
    if (selecteduser && selecteduser.value) {
      setselectaccId(selecteduser.value);
    }
  }, [selecteduser]);



  const [usetemp, setUserTemp] = useState([]);


  const [selectedTemp, setSelectededTemp] = useState();


  const [selecttempId, setselectTempId] = useState();
  useEffect(() => {
    fetchDataemail();
  }, []);

  const fetchDataemail = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/workflow/emailtemplate");
      const data = await response.json();
      setUserTemp(data.emailTemplate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(userdata);
  const options = usetemp.map((user) => ({
    value: user._id,
    label: user.templatename
  }));

  const handletempemail = (selectedOptions) => {
    if (selectedOptions && selectedOptions.value) {
      setSelectededTemp(selectedOptions);
      fetchDataemaildetails(selectedOptions.value);
    } else {
      console.error("Invalid selected options:", selectedOptions);
    }
  };

  useEffect(() => {
    if (selectedTemp && selectedTemp.value) {
      setselectTempId(selectedTemp.value);

    }
  }, [selectedTemp]);

  const [fetchtemplatedata, setFetchTemplateData] = useState()

  useEffect(() => {
    fetchDataemaildetails();
  }, []);

  const fetchDataemaildetails = async (selecttempId) => {
    try {
      const response = await fetch("http://127.0.0.1:8080/workflow/emailtemplate/" + selecttempId);
      const data = await response.json();
      setFetchTemplateData(data.emailTemplate);
      dataupdated(data.emailTemplate)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };










  const [dataGetEmail, setDataGetEmail] = useState("");
  const datasend = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      emailtemplateid: selecttempId,
      accountid: selectaccId,
      templatename: templateName,
      emailsubject: inputText,
      emailbody: textareaValue
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    let responseData; // Define a variable to store the response data

    fetch("http://127.0.0.1:8080/templateMailSend", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        responseData = result; // Store the response data in the variable
        setDataGetEmail(responseData)
        toast.success('Email sent successfully');
        window.location.reload()// Log the response data to the console
      })
      .catch((error) => console.error(error));
  };


  const handleValidation = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return false;
    }
    return true;
  };

  const handleSend = () => {
    if (handleValidation()) {
      datasend();
    }
  };


  const [templateName, setTemplateName] = useState("");
  const [inputText, setInputText] = useState('');
  const [selectedShortcut, setSelectedShortcut] = useState('');

  const [selectedShortcuthtml, setSelectedShortcuthtml] = useState('');

  const dataupdated = (txt) => {

    setTemplateName(txt.templatename);
    setInputText(txt.emailsubject)

    setTextareaValue(txt.emailbody)


  }



  const handleInputChange1 = (e) => {
    setTemplateName(e.target.value);
  };







  return (
    <div className='from' style={{ padding: "50px" }}>
      <div className="form__row">
        <div className="form_col form_col_100">
          <div className="_select_5n3c2_115">
            <label className="_selectLabel_5n3c2_221">Account</label>
            <div className="react-select-container css-b62m3t-container">

              <div className="select-container">
                <Select className='job-template-select-dropdown'
                  placeholder="Account"
                  options={option}
                  components={animatedComponents}
                  isMulti={false} // Enable multi-select
                  value={selecteduser}
                  isClearable={true}

                  isSearchable
                  onChange={handleuserChange}
                />
              </div>
            </div>
          </div>

          <div className="_select_5n3c2_115">
            <label className="_selectLabel_5n3c2_221">Email Template</label>
            <div className="react-select-container css-b62m3t-container">

              <div className="select-container">
                <Select className='job-template-select-dropdown'
                  placeholder="Email Template"
                  options={options}
                  components={animatedComponents}
                  isMulti={false} // Enable multi-select
                  value={selectedTemp}
                  isClearable

                  isSearchable
                  onChange={handletempemail}
                />
              </div>
            </div></div></div>
      </div>

      <div className='inputemail'>
        <label>Email</label>
        <input placeholder='Enter Email' type='email' onChange={handleemail} />
      </div>

      <div>

        {/* Display email template data */}
        {fetchtemplatedata && (

          <div className="form_col form_col_100">
            <label className="_input_1k08l_1">
              <span className="_inputLabel_1k08l_46">Template Name</span>
              <div className="_field_1k08l_14" >
                <input
                  className="simple-input"
                  placeholder="Template Name"
                  type="text"
                  value={templateName}
                  onChange={handleInputChange1}

                />
              </div>
            </label>

            <div className="m-t-15 m-b-10">
              <h2 className="panel__subtitle d-flex flex-center-align">
                Mode
                <button style={{ background: "none", border: 'none' }}
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

              <div className="form__row">

                <button type="button" style={{ background: "none", border: 'none' }} className="btn  add-shortcut-button" onClick={toggleDropdown}>
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
                      <button className="close-icon" style={{ fontSize: "20px", marginTop: '4px' }} onClick={toggleDropdown}>
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

            </section>

            
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
                            {mode === 'wysiwyg' && (
                                <section className="form__section">
                                    <div className="form__row">
                                        <div className="form_col form_col_100">
                                            {/* Apply custom CSS to remove the border */}


                                            <textarea
                                                className="wysiwyg"
                                                value={textareaValue + selectedShortcuthtml}
                                                id="editor"
                                                name="editor"
                                                placeholder="Body  "
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
                                                value={textareaValue + selectedShortcuthtml}
                                                id="editor"
                                                name="editor"
                                                placeholder="Body  "
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
                                                <button className="close-icon" style={{ fontSize: "20px", marginTop: '4px' }} onClick={toggleDropdown}>
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
    

        )}
        
      
      </div>
      
      <div>
       
        <button onClick={handleSend}>Send </button>

        <button >Cancel </button>
      </div>
      <ToastContainer />
    </div>


  )
}

export default EmailTempsend