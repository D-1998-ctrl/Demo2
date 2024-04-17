import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Docs = () => {
    const accountid = '661b6d50187951c779906e29'
  return (
    
    <div className="Docs">
      <div className="Docs-nav" style={{ display: 'flex', gap: '50px', }}>
        <NavLink to={`/accountsdash/docs/${accountid}/documents`} activeClassName="active">Documents</NavLink>
        <NavLink to={`/accountsdash/docs/${accountid}/approvals`} activeClassName="active">Approvals</NavLink>
        <NavLink to={`/accountsdash/docs/${accountid}/signatures`} activeClassName="active">Signatures</NavLink>
        <NavLink to={`/accountsdash/docs/${accountid}/filerequests`} activeClassName="active">File Requests</NavLink>
        <NavLink to={`/accountsdash/docs/${accountid}/trash`} activeClassName="active">Trash</NavLink>
        <NavLink to={`/accountsdash/docs/${accountid}/irs`} activeClassName="active">IRS</NavLink>
      </div>
      <div> <hr/></div>
     <div style={{paddingTop:'20px'}}><Outlet /></div>
    </div>
  )
}

export default Docs