import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { SlEnvolope } from "react-icons/sl";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { CgFolderAdd } from "react-icons/cg";
import { GoBook } from "react-icons/go";
import { LiaFolderSolid } from "react-icons/lia";
import { CiMemoPad } from "react-icons/ci";
import { VscNewFolder } from "react-icons/vsc";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuStickyNote } from "react-icons/lu";
import { IoIosPaper } from "react-icons/io";
import { MdMoreTime } from "react-icons/md";
import { PiSuitcaseSimpleBold } from "react-icons/pi";

import { FaPaperPlane } from "react-icons/fa";
import "./newSidebar.css";
import { Link } from "react-router-dom";

function NewSidebar({ account, formclose, contact }) {
  return (
    <div>
      <div className="header_title">
        <div className="new-title">
          {" "}
          <HiOutlinePlus className="plus" />
          Company
        </div>
        <button type="button" onClick={() => formclose()}>
          <RxCross2 />
        </button>
      </div>
      <div className="content">
        <div className="content-list">
          <li className="side-link">
            <a href="#">
              <AiOutlineUser className="new-icon" />
              <span class="text nav-text" onClick={() => account()}>
                Account
              </span>
            </a>
          </li>
          <li className="side-link">
            <a href="#">
              <SlEnvolope className="new-icon" />
              <span class="text nav-text" onClick={() => contact()}>
                Contact
              </span>
            </a>
          </li>
          <hr />
          <li className="side-link">
            <a href="#">
              <HiOutlineDocumentPlus className="new-icon" />
              <span class="text nav-text">Document</span>
            </a>
          </li>
          <li className="side-link">
            <a href="#">
              <CgFolderAdd className="new-icon" />
              <span class="text nav-text">Folder</span>
            </a>
          </li>
          <li className="side-link">
            <a href="#">
              <GoBook className="new-icon" />
              <span class="text nav-text">Page</span>
            </a>
          </li>
          <hr />
          <li className="side-link">
            <a href="#">
              <LiaFolderSolid className="new-icon" />
              <span class="text nav-text">Proposal</span>
            </a>
          </li>
          <li className="side-link">
            <a href="#">
              <FaPaperPlane className="new-icon" />
              <span class="text nav-text">Chat</span>
            </a>
          </li>
          <li className="side-link">
            <a href="#">
              <CiMemoPad className="new-icon" />
              <span class="text nav-text">Organizer</span>
            </a>
          </li>
          <hr />
          <li className="side-link">
            <a href="#">
              <VscNewFolder className="new-icon" />
              <span class="text nav-text">Invoice</span>
            </a>
          </li>
          <li className="side-link">
            <a href="#">
              <RiBillLine className="new-icon" />
              <span class="text nav-text">Payment</span>
            </a>
          </li>
          <hr />
          <li className="side-link">
            <a href="#">
              <MdOutlineAlternateEmail className="new-icon" />
              <span class="text nav-text">Email</span>
            </a>
          </li>
          <li className="side-link">
            <a href="#">
              <LuStickyNote className="new-icon" />
              <span class="text nav-text">Note</span>
            </a>
          </li>
          <li className="side-link">
            <a href="#">
              <IoIosPaper className="new-icon" />
              <span class="text nav-text">Task</span>
            </a>
          </li>
          <li className="side-link">
            <a href="#">
              <MdMoreTime className="new-icon" />
              <span class="text nav-text">Time Entry</span>
            </a>
          </li>
          <li className="side-link">
            <Link to ="/AddJobs">
              <PiSuitcaseSimpleBold className="new-icon" />
              <span class="text nav-text" >Job</span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default NewSidebar;
