import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Workflow = () => {
  const accountid = '661b6d50187951c779906e29'
  return (
    
    <div className="workflow">
      <div className="workflow-nav" style={{ display: 'flex', gap: '50px', }}>
        <NavLink to={`/accountsdash/workflow/${accountid}/activejobs`} activeClassName="active">Active Jobs</NavLink>
        <NavLink to={`/accountsdash/workflow/${accountid}/archivedjobs`} activeClassName="active">Archived Jobs</NavLink>
        <NavLink to={`/accountsdash/workflow/${accountid}/pipelines`} activeClassName="active">Pipelines</NavLink>
      </div>
      <div> <hr/></div>
     <div style={{paddingTop:'20px'}}><Outlet /></div>
    </div>
  )
}

export default Workflow