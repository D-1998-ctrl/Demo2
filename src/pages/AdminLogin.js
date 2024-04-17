import React, { useState } from "react";
import axios from "axios";
import logo from "./static/logoAdmin.png";
import "./adminLogin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import Select from "react-select";
import GooglePlayStore from "./static/GooglePlayStore.svg";
import AppStore from "./static/AppStore.png";

import { useNavigate } from "react-router-dom";

import { FaFacebook, FaWeebly, FaInstagramSquare, FaLinkedin, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";

export default function SuperAdminLogin({ toggleLogin, handleSignupPage }) {
  // const [isChecked, setIsChecked] = useState(false);
  const history = useNavigate();
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
    expiryTime: "",
  });

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

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password, expiryTime } = inpval;

    if (!email) {
      toast.error("Email is required!");
      return;
    } else if (!email.includes("@")) {
      toast.error("Invalid email format!");
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    if (!expiryTime) {
      toast.error("Please select the expiration time!");
      return;
    }

    try {
      const data = await fetch("http://127.0.0.1:8080/common/login/generatetoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          expiryTime,
        }),
      });

      const res = await data.json();
      console.log(res);
      //localStorage.setItem("usersdatatoken", res.result.token);
      if (res.status === 200) {
        localStorage.setItem("usersdatatoken", res.result.token);
        Cookies.set("userToken", res.result.token);
        // history("/dash");
        toggleLogin();
        setInpval({ ...inpval, email: "", password: "" });

        Cookies.set("userToken", res.result.token); //, { expiresIn: Date.now() + (parseInt(expiryTime) * 60 * 1000)}); // Set cookie with duration provided
      } else if (res.status === 400) {
        toast.error("Invalid email or password!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {}
  };

  return (
    <div className="responsive-split-screen-container">
      <div className="left-container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h2>Welcome Back !</h2>
        <h5>"Welcome to "SNP Tax & Financials", where tax management meets simplicity. Our advanced software streamlines tax processes for individuals, businesses, and professionals, ensuring accuracy and efficiency. Experience a new era of financial ease with SNP Tax & Financials."</h5>

        <p>"Please log in to access your account."</p>

        <div className="social-icons">
          <FaTwitter className="sicon" />
          <FaFacebook className="sicon" />
          <FaLinkedin className="sicon" />
          <FaWeebly className="sicon" />
          <FaInstagramSquare className="sicon" />
        </div>
      </div>
      <div className="right-container">
        <form className="login-form">
          <h2>Login Account</h2>
          <label>Email Address </label>
          <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Enter Your Email Address" />

          <div className="form_input">
            <label>Password</label>
            <div className="two">
              <input type={passShow ? "text" : "password"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder="Enter Your password" />
              <div className="showpass" onClick={() => setPassShow(!passShow)}>
                {!passShow ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="Forgotpass">
            <h5 style={{ marginTop: "8px" }}>
              <NavLink to="/forgotpass">Forgot Password</NavLink>
            </h5>
          </div>

          <div style={{ marginTop: "25px" }}>
            <label>Stay signed in for</label>
            <div>
              {/* <Select options={expiryTime}  value={inpval.expiryTime} onChange={setVal}   /> */}
              <select value={inpval.expiryTime} onChange={setVal} name="expiryTime" style={{ height: "6vh", width: "100%", border: "2px solid rgb(100, 149, 237)", borderRadius: "10px" }}>
                <option>Select</option>
                <option value="30min">30 minutes</option>
                <option value="4hours">4 hours</option>
                <option value="8hours">8 hours</option>
              </select>
            </div>
          </div>

          <div className="terms" style={{ marginTop: "18px" }}></div>

          <button onClick={loginuser} type="submit">
            Login
          </button>

          <p className="sign-in-link" style={{ marginBottom: "15px" }}>
            Don't have a PMS solutions Account ?
            <button style={{ background: "none", color: "blue" }} onClick={handleSignupPage}>
              Signup
            </button>
          </p>
          <h6 style={{ marginBottom: "15px" }}>For the optimal mobile client exprience - get the app</h6>
          <div className="storeBtn" style={{ display: "flex", marginLeft: "-18px" }}>
            <div className="playstore">
              <NavLink to="https://play.google.com/store/apps/details?id=com.linkedin.android&hl=en_IN&gl=US">
                <img style={{ width: "190px" }} src={GooglePlayStore} alt="Logo" />
              </NavLink>
            </div>
            <div className="appstore">
              <div className="storeBtn">
                <NavLink to="https://apps.apple.com/us/app/linkedin-network-job-finder/id288429040">
                  <img style={{ width: "150px", marginTop: "-7px" }} src={AppStore} alt="Logo" />
                </NavLink>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="toast">
        <ToastContainer />
      </div>
    </div>
  );
}
