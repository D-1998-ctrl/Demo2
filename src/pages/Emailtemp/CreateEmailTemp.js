import React, { useState, useEffect } from 'react';
import '../../pages/Emailtemp/listdata.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHolder } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEmailTemp = () => {
  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (_id) => {
    setOpenMenuId(openMenuId === _id ? null : _id);
  };

  const handleEdit = (_id) => {
    navigate('/upemailtemplate/' + _id);
  };

  const handleDelete = (_id) => {
    console.log(_id);

    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch('http://127.0.0.1:8080/workflow/emailtemplate/' + _id, requestOptions)
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

  const [emailTemplates, setEmailTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmailTemplates = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/workflow/emailtemplate/');
      if (!response.ok) {
        throw new Error('Failed to fetch email templates');
      }
      const data = await response.json();

      setEmailTemplates(data.emailTemplate);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching email templates:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailTemplates();
  }, []);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(emailTemplates.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, emailTemplates.length);
const currentTemplates = emailTemplates.slice(startIndex, endIndex);


  return (
    <div className="Emailtemp" style={{ alignItems: 'center', margin: '48px' }}>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <ToastContainer />
        <div className="panel">
          <header className="panel__header">
            <div>
              <a
                className="btn"
                rel=""
                href="/newemailtemplate"
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  backgroundColor: '#007bff',
                  padding: '8px 10px',
                  borderRadius: '4px',
                  width: '150px',
                }}
              >
                <span className="btn__text">Create template</span>
              </a>
              <a
                className="btn btn_border"
                style={{
                  textDecoration: 'none',
                  color: '#007bff',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid #007bff',
                  marginRight: '900px',
                }}
              >
                <span className="btn__text">Copy from library</span>
              </a>
            </div>
          </header>
          <div className="panel__content">
            {isLoading ? (
              <div className="-loading" style={{ textAlign: 'center' }}>
                <div className="-loading-inner">Loading...</div>
              </div>
            ) : (
              <div>
                <div >
                  <div  style={{backgroundColor:'red'}}>
                    <div>
                      <th  style={{ width: '35%', textAlign: 'center', backgroundColor: '#f2f2f2', padding: '8px', borderBottom: '1px solid #ccc' }}>Name</th>
                      <th  style={{ width: '35%', textAlign: 'center', backgroundColor: '#f2f2f2', padding: '8px', borderBottom: '1px solid #ccc' }}>Subject</th>
                      <th  style={{ width: '35%', textAlign: 'center', backgroundColor: '#f2f2f2', padding: '8px', borderBottom: '1px solid #ccc' }}>Used in pipelines</th>
                      <th></th>
                    </div>
                  </div>
                  <div >
                    {currentTemplates.map((template) => (
                      <tr  key={template._id}>
                        <td  style={{ width: '35%', textAlign: 'center', padding: '8px', borderBottom: '1px solid #ccc' }}>
                          <td className="btn btn_link" onClick={(event) => { handleEdit(template._id, event) }} style={{ textDecoration: 'none', color: '#007bff' }}>{template.templatename}</td>
                        </td>
                        <td  style={{ width: '35%', textAlign: 'center', padding: '8px', borderBottom: '1px solid #ccc' }}>
                          {template.emailsubject}
                        </td>
                        <td  style={{ width: '35%', textAlign: 'center', padding: '8px', borderBottom: '1px solid #ccc' }}>
                          {template.usedInPipelines}
                        </td>
                        <td>
                          <div  onClick={() => toggleMenu(template._id)} style={{ cursor: 'pointer', fontSize: '20px' }}>
                            &#8942;
                          </div>
                          {openMenuId === template._id && (
                            <div className="menu-options" >
                              <div onClick={() => handleEdit(template._id)} style={{ color: 'blue', cursor: 'pointer' }}>Edit</div>
                              <div onClick={() => handleDelete(template._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
        </div>
      </div>
    </div>
  );
};

export default CreateEmailTemp;
