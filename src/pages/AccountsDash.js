import React, { useState, useEffect } from "react";
import { NavLink, Link,Outlet } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import './accountsdash.css'
import { useParams } from 'react-router-dom';
const AccountsDash = () => { 
  // const accountid = '661b6d50187951c779906e29'

  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data } = useParams();

  console.log(data)
  const handleFollowAccount = () => {

    setIsFormOpen(!isFormOpen);
  };
  const handleFollowAccountClose = () => {
    setIsFormOpen(false);
  };

  const [accountData, setaccountData] = useState();
  const [accName, setAccName] = useState();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/admin/accountdetails/accountdetailslist/listbyid/" + data, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setaccountData(result.accountlist);
        setAccName(result.accountlist.Name)
     
      })
      .catch((error) => console.error(error));
  }, []);



  return (
    <div className='form-open'>
      <div className="accountsdash-container col-12 "  >
        <nav className="navigation" >
          <Link to='/accounts'><MdKeyboardArrowLeft n /></Link>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <FaRegEye onClick={handleFollowAccount}  style={{ cursor: 'pointer', color:'#007bff' }}
            />
            <h4>{accName}</h4>
          </div>

          <NavLink to={`/accountsdash/overview/${data}`} activeClassName="active">  Overview </NavLink>
          <NavLink to={`/accountsdash/info/${data}`} activeClassName="active"> Info</NavLink>
          <NavLink to={`/accountsdash/docs/${data}`} activeClassName="active"> Docs</NavLink>
          <NavLink to={`/accountsdash/communication/${data}`} activeClassName="active"> Communication</NavLink>
          <NavLink to={`/accountsdash/organizers/${data}`} activeClassName="active"> Organizers</NavLink>
          <NavLink to={`/accountsdash/invoices/${data}`} activeClassName="active"> Invoices</NavLink>
          <NavLink to={`/accountsdash/email/${data}`} activeClassName="active">Email</NavLink>
          <NavLink to={`/accountsdash/proposals/${data}`} activeClassName="active"> Proposals & ELs</NavLink>
          <NavLink to={`/accountsdash/notes/${data}`} activeClassName="active"> Notes</NavLink>
          <NavLink to={`/accountsdash/workflow/${data}`} activeClassName="active"> Workflow</NavLink>

        </nav>
       <div> <hr style={{marginLeft:'20px'}}/></div>
        <div style={{ padding: '10px 0 0 25px' }}><Outlet /></div>

      </div>
      {/* right side  form  eye icon */}
      <div className={`follow-accounts ${isFormOpen ? "form-open" : ""}`}>
        <div className="header_title">
          <h4>Follow Account</h4>
          <RxCross2 onClick={handleFollowAccountClose} style={{ float: 'right', cursor: 'pointer' }} />


        </div>
      </div>
    </div>

  )
}

export default AccountsDash