import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./tagscreate.css";
// import { TfiPencilAlt } from "react-icons/tfi";
import { FiSettings } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
// import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
const Tagcreate = () => {
  const updateTag = () => { };
  const [isTagFormOpen, setIsTagFormOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const colors = ["#EE4B2B", "#FFAC1C", "#32CD32", "#008000", "#0000FF", "#BF40BF", "#F72798"];

  const [Save, setSave] = useState(false);
  // const [Cnsl,setCnsl]=useState(false);



  const handleSaveClick = () => {
    setSave(!Save)
  }

  const calculateWidth = (label) => {
    const textWidth = label.length * 8;
    return Math.min(textWidth, 200);
  };

  const [tagid, settagidData] = useState();
  const handleEdit = async (_id) => {

    setGetId(_id)

    setOpenMenuId(false)
    setIsTagFormOpen(!isTagFormOpen);

    const response = await fetch('http://127.0.0.1:8080/common/tag/' + _id);

    if (!response.ok) {
      throw new Error('Failed to fetch job data');
    }
    const data = await response.json();
    settagidData(data.tag)
    setInputValue(data.tag.tagName)

    const newOptions = generateOptions(data.tag.tagName);
    setOptions(newOptions);


    if (tagid && tagid) {

      const tags = tagid.map(tag => ({
        value: tag._id,
        label: tag.tagName,
        colour: tag.tagColour,

        customStyle: {
          backgroundColor: tag.tagColour,
          color: "#fff",
          borderRadius: "8px",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "5px",
          padding: "2px,8px",

          fontSize: '10px',
          width: `${calculateWidth(tag.tagName)}px`,
          margin: '7px'
        },
      }));

      setSelectedOption(tags);
    }


  };



  const handleFormClose = () => {
    setIsTagFormOpen(false);
  };
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };



  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    const newOptions = generateOptions(inputValue);
    setOptions(newOptions);
  };

  const generateOptions = (inputValue) => {
    return colors.map((tagColour, index) => ({
      //   value: ${inputValue.toLowerCase()}-${index},
      value: `${inputValue.toLowerCase()}-${index}`,
      tagName: inputValue,
      tagColour: tagColour,
    }));
  };

  const handleUpdatesumbit = () => {
    if (selectedOption) {
      const { tagName: tagName, tagColour } = selectedOption;
      // console.log("Submitted name:", tagName);
      // console.log("Submitted color:", tagColour);

      // Send API data
      UpdatedTag(tagName, tagColour);
    }
    // console.log("Submitted data:", selectedOption);
  };


  const handleSubmit = () => {
    if (selectedOption) {
      const { tagName: tagName, tagColour } = selectedOption;
      // console.log("Submitted name:", tagName);
      // console.log("Submitted color:", tagColour);

      // Send API data
      sendApiData(tagName, tagColour);
    }
    // console.log("Submitted data:", selectedOption);
  };

  const sendApiData = (tagName, tagColour) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      tagName: tagName,
      tagColour: tagColour,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/common/tag/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      toast.success("Tag data sent successfully!");
    window.location.reload()
      .catch((error) => console.error(error));
  };

  const handleClear = () => {
    setInputValue("");
    setSelectedOption(null);
    setOptions([]);
  };

  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/common/tag/");
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  //


  const [getId, setGetId] = useState("");
  //delete template
  const handleDelete = (_id) => {

    setGetId(_id)


    setOpenMenuId(false)
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/common/tag/" + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        toast.success('Item deleted successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete item');
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tags.length / itemsPerPage);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, tags.length);
  const currentTemplates = tags.slice(startIndex, endIndex);


  const [tagidget, setTagidGet] = useState("");


  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
    setTagidGet(_id)
  };











  const UpdatedTag = (tagName, tagColour) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      tagName: tagName,
      tagColour: tagColour
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/common/tag/" + getId, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        // Assuming you have a function to show a toast notification
        console.log(result);
        toast.success('Tag Updated successfully');
        
        window.location.reload();
      })
      .catch((error) => {
        // Assuming you have a function to show a toast notification

        console.error(error);
      });


  }



  return (
    <>
      <div className="input-with-color-dropdown-container">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <label style={{ marginTop: "10px" }}>Name</label>
          <input style={{ marginLeft: "20px", height: "40px" }} type="text" value={inputValue} onChange={(e) => handleInputChange(e.target.value)} placeholder="Name" className="input-field" />
        </div>
        <div style={{ display: "flex" }}>
          <label style={{ marginTop: "10px", marginRight: "10px" }}>Color</label>
          <Select value={selectedOption} onChange={handleChange} options={options} placeholder="Select Tag" getOptionLabel={(option) => <div style={{ marginTop: "20px", color: option.tagColour, backgroundColor: option.tagColour, color: "#fff", borderRadius: "10px", width: "70px", justifyContent: "center", textAlign: "center" }}>{option.tagName}</div>} getOptionValue={(option) => option.value} className="select-dropdown" />
        </div>
        <div>
          <button style={{ marginTop: "1px" }} onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      </div>

      <div style={{ width: "50rem" }}>
        <h3>Tags Table</h3>
        <table style={{ width: "80rem", borderCollapse: "collapse" }}>
          <thead>
            <tr >
              <th>Tag</th>
              <th>Accounts</th>
              <th>Archived accounts</th>
              <th>Pending tasks</th>
              <th>Completed tasks</th>
              <th>Pipelines</th>
              <th>
                <FiSettings />
              </th>
            </tr>

          </thead>
          <tbody>
            {currentTemplates.map((tag) => (
              <tr key={tag._id} > {/* Adjust row height here */}
                <td style={{ textAlign: "center", padding: "0.5rem" }}>
                  <span
                    style={{
                      backgroundColor: tag.tagColour,
                      color: "#fff",
                      borderRadius: "60px",
                      padding: "0.2rem 0.5rem",
                      fontSize: "12px",
                    }}
                  >
                    {tag.tagName}
                  </span>
                </td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>

                  <div style={{ color: "#2c59fa" }} className="verticaldots">
                    <button
                      onClick={() => {
                        updateTag(tag._id);
                      }}
                      style={{ marginLeft: "10px", background: "none", color: "black", }}
                      className="btn btn-success"
                    >
                      {" "}
                      <CiMenuKebab
                        onClick={() => toggleMenu(tag._id)}
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                      {openMenuId === tag._id && (
                        <div className="menu-options">
                          <div onClick={() => handleEdit(tag._id)} style={{ color: 'blue', cursor: 'pointer' }}>Edit</div>
                          <div onClick={(txt) => handleDelete(tag._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</div>
                        </div>
                      )}
                    </button>
                  </div>




                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={`tag-form-container ${isTagFormOpen ? "tag-form-open" : ""}`}>
          <div className="edit-tag-header">
            <h3>Edit Tag</h3>
            <div onClick={handleFormClose} style={{ color: "#2c59fa", fontSize: '20px', cursor: 'pointer' }} className="cross"><RxCross2 /></div>
          </div>
          <hr />

          <div className='tag-form-area'>
            <div className='create-form col-12'>
              <div>
                <label style={{ fontSize: '14px' }}>Name</label>
                <input type='text' value={inputValue} onChange={(e) => handleInputChange(e.target.value)} className='tag-input' />
              </div>
              <div className='tag-select-container'>
                <div className='tag-label-container'>
                  <label>Color</label>
                </div>
                <Select value={selectedOption} onChange={handleChange} options={options} placeholder="Select Tag" getOptionLabel={(option) => <div style={{ marginTop: "20px", color: option.tagColour, backgroundColor: option.tagColour, color: "#fff", borderRadius: "10px", width: "70px", justifyContent: "center", textAlign: "center" }}>{option.tagName}</div>} getOptionValue={(option) => option.value} className="select-dropdown" />
              </div>
            </div>
          </div>

          <div className="tag-btns">

            <button onClick={handleUpdatesumbit} style={{ borderRadius: '10px', padding: '8px', width: '18%', fontSize: '15px' }} type="button" className="button-2" >Save </button>
            <button onClick={handleFormClose} style={{ borderRadius: '10px', padding: '8px', width: '15%', background: 'none', border: '1px solid #007bff', color: '#007bff', fontSize: '15px' }} type="button" className="button-1" >Cancel</button>
          </div>
        </div>
        <div>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div >
    </>
  );
};

export default Tagcreate;
