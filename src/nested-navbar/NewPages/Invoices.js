import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
const Invoices = () => {
  const accountid = '661b6d50187951c779906e29'
  return (
    <div className="invoices">
    <div className="invoices-nav" style={{ display: 'flex', gap: '50px', }}>
      <NavLink to={`/accountsdash/invoices/${accountid}/invoice`} >Invoice</NavLink >
      <NavLink to={`/accountsdash/invoices/${accountid}/payments`} >Payments</NavLink>
    
    </div>
    <div> <hr/></div>
    <div style={{paddingTop:'20px'}}><Outlet /></div>
  </div>
  )
}

export default Invoices