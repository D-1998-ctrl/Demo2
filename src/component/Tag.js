// import React from "react";
// import Select from "react-select";

// function Tag({ addTag }) {
//   const options = [
//     { _id: "65d4a1df12be2f5b24cb70c1", value: "Gray", label: "Gray", color: "#808080" },

//     { value: "Red", label: "Red", color: "#EE4B2B" },
//     { value: "Orange", label: "Orange", color: "#FFAC1C" },
//     { value: "Lime", label: "Lime", color: "#32CD32" },
//     { value: "Green", label: "Green", color: "#008000" },
//     { value: "Blue", label: "Blue", color: "#0000FF" },
//     { value: "Purple", label: "Purple", color: "#BF40BF" },
//     { value: "Pink", label: "Pink", color: "#F72798" },
//   ];
//   const handleChange = (selectedOption) => {
//     //console.log("handledChange", selectedOption);
//     addTag(selectedOption);
//   };
//   const colorStyles = {
//     control: (styles) => ({ ...styles, backgroundColor: "white", textAlign: "left", backgroundColor: "#fff", borderRadius: "10px", borderColor: "Blue" }),
//     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//       // console.log("option", data, isDisabled, isFocused, isSelected);
//       return { ...styles, color: data.color };
//     },
//     multiValue: (styles, { data }) => {
//       return {
//         ...styles,
//         backgroundColor: data.color,
//         color: "#fff",
//         borderRadius: 25,
//         // height: 30,
//         // width: 80,
//         fontSize: 13,
//       };
//     },
//     multiValueLabel: (styles, { data }) => {
//       return {
//         ...styles,

//         borderRadius: 25,
//         color: "#fff",
//       };
//     },
//     multiValueRemove: (styles, { data }) => {
//       return {
//         ...styles,

//         color: "#fff",
//         cursor: "pointer",
//         ":hover": {
//           color: "#fff",
//         },
//       };
//     },
//   };

//   return <Select options={options} onChange={handleChange} isMulti styles={colorStyles} />;
// }

// export default Tag;
import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Tag = ({ addTag, value, onChange }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/tag/");
      const data = await response.json();
      setTags(data.tags);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleChange = (selectedOption) => {
    //console.log("handledChange", selectedOption);
    addTag(selectedOption);
  };

  const options = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
    colour: tag.tagColour,

    customStyle: {
      backgroundColor: tag.tagColour,
      color: "#fff",
      borderRadius: "12px",
      width: "100px",
      alignItems: "center",
      textAlign: "center",
      marginBottom: "5px",
      height: "30px",
      fontSize: 12,
    },
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      marginBottom: state.data.customStyle.marginBottom,
      height: state.data.customStyle.height,
      fontSize: 12,
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.customStyle.backgroundColor,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
      fontSize: 13,
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.customStyle.color,
      borderRadius: state.data.customStyle.borderRadius,
      width: state.data.customStyle.width,
      textAlign: state.data.customStyle.textAlign,
    }),

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

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
    console.log("Selected Tags:", selectedOptions);
  };

  return (
    <div>
      <Select
        options={options}
        components={animatedComponents}
        isMulti // Enable multi-select
        value={value}
        onChange={(onChange, handleChange)}
        placeholder="Select tags..."
        isSearchable // Enable search
        styles={customStyles}
      />
    </div>
  );
};

export default Tag;
