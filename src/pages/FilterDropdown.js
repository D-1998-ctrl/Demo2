import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';


const DropdownMenu = ({ columns }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const handleSelectColumn = (column) => {
    setSelectedColumn(column);
    // Call a filtering function here based on the selected column
    // For example, you can pass the selected column to a parent component
    // where the filtering logic is implemented
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginRight: '20px', display: 'inline-block' }}>
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={toggleDropdown}>
          <RiAddCircleLine /> Filter
        </span>
      </div>
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', right: 0, borderRadius: "10px", textAlign: "left", backgroundColor: '#fff', border: '1px solid #ccc', width: "120px" }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {['Search', ...columns].map((column, index) => ( // Prepend "Search" to columns array
              <li key={index} style={{ paddingLeft: "10px" }} onClick={() => handleSelectColumn(column)}>{column}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;