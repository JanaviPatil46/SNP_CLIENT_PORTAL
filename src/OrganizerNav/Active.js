// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import Chip from '@mui/material/Chip';

// const columns = [
//   {
//     field: 'name',
//     headerName: 'Name',
//     flex: 2,
//     renderCell: (params) => (
//       <span style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1976d3' }}>
//         {params.value}
//       </span>
//     ),
//   },
//   {
//     field: 'lastUpdate',
//     headerName: 'Last Update',
//     flex: 1,
//   },
//   {
//     field: 'status',
//     headerName: 'Status',
//     flex: 1,
//     renderCell: (params) => (
//       <Chip
//         sx={{
//           backgroundColor: '#697991',
//           color: '#fff',
//         }}
//         label={params.value}
//         color={params.value === 'partially signed' ? 'warning' : 'default'}
//       />
//     ),
//   },
//   {
//     field: 'seal',
//     headerName: 'Seal',
//     flex: 1,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     name: '2023 Individual Tax Organizer',
//     lastUpdate: '02:44 PM',
//     status: 'Pending',
//     seal: '',
//   },
// ];

// export default function DataTable() {
//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5, 10]}
//         sx={{ border: 0 }}
//       />
//     </Paper>
//   );
// }




// import React, { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
// // import ReactPaginate from 'react-paginate';
// // import { toast } from 'react-toastify';

// const Organizers = () => {
//   // const navigate = useNavigate();
//   // const API_KEY = process.env.REACT_APP_API_IP;
//   // const { data } = useParams('66ac9508c1fd3a0ef310a554');
//   // console.log(data)

//   // const handleAddNewOrganizer = () => {
//   //   navigate(`/createOrganizer/${data}`);
//   // };



//   //get all templateName Record 
//   const [organizerAccountwise, setOrganizerAccountwise] = useState([]);
//   useEffect(() => {
//     fetchOrganizerTemplates();
//   }, []);

//   const fetchOrganizerTemplates = async () => {
//     try {
//       const requestOptions = {
//         method: "GET",
//         redirect: "follow"
//       };
//       const url = 'http://127.0.0.1:7600/organizer-account-wise/account/66ac94e8c1fd3a0ef310a552';
//       fetch(url, requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//           console.log('Full result:', result); // Log the full result object
//           setOrganizerAccountwise(result.organizerAccountWise);
//           console.log('Organizer Accountwise:', result.organizerAccountWise); // Log the state update
//         })
//         .catch((error) => console.error('Fetch error:', error));
//     } catch (error) {
//       console.error('Error fetching Organizer Templates:', error);
//     }
//   };
// console.log(organizerAccountwise);


// const itemsPerPage = 10;
// const [currentPage, setCurrentPage] = useState(1);
// const totalPages = Math.ceil((organizerAccountwise?.length || 0) / itemsPerPage); // Add fallback for undefined
// const startIndex = (currentPage - 1) * itemsPerPage;
// const endIndex = Math.min(startIndex + itemsPerPage, organizerAccountwise?.length || 0);
// const currentTemplates = organizerAccountwise?.slice(startIndex, endIndex) || []; 

//   console.log(currentTemplates)

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const [openMenuId, setOpenMenuId] = useState(null);
//   const toggleMenu = (_id) => {
//     setOpenMenuId(openMenuId === _id ? null : _id);
//   };

//   // const handleEdit = (_id) => {
//   //     // navigate('invoicestempupdate/' + _id)
//   //     navigate('/CreateOrganizerUpdate/' + _id)
//   // };


//   //delete template
//   const handleDelete = (_id) => {
//     const requestOptions = {
//       method: "DELETE",
//       redirect: "follow"
//     };
//     const url = 'http://127.0.0.1:7600/organizer-account-wise/';
//     fetch(url + _id, requestOptions)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to delete item');
//         }
//         return response.text();
//       })
//       .then((result) => {
//         console.log(result);
//         // toast.success('account organizer deleted successfully');
//         fetchOrganizerTemplates();
//         // setTimeout(() => {
//         //   navigate('/organizers')
//         // }, 1000);
//       })
//       .catch((error) => {
//         console.error(error);
//         // toast.error('Failed to delete item');
//       })
//       // .finally(() => {
//       //   setTimeout(() => {
//       //     window.location.reload();
//       //   }, 1000);
//       // });
//   };

