import React from "react";
import Select from "react-select";

const Priority = ({onPriorityChange, selectedPriority}) => {


  const options = [
    { value: "Urgent", label: "Urgent", color: "#0E0402" },
    { value: "High", label: "High", color: "#fe676e" },
    { value: "Medium", label: "Medium", color: "#FFC300" },
    { value: "Low", label: "Low", color: "#56c288" },
  ];

  const calculateWidth = (label) => {
    const textWidth = label.length * 9;
    return Math.min(textWidth, 220);
  };

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
  
    option: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.color,
      color: "#fff",
      borderRadius: "15px",
      textAlign: "center",
      padding: "2px,8px",
      margin: "7px",
      fontSize: "10px",
      fontWeight: "bold",
      width: `${calculateWidth(data.label)}px`, // Fix here
    }),
  
    singleValue: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.color,
      color: "#fff",
      borderRadius: "15px",
      width: `${calculateWidth(data.label) + 20}px`, // Fix here
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "center",
    }),
  
    singleValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.color,
      color: "#fff",
      borderRadius: "15px",
      textAlign: "center",
      fontSize: "12px",
    }),
  };
  
  const handleChange = (selectedOption) => {
    onPriorityChange(selectedOption);
    console.log("handleChange", selectedOption);
  };

  return (
    <Select options={options} 
    onChange={handleChange} 
    styles={colorStyles} 
    value = {options.find(option => option.value === selectedPriority)}
    isSearchable // Enable search
    isClearable
    />
    
  );
};

export default Priority;