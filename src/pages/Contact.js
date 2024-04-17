
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
// import Tag from "../component/Tag";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaPlus, FaTrash, FaPaperPlane } from "react-icons/fa";
import "./Contact.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Contact({ handleContactClose }) {
  //country===>
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const animatedComponents = makeAnimated();

  const [selectedValues, setSelectedValues] = useState([]);
  const [combinedValues, setCombinedValues] = useState([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const selectedCountryData = countries.find(
        (country) => country.name === selectedCountry
      );
      if (selectedCountryData) {
        setStates(selectedCountryData.states);
      }
    }
  }, [selectedCountry, countries]);
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  //Tag FetchData ================

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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

const options = tags.map((tag) => ({
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
    padding:"2px,8px",

    fontSize:'10px',
    width: `${calculateWidth(tag.tagName)}px`,
    margin:'7px'
  },
}));


  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width:state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      marginBottom: state.data.customStyle.marginBottom,
   
      fontSize:state.data.customStyle.fontSize,
      padding:state.data.customStyle.padding,
      margin:state.data.customStyle.margin,

    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      textAlign: state.data.customStyle.textAlign,
      fontSize:state.data.customStyle.fontSize,
  
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.customStyle.color,
      width:state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      fontSize:state.data.customStyle.fontSize,
   
    }),
  };
  ///create Contact Multiple
  const [contacts, setContacts] = useState([]);
  const [emptyError, setEmptyError] = useState(false);

  useEffect(() => {
    // console.log("Contacts Array:", contacts);
  }, [contacts]); // Triggered whenever 'contacts' state changes

  const addContactInput = () => {
    if (
      contacts.length === 0 ||
      contacts.every((contact) => contact.value.trim() !== "")
    ) {
      const newId = contacts.length;
      const label =
        contacts.length === 0 ? "Primary Contact" : "Additional Contact";
      setContacts([...contacts, { id: newId, value: "", label }]);
      setEmptyError(false);
    } else {
      setEmptyError(true);
    }
  };

  const removeContactInput = (id) => {
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(filteredContacts);
  };

  const handleChange = (value, id) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, value } : contact
    );
    setContacts(updatedContacts);
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);

    // Map selected options to their values and send as an array
    const selectedValues = selectedOptions.map((option) => option.value);

    // Send selectedValues array to your backend
    console.log("Selected Values:", selectedValues);
    setCombinedValues(selectedValues);
  };

  //===============================================

  const [firstName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [note, setNote] = useState("");
  const [ssn, setSSN] = useState("");
  const [email, setEmail] = useState("");

  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  //  useEffect(() => {

  // }, [combinedValues]);
  // console.log(selectedValues);
  //Data Post *Contact create

  const sendingData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: firstName,
      middleName: lastName,
      lastName: middleName,
      contactName: contactName,
      companyName: companyName,
      note: note,
      ssn: ssn,
      email: email,
      login: false,
      notify: false,
      emailSync: false,
      tags: combinedValues,

      country: country,
      streetAddress: streetAddress,
      city: city,
      state: state,
      postalCode: postalCode,
      phoneNumbers: contacts,

      active: true,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/common/contact/", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((result) => {
      // Handle success
      toast.success("Contact created successfully");
      window.location.reload();
      // Additional logic after successful creation if needed
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      toast.error("Failed to create contact");
    })
      
  };

  // phone number======================================

  const [isPhoneNumberFormVisible, setIsPhoneNumberFormVisible] =
    useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const togglePhoneNumberForm = () => {
    setIsPhoneNumberFormVisible(!isPhoneNumberFormVisible);
  };

  const addPhoneNumber = () => {
    setPhoneNumbers([phoneNumbers, ""]);
  };

  const navigate = useNavigate();
  const handleback = () => {
    navigate("/#");
  };




  const handleFirstNameChange = (e) => {
    setFirsName(e.target.value);
    updateContactName();
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
    updateContactName();
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    updateContactName();
  };

  const updateContactName = () => {
    setContactName(`${firstName} ${middleName} ${lastName}`);
};


  return (
    <div className="create-Contact col-12">
      <div className="contact-header col-12">
        <h3 className="contact_title">New Contact</h3>
        <button className="contactheader-button">
          <RxCross2 onClick={handleContactClose} />
        </button>
      </div>

      <div
        className="contact-information-section col-12"
        style={{ display: "flex", marginTop: "5%" }}
      >
        <div
          className="middle-title col-12"
          style={{
            display: "flex",
            margin: "2%",
            flexWrap: "wrap",
            fontSize: "16px",
            fontFamily: "sans-serif",
          }}
        >
          <h5>Contact info</h5>
        </div>
      </div>
      <div
        className="name_container col-12"
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "5%",
          fontSize: "14px",
          color: "CaptionText",
          fontFamily: "sans-serif",
        }}
      >
        <div
          className="first-name col-4"
          style={{ flex: "1", padding: "10px" }}
        >
          <label>First name</label>
          <input
            type="text"
            id="first_name"
            value={firstName} onChange={handleFirstNameChange}
            style={{
              width: "100%",
              padding: "2px",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "35px",
            }}
          />
        </div>
        <div
          className="middle-name col-4"
          style={{ flex: "1", padding: "10px" }}
        >
          <label>Middle name</label>
          <input
            type="text"
            id="middle_name col-4"
            value={middleName} onChange={handleMiddleNameChange}
            style={{
              width: "100%",
              padding: "2px",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "35px",
            }}
          />
        </div>
        <div className="last-name col-4" style={{ flex: "1", padding: "10px" }}>
          <label>Last name</label>
          <input
            type="text"
            id="last_name"
            value={lastName} onChange={handleLastNameChange} 
            style={{
              width: "100%",
              padding: "2px",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "35px",
            }}
          />
        </div>

        <div
          className="col-12"
          style={{
            flexFlow: "wrap",
            display: "flex",
            padding: "10px",
            flexDirection: "column",
          }}
        >
          <label>Contact name</label>
          <input
            type="text"
            id="contact_name" value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "35px",
            }}
          />
        </div>

        <div
          className="col-12"
          style={{
            flexFlow: "wrap",
            display: "flex",
            padding: "10px",
            flexDirection: "column",
          }}
        >
          <label>Company name</label>
          <input
            type="text"
            id="company_name"
            onChange={(e) => setCompanyName(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "35px",
            }}
          />
        </div>

        <div
          className="col-12"
          style={{
            flexFlow: "wrap",
            display: "flex",
            padding: "10px",
            flexDirection: "column",
          }}
        >
          <label>Note</label>
          <input
            type="text"
            id="note"
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "35px",
            }}
          />
        </div>

        <div
          className="col-12"
          style={{
            flexFlow: "wrap",
            display: "flex",
            padding: "10px",
            flexDirection: "column",
          }}
        >
          <label>Social Security Number</label>
          <input
            type="number"
            className="no-spinner"
            id="social_security_number"
            onChange={(e) => setSSN(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "35px",
            }}
          />
        </div>

        <div
          className="col-12"
          style={{
            flexFlow: "wrap",
            display: "flex",
            padding: "10px",
            flexDirection: "column",
          }}
        >
          <label>Email</label>
          <input
            type="email"
            id="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "35px",
            }}
          />
        </div>

        {/* //tag */}
        {/* <div className="col-12" style={{ flexFlow: 'wrap', display: 'flex', padding: '10px' }}>
          <label>Tag</label>
          <select type="text" id="tag" style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #D3D3D3', borderRadius: '10px', height: '4vh', }} />
        </div> */}
      </div>

      <div
        className="col-12"
        style={{
          flexFlow: "wrap",
          display: "flex",
          padding: "10px",
          flexDirection: "column",
        }}
      >
        <label>Tag</label>
        {/* <Tag addTag={handleAddTag}  /> */}

        <Select
          options={options}
          components={animatedComponents}
          isMulti // Enable multi-select
          value={selectedTags}
          onChange={handleTagChange}
          placeholder="Select tags..."
          isSearchable // Enable search
          styles={customStyles}
        />
      </div>

      <div
        className="col-12"
        style={{ flexFlow: "wrap", display: "flex", padding: "10px" }}
      >
        <h6 style={{ fontSize: "14px", fontFamily: "sans-serif" }}>
          {" "}
          Phone numbers
        </h6>
        <div
          className="col-12"
          style={{
            display: "flex",
            marginTop: "5%",
            color: "rgb(58, 145, 245)",

          }}
        >
          <FiPlusCircle
            onClick={addContactInput}
            style={{ marginRight: "2%" }}
          />
          <h6>Add Phone numbers</h6>
        </div>
      </div>

      <div className="contact-create">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            <label className="contact-label">
              {contact.label}:
              <PhoneInput
                country={"in"}
                value={contact.value}
                onChange={(value) => handleChange(value, contact.id)}
                inputProps={{
                  required: true,
                  className: "phone-input",
                }}
              />
              <FaTrash  className="remove-button-phone"  onClick={() => removeContactInput(contact.id)}/>
            </label>

          </div>
        ))}
        

        {/* {emptyError && <p className="error-message">Please fill in contact fields.</p>} */}
      </div>

      <div
        className="Address-section"
        style={{
          flexWrap: "wrap",
          marginTop: "5%",
          fontSize: "14px",
          color: "CaptionText",
          fontFamily: "sans-serif",
        }}
      >
        <div className="col-12" style={{ flexFlow: "wrap", padding: "10px" }}>
          <h6 style={{ fontSize: "14px", fontFamily: "sans-serif" }}>
            Address
          </h6>
        </div>

        <div className="col-12" style={{ padding: "10px" }}>
          <label
            style={{
              fontSize: "14px",
              color: "CaptionText",
              fontFamily: "sans-serif",
            }}
          >
            Country
          </label>
          <select
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "40px",
            }}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12" style={{ padding: "10px" }}>
          <label
            style={{
              fontSize: "14px",
              color: "CaptionText",
              fontFamily: "sans-serif",
            }}
          >
            Street Address
          </label>
          <input
            type="text"
            id="street_address"
            onChange={(e) => setStreetAddress(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "35px",
            }}
          />
        </div>

        <div className="col-12" style={{ flexWrap: "wrap" }}>
          <div className="city col-4" style={{ flex: "1", padding: "10px" }}>
            <label>City</label>
            <input
              type="text"
              id="city"
              onChange={(e) => setCity(e.target.value)}
              style={{
                width: "100%",
                padding: "2px",
                boxSizing: "border-box",
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "35px",
              }}
            />
          </div>

          <div className="State col-4" style={{ flex: "1", padding: "10px" }}>
            <label>State/ Province</label>
            <input
              type="text"
              id="State"
              onChange={(e) => setState(e.target.value)}
              style={{
                width: "100%",
                padding: "2px",
                boxSizing: "border-box",
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "35px",
              }}
            />
          </div>

          <div className="State col-4" style={{ flex: "1", padding: "10px" }}>
            <label>ZIP/PostalCode</label>
            <input
              type="text"
              id="State"
              onChange={(e) => setPostalCode(e.target.value)}
              style={{
                width: "100%",
                padding: "2px",
                boxSizing: "border-box",
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "35px",
              }}
            />
          </div>
        </div>

        <div
          className=" col-12"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "5%",
            flexWrap: "wrap",
          }}
        >
          <div
            className="Linked-accounts"
            style={{ fontSize: "20px", marginLeft: "2%", flex: "1" }}
          >
            <h6 style={{ margin: "0" }}>Linked accounts</h6>
          </div>

          <div
            className="link-account"
            style={{ display: "flex", color: "rgb(58, 145, 245)" }}
          >
            <div style={{ marginRight: "2px" }}>
              <FiPlusCircle />{" "}
            </div>
            <label
              htmlFor="account_info_radio"
              style={{
                fontSize: "12px",
                fontFamily: "sans-serif",
                color: "rgb(58, 145, 245)",
              }}
            >
              Link account
            </label>
          </div>
        </div>

        <div
          className="button-container col-8"
          style={{ display: "flex", flexWrap: "wrap", marginTop: "5%" }}
        >
          <div className="create col-4" style={{ padding: "10px", flex: "1" }}>
            <button onClick={sendingData} className="custom-button">
              Create
            </button>
          </div>
          <div className="cancel col-4" style={{ padding: "10px", flex: "1" }}>
            <button onClick={handleContactClose}  className="custom-button ">Cancel </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
export default Contact;