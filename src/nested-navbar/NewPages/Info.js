import React, { useState, useEffect } from 'react'
import { MdOutlineUnarchive } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import { PiSignatureThin } from "react-icons/pi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { LuUserCircle2 } from "react-icons/lu";
import './info.css'
import { HiOutlineDotsVertical } from "react-icons/hi";
import LoginSwitch from '../NewPages/components/LoginSwitch'
import NotifySwitch from '../NewPages/components/NotifySwitch'
import EmailSync from '../NewPages/components/EmailSync'
import { useParams } from 'react-router-dom';
import Switch from "react-switch";

const Info = () => {

  const { data } = useParams();
  console.log(data)

  const [emailSyncSwitch, setEmailSyncSwitch] = useState(false);
  const [loginSwitch, setLoginSwitch] = useState(false);
  const [notifySwitch, setNotifySwitch] = useState(false);

  const handleEmailChange = (checked) => {
      setEmailSyncSwitch(checked)
  }

    const handleLoginChange = (checked) => {
        setLoginSwitch(checked)
    }

    const handleNotifyChange = (checked) => {
        setNotifySwitch(checked)
    }

  const [accountData, setaccountData] = useState();
  const [accName, setAccName] = useState();
  const [usertype, setUserType] = useState();
  const [tags, setTags] = useState([]);
  const [teams, setTeams] = useState([]);
  const [contacts, setContacts] = useState([]);
  console.log(contacts);

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
        setUserType(result.accountlist.Type)
        setTags(result.accountlist.Tags)
        setTeams(result.accountlist.Team)
        setContacts(result.accountlist.Contacts)
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(accountData);
  




  return (
    <div style={{ display: 'flex', gap: '10%' }}>
      <div className='accounts-details col-6'>
        <div className='details-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Account details</h3>
          <div style={{ display: 'flex', gap: '20px', color: 'blue', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
              <MdOutlineUnarchive style={{ marginTop: '10px' }} />
              <p>Archive</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
              <LuPenLine style={{ marginTop: '10px' }} />
              <p>Edit</p>
            </div>
          </div>
        </div>
        <div style={{ borderBottom: '2px solid blue', marginTop: '20px' }}></div>

        <div className='account-users' style={{ display: 'flex', gap: '22%', alignItems: 'center', margin: ' 20px 0' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <LuUserCircle2 style={{ height: '80px', width: '80px', marginTop: '10px' }} />
            <div>
              <h3>{accName}</h3>
              <h5 style={{ fontWeight: '500' }}>{usertype}</h5>
            </div>

          </div>
          <button style={{ background: "none", border: '1px solid blue', borderRadius: '10px', color: 'blue' }}>Log in as account(read-only)</button>
        </div>
        <div >
          <h4>Account info</h4>

          <div style={{ display: 'flex', justifyContent: 'row' }} className='info-details'>
            {tags && tags.map((tag, index) => (
              <h5 key={index} style={{
                fontSize: "12px",
                padding: "0.2rem 0.3rem",
                backgroundColor: tag.tagColour,
                color: "#fff",
                borderRadius: "10px",
                textAlign: "center",
                marginBottom: '5px',
                marginRight: '5px',
              }}>{tag.tagName}</h5>
            ))}
          </div>



          <div style={{ display: 'flex', justifyContent: 'row' }} className='team'>
            {teams && teams.map((team, index) => (
              <h5 key={index} style={{
                backgroundColor: "lightgrey",
                color: 'black',
                borderRadius: '10px',
                // height: '25px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '5px',
                padding: "0.2rem 0.3rem",
              }}>{team.username}</h5>
            ))}
          </div>


          <div></div>

        </div>
      </div>
      <div className='contact-details col-6'>
        <div className='details-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Contact</h3>
          <div style={{ display: 'flex', gap: '20px', color: 'blue', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
              <PiSignatureThin style={{ marginTop: '10px' }} />
              <p>Signer priority</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
              <AiOutlinePlusCircle style={{ marginTop: '10px' }} />
              <p>Add Contacts</p>
            </div>

          </div>
        </div>
        <div style={{ borderBottom: '2px solid blue', marginTop: '20px' }}></div>
        <div className='contact-table'>
          <table >
            <tr>
              <th>

              </th>
              <th>LOGIN</th>
              <th>NOTIFY</th>
              <th>EMAIL SYNC</th>
              <th></th>
            </tr>

            <tr>
              {contacts && contacts.map((contact, index) => (
                <td>
                  <div style={{ display: 'flex', justifyContent: 'row' }} className='team'>
                    <h5>{contact.contactName}</h5>
                  </div>
                </td>
              ))}
            </tr>
      
                <tr>
                {contacts && contacts.map((contact, index) => (
    <React.Fragment key={index}>
                <td>
                  <h5>{contact.email}</h5>
                </td>
                <td > 
                  <Switch
                onChange={handleLoginChange}
                checked={contact.login}
                onColor="#3A91F5"
                onHandleColor="#FFF"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                height={25}
                width={45}
                className="react-switch"
            />  </td>
                <td><Switch
                onChange={handleNotifyChange}
                checked={contact.notify}
                onColor="#3A91F5"
                onHandleColor="#FFF"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                height={25}
                width={45}
                className="react-switch"
            />  </td>
                <td><Switch
                onChange={handleEmailChange}
                checked={contact.emailSync}
                onColor="#3A91F5"
                onHandleColor="#FFF"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                height={25}
                width={45}
                className="react-switch"
            /> </td>

       
                <td><HiOutlineDotsVertical /></td>
                </React.Fragment>
  ))}

              
              </tr>
          
          </table>

        </div>
      </div>
    </div >
  )
}

export default Info