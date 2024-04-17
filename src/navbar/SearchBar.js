import React from "react";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import "./searchBar.css";

function SearchBar({ searchbar, formclose }) {
  return (
    <div>
      <div className="search-container">
        <div className="header_title">
          <li className="search-box">
            <IoSearch className="icon" />
            <input type="text" placeholder="Search..." className="col-12" />
          </li>
          <button type="button" onClick={() => formclose()} style={{ margin: "10px" }} className="cancle-search">
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
