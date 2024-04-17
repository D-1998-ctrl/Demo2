import React from "react";
import Select from "react-select";

function AddFolderTemplate({ addFolderTemplate }) {
  const options = [
    { value: "folderIndividual", label: "Folder Individual Account", color: "#808080" },
    { value: "folderCompany", label: "folderCompany", color: "#808080" },
    { value: "folderRgualr", label: "folderRgualr", color: "#808080" },
    { value: "folderAboveAverage", label: "folderAboveAverage", color: "#808080" },
  ];
  const handleChange = (selectedOption) => {
    //console.log("handledChange", selectedOption);
    addFolderTemplate(selectedOption);
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
  // defaultValue={options[0]}

  return <Select options={options} onChange={handleChange} isMulti styles={colorStyles} />;
}

export default AddFolderTemplate;
