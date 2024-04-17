import React from "react";
import Card from "../component/Card";
import { AiOutlineUser } from "react-icons/ai";
import Select from "react-select";

function CardView() {
  const optionsUser = [
    { value: "option1", label: "All members" },
    { value: "option2", label: "Self" },
  ];
  const defaultValueUser = optionsUser[0]; // Set the default selected value
  const dayUser = [
    { value: "option1", label: "Today" },
    { value: "option2", label: "Month" },
    { value: "option2", label: "Year" },
  ];
  const dayValueUser = dayUser[0]; // Set the default selected value
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "50%",
      minWidth: "20px",
      height: "10px",
      minHeight: "20px",
      height: "20px",
      fontSize: "10px", // Set font size for the control
      background: "gray",

      borderColor: state.isFocused ? "#00bcd4" : "#ccc", // Example: border color when focused
      // boxShadow: state.isFocused ? "0 0 0 1px rgba(0, 188, 212, 0.3)" : "none", // Example: box shadow when focused
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "20px", // Adjust the height of the indicators container
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      width: "30px", // Adjust the width of the dropdown indicator
      height: "20px", // Adjust the height of the dropdown indicator
      marginTop: "-15px",
      color: "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontFamily: "Arial, sans-serif", // Set font family for the selected text
      fontSize: "12px", // Set font size for the selected text
      color: "white",
      marginTop: "-8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#00bcd4" : "white", // Example: background color when selected
      color: state.isSelected ? "white" : "black", // Example: text color when selected
      fontSize: "10px", // Set font size for the control
    }),
    menu: (provided) => ({
      ...provided,
      width: "50%", // Set the width of the dropdown container
      fontSize: "16px", // Set the font size of the dropdown container
    }),
  };
  return (
    <div className="cardView">
      {/* //!card first view */}
      <div className="view col-12" style={{ paddingBottom: "22px" }}>
        <div className="menuli col-12 " style={{ marginLeft: "15px", width: "20px", marginBottom: "12px" }}>
          <h5>Insights</h5>
        </div>
        <div className="cardView1 col-12" style={{ marginLeft: "15px", display: "flex" }}>
          <div className="jobs col-1">
            <h6>Jobs</h6>
          </div>

          <div className="select col-2 " style={{ marginBottom: "12px" }}>
            <Select options={optionsUser} styles={customStyles} defaultValue={defaultValueUser} />
          </div>
        </div>
        <div className="reportcard col-12" style={{ marginLeft: "15px", display: "flex" }}>
          <div className="card1  col-3" style={{ marginLeft: "0px" }}>
            <Card task="Overdue" number="1787" />
          </div>
          <div className="card1  col-3" style={{ marginLeft: "10px" }}>
            <Card task="Acoount" number="10" />
          </div>
          <div className="card1  col-3" style={{ marginLeft: "10px" }}>
            <Card task="Acoount" number="10" />
          </div>
          <div className="card1  col-3" style={{ marginLeft: "10px" }}>
            <Card task="Acoount" number="10" />
          </div>
        </div>
      </div>
      {/* //!card second view */}
      {/* <div className="view col-12 " style={{ marginTop: "0%" }}>
        <div className="cardView1 col-12" style={{ marginLeft: "15px", display: "flex" }}>
          <div className="jobs col-2">
            <h6>Pending client activity</h6>
          </div>
          <div className="select col-10 " style={{ marginLeft: "-14%", marginTop: "-0.5%" }}>
            <div class="form-group " style={{ width: "40%" }}>
              <div className="box">
                <select id="selectOption">
                  <option value="option1">All members</option>
                  <option value="option2">Self</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="reportcard col-12" style={{ marginLeft: "15px", display: "flex" }}>
          <div className="card1  col-3" style={{ marginLeft: "0px" }}>
            <Card task="Overdue" number="1787" />
          </div>
          <div className="card1  col-3" style={{ marginLeft: "10px" }}>
            <Card task="Acoount" number="10" />
          </div>
          <div className="card1  col-3" style={{ marginLeft: "10px" }}>
            <Card task="Acoount" number="10" />
          </div>
          <div className="card1  col-3" style={{ marginLeft: "10px" }}>
            <Card task="Acoount" number="10" />
          </div>
        </div>
      </div> */}
      {/* //!card third view */}
      <div className="view col-12">
        <div className="cardView1 col-12" style={{ margin: "15px", display: "flex" }}>
          <div className="topOption col-12" style={{ display: "flex" }}>
            <div style={{ marginLeft: "1px" }}>
              <h6>Task:To do</h6>
            </div>
            <div style={{ marginBottom: "12px", marginLeft: "20px" }}>
              <AiOutlineUser />
            </div>
            <div className="select col-2 " style={{ marginBottom: "12px", marginLeft: "10px" }}>
              <Select options={dayUser} styles={customStyles} defaultValue={dayValueUser} />
            </div>

            <div style={{ marginBottom: "12px", marginLeft: "-100px" }}>
              <AiOutlineUser />
            </div>

            <div className="select col-2 " style={{ marginBottom: "12px" }}>
              <Select options={optionsUser} styles={customStyles} defaultValue={defaultValueUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardView;
