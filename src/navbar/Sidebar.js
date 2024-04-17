import React, { useState } from "react";
import "./sidebar.css";
import logo from "../img/logo.svg";
import { FaAngleLeft } from "react-icons/fa";
import "boxicons";
import "boxicons/css/boxicons.min.css";
import { Outlet, Link } from "react-router-dom";

import NewSidebar from "./NewSidebar";
import CardView from "../pages/CardView";
import SearchBar from "./SearchBar";
import CreateContact from "../pages/Contact";
import CreateAccount from "../pages/CreateAccount";
import SidebarData from "./SidebarData";

import { IoSearch } from "react-icons/io5";

import { HiBars3 } from "react-icons/hi2";

import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Todo from "../component/Todo";

function Sidebar() {
  const [mainSidebar, setMainSidebar] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newsidebar, setNewSidebar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [contactForm, setContactForm] = useState(false);
  const [accountform, setAccountForm] = useState(false);

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

  //const { sidebarOpen, setSidebarOpen } = state;
  const [SidebarItems, setSidebarItems] = useState(SidebarData);
  //let dark = window.localStorage.getItem("dark");

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  const toggleSubmenu = (index) => {
    const updatedSidebarItems = [...SidebarItems];
    updatedSidebarItems[index].subNavOpen = !updatedSidebarItems[index].subNavOpen;
    setSidebarItems(updatedSidebarItems);
  };

  return (
    <>
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
                              <Link to={subItem.path}>Home</Link>
                              <i className="icon " onClick={toggleSidebar}>
                                {subItem.icon}
                              </i>
                              <span className="text nav-text">{subItem.title}</span>
                              {/* <a href={subItem.path}>
                                <i className="icon " onClick={toggleSidebar}>
                                  {subItem.icon}
                                </i>
                                <span className="text nav-text">{subItem.title}</span>
                              </a> */}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* //todo sidebar map function */}
          </div>
        </div>

        {/* <div className={` ${sidebarOpen ? "col-10 menu2" : "col-11 menu2close"} }`}> */}
        {/* <div className="headers col-12" style={{ marginLeft: "15px", height: "40px" }}>
            <div className="btns-grp ">
              <button className="nbtn col-2" onClick={handleNewSidebar}>
                New
              </button>
              <button className="sbtn col-2" onClick={handleSearchbar}>
                <IoSearch className="bicon" style={{ marginTop: "4px" }} />
              </button>
            </div>
          </div> 
        {/* //todo Card view  */}
        {/* <CardView /> */}
        {/* //todo Card view  */}
        {/* <div className="table-view col-12" style={{ marginTop: "50px", padding: "5px" }}>
            <Todo />
          </div> */}
        {/* </div> */}

        {/* onclick new button new sidebar is open */}
        {/* <div className={`sidebar3 col-2  ${newsidebar ? "open" : ""}`}>
          <NewSidebar account={handleAddAccount} formclose={handleFormClose} contact={handleAddNewCompanyClick} />
        </div> */}
        {/* onclick new button new sidebar is open */}

        {/*new search bar  */}
        {/* <div className={`search-side col-2 ${searchbar ? "open" : ""}`}>
          <SearchBar searchbar formclose={handleSearchbar} />
        </div> */}
        {/*new search bar  */}

        {/* contact form */}
        {/* <div className={`contact-container col-4  ${contactForm ? "contact-open" : ""}`}>
         
          <CreateContact handleContactClose={handleContactClose} />
        </div> */}

        {/* Account info */}
        {/* <div className={`account-container col-4  ${accountform ? "account-open" : ""}`}>
          <CreateAccount handleAddAccount={handleAddAccount} />
        </div> */}
      </div>
    </>
  );
}

export default Sidebar;
