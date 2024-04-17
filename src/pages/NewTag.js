import React, { useState, useEffect } from "react";
import { LiaUserTagSolid } from "react-icons/lia";
// import { NavLink } from "react-router-dom";
import Select from "react-select";
import { RxCross2 } from "react-icons/rx";
import "./newtag.css";
const NewTag = () => {
  const [tagsidebar, setTagSidebar] = useState(false);

  const handleTagSidebar = () => {
    setTagSidebar(!tagsidebar);
  };
  const handletagClose = () => {
    setTagSidebar(false);
  };
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const colors = ["#EE4B2B", "#FFAC1C", "#32CD32", "#008000", "#0000FF", "#BF40BF", "#F72798"];

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

    fetch("http://127.0.0.1:8080/tag/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const handleClear = () => {
    setInputValue("");
    setSelectedOption(null);
    setOptions([]);
  };

  return (
    <>
      <div className="tag-header col-12" style={{ display: "flex", padding: "20px" }}>
        <div className="tag-title col-6">
          <h2 style={{ fontSize: "30px" }}>Tags</h2>
        </div>
        <div className="tag-button col-6">
          <button className="create-tagbtn col-2" onClick={handleTagSidebar}>
            New Tag
          </button>
        </div>
      </div>
      <div className="tag-container col-12">
        <div className="col-12" style={{ textAlign: "center", paddingTop: "10%" }}>
          <LiaUserTagSolid className="col-12" style={{ height: "150px", color: "#959595" }} />
          <div className="col-12">
            <h4 style={{ paddingTop: "10px" }}>No tags</h4>
            <p>tags will appear here</p>
          </div>
          <div className="col-12" style={{ padding: "20px" }}>
            <button className="addnewtag" onClick={handleTagSidebar}>
              Create new tag
            </button>
          </div>
        </div>
      </div>

      <div className={`create-tag col-4 ${tagsidebar ? "tag-open" : ""}`}>
        <div className="create-tag-container col-12">
          <div className="tag_header_title col-12">
            <div className="title ">Create Tag</div>
            <button type="button" style={{ color: "blue", border: "none", background: "none", fontSize: "15px", cursor: "pointer" }} onClick={() => handletagClose()}>
              <RxCross2 />
            </button>
          </div>
        </div>
        <div className="tag-fields col-12" style={{ padding: "15px" }}>
          <div className="name-label" style={{ paddingTop: "40px", margin: "10px 10px 10px 0" }}>
            <label>Name</label>
          </div>
          <div className="tag-input col-12">
            <input type="text" value={inputValue} onChange={(e) => handleInputChange(e.target.value)} placeholder="Name" className=" tag-input-box col-12" style={{ marginBottom: "10px" }} />
          </div>
          <div className="name-label" style={{ margin: "10px 10px 10px 0" }}>
            <label>Color</label>
          </div>
          <div>
            <Select value={selectedOption} onChange={handleChange} options={options} placeholder="Select Tag" getOptionLabel={(option) => <div style={{ color: option.tagColour, backgroundColor: option.tagColour, color: "#fff", borderRadius: "10px", width: "70px", justifyContent: "center", textAlign: "center" }}>{option.tagName}</div>} getOptionValue={(option) => option.value} className="select-dropdown" />
          </div>
          <div className="tag-buttons col-6" style={{ paddingTop: "10px", display: "flex", flexDirection: "row", gap: "30px" }}>
            <div className="save-btn col-6">
              {/* <NavLink to="/tagtable"> */}
              <button onClick={handleSubmit} className="col-12">
                Save
              </button>
              {/* </NavLink> */}
            </div>
            <div className="cancle-btn col-6">
              <button onClick={handleClear} className="col-12">
                Cancle
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTag;
