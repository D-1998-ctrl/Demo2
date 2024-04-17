import React from "react";
import { GoQuestion } from "react-icons/go";
import { MdPrint } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./account.css";
const Account = () => {
  const data = [
    { name: 'ABC', follow: "", type: 'individual', invoices:"", credits:'' },
    { name: 'ABC', follow: "", type: 'individual', invoices:"", credits:'' },
    { name: 'ABC', follow: "", type: 'individual', invoices:"", credits:'' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="act-container col-12">
        <div className="act-header col-12" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="act-heading ">
            <h1 style={{ fontSize: "40px" }}>Accounts</h1>
          </div>
          <div className="act-iacon">
            <GoQuestion style={{ color: "blue", marginLeft: "5px", fontSize: "25px", fontWeight: "800" }} />
          </div>
        </div>
        <div className="act-navbar col-4" style={{ paddingTop: "10px" }}>
          <div className="col-12" style={{ display: "flex", backgroundColor: "grey", height: "40px", alignItems: "center", padding: "5px", borderRadius: "10px" }}>
            <div className="act-active col-4">
              <h4 className="col-6" style={{ height: "30px", borderRadius: "10px", alignItems: "center", textAlign: "center" }}>
                Active
              </h4>
            </div>
            <div className="act-active col-4">
              <h4 className="col-6" style={{ height: "30px", borderRadius: "10px", alignItems: "center", textAlign: "center" }}>
                Archived
              </h4>
            </div>
            <div className="act-active col-4">
              <h4 className="col-12" style={{ height: "30px", borderRadius: "10px", alignItems: "center", textAlign: "center" }}>
                Pending activation
              </h4>
            </div>
          </div>
        </div>

        <div className="second-navbar col-12" style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <div className="col-12" style={{ display: "flex", alignItems: "center", color: "blue", fontSize: "16px" }}>
              <div>
                <FaRegStar />
              </div>
              <select style={{ border: "none", backgroundColor: "var(--body-color)", color: "blue", fontSize: "16px" }}>
                <option>Presets</option>
              </select>
            </div>
            <div style={{ marginLeft: "25px", paddingTop: "15px" }}>
              <div className="col-12" style={{ display: "flex", alignItems: "center", color: "blue", fontSize: "16px" }}>
                <div>
                  <GoPlusCircle />
                </div>
                <select style={{ border: "none", backgroundColor: "var(--body-color)", color: "blue", fontSize: "16px", paddingTop: "10px" }}>
                  <option>Filter</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="col-8" style={{ float: "right" }}>
              <div>
                <button className="col-2" style={{ backgroundColor: "blue", border: "none", padding: "16px", borderRadius: "10px", color: "#fff", fontSize: "15px" }}>
                  New account
                </button>
              </div>
              <div>
                <button className="col-2" style={{ border: "1px solid blue", padding: "15px", borderRadius: "10px", color: "blue", fontSize: "15px", marginLeft: "20px" }}>
                  Import
                </button>
              </div>
              <div>
                <button className="col-1" onClick={handlePrint} style={{ backgroundColor: "var(--body-color)", color: "none", border: "none", fontSize: "30px", marginTop: "10px", marginLeft: "20px" }}>
                  <MdPrint />
                </button>
              </div>
              <div className="col-4 box">
                <li className="search-box" style={{ marginLeft: "20px" }}>
                  <IoSearch className="icon" style={{ marginLeft: "10px" }} />
                  <input type="text" placeholder="Search..." className="col-6" />
                </li>
              </div>
              <div style={{ paddingTop: "20px", float: "right", marginRight: "10px", color: "blue", fontSize: "25px" }}>
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12" style={{ padding: "20px" }}>
          <table className="my-table col-12">
            <thead>
              <tr>
                <th style={{color:'#000'}}>Name</th>
                <th style={{color:'#000'}}>Follow</th>
                <th style={{color:'#000'}}>Type</th>
                <th style={{color:'#000'}}>Invoices</th>
                <th style={{color:'#000'}}>Credits</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.follow}</td>
                  <td>{row.type}</td>
                  <td>{row.invoices}</td>
                  <td>{row.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Account;