//   return (
//     <>
//       <h4>Organizers</h4>


//       <div >

//         <div>
//           <table style={{width:'100%'}}>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Last Updated</th>
//                 <th>Status</th>
//                 <th>Progress</th>
//                 <th>Seal</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentTemplates.map(template => (
//                 <tr key={template._id}>
//                   <td
//                   //  onClick={() => handleEdit(template._id)}
//                    style={{ cursor: "pointer", color: 'var( --text-color)' }}>
//                     {template.organizertemplateid ? template.organizertemplateid.organizerName : 'Unknown Organizer'}
//                   </td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td>
//                     <div className="ci-menu-kebab" onClick={() => toggleMenu(template._id)} style={{ cursor: 'pointer', fontSize: '20px' }}>
//                       &#8942;
//                     </div>
//                     {openMenuId === template._id && (
//                       <div>
//                         <div
//                         //  onClick={() => handleEdit(template._id)}
//                          style={{ color: 'blue', cursor: 'pointer' }}>Edit</div>
//                         <div onClick={(txt) => handleDelete(template._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</div>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {/* <div>
//             <ReactPaginate
//               pageCount={totalPages}
//               pageRangeDisplayed={5} // Adjust this value as needed
//               marginPagesDisplayed={2} // Adjust this value as needed
//               onPageChange={handlePageChange}
//               containerClassName={'pagination'}
//               activeClassName={'active'}
//               previousLabel={<MdKeyboardDoubleArrowLeft style={{ cursor: 'pointer' }} />}
//               nextLabel={<MdKeyboardDoubleArrowRight style={{ cursor: 'pointer' }} />}
//             />
//           </div> */}
//         </div>

//       </div>

//     </>
//   )
// }

// export default Organizers

// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import Chip from '@mui/material/Chip';
// import { useState, useEffect } from 'react';

// const columns = [
//   {
//     field: 'name',
//     headerName: 'Name',
//     flex: 2,
//     renderCell: (params) => (
//       <span style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1976d3' }}>
//         {params.value}
//       </span>
//     ),
//   },
//   {
//     field: 'lastUpdate',
//     headerName: 'Last Update',
//     flex: 1,
//   },
//   {
//     field: 'status',
//     headerName: 'Status',
//     flex: 1,
//     renderCell: (params) => (
//       <Chip
//         sx={{
//           backgroundColor: '#697991',
//           color: '#fff',
//         }}
//         label={params.value}
//         color={params.value === 'partially signed' ? 'warning' : 'default'}
//       />
//     ),
//   },
//   {
//     field: 'seal',
//     headerName: 'Seal',
//     flex: 1,
//   },
// ];

// export default function DataTable() {

//   const [accountid,setAccountId]=useState()

//   // const fetchOrganizerTempByAccount =async()=>{
//   //   const requestOptions = {
//   //     method: "GET",
//   //     redirect: "follow"
//   //   };

//   //   fetch(`http://127.0.0.1:7600/organizer-account-wise/account/${accountid}`, requestOptions)
//   //     .then((response) => response.json())
//   //     .then((result) => {
//   //     const accountData = result.organizerAccountWise;
//   //     console.log(accountData.accountid); 
//   //     setAccountId(accountData.accountid)
//   //     })
//   //     .catch((error) => console.error(error));
//   // }
//   const fetchOrganizerTempByAccount = async () => {
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow"
//     };

//     fetch('http://127.0.0.1:7600/organizer-account-wise/account/66ac94cac1fd3a0ef310a550', requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         const accountData = result.organizerAccountWise;
//         accountData.forEach((account) => {
//            console.log(account.accountid); 
//            console.log(accountData)


//         });
//       })
//       .catch((error) => console.error(error));
//   };
//   console.log(accountid)

//   useEffect(() => {
//     fetchOrganizerTempByAccount();
// }, []);



// const [pipelineData, setPipelineData] = useState([]);
// const [selectedPipeline, setselectedPipeline] = useState();

// const handlePipelineChange = (selectedOptions) => {
//     setselectedPipeline(selectedOptions);
//     console.log(selectedOptions)
// }
// useEffect(() => {
//     fetchPipelineData();
// }, []);
// const fetchPipelineData = async () => {
//     try {
//         const url = "http://127.0.0.1:7600/workflow/organizers/organizertemplate/";
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data)
//         // setPipelineData(data.pipeline);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };
//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         // rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5, 10]}
//         sx={{ border: 0 }}
//       />


