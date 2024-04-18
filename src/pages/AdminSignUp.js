import React, { useState, useEffect } from "react";
import logo from "./static/logo.png";
import Select from "react-select";
import "./adminSignup.css";
// import "./signup.css";
//import "./static/confirmation.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import OtpInput from "react-otp-input";

import { FaEye, FaEyeSlash } from "react-icons/fa";
//import DatePicker from "react-datepicker";
import MultiStage from "../component/MultiStepProgressBar";
import startsWith from "lodash.startswith";

import firmsetting from "../img/setting.png";

const SignUp = ({ handleSignupPage }) => {
  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  //todo ========    #page control  logic   No1 =======

  //!chang state for testing
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form");
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  //todo ========    #page control  logic   No1 =======

  //? ========    #navigation control   No2 =======

  const navigate = useNavigate();

  const LoginButton = () => {
    navigate("/adminlogin");
  };
  //? ========    #navigation control   No2 =======

  //todo ========    #send mail to backend for varification code  case 1: =======

  //*checkbox
  const [isChecked, setIsChecked] = useState(false);

  const setValbox = (event) => {
    setIsChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const [inpval, setInpval] = useState({
    email: "",
  });

  const createAccount = async (e) => {
    e.preventDefault();

    const { email } = inpval;

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (isChecked === false) {
      toast.error("Accept terms and condtion ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        email: inpval.email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8080/request-otp",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          //toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Check your email ID for OTP");

          //   setInpval({ ...inpval, email: "" });
          setIsChecked(false);
          nextStep();
        })
        .catch((error) => {
          alert("please check your OTP");
          console.log(error);
        });
    }
  };

  //todo ========    #send mail to backend for varification code  case 2: =======

  //? ========    #otp varification    Page:2 =======

  const resensotp = async (e) => {
    e.preventDefault();

    //const { email } = inpval;

    e.preventDefault();

    let data = JSON.stringify({
      email: inpval.email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8080/request-otp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        //toast.success("Check your email ID for OTP", { position: "top-right" });

        alert("Check your email ID for OTP");
      })
      .catch((error) => {
        alert("please check your OTP");
        console.log(error);
      });
  };

  const [otp, setOtp] = useState("");
  const handleClearOtp = () => {
    console.log(otp);
    setOtp("");
  };
  const sendOtpVerify = async (e) => {
    e.preventDefault();

    //const { email } = inpval;

    if (otp === "") {
      toast.error(" OTP required! ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        email: inpval.email,
        otp: otp,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8080/verify-otp",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Email verified sucessfully");
          setOtp("");

          nextStep();
        })
        .catch((error) => {
          alert("please check your OTP");
          console.log(error);
        });
    }
  };

  //? ========    #otp varification    Page:2 =======

  //todo ========    #send mail to backend for varification code  case 3: =======

  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState();
  const totalSteps = 4; // Set the desired number of steps

  const stageNames = ["Email", "Information", "Settings", "Book a seassion"];

  const submitUserinfo = async (e) => {
    e.preventDefault();

    if (firstname === "") {
      toast.error(" First Name Required ! ", {
        position: "top-center",
      });
    } else if (lastName === "") {
      toast.error(" Last Name Required ! ", {
        position: "top-center",
      });
    } else if (lastName === "") {
      toast.error(" Last Name Required ! ", {
        position: "top-center",
      });
    } else if (phoneNumber === "") {
      toast.error(" Phone number required ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //todo ========    #send mail to backend for varification code Page:3 =======

  //todo ========    #send mail to backend for varification code  case 4: =======

  //case 4  =======================================================================
  //Country State API

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [firmName, setFirmName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountryD, setSelectedCountryD] = useState("");

  const countryStates = states.find((country) => country.name === selectedCountry)?.states || [];

  // Transform the states data into options for React Select
  const stateOptions = countryStates.map((state, index) => ({
    value: state.name,
    label: state.name,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const countryOptions = data.data.map((country) => ({
          //value: country.country,
          label: country.name,
        }));

        setCountries(countryOptions);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getStatesData = async () => {
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries/states");
        setStates(response.data.data);
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    getStatesData();
  }, [countries]);

  // useEffect to do something when selectedCountry changes
  useEffect(() => {
    console.log("Selected Country:", selectedCountry);
    // You can perform additional actions or API calls here based on the selected country
  }, [selectedCountry]);

  //?validation
  const submitFerminfo = async (e) => {
    e.preventDefault();
    console.log("vinayak");

    if (firmName === "") {
      toast.error(" Firm Name Required ! ", {
        position: "top-center",
      });
    } else if (selectedCountry === "") {
      toast.warning(" Select Country ! ", {
        position: "top-center",
      });
    } else if (selectedState === "") {
      toast.warning(" Select state ! ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //todo ========    #send mail to backend for varification code  case 5: =======
  //slider

  const [sliderValue, setSliderValue] = useState(0);
  const fixedValues = [0, 5, 10, 15, 50, 100, 200];
  const colors = ["Google search", "Capterra/ Get app/ G2", "From a friend", "Offline event", "Social media", "Taxdome consultant/ Partner", "Other"];
  const [buttonStates, setButtonStates] = useState([false, false, false, false, false, false, false]);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleToggle = (index) => {
    const updatedStates = buttonStates.map((state, i) => (i === index ? !state : false));
    setButtonStates(updatedStates);
    setSelectedButton(index);
  };

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  const svalue = fixedValues[sliderValue];
  console.log(svalue);

  const selectedOption = colors[selectedButton];
  console.log(selectedOption);

  // const [svalue, setSValue] = useState(datarange);

  // useEffect to do something when selectedServices changes
  useEffect(() => {
    console.log(svalue);

    // You can perform additional actions or API calls here based on the selected services
  }, [svalue]);
  useEffect(() => {
    // console.log(selectedOption);
    // You can perform additional actions or API calls here based on the selected services
  }, [selectedOption]);

  // const handleChange = (event) => {
  //   setSValue(event.target.value);
  // };

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  // };

  //?validation
  const submitFirmDetail = async (e) => {
    e.preventDefault();

    if (svalue === 0) {
      toast.error(" Select Firm Size  ! ", {
        position: "top-center",
      });
    } else if (selectedOption === "") {
      toast.warning(" Select How did you hear about us ? ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //=============================================================
  //todo  Services offers case 6:

  const [buttonStates2, setButtonStates2] = useState({
    TaxPreparation: false,
    TaxPlanning: false,
    Advisory: false,
    Resolution: false,
    Payroll: false,
    Accounting: false,
    Audit: false,
    LawFirm: false,
    Bookkeeping: false,
    Other: false,
  });

  const [selectAll, setSelectAll] = useState(false);
  const buttonsOn = Object.keys(buttonStates2).filter((button) => buttonStates2[button]);
  const handleButtonClick2 = (buttonName) => {
    setButtonStates2((prevStates) => ({
      ...prevStates,
      [buttonName]: !prevStates[buttonName],
    }));
  };

  const selectedButtons = buttonsOn.join(", ");
  console.log([selectedButtons]);

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
    // Set the state of all buttons based on the "Select All" checkbox
    setButtonStates2((prevStates) => {
      const newButtonStates = {};
      Object.keys(prevStates).forEach((button) => {
        newButtonStates[button] = !selectAll;
      });
      return newButtonStates;
    });
  };

  useEffect(() => {
    // console.log(selectedButtons);
    // You can perform additional actions or API calls here based on the selected services
  }, [selectedButtons]);

  const submitService = async (e) => {
    e.preventDefault();

    if (selectedButtons == []) {
      toast.error(" Select Service  ! ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //======================================

  //todo role selection case 7
  const colors3 = ["Owner or partner", "Book keeper or Accountant", "Operations / office Manager", "Admin", "Assistant", "Other"];
  const [buttonStates3, setButtonStates3] = useState([false, false, false, false, false, false]);
  const [selectedButton3, setSelectedButton3] = useState(null);

  const handleToggle3 = (index) => {
    const updatedStates = buttonStates3.map((state, i) => (i === index ? !state : false));
    setButtonStates3(updatedStates);
    setSelectedButton3(index);
  };

  const roleOption = colors3[selectedButton3];
  console.log(roleOption);

  // useEffect to do something when selectedServices changes
  useEffect(() => {
    // console.log(roleOption);
    // You can perform additional actions or API calls here based on the selected services
  }, [roleOption]);
  //?validation
  const submitRole = async (e) => {
    e.preventDefault();

    if (selectedButton3 === "") {
      toast.error(" Select Role  ! ", {
        position: "top-center",
      });
    } else {
      nextStep();
    }
  };

  //============================

  //case 8 ============================
  const [currencies, setCurrencies] = useState("");

  const [url, setUrl] = useState("");
  const label = ".pms.com";

  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies");
        const currencyOptions = Object.keys(response.data).map((currency) => ({
          value: currency,
          label: response.data[currency].toUpperCase(),
        }));

        setCurrencies(currencyOptions);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  // const handleUrlChange = (e) => {

  //   setUrl(e.target.value);

  // };

  const handleSubmitUrl = () => {
    const combinedValue = url + label;
    console.log("Combined value:", combinedValue);
    return combinedValue;
  };

  const combinedData = {
    url: handleSubmitUrl(),
  };

  console.log(combinedData.url);

  const languages = [
    { value: "English(British)", label: "English(British)" },
    { value: "Deutsch", label: "Deutsch" },
    { value: "Ztaliano", label: "Ztaliano" },
    { value: "Nederlands", label: "Nederlands" },
    { value: "suomi", label: "suomi" },
    { value: "Dansk", label: "Dansk" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const language = selectedLanguage;
  console.log(language);

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
  };

  //?validation
  const submiturl = async (e) => {
    e.preventDefault();
    console.log("vinayak");

    if (url === "") {
      toast.error(" Choose web URL ! ", {
        position: "top-center",
      });
    } else if (currencies === "") {
      toast.warning(" Select Currency ! ", {
        position: "top-center",
      });
    } else if (language === "") {
      toast.warning(" Select language ! ", {
        position: "top-center",
      });
    } else {
      toast.success(" Web url selected  ! ", {
        position: "top-center",
      });
      nextStep();
    }
  };

  //todo password confermation case 9:
  //==============================================================

  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inppass, setInppass] = useState({
    password: "",
    cpassword: "",
  });

  //console.log
  const setValP = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInppass(() => {
      return {
        ...inppass,
        [name]: value,
      };
    });
  };

  const submitPassword = async (e) => {
    e.preventDefault();

    const { password, cpassword } = inppass;

    if (password === "") {
      alert("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 8) {
      alert("password must be 6 char!", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      alert("cpassword is required!", {
        position: "top-center",
      });
    } else if (cpassword.length < 8) {
      alert("confirm password must be 6 char!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      alert("pass and Cpass are not matching!", {
        position: "top-center",
      });
    } else {
      toast.success(" Account created successfully  ", {
        position: "top-right",
      });
      nextStep();

      //call final
      adminalldata();
      newUser();


    }
  };

  //===================================================
  const adminalldata = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: inpval.email,
      firstName: firstname,
      lastName: lastName,
      phoneNumber: phoneNumber,
      firmName: firmName,
      country: selectedCountry,
      state: selectedState,
      firmSize: svalue,
      referenceFrom: selectedOption,
      services: [
        {
          service: selectedButtons,
        },
      ],
      role: roleOption,
      firmURL: combinedData.url,
      currency: selectedCurrency.label,
      language: language.label,
      password: inppass.password,
      cpassword: inppass.cpassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://68.251.138.236:8080/admin/adminsignup/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  //************************ */
  const newUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: firmName,
      email: inpval.email,
      password: inppass.password,
      role: roleOption,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://68.251.138.236:8080/common/login/signup", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  //todo book session for demo  case 10:

  const [selectedDate, setSelectedDate] = useState(null);

  const handleBookSession = () => {
    nextStep();
  };


  const handlelogin=()=>{
  
   
  }

  const renderFormFields = () => {
    switch (currentStep) {
      //sign up
      case 1:
        return (
          <>
            <div className=" col-12">
              <div style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="col-12 case1" >
                <div className="container"style={{ margin:'0 auto'}} >
                  <h2 style={{ color: "black" }}>Signup</h2>
                  <p className="subtitle">Sign up your firm and start upgrading your workflow</p>
                  <br />
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Enter Your Email " />
                    </div>
                    <div style={{ display: "flex", marginTop: "40px" }}>
                      <div className="inputCheck" style={{ width: "15px", marginRight: "10px" }}>
                        <input type="checkbox" onChange={setValbox} checked={isChecked} />
                      </div>
                      <label htmlFor="checkbox">I agree to the terms and conditions</label>
                    </div>
                    <br />

                    <button onClick={createAccount}>Create Account</button>

                    <br />

                    <p className="sign-in-link">
                      Already have an account?{" "}
                      <button style={{ background: "none", color: "blue" }} onClick={handleSignupPage}>
                        Sign in
                      </button>



                    </p>
                  </form>
                </div>
                <br />
              </div>
            </div>
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      //code confirmation

      case 2:
        return (
          <>
            <div className=" col-12 ">
              <div className="col-12" style={{ display: "flex" }}>
                <div className="col-4" style={{ margin: "20px" }}>
                  <img style={{ width: "30px" }} src={logo} alt="" />
                  <b>PMS Solutions</b>
                </div>
                <div className="path col-8" style={{ marginRight: "200px" }}>
                  <MultiStage steps={totalSteps} currentStepForm={1} stageNames={stageNames} />
                </div>
              </div>
              <div className=" col-12 case2">
                <div className="container" style={{ margin:'0 auto'}}>
                  <h2>Confirmation Code</h2>
                  <p>We sent a confirmation code to your email:</p>
                  <div>
                    <b>{inpval.email}</b>
                    <span>
                      <AiFillEdit />
                    </span>
                  </div>
                  <p style={{ fontSize: "14px" }}>Please,enter it below</p>
                  <br />
                  <div>
                    <div style={{ marginLeft: "1px" }}>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => (
                          <input
                            {...props}
                            style={{
                              width: "35px", // Adjust as needed
                              height: "100px", // Adjust as needed
                              fontSize: "42px", // Adjust as needed
                              fontFamily: "Arial, sans-serif", // Replace with your desired font
                              marginRight: "10px ",

                              // Add any other styling properties as needed
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "5%" }}>
                    <h4>
                      Didn't receive it? <button onClick={resensotp}>Resend code</button>{" "}
                    </h4>
                  </div>

                  <div style={{ display: "flex", marginBottom: "50px" }}>
                    <div className="button col-12" style={{ display: "flex", marginTop: "50px" }}>
                      <button onClick={handleClearOtp} style={{ marginLeft: "auto", transform: "translatex(-30%)" }}>
                        Clear OTP
                      </button>
                      <button onClick={sendOtpVerify} style={{ marginRight: "auto", transform: "translatex(10%)" }}>
                        Verify
                      </button>
                    </div>
                  </div>

                  {/* <button onClick={emailcodersender} className="next"> */}
                  {/* <button className="next" onClick={nextStep}>
                  Next
                </button> */}
                  {/* <button  className="pre">
                  Previous
                </button> */}
                </div>
              </div>
              <div className="toast">
                <ToastContainer />
              </div>
            </div>
          </>
        );
      //!================================================================================================================================================================
      case 3:
        return (
          <>
            <div className=" col-12  ">
              <div className="col-12" style={{ display: "flex" }}>
                <div className="col-4" style={{ margin: "20px" }}>
                  <img style={{ width: "30px" }} src={logo} alt="" />
                  <b>PMS Solutions</b>
                </div>
                <div className="path col-8" style={{ marginRight: "200px" }}>
                  <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
                </div>
              </div>
            </div>

            <div className=" col-12 case3">
              <div className="container"style={{ margin:'0 auto'}}>
                <h2>Your Information</h2>
                <form>
                  <div>
                    <div style={{ marginBottom: "20px" }}>
                      <label>First Name:</label>

                      <input required className="fname" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </div>

                    <div>
                      <label>Last Name:</label>

                      <div>
                        <input required className="lname" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div>
                    <label>
                      <div style={{ marginLeft: "1px" }}>
                        <label htmlFor="phone">Phone Number:</label>
                        <PhoneInput
                          country={"us"}
                          placeholder="enter phone number "
                          onChange={(value) => {
                            setPhoneNumber(value);
                          }}
                          countryCodeEditabel={false}
                          isValid={(inputNumber, country, countries) => {
                            return countries.some((country) => {
                              return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                            });
                          }}
                        />
                      </div>
                    </label>
                    {!valid && <p>Please enter a valid phone number.</p>}
                  </div>
                </form>
                <button onClick={submitUserinfo} style={{ justifyContent: "left", width: "100px", height: "30px" }}>
                  Next
                </button>
              </div>
            </div>

            <br />

            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className=" col-12  ">
              <div className="col-12" style={{ display: "flex" }}>
                <div className="col-4" style={{ margin: "20px" }}>
                  <img style={{ width: "30px" }} src={logo} alt="" />
                  <b>PMS Solutions</b>
                </div>
                <div className="path col-8" style={{ marginRight: "200px" }}>
                  <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
                </div>
              </div>
            </div>
            <div className=" col-12 case4">
              <div className="container"style={{ margin:'0 auto'}}>
                <h2 style={{ marginBottom: "20px" }}>Firm Information</h2>
                <form>
                  <label>Firm Name</label>

                  <input type="text" placeholder="Enter firm name" value={value} onChange={(e) => setFirmName(e.target.value)} />

                  <div className="col-12">
                    <div style={{ width: "100%" }}>
                      <label style={{ marginTop: "30px" }}>Country</label>

                      <Select
                        value={selectedCountryD}
                        onChange={(option) => {
                          setSelectedCountry(option.label);
                          setSelectedCountryD(option);
                          setSelectedState(null); // Reset selected state when the country changes
                        }}
                        options={countries}
                        placeholder="Select a country"
                      />
                      <label style={{ marginTop: "30px" }}>State</label>
                      <Select
                        className="form-select"
                        aria-label="Select State"
                        value={stateOptions.find((option) => option.value === selectedState)}
                        onChange={(option) => {
                          setSelectedState(option.label);
                        }}
                        options={stateOptions}
                        placeholder="Choose State"
                      />
                    </div>
                  </div>
                  <br />
                </form>
                <button onClick={submitFerminfo}>Next</button>
              </div>
            </div>
            <br />

            {/* <button onClick={prevStep} className="pre">
              Previous
            </button> */}
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
              </div>
            </div>
            <div className="case5">
              <div className=" col-12 case5"></div>

              <div className=" col-12 selectbar  " style={{ margin: "3%" }}>
                <div style={{ textAlign: "center", marginBottom: "10px", alignItems: "center", justifyContent: "center" }}>Selected Value: {fixedValues[sliderValue]}</div>
                <div style={{ marginLeft: "20px", display: "flex", justifyContent: "space-between" }}>
                  {fixedValues.map((value, index) => (
                    <div key={index}>{value}</div>
                  ))}
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <input type="range" min="0" max={fixedValues.length - 1} step="1" value={sliderValue} onChange={handleSliderChange} style={{ width: "100%", justifyContent: "center" }} />
                </div>
              </div>
              <div className=" col-12">
                <hr className="hr" />
                {sliderValue === 0 && (
                  <p className="p" style={{ color: "black", marginLeft: "7%" }}>
                    Please select company size
                  </p>
                )}
              </div>

              <div className=" col-12 case5">
                <div className="container selection">
                  <h2>How did you hear about PMS Solutions? </h2>

                  <div>
                    <div>
                      {colors.map((color, index) => (
                        <button key={value} value={colors[selectedButton]} className={`toggle-button ${buttonStates[index] ? "active" : ""}`} onClick={() => handleToggle(index)}>
                          {color}
                        </button>
                      ))}
                      <div style={{ marginTop: "10px" }}>{selectedButton !== null && <p>Sorce Of Information : {colors[selectedButton]} </p>}</div>
                    </div>
                  </div>

                  <button onClick={submitFirmDetail}>Next</button>
                </div>
              </div>
            </div>

            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 6:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
              </div>
            </div>
            <div className="col-12"></div>

            <div className=" col-12 case6">
              <div className="container" style={{ padding: "6%",margin:'0 auto' }}>
                <button onClick={() => handleButtonClick2("TaxPreparation")} style={{ backgroundColor: buttonStates2.TaxPreparation ? "#043a77" : "#3498db" }}>
                  Tax Prepration
                </button>
                <button onClick={() => handleButtonClick2("TaxPlanning")} style={{ backgroundColor: buttonStates2.TaxPlanning ? "#043a77" : "#3498db" }}>
                  Tax Planning
                </button>
                <button onClick={() => handleButtonClick2("Advisory")} style={{ backgroundColor: buttonStates2.Advisory ? "#043a77" : "#3498db" }}>
                  Advisory
                </button>
                <button onClick={() => handleButtonClick2("Resolution")} style={{ backgroundColor: buttonStates2.Resolution ? "#043a77" : "#3498db" }}>
                  Resolution
                </button>
                <button onClick={() => handleButtonClick2("Payroll")} style={{ backgroundColor: buttonStates2.Payroll ? "#043a77" : "#3498db" }}>
                  Payroll
                </button>
                <button onClick={() => handleButtonClick2("Accounting")} style={{ backgroundColor: buttonStates2.Accounting ? "#043a77" : "#3498db" }}>
                  Accounting
                </button>
                <button onClick={() => handleButtonClick2("Audit")} style={{ backgroundColor: buttonStates2.Audit ? "#043a77" : "#3498db" }}>
                  Audit
                </button>
                <button onClick={() => handleButtonClick2("LawFirm")} style={{ backgroundColor: buttonStates2.LawFirm ? "#043a77" : "#3498db" }}>
                  Law firm
                </button>
                <button onClick={() => handleButtonClick2("Bookkeeping")} style={{ backgroundColor: buttonStates2.Bookkeeping ? "#043a77" : "#3498db" }}>
                  Bookkeeping
                </button>
                <button onClick={() => handleButtonClick2("Other")} style={{ backgroundColor: buttonStates2.Other ? "#043a77" : "#3498db" }}>
                  Other
                </button>

                <div>
                  <p>{buttonsOn.length > 0 && <p>Services that are Selected: {buttonsOn.join(", ")}</p>}</p>
                </div>
                <div>
                  <label>
                    <input type="checkbox" onChange={handleSelectAll} style={{ marginLeft: "2%" }} />
                    Select All
                  </label>
                  <button onClick={submitService}>Next</button>
                </div>
              </div>
            </div>

            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 7:
        return (
          <div>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
              </div>
            </div>

            <div className="containerf">
              <div className=" col-12 case5" style={{ padding: "5%", marginBottom: "30px" }}>
                <div className="container selection">
                  <h1>Your role in the firm </h1>

                  <div>
                    <div>
                      {colors3.map((color, index) => (
                        <button key={index} className={`toggle-button ${buttonStates3[index] ? "active" : ""}`} onClick={() => handleToggle3(index)}>
                          {color}
                        </button>
                      ))}
                      <div style={{ marginTop: "10px" }}>{selectedButton3 !== null && <p>Sorce Of Information : {colors3[selectedButton3]} </p>}</div>
                    </div>
                  </div>
                </div>{" "}
                <button style={{ marginLeft: "10%" }} onClick={submitRole}>
                  Next
                </button>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={2} stageNames={stageNames} />
              </div>
            </div>

            <div className=" col-12 case8">
              <div className="container" style={{ marginRight: "10%" }}>
                <div className="firm">
                  <h2>Firm Settings</h2>

                  <div className="firm-info">
                    <p>
                      A powerful,integrated platform <br /> to manage teams,clients,projects.
                    </p>
                    <p>
                      <b>from $50/mo per user</b> <br />
                      (with a 3-year subscription plan)
                    </p>
                  </div>


                  <h3 style={{ marginTop: "20px" }}>Firm Setting</h3>

                  <p>choose web URL</p>
                  <div style={{ fontSize: "13px" }}>
                    <p>You will be ale to set up a fully custom domain(without.pms.com) later</p>
                  </div>

                  <div className="url_container">
                    <input type="text" id="url_input" value={url} onChange={(e) => setUrl(e.target.value)} className="url" placeholder="Enter your URL" />
                    <label className="label" id="domin_lable">
                      .pms.com
                    </label>
                  </div>

                  <div className="currency-container">
                    <div className="currency">
                      <label>You cannot Change it later</label>
                      <br />

                      <div>
                        <label>Select Currency: </label>
                        <Select value={selectedCurrency} onChange={handleCurrencyChange} options={currencies} placeholder="Select a currency" />
                      </div>
                    </div>
                    <br />
                    <div>
                      <label>Select Language: </label>

                      <Select value={selectedLanguage} onChange={handleLanguageChange} options={languages} placeholder="Select a language" />

                      {/* {selectedLanguage && <p>You selected: {selectedLanguage.label}</p>} */}
                    </div>
                  </div>
                  {/* submiturl */}
                  <button className="button" onClick={submiturl}>
                    Continue
                  </button>
                </div>
              </div>
              <div className="image">
                <img style={{ height: "400px" }} src={firmsetting} alt="" />
              </div>
            </div>
            <br />
            {/* <button onClick={nextStep} className="next">
              Next
            </button>
            <button onClick={prevStep} className="pre">
              Previous
            </button> */}
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );
      case 9:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={3} stageNames={stageNames} />
              </div>
            </div>
            <div className="setpassword-container col-12" style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
              <div className="password-sub-container col-12 " style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", maxWidth: "600px" }}>
                <div className="pagetitle" style={{ fontSize: "30px", textAlign: "center" }}>
                  <h1 style={{ marginBottom: "5%", fontSize: "38px", textAlign: "center" }}>Set Password</h1>
                </div>
                <div className="form-password col-9" style={{ marginBottom: "6%", marginTop: "5%" }}>
                  <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    <label htmlFor="password">Password</label>
                    <input type={!passShow ? "password" : "text"} onChange={setValP} value={inppass.password} name="password" id="password" placeholder="Enter Your password" />
                    <div style={{ position: "absolute", top: "80%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setPassShow(!passShow)}>
                      {!passShow ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
                <div className="formpassword col-9">
                  <div className="password-input" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                    <label htmlFor="confirmPassword">Confirm Password</label>

                    <input type={!cpassShow ? "password" : "text"} onChange={setValP} value={inppass.cpassword} name="cpassword" id="cpassword" placeholder="Confirm password" />
                    <div style={{ position: "absolute", top: "80%", transform: "translateY(-50%)", right: "20px", cursor: "pointer" }} onClick={() => setCPassShow(!cpassShow)}>
                      {!cpassShow ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
                <div className="password-btn col-9">
                  <div className="contiunebutton-btn" style={{ justifyContent: "left" }}>
                    <button style={{ marginLeft: "0", background: "rgb(100, 149, 237)", marginTop: "2%", border: "none", borderRadius: "10px", width: "80px", height: "30px", color: "white" }} onClick={submitPassword}>
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      //book session
      case 10:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px" }}>
                <MultiStage steps={totalSteps} currentStepForm={4} stageNames={stageNames} />
              </div>
            </div>
            <div className="datepicker-container col-12" style={{ display: "flex" }}>
              <div className="firmleft-container col-12" style={{ color: "black", padding: "20px", width: "50%", border: "0.5px " }}>
                <div className="h1-container col-12" style={{ textAlign: "left", marginBottom: "20px", margin: "2%" }}>
                  <h1 style={{ fontSize: "35px" }}>Book a free implementation session</h1>
                </div>
                <div className="font-class col-12" style={{ textAlign: "left", marginBottom: "10px", margin: "2%" }}>
                  <p style={{ fontSize: "12px" }}>10 out of 10 TaxDome firm saw faster ROI and implemementation by scheduling an intro session right away. Please choose a time that works best for your team that works best for your team-our experienced staff are ready to set your practice up for success.</p>
                </div>
                <div className="col-12" style={{ display: "flex", alignItems: "center", marginBottom: "20px", marginTop: "70%", background: "#AFDBF5", color: "GrayText", height: "10vh", fontSize: "16px" }}>
                  <div className="col-4" style={{ flex: "1", textAlign: "left" }}>
                    <p style={{ fontSize: "14px" }}>Web conferencing deatils provided upon Confirmation</p>
                  </div>
                </div>

                <div>
                  <NavLink to="/" style={{ color: "rgb(58, 145, 245)" }}>
                    Skip booking for now
                  </NavLink>
                </div>
              </div>

              <div className="dateright-container col-12" style={{ color: "black", flexDirection: "column", padding: "2%" }}>
                <div className="right-content-title">
                  <h5 style={{ fontSize: "26px" }}>Select a Date & Time </h5>
                </div>

                <div className="time-zone-container" style={{ display: "flex", gap: "10px" }}>
                  <div className="language-choose col-6" style={{ marginTop: "2%" }}>
                    <label style={{ fontSize: "14px" }}>Default Language</label>
                    <Select value={selectedLanguage} onChange={handleLanguageChange} options={languages} placeholder="Select a language" />
                  </div>

                  <div className="timezone-choose col-6" style={{ marginTop: "1.5%" }}>
                    <label style={{ fontSize: "16px" }}> Time Zone</label>
                    <Select placeholder="Select a Time" />
                  </div>
                </div>

                <div className="date-section col-12" style={{ minHeight: "20vh", display: "flex", marginTop: "2%" }}>
                  <div className="col-12">
                    <label style={{ fontSize: "16px" }}> Date </label>
                    <input
                      style={{
                        width: "50%",
                        padding: "10px",
                        boxsizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                      }}
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="button-btn col-12" style={{ justifyContent: "center" }}>
                  <NavLink to="/">
                    <button onCLick={handleBookSession()} style={{ background: "rgb(58, 145, 245)", border: "none", color: "white", borderRadius: "5px", height: "30px", width: "80px", marginLeft: "5px" }}>
                      Next
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </>
        );
      case 11:
        return (
          <>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="col-4" style={{ margin: "20px" }}>
                <img style={{ width: "30px" }} src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path col-12" style={{ marginRight: "200px", marginBottom: "10%" }}>
                <MultiStage steps={totalSteps} currentStepForm={4} stageNames={stageNames} />
              </div>
            </div>

            <div className="message col-7" style={{ justifyContent: "center", marginLeft: "10%", flexWrap: "wrap" }}>
              <h2>Your Information</h2>
              <p style={{ color: "green", fontSize: "16px" }}> "SNP TaxConsultant, welcome to the pinnacle of tax excellence with PMS Solutions. Together, let's redefine financial success and deliver unparalleled solutions. Your journey to seamless tax management starts here!"</p>

              <button onClick={handlelogin}>Login</button>
            </div>

            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return <form onSubmit={handleSubmit}>{renderFormFields()}</form>;
};

export default SignUp;
