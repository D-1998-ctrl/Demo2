import React, { useState, useEffect } from "react";
import accounts from "./AccountDumy"; // Importing dummy data
import "./accountsdata.css"; // Importing CSS file
import { RiDeleteBin5Line } from 'react-icons/ri'; // Importing delete icon
import DropdownMenu from './FilterDropdown'; // Importing dropdown menu component

const AccountsData = () => {
  // State variables
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const columns = ['Client Type', 'Tags', 'Team', 'Pipeline and Stages', 'Invoices'];
  // Fetching data from server on component mount
  useEffect(() => {
    // Fetching contact data
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/common/contact/contactlist/list/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setContacts(result.contactlist);
      })
      .catch((error) => console.error(error));
  }, []);

  // Constants for pagination
  const itemsPerPage = 7;
  const totalPages = contacts ? Math.ceil(contacts.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, contacts.length);

  // Functions for pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to delete a contact
  const handleDelete = (_id) => {
    // Sending DELETE request
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8080/common/contact/" + _id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  // Function to handle checkbox changes
  const handleRecordCheckboxChange = (id) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(id)) {
        return prevSelectedContacts.filter((contactId) => contactId !== id);
      } else {
        return [...prevSelectedContacts, id];
      }
    });
  };

  // Function to handle master checkbox change
  const handleCheckboxChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allcontactIds = contacts.map(contact => contact.id);
      setSelectedContacts(allcontactIds);
    } else {
      setSelectedContacts([]);
    }
  };

  // Filtering contacts based on search text
  const filteredContacts = contacts.filter(contact =>
    (contact.Name && contact.Name.toLowerCase().includes(filter.toLowerCase())) ||
    (contact.Email && contact.Email.toLowerCase().includes(filter.toLowerCase())) ||
    (contact.phoneNumber && contact.phoneNumber.some(number => number.value && number.value.toLowerCase().includes(filter.toLowerCase())))
    // (contact.phoneNumber && contact.phoneNumber.some(number => number.phoneNumber && number.phoneNumber.toLowerCase().includes(filter.toLowerCase()))) ||
    (contact.companyName && contact.companyName.toLowerCase().includes(filter.toLowerCase())) ||
    (contact.Tags && contact.Tags.some(tagArray => tagArray.some(tag => tag.tagName && tag.tagName.toLowerCase().includes(filter.toLowerCase()))))
  );

  // Rendering
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginLeft: "20px", width: "25%", height: "10px", padding: "15px 10px", borderRadius: "20px" }}>
        <DropdownMenu columns={columns} />
      </div>

      <div style={{ position: "relative", textAlign: "right" }}>
        <input
          className="searchText"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
          style={{ width: "25%", height: "10px", padding: "15px 10px", borderRadius: "20px" }}
        />
      </div>

      <table className="my-table col-12 ">
        <thead>
          <tr>
            <th><input type="checkbox"   checked={selectAll} onChange={handleCheckboxChange} /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Company Name</th>
            <th>Tags</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.slice(startIndex, endIndex).map((contact) => (
            <tr key={contact.id}>
              <td>
                <input type="checkbox"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => handleRecordCheckboxChange(contact.id)} />
              </td>
              <td>{contact.Name}</td>
              <td>{contact.Email}</td>
              <td>
                {contact.phoneNumber ? (
                  contact.phoneNumber.map((number, index) => (
                    <div key={index}>{number.phoneNumber}</div>
                  ))
                ) : (
                  <span> </span>
                )}
              </td>
              <td>{contact.companyName}</td>
              <td>
                {contact.Tags && contact.Tags.map(tagArray => (
                  <div key={tagArray[0]._id}>
                    {tagArray.map(tag => (
                      <span key={tag._id} style={{ fontSize: "12px", padding: "0.2rem 0.5rem", backgroundColor: tag.tagColour, color: "#fff", borderRadius: "50px", textAlign: "center", marginBottom: '5px', }}>
                        {tag.tagName}
                      </span>
                    ))}
                  </div>
                ))}
              </td>
              <td style={{ color: "red" }}> <RiDeleteBin5Line onClick={(txt) => handleDelete(contact.id)} /> </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountsData;