//     </Paper>
//   );
// }



import React, { useContext } from 'react';
import { Box, Typography, Divider, Grid, Dialog, DialogContent, Button, Chip, Paper, Table, TableCell, TableHead, TableBody, TableRow } from '@mui/material';
import { LoginContext } from '../Contextprovider/Context';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UpdateOrganizer from '../pages/UpdateOrganizer';
import { toast, ToastContainer } from 'react-toastify';
import PrintIcon from '@mui/icons-material/Print';


const Active = () => {
  const [accountId, setAccountId] = useState('')
  const { logindata } = useContext(LoginContext);
  console.log(logindata)
  const LOGIN_API = process.env.REACT_APP_USER_LOGIN;
  const ORGANIZER_API = process.env.REACT_APP_ORGANIZER_TEMP_URL;
  const fetchAccountId = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`http://127.0.0.1:7000/accounts/accountdetails/accountdetailslist/listbyuserid/${logindata.user.id}`, requestOptions)
      .then((response) => response.json()
      )
      .then((result) => {
        console.log(result)
        setAccountId(result.accounts[0]._id)
        console.log(result.accounts[0]._id)
      })
      .catch((error) => console.error(error));
  };

  console.log(accountId)

  useEffect(() => {
    fetchAccountId()

  }, []);




  const [organizerTemplatesData, setOrganizerTemplatesData] = useState([]);
  
  const fetchOrganizerTemplates = async (accountId) => {
    try {
      const url = `${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/organizerbyaccount/${accountId}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch organizerTemplatesData");
      }
      const data = await response.json();
      console.log(data);
      setOrganizerTemplatesData(data.organizerAccountWise);
      console.log(data.organizerAccountWise[0].organizertemplateid.organizerName)
      console.log(data.organizerAccountWise[0].issealed)
      console.log(data.organizerAccountWise[0]._id)
    } catch (error) {
      console.error("Error fetching organizerTemplatesData:", error);
    }
  };
  useEffect(() => {
    fetchOrganizerTemplates(accountId);
  }, [accountId]);

  ///
  const [selectedOrganizer, SetSelectedOrganizer] = useState({});
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const handleEdit = (_id) => {
    SetSelectedOrganizer(_id);
    console.log(_id)
    setPreviewDialogOpen(true);
  };
  console.log(selectedOrganizer)
  const handleClosePreview = () => {
    setPreviewDialogOpen(false); 
  };

  const handleSealedEdit = (organizerName) => {
    if (typeof organizerName === 'object') {
      console.error('Organizer name is an object:', organizerName); 
      organizerName = organizerName.name || 'Unknown Organizer'; 
    }
    
    toast.info(`${organizerName} is sealed, cannot edit.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      theme: "light",
    });
  };

  //for print 
