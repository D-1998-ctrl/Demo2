import { Outlet, Link } from "react-router-dom";
import SidebarData from "../navbar/SidebarData";
import React, { useState, useEffect,useContext } from "react";
import "./layout.css";
import user from "../img/user.png";
import logo from "../img/logo.svg";
import { FaAngleLeft } from "react-icons/fa";
import "boxicons";
import "boxicons/css/boxicons.min.css";
import { IoSearch } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { HiBars3 } from "react-icons/hi2";
// import Sidebar from "../navbar/Sidebar";
import Adminlogin from "./AdminLogin";
import NewSidebar from "../navbar/NewSidebar";
import SearchBar from "../navbar/SearchBar";
import CreateContact from "../pages/Contact";
import CreateAccount from "../pages/CreateAccount";
import AdminSignup from "../pages/AdminSignUp";
import Cookies from 'js-cookie';

//loginData 
import { LoginContext } from '../ContextProvider/Context';
import { useNavigate  } from "react-router-dom"





const Layout = () => {

//   const { logindata, setLoginData } = useContext(LoginContext);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const history = useNavigate();

//     const logoutuser = async () => {

//       let token = localStorage.getItem("usersdatatoken");
//       // console.log(token)
    
//       const res = await fetch("http://68.251.138.236:8080/common/login/logout", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": token
//           }
         
//       });
    
//       const data = await res.json();
//       console.log(data);
    
//       if (data.status === 200) {
//           console.log("user logout");
//           localStorage.removeItem("usersdatatoken");
//           Cookies.remove('userToken');
//           setLoginData(false)
//           history("/");
//       } else {
//           console.log("error");
//       }
//     }
    

//   const goError = () => {
//     history("*")
// }




////////////////////////////////////////////////
// const [data, setData] = useState(false);
// const DashboardValid = async () => {
//    let token = localStorage.getItem("usersdatatoken");
//       // Cookies.set("userToken", res.result.token); // Set cookie with duration provided
//    // console.log(token);        

//    const res = await fetch("/common/login/verifytoken",{
//        method: "GET",
//        headers: {
//            "Content-Type": "application/json",
//            "Authorization": token
//        }
//    });

//    const data = await res.json();
//    if (data.status === 400 || !data) {
//        // console.log("error page");
//        history("*");

//    } else {
//        console.log("user verify");
//        setLoginData(data);
//        history("/adminDash");
//    }
// }

// useEffect(() => {
//    setTimeout(() => {
//        DashboardValid();
//        setData(true)
//    }, 2000)

// }, []);

// console.log(logindata);






  const [mainSidebar, setMainSidebar] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newsidebar, setNewSidebar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [contactForm, setContactForm] = useState(false);
  const [accountform, setAccountForm] = useState(false);
  // const [signupPage, setSignupPage] = useState(false);

  const [loggedIn, setLoggedIn] = useState(() => {
    // Check if the user is already logged in from localStorage
    const storedLoggedIn = localStorage.getItem("loggedIn");
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });
  const [signupPage, setSignupPage] = useState(() => {
    // Check if the user is already logged in from localStorage
    const signupPageOn = localStorage.getItem("signupPageOn");
    return signupPageOn ? JSON.parse(signupPageOn) : true;
  });
  const handleLogin = () => {
    // Logic to handle the login process
    // Set loggedIn to true when the user successfully logs in
    setLoggedIn(true);
  };
  const handleSignupPage = () => {
    // Logic to handle the login process
    // Set loggedIn to true when the user successfully logs in
    setSignupPage(!signupPage);
  };
  const handleLogout = () => {
    // Logic to handle the logout process
    // Set loggedIn to false when the user logs out
    setLoggedIn(false);
  };
  // Update localStorage whenever loggedIn changes
  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    localStorage.setItem("signupPageOn", JSON.stringify(signupPage));
  }, [loggedIn, signupPage]);

  const handleSidebar = () => {
    setMainSidebar(!mainSidebar);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleNewSidebar = () => {
    setNewSidebar(!newsidebar);
    setSidebarOpen(false);
  };
  const handleSearchbar = () => {
    setSearchbar(!searchbar);
  };
  const handleAddNewCompanyClick = () => {
    setContactForm(!contactForm);
  };
  const handleFormClose = () => {
    setNewSidebar(false);
    setSearchbar(false);
  };
  const handleContactClose = () => {
    setContactForm(false);
  };

  const handleAddAccount = () => {
    setAccountForm(!accountform);
  };

  const [SidebarItems, setSidebarItems] = useState(SidebarData);

  const toggleSubmenu = (index) => {
    const updatedSidebarItems = [...SidebarItems];
    updatedSidebarItems[index].subNavOpen = !updatedSidebarItems[index].subNavOpen;
    setSidebarItems(updatedSidebarItems);
  };

  const isAuthenticated = localStorage.getItem("token");
  const hasCompletedSignup = localStorage.getItem("signupComplete"); // Add your own condition for signup completion

  return (
    <>
      {loggedIn ? (
        <div>
          <div className="row">
            <div className="bars-btn">
              <HiBars3 onClick={handleSidebar} />
              <i className="bx bx-chevron-right toggle"></i>
            </div>

            <div className={` ${sidebarOpen ? "col-2 menu" : "col-1 menu"}`}>
              <div className={`sidebar ${sidebarOpen ? "" : "close"}`}>
                <header>
                  <div className="image-text">
                    <span className="image">
                      <img src={logo} alt="" />
                    </span>
                    <div className="text logo-text">
                      <span className="name">SNP</span>
                    </div>
                  </div>
                </header>
                <div className="toggle">
                  <FaAngleLeft style={{ color: "white" }} onClick={toggleSidebar} />
                </div>

                {/* //todo sidebar map function */}
                <div className="menu-bar">
                  <div className="menus">
                    <ul className="menu-links">
                      {SidebarItems.map((item, index) => (
                        <li className="nav-link" key={index}>
                          <a href={item.path} onClick={() => item.subNav && toggleSubmenu(index)}>
                            <i className="icon " onClick={toggleSidebar}>
                              {item.icon}
                            </i>
                            <span className="text nav-text">{item.title}</span>
                            {item.subNav && <i className={`bx ${item.subNavOpen ? "bx-chevron-down" : "bx-chevron-up"} caret-icon`}></i>}
                          </a>
                          {item.subNav && item.subNavOpen && (
                            <ul className="submenu d-block">
                              {item.subNav.map((subItem, subIndex) => (
                                <li className="subnav-link" key={subIndex}>
                                  <a href={subItem.path}>
                                    <i className="icon " onClick={toggleSidebar}>
                                      {subItem.icon}
                                    </i>
                                    <span className="text nav-text">{subItem.title}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* User Info, Profile Image, Profile Link, and Logout Button */}
                  <div className={`bottom-menu ${sidebarOpen ? "" : "close"}`}>
                    <div className="user-info" style={{ display: "flex", justifyContent: "center", alighItems: "center" }}>
                      <img src={user} alt="" className="profile-image" style={{ marginTop: "15px" }} />
                      {/* {logindata && ( */}
                      <div className="user-details" style={{ marginTop: "15px" }}>
                        <span className="user-name"> User</span>
                      </div>
                        {/* )} */}
                      <div className="logout-btn">
                        <button  onClick={() => {
                                        handleLogout()
                                      }} style={{ background: "none", color: "var(--text-color)" }}>
                          <IoIosLogOut style={{ float: "right", fontSize: "30px" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* //todo sidebar map function */}
              </div>
            </div>

            <div className={` ${sidebarOpen ? "col-10 menu2" : "col-11 menu2close"} }`}>
              <div className="dash-header col-12" style={{ marginLeft: "15px", height: "60px", backgroundColor: "var(--sidebar-color) ", padding: "20px" }}>
                <div className="btns-grp col-12 " style={{ marginTop: "10px" }}>
                  <button className="nbtn col-3" onClick={handleNewSidebar}>
                    New
                  </button>
                  <button className="sbtn col-3" onClick={handleSearchbar}>
                    <IoSearch className="bicon" />
                  </button>
                </div>
              </div>
              {/* onclick new button new sidebar is open */}
              <div className={`sidebar3 col-2  ${newsidebar ? "open" : ""}`}>
                <NewSidebar account={handleAddAccount} formclose={handleFormClose} contact={handleAddNewCompanyClick} />
              </div>
              {/* onclick new button new sidebar is open */}

              {/*new search bar  */}
              <div className={`search-side col-2 ${searchbar ? "open" : ""}`}>
                <SearchBar searchbar formclose={handleSearchbar} />
              </div>
              {/*new search bar  */}

              {/* contact form */}
              <div className={`contact-container col-4  ${contactForm ? "contact-open" : ""}`}>
                <CreateContact handleContactClose={handleContactClose} />
              </div>

              {/* Account info */}
              <div className={`account-container col-4  ${accountform ? "account-open" : ""}`}>
                <CreateAccount handleAddAccount={handleAddAccount} />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      ) : signupPage ? (
        <div>
          <div className={` ${sidebarOpen ? "col-12 " : "col-12 "} }`}>
            <Adminlogin toggleLogin={handleLogin} handleSignupPage={handleSignupPage} />
          </div>
        </div>
      ) : (
        <div>
          <div className={` ${sidebarOpen ? "col-12 " : "col-12 "} }`}>
            <AdminSignup handleSignupPage={handleSignupPage} />
          </div>

          {/* <button onClick={handleSignupPage}>Click the button!</button> */}
        </div>
      )}
    </>
  );
};

export default Layout;
