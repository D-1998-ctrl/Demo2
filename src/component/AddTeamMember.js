import React from "react";
import Select from "react-select";

function AddTeamMember({ addTeamMember }) {
  const options = [
    { value: "Vinayak", label: "Vinayak", color: "#808080" },
    { value: "Rohit", label: "Rohit", color: "#808080" },
    { value: "Radhika", label: "Radhika", color: "#808080" },
    { value: "Deepika", label: "Deepika", color: "#808080" },
  ];
  const handleChange = (selectedOption) => {
    //console.log("handledChange", selectedOption);
    addTeamMember(selectedOption);
  };
  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // console.log("option", data, isDisabled, isFocused, isSelected);
      return { ...styles, color: data.color };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff",
        borderRadius: 25,
        // height: 30,
        // width: 80,
        fontSize: 13,
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        //backgroundColor: data.color,
        color: "#fff",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,

        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "#fff",
        },
      };
    },
  };

  return <Select options={options} onChange={handleChange} isMulti styles={colorStyles} />;
}

export default AddTeamMember;