const printOrganizerData = (id) => {
  const organizer = organizerTemplatesData.find((org) => org._id === id);
  console.log(organizer);
  if (!organizer) {
      console.log("Organizer not found");
      return;
  }

  // Open a new window for printing
  const printWindow = window.open('', '_blank');

  // Create the content to be printed
  let printContent = "<h1>Sections Data</h1>";

  // Iterate through sections and generate HTML content
  organizer.sections.forEach((section, index) => {
      printContent += `<h2>Section ${index + 1}: ${section.name}</h2>`;
      printContent += `<p><strong>ID:</strong> ${section.id}</p>`;
      printContent += `<p><strong>Text:</strong> ${section.text}</p>`;
      
      // Iterate through form elements in the section
      section.formElements.forEach((element, elementIndex) => {
          printContent += `<h3>Form Element ${elementIndex + 1}</h3>`;
          printContent += `<p><strong>Type:</strong> ${element.type}</p>`;
          printContent += `<p><strong>Text:</strong> ${element.text}</p>`;
          printContent += `<p><strong>Text Value:</strong> ${element.textvalue || ''}</p>`;
          
          // If the element has options, print them
          if (element.options && element.options.length > 0) {
              printContent += `<p><strong>Options:</strong></p><ul>`;
              element.options.forEach((option, optionIndex) => {
                  printContent += `<li>Option ${optionIndex + 1}: ${option.text} (Selected: ${option.selected})</li>`;
              });
              printContent += `</ul>`;
          }
      });
  });

  // Write the content to the new window and trigger the print
  printWindow.document.write('<html><head><title>Print</title></head><body>');
  printWindow.document.write(printContent);
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  // Trigger the print dialog
  printWindow.print();
};
  

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }} className='cbilling-cards'>
        <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
          <Box sx={{ border: '2px dotted #94a3b8', width: '60%', minHeight: '148px', maxHeight: '148px' }} className='card1'>

            <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <PaymentsRoundedIcon sx={{ fontSize: '70px' }} />
                  <MonetizationOnRoundedIcon sx={{ position: 'absolute', top: 0, left: 0, fontSize: '24px', backgroundColor: '#fff', borderRadius: '50%', color: '#24c875' }} />
                </Box>
                <Typography sx={{ color: '#697991' }} variant="h7">outstanding balance</Typography>
              </Box>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#1976d3" }}>
              <Typography sx={{ fontSize: '30px' }} variant='h6'>$0.00</Typography>
            </Box>


          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
          <Box sx={{ border: '2px dotted #94a3b8', width: '60%', minHeight: '148px', maxHeight: '148px' }} className='card1'>

            <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <PaymentsRoundedIcon sx={{ fontSize: '70px' }} />
                  <StarsRoundedIcon sx={{ position: 'absolute', top: 0, left: 0, fontSize: '24px', backgroundColor: '#fff', borderRadius: '50%', color: '#24c875' }} />
                </Box>
                <Typography sx={{ color: '#697991' }} variant="h7">Credits Available</Typography>
              </Box>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#24c875" }}>
              <Typography sx={{ fontSize: '30px' }} variant='h6'>$0.00</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
      <Box>


      </Box>
      <Dialog open={previewDialogOpen} onClose={handleClosePreview} fullScreen>
        <DialogContent>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "2px solid #3FA2F6",
                  p: 2,
                  mb: 3,
                  borderRadius: "10px",
                  backgroundColor: "#96C9F4",
                }}
              >
                <Box>
                  <Typography fontWeight="bold">Organizer View</Typography>
                  <Typography>The client sees your organizer like this</Typography>
                </Box>
                <Button variant="text" onClick={handleClosePreview}>
                  Back to edit
                </Button>
              </Box>

              {/* Make sure that selectedOrganizer is not undefined or null */}
              <UpdateOrganizer OrganizerData={selectedOrganizer} onClose={handleClosePreview} />
            </LocalizationProvider>
          </Box>
        </DialogContent>
      </Dialog>



      {/* table
       */}
      {/* 
      <Paper>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Last Updated</strong>
              </TableCell>
              
             
              <TableCell>
                <strong>Seal</strong>
              </TableCell>
              <TableCell>
                <strong></strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizerTemplatesData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <Typography sx={{ color: "#2c59fa", cursor: "pointer", fontWeight: "bold" }} onClick={() => handleEdit(row._id)}>
                    {row.organizertemplateid.organizerName}
                  </Typography>
                </TableCell>
              
                <TableCell>
                  {new Date(row.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </TableCell>
               
                
                <TableCell>{row.issealed ? <Chip label="Sealed" color="primary" /> : null}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper> */}

      <Paper>
        <Table sx={{ minWidth: 650,height:'40vh ',overflowY:'auto'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Last Updated</strong>
              </TableCell>
              <TableCell>
                <strong>Seal</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizerTemplatesData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  {row.issealed ? (
                    <Typography sx={{ color: "#2c59fa", fontWeight: "bold" }} onClick={() => handleSealedEdit(row.organizertemplateid.organizerName)}>
                      {row.organizertemplateid.organizerName}
                    </Typography>
                  ) : (
                    <Typography sx={{ color: "#2c59fa", cursor: "pointer", fontWeight: "bold" }} onClick={() => handleEdit(row._id)}>
                      {row.organizertemplateid.organizerName}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(row.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </TableCell>
                <TableCell>{row.issealed ? <Chip label="Sealed" color="primary" /> : null}</TableCell>
                <TableCell>
            {/* Hardcoded "Completed" status */}
            <Typography sx={{ fontWeight: "bold", color: "green" }}>Completed</Typography>
          </TableCell>

          <TableCell>
            <PrintIcon onClick={() => printOrganizerData(row._id)} sx={{color:'#1976d3',cursor:'pointer'}}/>
          </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>


      <ToastContainer />
    </Box>
  )
}

export default Active
