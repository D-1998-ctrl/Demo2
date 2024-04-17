import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
const Email = () => {
  const accountid = '661b6d50187951c779906e29'
  return (
    <div className="email">
      <div className="email-nav" style={{ display: 'flex', gap: '50px', }}>
        <NavLink to={`/accountsdash/email/${accountid}/inbox`}>Inbox</NavLink>
        <NavLink to={`/accountsdash/email/${accountid}/sent`} >Sent</NavLink>

      </div>
      <div> <hr/></div>
      <div style={{paddingTop:'20px'}}><Outlet /></div>
    </div>
  )
}

export default Email