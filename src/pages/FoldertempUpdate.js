import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiDocumentArrowUp } from "react-icons/hi2";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaRegFolderClosed } from "react-icons/fa6";
import { FaTimes } from 'react-icons/fa';
import { BsQuestionCircle } from "react-icons/bs";
import "../pages/folderttemp.css";
import { useNavigate, useParams } from 'react-router-dom'

const FoldertempUpdate = () => {
  const navigate = useNavigate();

  const { _id } = useParams();

  const [tempNames, setTempNames] = useState("");

  ///////////////////////////////////////////////////////////////////









  //get all templateName Record 
  const [templateData, setTemplateData] = useState(null);
  useEffect(() => {


    fetchData();

  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/common/folder-structure/' + _id);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();


      // console.log('Fetched data:', data);
      setTemplateData(data)
      setTempValues(data.folderTemplate.templatename)
      tempallvalue()

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const tempallvalue=()=>{
     setTempNameNew(tempvalues)
  }

  const [tempvalues, setTempValues] = useState();
  const [foldersvalue, setfoldervalue] = useState();


  //documents Upload

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };



  const handleButtonClick = () => {
    fileInputRef.current.click();
    folderInputRef.current.click();
  };


  //folder Upload
  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.files[0]);
  };

  const handleUploadFolder = async () => {
    if (!selectedFolder) {
      alert('Please select a folder to upload');
      return;
    }
  }





  //create folder

  const [folderName, setFolderName] = useState("");

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };
  const handleCreateFolder = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      foldername: folderName,
      // folderpath: "65fd30fdd6c0a2969913bd35/Client uploaded documents"
         folderpath:_id+"/"+selectedOption
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://127.0.0.1:8080/common/folder/createfolder", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };



  const [selectedOption, setSelectedOption] = useState(null);
  const [combinedvalues, setCombinedValues] = useState(null);

  const handleOptionChange = (option) => {

    setSelectedOption(option)
  };


  console.log(_id+"/" +selectedOption);


  ///////////////////////////////////////////////////////////////////////
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };


  const [tempNameNew, setTempNameNew] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);



  const handleSaveTemplate = async () => {
    // Check if the template name is empty
    if (tempNameNew.trim() === '') {
      // Display a toast error message if the template name is empty
      toast.error("Template name cannot be empty");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: tempNameNew
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/common/folder/" + _id, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // Display success toast
        toast.success("Template saved successfully");
        // Reset the form

       
      })
      .catch((error) => {
        console.error(error);
        // Display error toast
        toast.error("Failed to save template");
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);

  };
  const handleCancel = () => {


  };




//getfolder With API///////////////////////////////////////////////////////////////////////////////////////
useEffect(() => {


  getfolders();

}, []);


const getfolders = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8080/common/folder-structure/'+ _id);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();


    // console.log('Fetched data:', data);
    setTemplateData(data)
    setTempValues(data.folderTemplate.templatename)
  setfoldervalue(data.folderStructure)
    tempallvalue()

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


console.log(foldersvalue)


const [selectedFolderget, setSelectedFolderget] = useState(null);


const handleFolderClick = (folderName) => {
  if (selectedFolderget === folderName) {
    setSelectedFolderget(null); // Hide children if folder is already selected
  } else {
    setSelectedFolderget(folderName); // Show folder name data
  }
};




  return (
    <div className="container">
      <h1>Update Template</h1>


      <div >
        <input
          type="text" 
           placeholder={tempvalues}
          value={tempNameNew}
           onChange={e=> setTempNameNew(e.target.value)}
           
        />
   

        <div>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            
          />
          <button style={{ background: 'none', color: 'black' }} onClick={handleButtonClick}><HiDocumentArrowUp />Upload Documents </button>







          <input
            type="folder"
            directory=""
            webkitdirectory=""
            ref={folderInputRef}
            style={{ display: 'none' }}
            onChange={handleFolderChange}
          />
          <button style={{ background: 'none', color: 'black' }} onClick={handleButtonClick}><MdOutlineDriveFolderUpload />Upload Folder</button>


          <button style={{ background: 'none', color: 'black' }} onClick={toggleSidebar}><FaRegFolderClosed />Create Folder</button>
          {showSidebar && (
            <div className="sidebarfolder" >
              <span className="close-icon" onClick={closeSidebar}>
                <FaTimes />
              </span>

              Create Folder
              <div>
                <label>Folder Name</label>
                <input type="text" value={folderName} onChange={handleInputChange} />
              </div>

              <div>
                <span>Privacy
                </span><BsQuestionCircle />


                <div>
                  <label>
                    <input
                      type="radio"
                      value="Private"
                      checked={selectedOption === "Private"}
                      onChange={() => handleOptionChange("Private")}
                    />
                    Private
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Firm docs shared with client"
                      checked={selectedOption === "Firm docs shared with client"}
                      onChange={() => handleOptionChange("Firm docs shared with client")}
                    />
                    Client Can View
                  </label>
                  <label>
                    <input
                      type="radio"
                      value= "Client uploaded documents"
                      checked={selectedOption === "Client uploaded documents"}
                      onChange={() => handleOptionChange("Client uploaded documents")}
                    />
                    Client Can View and edit
                  </label>
                  <p>{selectedOption ? `Selected: ${selectedOption}` : 'No option selected'}</p>
                </div>

                   

              </div>
            
                 
              <div>
                <button onClick={handleCreateFolder}>save</button>
                <button onClick={closeSidebar}>Cancel</button>
              </div>
            </div>

          )}


        </div>

        <div>
        {foldersvalue?
        foldersvalue.map((folder, index) => (
        <div key={index}>
          <div onClick={() => handleFolderClick(folder.name)}>
            {selectedFolderget === folder.name ? folder.name :  folder.name }
          </div>
          {selectedFolderget === folder.name && folder.children.length > 0 && (
            <div>
              {folder.children.map((child, childIndex) => (
                <div key={childIndex}>{child.name}</div>
              ))}
            </div>
          )}
        </div>
      )):null}
        </div>



        <button onClick={handleSaveTemplate}>Save & Exit</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>

      <ToastContainer />
    </div>

  )
}

export default FoldertempUpdate