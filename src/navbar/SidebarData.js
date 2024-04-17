import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";

import { MdOutlinePayments, MdOutlineMiscellaneousServices, MdAccountBalance } from "react-icons/md";

import { TfiLayersAlt } from "react-icons/tfi";
import { IoDocumentTextOutline, IoSettingsOutline, IoPeopleOutline, IoDocumentAttachSharp } from "react-icons/io5";
import { ImInsertTemplate } from "react-icons/im";
import { FiHome } from "react-icons/fi";
import { FaUserTag, FaRegCreditCard } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { FcParallelTasks } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";
import { SiCoinmarketcap } from "react-icons/si";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BsMicrosoftTeams } from "react-icons/bs";
import { GiRadialBalance } from "react-icons/gi";
import { TbSettings } from "react-icons/tb";
import { BiCaretRight } from "react-icons/bi";

const SidebarItems = [
  {
    title: "Insights",
    path: "/",
    icon: <AiOutlineAppstoreAdd />,
  },

  {
    title: "Inbox +",
    path: "/inbox",
    icon: <MdOutlineMail />,
  },
  {
    title: "Clients", // Main menu item with submenus
    icon: <IoPeopleOutline />,
    subNavOpen: false,
    subNav: [
      {
        title: "Accounts",
        path: "/accounts",
        icon: <BiCaretRight />,
      },
      {
        title: "Contacts",
        path: "/contacts",
        icon: <BiCaretRight />,
      },
    ],
  },
  {
    title: "Workflow", // Main menu item with submenus
    icon: <TfiLayersAlt />,
    subNavOpen: false,
    subNav: [
    
      {
        title: "Jobs",
        path: "/jobs",
        icon: <BiCaretRight />,
      },
      
      {
        title: "Pipelines",
        path: "/pipeline",
        icon: <BiCaretRight />,
      },
      
      {
        title: "Email ",
        path: "/emailsenttemp",
        icon: <BiCaretRight />,
      },
    ],
  },
  {
    title: "Documents", // Main menu item with submenus
    icon: <IoDocumentTextOutline />,
    subNavOpen: false,
    subNav: [
      {
        title: "Clientsdocs",
        path: "/submenu1",
        icon: <BiCaretRight />,
      },
      {
        title: "Wiki",
        path: "/submenu2",
        icon: <BiCaretRight />,
      },
    ],
  },

 
  {
    title: "Templates", // Main menu item with submenus
    icon: <ImInsertTemplate />,
    subNavOpen: false,
    subNav: [
      {
        title: "Email",
        path: "/emailtemplate",
        icon: <BiCaretRight />,
      },
      
      {
        title: "Folder ",
        path: "/folder_template",
        icon: <BiCaretRight />,
      }, 
      {
        title: "Tags",
        path: "/tags",
        icon: <BiCaretRight />,
      },
      {
        title: "Pipeline",
        path: "/createpipeline",
        icon: <BiCaretRight />,
      },
      {
        title: "Job ",
        path: "/job_template",
        icon: <BiCaretRight />,
      },
    ],
  },
 
];

export default SidebarItems;
