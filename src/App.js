
import Tagcreate from "./pages/Tagscreate";

import TagTable from "./pages/TagTable";

import "./App.css";

import "boxicons";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";

import AccountsData from "./pages/AccountsData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ContactTable from "./pages/ContactTable";

import FolderTemplate from "../src/pages/FolderTemplate";
import Pipeline from '../src/pages/pipeline'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FolderTemp from "./pages/FolderTemp";
import Demo from "./pages/Demo";
import CreatePipeline from "./pages/CreatePipeline";
import FoldertempUpdate from "./pages/FoldertempUpdate";
import CreateJobTemplate from "./pages/JobTemplate"
import JobTemplateUpdate from "./pages/JobTemplateUpdate";
import AddJobs from "./pages/AddJobs"
import JobsData from "./pages/JobData"

import NewTemplate from "./pages/Emailtemp/NewTemplate";
import UpdateEmail from "./pages/Emailtemp/UpdateEmail";
import PipelineTemplateUpdate from "./pages/PipelineTemplateUpdate";
import CreateEmailTemp from "./pages/Emailtemp/CreateEmailTemp";
import EmailTempsend from "./pages/EmailTempsend";

import Overview from './nested-navbar/NewPages/Overview';
import Notes from './nested-navbar/NewPages/Notes';
import Workflow from './nested-navbar/NewPages/Workflow';
import Pipelines from './nested-navbar/workflow-nav/Pipelines'
import ActiveJobs from './nested-navbar/workflow-nav/ActiveJobs'
import ArchivedJobs from './nested-navbar/workflow-nav/ArchivedJobs'
import Info from './nested-navbar/NewPages/Info'
import Proposals from './nested-navbar/NewPages/Proposals'
import Docs from './nested-navbar/NewPages/Docs'
import Communication from './nested-navbar/NewPages/Commuication'
import Organizers from './nested-navbar/NewPages/Organizers'
import Invoices from './nested-navbar/NewPages/Invoices'
import Email from './nested-navbar/NewPages/Email'
import Inbox from './nested-navbar/email-nav/Inbox'
import Sent from './nested-navbar/email-nav/Sent'
import Payments from './nested-navbar/invoices-nav/Payments'
import Invoice from './nested-navbar/invoices-nav/Invoice'
import AccountDash from './pages/AccountsDash'
import Documents from './nested-navbar/documents-nav/Documents'
import Approvals from './nested-navbar/documents-nav/Approvals'
import Signatures from './nested-navbar/documents-nav/Signatures'
import FileRequest from './nested-navbar/documents-nav/FileRequest'
import Trash from './nested-navbar/documents-nav/Trash'
import IRS from './nested-navbar/documents-nav/IRS'
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/tags" element={<Tagcreate />} />
          <Route path="/folder_template" element={<FolderTemp />} />
          <Route path="/tagtable" element={<TagTable />} />
          <Route path="/accounts" element={<AccountsData />} />
          <Route path="/contacts" element={<ContactTable />} />
        
          <Route path="/demo" element={<Demo />} />

          <Route path="/createpipeline" element={<CreatePipeline />} />
          <Route path="/createpipeline/PipelineTemplateUpdate/:_id" element={<PipelineTemplateUpdate />} />

          <Route path="/job_template" element={<CreateJobTemplate />} />
          <Route path="/job_template/JobTemplateUpdate/:_id" element={<JobTemplateUpdate />} />

          <Route path="/AddJobs" element={<AddJobs />} />
          <Route path="/jobs" element={<JobsData/>} />

          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />

          <Route path="/pipeline" element={<Pipeline/>} />
          <Route path="/FolderTemplate" element={<FolderTemplate />} />
          <Route path="/folder_template/FoldertempUpdate/:_id" element={<FoldertempUpdate />} />



          <Route path="/emailtemplate" element={<CreateEmailTemp/>} />
          <Route path="/newemailtemplate" element={<NewTemplate/>} />
          <Route path="/upemailtemplate/:_id" element={<UpdateEmail/>} />
          <Route path="/emailsenttemp" element={<EmailTempsend/>} />
          
          <Route path="*" element={<NoPage />} />
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
          <Route path='/accountsdash' element={<AccountDash />} >
          <Route path="overview/:data" element={<Overview />} />
            <Route path="info/:data" element={<Info />} />
            <Route path="docs/:data" element={<Docs />} >
              <Route path="documents" element={<Documents/>}/>
              <Route path='approvals' element={<Approvals/>}/>
              <Route path='signatures' element={<Signatures/>}/>
              <Route path='filerequests' element={<FileRequest/>}/>
              <Route path='trash' element={<Trash/>}/>
              <Route path='irs' element={<IRS/>}/>
            </Route>
            <Route path="communication/:data" element={<Communication />} />
            <Route path="organizers/:data" element={<Organizers />} />
            <Route path="invoices/:data" element={<Invoices />} >
              <Route path="invoice" element={<Invoice />} />
              <Route path="payments" element={<Payments />} />
            </Route>
            <Route path="email/:data" element={<Email />} >
              <Route path="inbox" element={<Inbox />} />
              <Route path="sent" element={<Sent />} />
            </Route>
            <Route path="proposals/:data" element={<Proposals />} />
            <Route path="notes/:data" element={<Notes />} />

            <Route path="workflow/:data" element={<Workflow />}>
              <Route path="pipelines" element={<Pipelines />} />
              <Route path="activejobs" element={<ActiveJobs />} />
              <Route path="archivedjobs" element={<ArchivedJobs />} />

            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
