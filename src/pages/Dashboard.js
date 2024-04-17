import React, { useState } from 'react'
import { LuUserCircle2 } from "react-icons/lu";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import './dashboard.css'
import Users from '../component/Users';
import Card from '../component/Card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CardTwo from '../component/CardTwo';
import CardThree from '../component/CardThree'
import { SlCalender } from "react-icons/sl";


const Dashboard = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleIconClick = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const itemsPerPage = 5;

  // Function to filter data based on search term and selected date
  const filteredData = Users.filter((row) => {
    const searchTermMatch =
      row.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

    const dateMatch =
      selectedDate === null || // if no date is selected, all dates should match
      new Date(row.startDate).toDateString() === selectedDate.toDateString();

    return searchTermMatch && dateMatch;
  });

  // Pagination logic
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
<div className='dashboard' style={{padding:'10px 10px 10px 20px',height:'90vh',overflowY:'auto'}}>
      <div className='card-view-container col-12' >
        <div className='card-view-title col-2' style={{ height: '50px' }}>
          <div className='title-one clo-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h3 className='insights-title ' style={{ fontSize: '25px' }}>Insights</h3>
            <h6 className='edit-title ' style={{ fontSize: '12px', color: 'blue', flex: '1', marginLeft: '10px' }}>Edit Widgets</h6>
          </div>
        </div>
        <div className='card-view-subtittle col-12' style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <h3>Jobs</h3>
          <div className='select-users col-3' style={{ alignItems: 'center', display: 'flex', gap:'5px' }} >
            <LuUserCircle2 />
            <select style={{ border: 'none', backgroundColor: 'var(--body-color)',width:'120px' }}>
              <option selected>All Members</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
        </div>
        <div className="reportcard col-12" style={{ paddingRight: '20px', display: "flex", marginTop: '20px', gap: '30px' }}>
          <div className='card1 col-3' style={{ background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <div className='card-info col-12' style={{ display: 'flex' }}>
              <Card task="Overdue" number="0" />
            </div>
          </div>
          <div className='card1 col-3' >
            <CardTwo task='Approaching deadline' number='0' option='Today' option1='Tomorow' option2='Day after Tomorow' option3='In a week' />
          </div>
          <div className='card1 col-3' >
            <CardThree task="No Activity" number="10" option='Over 3 days' option1='Over 1 week' option2='Over 1 month' />
          </div>
          <div className='card1 col-3' style={{ background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <div className='card-info col-12' style={{ display: 'flex' }}>
              <Card task="Total" number="0" />
            </div>
          </div>
        </div>
      </div>
      <div className='tasktable-container col-12' style={{ marginTop: '20px', paddingRight: '20px' }}>
        <div className='task-header col-6' style={{ height: '50px', display: 'flex', gap: '25px', alignItems: 'center' }}>
          <h3>Task:to do</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap:'5px' }}><SlCalender onClick={handleIconClick} />
            {calendarOpen && (
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline // To show the calendar inline
              />
            )}
            <select style={{ height: '35px', border: 'none', backgroundColor: 'var(--body-color)',width:'110px' }}>
              <option selected>Today</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>

          <div className='select-users col-3' style={{ alignItems: 'center', display: 'flex', gap:'5px' }} >
            <LuUserCircle2 />
            <select style={{ border: 'none', backgroundColor: 'var(--body-color)', width:'120px' }}>
              <option selected>All Members</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
        </div>
        <div className='tasktable-container col-12' style={{ marginTop: '20px', display: 'flex', height: 'auto', gap: '30px' }}>
          {/* <div className='task-table col-9' > */}
          <div className='table-container col-9'>

            <div style={{ margin: '0 0 20px 0' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', borderRadius: '10px', border: '2px', fon: '25px' }}
              />
            </div>

            <table className="my-table col-12 "  >
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Client</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((row) => (
                    <tr key={row.id}>
                      <td>{row.task}</td>
                      <td>{row.client}</td>
                      <td>{row.startDate}</td>
                      <td>{row.endDate}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                <FaAnglesLeft />
              </button>
              <span className="page-number">{currentPage}</span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                <FaAnglesRight />
              </button>
            </div>

          </div>
          {/* </div> */}
          <div className='chart col-3' >
            <div className='card1 col-12' style={{ background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
              <div className='card-info col-12' style={{ display: 'flex' }}>
                <Card task="Overdue" number="0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Dashboard;