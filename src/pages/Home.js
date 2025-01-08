
// import React, { useContext } from 'react';
// import { useState, useEffect } from 'react';
// import { LoginContext } from '../Contextprovider/Context';
// import { styled } from '@mui/material/styles';
// import { Box, Paper, Dialog, DialogContent, Typography, Button, InputLabel, TextField, Divider, Link } from '@mui/material';
// import Grid from '@mui/material/Grid2';
// import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
// import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
// import TelegramIcon from '@mui/icons-material/Telegram';
// import Drawer from '@mui/material/Drawer';
// import CloseIcon from '@mui/icons-material/Close';
// import { useTheme, useMediaQuery } from '@mui/material';
// import Texteditor from '../pages/Texteditor';
// import HomeData from '../DummyData/HomeData';
// import Badge from '@mui/material/Badge';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import UpdateOrganizer from '../pages/UpdateOrganizer';
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { useNavigate } from 'react-router-dom';
// import CreditCardIcon from '@mui/icons-material/CreditCard';

// const Home = () => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const [content, setContent] = useState('');
//   const handleContentChange = (newContent) => {
//     setContent(newContent);
//   };
//   const handleDocumentUpload = () => {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.multiple = true;
//     fileInput.onchange = (e) => {
//       const files = e.target.files;
//       console.log('Selected documents:', files);
//     };
//     fileInput.click();
//   };

//   const handleFolderUpload = () => {
//     const folderInput = document.createElement('input');
//     folderInput.type = 'file';
//     folderInput.webkitdirectory = true;
//     folderInput.onchange = (e) => {
//       const files = e.target.files;
//       console.log('Selected folder contents:', files);
//     };
//     folderInput.click();
//   };

//   const [isNewChatOpen, setNewChat] = useState(false);

//   const handleNewDrawerClose = () => {
//     setNewChat(false);
//   };

//   const StyledBadge = styled(Badge)(({ theme }) => ({
//     '& .MuiBadge-badge': {
//       right: -10,
//       top: 12,
//       border: `2px solid ${theme.palette.background.paper}`,
//       padding: '0 4px',
//     },
//   }));

//   const navigate = useNavigate();

//   //for organizers data 
//   const [accountId, setAccountId] = useState('')
//   const { logindata } = useContext(LoginContext);
//   console.log(logindata)
//   const fetchAccountId = async () => {
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow"
//     };

//     fetch(`http://127.0.0.1:8880/admin/accountdetails/accountdetailslist/listbyuserid/${logindata.user.id}`, requestOptions)
//       .then((response) => response.json()
//       )
//       .then((result) => {
//         console.log(result)

//         setAccountId(result.accounts[0]._id)
//         console.log(result.accounts[0]._id)

//       })
//       .catch((error) => console.error(error));
//   };

//   console.log(accountId)


//   const [organizerTemplatesData, setOrganizerTemplatesData] = useState([]);

//   const fetchOrganizerTemplates = async (accountId) => {
//     try {
//       const url = `http://127.0.0.1:7600/workflow/orgaccwise/organizeraccountwise/organizerbyaccount/${accountId}`;

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch organizerTemplatesData");
//       }
//       const data = await response.json();
//       console.log(data);
//       setOrganizerTemplatesData(data.organizerAccountWise);
//       console.log(data.organizerAccountWise[0]._id)
//     } catch (error) {
//       console.error("Error fetching organizerTemplatesData:", error);
//     }
//   };
//   useEffect(() => {
//     fetchAccountId();
//     fetchOrganizerTemplates(accountId);
//     fetchidwiseData(accountId);
//   }, [accountId]);

//   const handleEditOragnizer = (organizerId) => {
//     console.log(organizerId)
//     SetSelectedOrganizer(organizerId);
//     setPreviewDialogOpen(true);
//   };

//   const [selectedOrganizer, SetSelectedOrganizer] = useState({});
//   const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

//   console.log(selectedOrganizer)
//   const handleClosePreview = () => {
//     setPreviewDialogOpen(false);
//   };

//   const handleOragnizer = (organizerId) => {
//     navigate('/organizers');
//   };

//   //for billing
//   const [BillingInvoice, setBillingInvoice] = useState([]);

//   const fetchidwiseData = async (accountId) => {
//     try {
//       const url = `http://127.0.0.1:7650/workflow/invoices/invoice/invoicelist/getInvoiceListByAccountId/${accountId}`;
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch task templates");
//       }
//       const data = await response.json();
//       console.log(data)
//       setBillingInvoice(data.invoices);


//       // console.log(data.invoices[0]._id)
//     } catch (error) {
//       console.error("Error fetching task templates:", error);
//     }
//   };



//   const [selectedInvoice, SetSelectedInvoice] = useState();

//   const handleEditInvoice = (invoiceId) => {
//     console.log(invoiceId)
//     // Navigate to the edit page with the invoice ID
//     navigate(`/bill/${invoiceId}`);
//   };

//   console.log(selectedInvoice)

//   // useEffect(() => {
//   //     fetchidwiseData(accountId);
//   // }, [accountId]);

//   return (
//     <Box sx={{ flexGrow: 1 }} >
//       <Grid container spacing={1} columns={16} >
//         <Grid size={11}>
//           <Box sx={{ backgroundColor: '#f1f5f9', height: '100vh' }}>
//             <Box ml={2}>
//               <Box fontWeight="bold">Waiting for action</Box>
//             </Box>
//             {/* Documents */}
//             <Box m={2}>
//               <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
//                 <StyledBadge badgeContent={1} color="success">
//                   <Typography variant="body1">Documents</Typography>
//                 </StyledBadge>
//               </Box>
//               <Box mt={3}>
//                 {HomeData.slice(0, 1).map((card, index) => (
//                   <Paper
//                     key={index}
//                     sx={{
//                       position: 'relative',
//                       '&:hover .signText': {
//                         opacity: 1, // Make the "Sign" text visible on hover
//                       },
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: '14px',
//                         border: '1px solid #ccc',
//                         borderRadius: '4px',
//                         mb: 2,
//                       }}
//                     >
//                       <Box sx={{ color: 'rgb(255, 142, 0)', mr: 2 }}>{card.icon}</Box>
//                       <Box>
//                         <Typography fontWeight="bold">{card.title}</Typography>
//                         <Typography variant="body2">{card.description}</Typography>
//                       </Box>
//                     </Box>
//                     <Box
//                       className="signText"
//                       sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '95%',
//                         transform: 'translate(-50%, -50%)',
//                         opacity: 0,
//                         transition: 'opacity 0.3s ease',
//                         cursor: 'pointer',
//                         fontSize: '15px',
//                         color: '#1976d3',
//                       }}
//                     >
//                       Sign
//                     </Box>
//                   </Paper>
//                 ))}
//               </Box>
//             </Box>
//             {/* organizer */}
//             {/* <Box m={2}>
//               <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
//                 <StyledBadge badgeContent={organizerTemplatesData.length} color="success">
//                   <Typography variant="body1">Organizers</Typography>
//                 </StyledBadge>

//                 <Typography color="#1976d3" variant="body1">See all</Typography>
//               </Box>

//               <Box mt={3}>
//                 {organizerTemplatesData.map((organizerAccountWise) => (
//                   <Paper key={organizerAccountWise._id}>
//                     <Box onClick={() => handleEditOragnizer(organizerAccountWise._id)}
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: '14px',
//                         border: '1px solid #ccc',
//                         borderRadius: '4px',
//                         mb: 2,
//                         position: 'relative',
//                         '&:hover .complete-text': {
//                           opacity: 1,
//                         },
//                       }}
//                     >
//                       <Box sx={{ color: 'rgb(255, 142, 0)', ml: 2 }}>
//                         <EventNoteIcon />
//                       </Box>
//                       <Box sx={{ marginLeft: 2, }}>
//                         <Typography variant="h6">Complete Organizer</Typography>
//                         <Typography sx={{ color: '#697991' }}  >
//                           {organizerAccountWise.organizertemplateid?.organizerName || 'Organizer Name'}
//                         </Typography>

//                       </Box>
//                       <Box
//                         className="complete-text"
//                         sx={{
//                           position: 'absolute',
//                           top: '50%',
//                           left: '95%',
//                           transform: 'translate(-50%, -50%)',
//                           opacity: 0,
//                           transition: 'opacity 0.3s ease',
//                           cursor: 'pointer',
//                           fontSize: '15px',
//                           color: '#1976d3',
//                         }}
//                       >
//                         Complete
//                       </Box>
//                     </Box>
//                   </Paper>
//                 ))}
//               </Box>
//             </Box> */}
//             <Box m={2}>
//               <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
//                 <StyledBadge badgeContent={organizerTemplatesData.length} color="success">
//                   <Typography variant="body1">Organizers</Typography>
//                 </StyledBadge>

//                 <Typography onClick={handleOragnizer} color="#1976d3" sx={{ cursor: "pointer" }} variant="body1">See all {organizerTemplatesData.length}</Typography>
//               </Box>

//               <Box mt={3}>
//                 {organizerTemplatesData.slice(0, 5).map((organizerAccountWise) => (
//                   <Paper key={organizerAccountWise._id}>
//                     <Box
//                       onClick={() => handleEditOragnizer(organizerAccountWise._id)}
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: '14px',
//                         border: '1px solid #ccc',
//                         borderRadius: '4px',
//                         mb: 2,
//                         position: 'relative',
//                         '&:hover .complete-text': {
//                           opacity: 1,
//                         },
//                       }}
//                     >
//                       <Box sx={{ color: 'rgb(255, 142, 0)', ml: 2 }}>
//                         <EventNoteIcon />
//                       </Box>
//                       <Box sx={{ marginLeft: 2, cursor: 'pointer' }}>
//                         <Typography fontWeight="bold">Complete Organizer</Typography>
//                         <Typography sx={{ color: '#697991' }}>
//                           {organizerAccountWise.organizertemplateid?.organizerName || 'Organizer Name'}
//                         </Typography>
//                       </Box>
//                       <Box
//                         className="complete-text"
//                         sx={{
//                           position: 'absolute',
//                           top: '50%',
//                           left: '95%',
//                           transform: 'translate(-50%, -50%)',
//                           opacity: 0,
//                           transition: 'opacity 0.3s ease',
//                           cursor: 'pointer',
//                           fontSize: '15px',
//                           color: '#1976d3',
//                         }}
//                       >
//                         Complete
//                       </Box>
//                     </Box>
//                   </Paper>
//                 ))}
//               </Box>
//             </Box>

//             <Dialog open={previewDialogOpen} onClose={handleClosePreview} fullScreen>
//               <DialogContent>
//                 <Box>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         border: "2px solid #3FA2F6",
//                         p: 2,
//                         mb: 3,
//                         borderRadius: "10px",
//                         backgroundColor: "#96C9F4",
//                       }}
//                     >
//                       <Box>
//                         <Typography fontWeight="bold">Organizer View</Typography>
//                         <Typography>The client sees your organizer like this</Typography>
//                       </Box>
//                       <Button variant="text" onClick={handleClosePreview}>
//                         Back to edit
//                       </Button>
//                     </Box>

//                     {/* Make sure that selectedOrganizer is not undefined or null */}
//                     <UpdateOrganizer OrganizerData={selectedOrganizer} onClose={handleClosePreview} />
//                   </LocalizationProvider>
//                 </Box>
//               </DialogContent>
//             </Dialog>



//             {/* Billing */}
//             <Box m={2}>
//               <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
//                 <StyledBadge badgeContent={BillingInvoice.length} color="success">
//                   <Typography variant="body1">Billing</Typography>
//                 </StyledBadge>
//               </Box>
//               <Box mt={3}>
//                 {BillingInvoice.map((invoice) => (
//                   <Paper
//                     key={invoice._id}
//                     sx={{
//                       position: 'relative',
//                       '&:hover .PayText': {
//                         opacity: 1, // Make the "Sign" text visible on hover
//                       },
//                     }}
//                   >
//                     <Box  onClick={() => handleEditInvoice(invoice._id)}
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: '14px',
//                         border: '1px solid #ccc',
//                         borderRadius: '4px',
//                         mb: 2,
//                         cursor:'pointer'
//                       }}
//                     >
//                       <Box sx={{ color: 'rgb(50, 205, 50)', }}>
//                         <CreditCardIcon sx={{ ml: '15px', fontSize: '30px' }} />
//                       </Box>
//                       <Box >
//                         <Typography ><b>Pay invoice $1.00</b></Typography>
//                         <Typography color="#697991" fontSize={18}>
//                           #{invoice.invoicenumber}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Box
//                       className="PayText"
//                       sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '95%',
//                         transform: 'translate(-50%, -50%)',
//                         opacity: 0,
//                         transition: 'opacity 0.3s ease',
//                         cursor: 'pointer',
//                         fontSize: '15px',
//                         color: '#1976d3',
//                       }}
//                     >
//                       Pay
//                     </Box>
//                   </Paper>
//                 ))}
//               </Box>
//             </Box>

//           </Box>
//         </Grid>
//         <Grid size={5} >
//           <Box sx={{
//             height: '100vh',
//             boxShadow: "0px 4px 8px 2px rgba(0, 0, 0, 0.2)"
//           }}>
//             <Typography variant='h6' sx={{ ml: 2, fontWeight: 'bold' }}>
//               Quick links
//             </Typography>
//             <Divider />
//             <Box>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2, color: '#135ea9' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={handleDocumentUpload}>
//                   <CreateNewFolderRoundedIcon sx={{ fontSize: '20px' }} />
//                   <Typography variant='h7'>Upload Documents</Typography>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#135ea9', cursor: 'pointer' }} onClick={handleFolderUpload}>
//                   <NoteAddRoundedIcon sx={{ fontSize: '20px' }} />
//                   <Typography variant='h7'>Upload Folder</Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ color: '#135ea9', display: 'flex', alignItems: 'center', gap: '5px', mb: 2, cursor: 'pointer', m: 2 }}>
//                 <TelegramIcon sx={{ fontSize: '20px' }} />
//                 <Typography sx={{ fontWeight: 600 }} onClick={() => setNewChat(true)} variant='h7'>Chat</Typography>
//               </Box>
//             </Box>

//             <Box >
//               <Drawer
//                 anchor="right"
//                 open={isNewChatOpen}
//                 onClose={handleNewDrawerClose}
//                 PaperProps={{
//                   sx: {
//                     borderRadius: isSmallScreen ? '0' : '10px 0 0 10px',
//                     width: isSmallScreen ? '100%' : '600px',
//                     maxWidth: '95%',
//                   },
//                 }}
//               >
//                 <Box m={2} >
//                   <Box>
//                     <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
//                       <Typography>NEW Chat</Typography>
//                       <CloseIcon onClick={handleNewDrawerClose} style={{ cursor: 'pointer' }} />
//                     </Box>
//                     <Divider />
//                   </Box>

//                   <Box
//                     component="form"
//                     sx={{
//                       '& > :not(style)': { m: 1, width: '64ch' },
//                     }}
//                     noValidate
//                     autoComplete="off"
//                   >
//                     <InputLabel sx={{ color: 'black', }}>Subject</InputLabel>
//                     <TextField id="outlined-basic" label="Subject" variant="outlined" />
//                   </Box>

//                   <Box sx={{ mt: 3, m: 1 }}>
//                     <Texteditor initialContent={content} onChange={handleContentChange} />
//                   </Box>

//                   <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5, margin: "8px", ml: 3 }}>
//                     <Button variant="contained" color="primary">Create</Button>
//                     <Button variant="outlined" onClick={handleNewDrawerClose}>Cancel</Button>
//                   </Box>

//                 </Box>
//               </Drawer>
//             </Box>


//             <Box sx={{ mt: 6 }}>
//               <Box sx={{ ml: 2 }} ><Typography variant='h6'> <strong>Balance  </strong></Typography></Box>
//               <Divider />
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 2 }}>
//                 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                   <Box>
//                     <Typography sx={{ color: "#697991" }} variant='h7'>Credits Available</Typography>
//                   </Box>
//                   <Box sx={{ fontWeight: 600, fontSize: '20px' }}>$0.00</Box>
//                 </Box>

//                 <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                   <Box>
//                     <Typography sx={{ color: "#697991" }} variant='h7'>Outstanding Balance</Typography>
//                   </Box>
//                   <Box sx={{ fontWeight: 600, fontSize: '20px' }}>$0.00</Box>
//                 </Box>
//               </Box>
//             </Box>


//             <Box mt={3}>
//               <Box sx={{ ml: 2, }}><Typography variant='h6'><strong>Contact info</strong> </Typography></Box>
//               <Divider />
//               <Box sx={{ padding: 2 }}>
//                 <Typography variant="h6">Phone</Typography>
//                 <Typography variant="body1">(925) 800-3561</Typography>

//                 <Typography variant="h6" sx={{ mt: 2 }}>Address</Typography>
//                 <Typography variant="body1">
//                   3015 Hopyard Rd, Ste M, Pleasanton, CA 94588
//                 </Typography>

//                 <Typography variant="h6" sx={{ mt: 2 }}>Email</Typography>
//                 <Typography variant="body1">
//                   <Link href="mailto:silpa@snptaxandfinancials.com" underline="hover">
//                     silpa@snptaxandfinancials.com
//                   </Link>
//                 </Typography>

//                 <Typography variant="h6" sx={{ mt: 2 }}>Website</Typography>
//                 <Typography variant="body1">
//                   <Link href="http://www.snptaxandfinancials.com" target="_blank" underline="hover">
//                     www.snptaxandfinancials.com
//                   </Link>
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Home;





import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { LoginContext } from '../Contextprovider/Context';
import { styled } from '@mui/material/styles';
import { Box, Paper, Dialog, DialogContent, Typography, Button, InputLabel, TextField, Divider, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, useMediaQuery } from '@mui/material';

import HomeData from '../DummyData/HomeData';
import Badge from '@mui/material/Badge';
import EventNoteIcon from '@mui/icons-material/EventNote';
import UpdateOrganizer from '../pages/UpdateOrganizer';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { toast } from "react-toastify"
import Editor from '../pages/Texteditor';
const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [content, setContent] = useState('');
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  const handleDocumentUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      const files = e.target.files;
      console.log('Selected documents:', files);
    };
    fileInput.click();
  };

  const handleFolderUpload = () => {
    const folderInput = document.createElement('input');
    folderInput.type = 'file';
    folderInput.webkitdirectory = true;
    folderInput.onchange = (e) => {
      const files = e.target.files;
      console.log('Selected folder contents:', files);
    };
    folderInput.click();
  };

  const [isNewChatOpen, setNewChat] = useState(false);

  const handleNewDrawerClose = () => {
    setNewChat(false);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -10,
      top: 12,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const navigate = useNavigate();

  //for organizers data 
  const LOGIN_API = process.env.REACT_APP_USER_LOGIN;
  const [accountId, setAccountId] = useState('')
  const { logindata } = useContext(LoginContext);
  console.log(logindata)



  const fetchAccountId = async () => {
    if (!logindata || !logindata.user) {
      console.error("logindata or logindata.user is undefined");
      return;
    }

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://127.0.0.1:7000/accounts/accountdetails/accountdetailslist/listbyuserid/${logindata.user.id}`, requestOptions);
      const result = await response.json();
      console.log(result);

      setAccountId(result.accounts[0]._id);
      console.log(result.accounts[0]._id);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };


  useEffect(() => {
    if (logindata && logindata.user) {
      fetchAccountId();
    }
  }, [logindata]);

  const [organizerTemplatesData, setOrganizerTemplatesData] = useState([]);
  const ORGANIZER_API = process.env.REACT_APP_ORGANIZER_TEMP_URL;
  const fetchOrganizerTemplates = async (accountId) => {
    try {
      const url = `${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/organizerbyaccount/${accountId}`;
      console.log(accountId)
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch organizerTemplatesData");
      }
      const data = await response.json();
      console.log(data);
      setOrganizerTemplatesData(data.organizerAccountWise);
      console.log(data.organizerAccountWise[0]._id)
    } catch (error) {
      console.error("Error fetching organizerTemplatesData:", error);
    }
  };

  useEffect(() => {
    fetchOrganizerTemplates(accountId);
    fetchidwiseData(accountId);
  }, [accountId]);

  const handleEditOragnizer = (organizerId) => {
    console.log(organizerId)
    SetSelectedOrganizer(organizerId);
    setPreviewDialogOpen(true);
  };

  const [selectedOrganizer, SetSelectedOrganizer] = useState({});
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  console.log(selectedOrganizer)
  const handleClosePreview = () => {
    setPreviewDialogOpen(false);
  };

  const handleOragnizer = () => {
    navigate('/organizers');
  };



  //for billing
  const [BillingInvoice, setBillingInvoice] = useState([]);
  const CLIENT_INVOICE_API = process.env.REACT_APP_INVOICES_URL
  const fetchidwiseData = async (accountId) => {
    try {
      const url = `${CLIENT_INVOICE_API}/workflow/invoices/invoice/invoicelistby/accountid/${accountId}`;
      console.log(url)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch task templates");
      }
      const data = await response.json();

      // Correct key to access invoices
      console.log(data);
      setBillingInvoice(data.invoice);

      console.log(data.invoice[0]._id); // Accessing the first invoice's ID
    } catch (error) {
      console.error("Error fetching task templates:", error);
    }
  };


  

  const handleEditInvoice = (invoiceId) => {
    console.log(invoiceId)
    // Navigate to the edit page with the invoice ID
    navigate(`/bill/${invoiceId}`);
  };

  

  const handleBilling = () => {
    navigate('/billing/invoices');
  };

  // for chat 
  const CLEINT_CHAT_API = process.env.REACT_APP_CHAT_API
  //for texteditor.
  const [description, setDescription] = useState('');
  const handleEditorChange = (content) => {
    setDescription(content);
  };
  const [inputTextError, setInputTextError] = useState('');

  const handlechatsubject = (e) => {
    const { value } = e.target;
    setInputText(value);
  };
  const [inputText, setInputText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accountName, setAccountName] = useState()
  const [time, setTime] = useState()
  const [chatList, setChatList] = useState([]);
  const [isActiveTrue, setIsActiveTrue] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const accountwiseChatlist = (accId, ActiveTrue) => {
    console.log(accId)
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url = `${CLEINT_CHAT_API}/chats/chatsaccountwise/isactivechat/${accId}/${ActiveTrue}`

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.chataccountwise && result.chataccountwise.length > 0) {

          result.chataccountwise.forEach((chat) => {
            console.log(chat.chatsubject);
            console.log(chat.description);

            chat.description.forEach((message) => {
              console.log(message._id);
            });
            setAccountName(chat.accountid.accountName);
            setTime(chat.updatedAt)

          });
          setIsSubmitted(true)
          setChatList(result.chataccountwise);
        } else {
          console.log("No chat data available");
        }
      })
      .catch((error) => console.error(error));
  };
  const saveChat = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const messageData = [{
      message: description,
      fromwhome: "Client",
    }];
    console.log(messageData)
    const raw = JSON.stringify({
      accountids: [accountId],
      chatsubject: inputText,
      description: messageData,
      active: "true"
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    console.log(raw)
    fetch(`${CLEINT_CHAT_API}/chats/chatsaccountwise`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        toast.success("New Chat created successfully");

        setIsSubmitted(true);
        accountwiseChatlist(accountId, isActiveTrue);
        handleClose()

      })
      .catch((error) => {
        console.error("Fetch error: ", error.message);
        toast.error("Failed to create new chat. Please try again.");
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={1} columns={16} >
        <Grid size={11}>
          <Box sx={{ backgroundColor: '#f1f5f9', height: '100vh' }}>
            <Box ml={2}>
              <Box fontWeight="bold">Waiting for action</Box>
            </Box>
            {/* Documents */}
            <Box m={2}>
              {/* <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
                <StyledBadge badgeContent={1} color="success">
                  <Typography variant="body1">Documents</Typography>
                </StyledBadge>
              </Box> */}
              {/* <Box mt={3}>
                {HomeData.slice(0, 1).map((card, index) => (
                  <Paper
                    key={index}
                    sx={{
                      position: 'relative',
                      '&:hover .signText': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ color: 'rgb(255, 142, 0)', mr: 2 }}>{card.icon}</Box>
                      <Box>
                        <Typography fontWeight="bold">{card.title}</Typography>
                        <Typography variant="body2">{card.description}</Typography>
                      </Box>
                    </Box>
                    <Box
                      className="signText"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '95%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: '#1976d3',
                      }}
                    >
                      Sign
                    </Box>
                  </Paper>
                ))}
              </Box> */}
            </Box>

            {/* organizer */}
            <Box m={2}>
              <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
                <StyledBadge badgeContent={organizerTemplatesData.filter((organizerAccountWise) => !organizerAccountWise.issubmited).length} color="success">
                  <Typography variant="body1">Organizers</Typography>
                </StyledBadge>

                <Typography onClick={handleOragnizer} color="#1976d3" sx={{ cursor: "pointer" }} variant="body1">See all {organizerTemplatesData.filter((organizerAccountWise) => !organizerAccountWise.issubmited).length}</Typography>
              </Box>

              {/* <Box mt={3}>
                {organizerTemplatesData.slice(0, 4).map((organizerAccountWise) => (
                  <Paper key={organizerAccountWise._id}>
                    <Box
                      onClick={() => handleEditOragnizer(organizerAccountWise._id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        mb: 2,
                        position: 'relative',
                        '&:hover .complete-text': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Box sx={{ color: 'rgb(255, 142, 0)', ml: 2 }}>
                        <EventNoteIcon />
                      </Box>
                      <Box sx={{ marginLeft: 2, cursor: 'pointer' }}>
                        <Typography fontWeight="bold">Complete Organizer</Typography>
                        <Typography sx={{ color: '#697991' }}>
                          {organizerAccountWise.organizertemplateid?.organizerName || 'Organizer Name'}
                        </Typography>
                      </Box>
                      <Box
                        className="complete-text"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '95%',
                          transform: 'translate(-50%, -50%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          cursor: 'pointer',
                          fontSize: '15px',
                          color: '#1976d3',
                        }}
                      >
                        Complete
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box> */}

<Box mt={3}>
    {organizerTemplatesData
        .filter((organizerAccountWise) => !organizerAccountWise.issubmited) // Filter for issubmited: false
        .slice(0, 4) // Limit to the first 4 items
        .map((organizerAccountWise) => (
            <Paper key={organizerAccountWise._id}>
                <Box
                    onClick={() => handleEditOragnizer(organizerAccountWise._id)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        mb: 2,
                        position: 'relative',
                        '&:hover .complete-text': {
                            opacity: 1,
                        },
                    }}
                >
                    <Box sx={{ color: 'rgb(255, 142, 0)', ml: 2 }}>
                        <EventNoteIcon />
                    </Box>
                    <Box sx={{ marginLeft: 2, cursor: 'pointer' }}>
                        <Typography fontWeight="bold">Complete Organizer</Typography>
                        <Typography sx={{ color: '#697991' }}>
                            {organizerAccountWise.organizertemplateid?.organizerName || 'Organizer Name'}
                        </Typography>
                    </Box>
                    <Box
                        className="complete-text"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '95%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            cursor: 'pointer',
                            fontSize: '15px',
                            color: '#1976d3',
                        }}
                    >
                        Complete
                    </Box>
                </Box>
            </Paper>
        ))}
</Box>
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



            {/* Billing */}
            {/* <Box m={2}>
              <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
                <StyledBadge badgeContent={BillingInvoice.length} color="success">
                  <Typography variant="body1">Billing</Typography>
                </StyledBadge>
              </Box>
              <Box mt={3}>
                {BillingInvoice.map((invoice) => (
                  <Paper
                    key={invoice._id}
                    sx={{
                      position: 'relative',
                      '&:hover .PayText': {
                        opacity: 1, // Make the "Sign" text visible on hover
                      },
                    }}
                  >
                    <Box onClick={() => handleEditInvoice(invoice._id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        mb: 2,
                        cursor: 'pointer'
                      }}
                    >
                      <Box sx={{ color: 'rgb(50, 205, 50)', }}>
                        <CreditCardIcon sx={{ ml: '15px', fontSize: '30px' }} />
                      </Box>
                      <Box >
                        <Typography ><b>Pay invoice $1.00</b></Typography>
                        <Typography color="#697991" fontSize={18}>
                          #{invoice.invoicenumber}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      className="PayText"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '95%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: '#1976d3',
                      }}
                    >
                      Pay
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box> */}
            <Box m={2}>
              
              <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
                <StyledBadge  badgeContent={BillingInvoice.length} color="success" sx={{ ml: 1 }}>
                  <Typography variant="body1">Billing</Typography>
                </StyledBadge>
                <Typography
                  onClick={handleBilling} 
                  color="#1976d3"
                  sx={{ cursor: "pointer" }}
                  variant="body1"
                >
                  See all {BillingInvoice.length}
                </Typography>
              </Box>

              
              <Box mt={3}>
                {BillingInvoice.slice(0, 3).map((invoice) => (
                  <Paper
                    key={invoice._id}
                    sx={{
                      position: 'relative',
                      '&:hover .PayText': {
                        opacity: 1, 
                      },
                    }}
                  >
                    <Box
                      onClick={() => handleEditInvoice(invoice._id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        mb: 2,
                        position: 'relative',
                        cursor: 'pointer',
                        
                      }}
                    >
                      
                      <Box sx={{ color: 'rgb(50, 205, 50)', ml: 2 }}>
                        <CreditCardIcon sx={{ fontSize: '30px' }} />
                      </Box>

                      
                      <Box sx={{ marginLeft: 2 }}>
                        <Typography fontWeight="bold">Pay invoice $1.00</Typography>
                        <Typography color="#697991" fontSize={14}>
                          #{invoice.invoicenumber || '000000'}
                        </Typography>
                      </Box>

                      {/* Hover Text */}
                      <Box
                        className="PayText"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '95%',
                          transform: 'translate(-50%, -50%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          cursor: 'pointer',
                          fontSize: '15px',
                          color: '#1976d3',
                        }}
                      >
                        Pay
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>

          </Box>
        </Grid>
        <Grid size={5} >
          <Box sx={{
            height: '100vh',
            boxShadow: "0px 4px 8px 2px rgba(0, 0, 0, 0.2)"
          }}>
            <Typography variant='h6' sx={{ ml: 2, fontWeight: 'bold' }}>
              Quick links
            </Typography>
            <Divider />
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2, color: '#135ea9' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={handleDocumentUpload}>
                  <CreateNewFolderRoundedIcon sx={{ fontSize: '20px' }} />
                  <Typography variant='h7'>Upload Documents</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#135ea9', cursor: 'pointer' }} onClick={handleFolderUpload}>
                  <NoteAddRoundedIcon sx={{ fontSize: '20px' }} />
                  <Typography variant='h7'>Upload Folder</Typography>
                </Box>
              </Box>

              <Box sx={{ color: '#135ea9', display: 'flex', alignItems: 'center', gap: '5px', mb: 2, cursor: 'pointer', m: 2 }}>
                <TelegramIcon sx={{ fontSize: '20px' }} />
                <Typography sx={{ fontWeight: 600 }} onClick={handleOpen} variant='h7'>Chat</Typography>
              </Box>
            </Box>

            <Box >
              <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    width: "40%",
                  },
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* Drawer Header */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2 }}>
                    <Typography variant="h6">New chat</Typography>
                    <Box onClick={handleClose} sx={{ cursor: 'pointer', color: '#1976d3' }}>
                      <CloseIcon />
                    </Box>
                  </Box>
                  <Divider />

                  <Box m={1}>
                    <InputLabel sx={{ color: 'black' }}>Subject</InputLabel>
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      name="subject"
                      value={inputText} onChange={handlechatsubject}
                      placeholder="Subject"
                      size="small"
                      error={!!inputTextError}
                    />
                  </Box>


                  <Box sx={{ m: 1 }}>
                    <Editor onChange={handleEditorChange} />
                  </Box>

                  {/* Drawer Actions */}
                  <Box sx={{ p: 4, display: "flex", alignItems: "center", gap: 2, m: 2, }}>
                    <Button
                      variant="contained" color="primary"
                      // onClick={sendSaveChatMail}
                      onClick={saveChat}
                    >
                      Create chat
                    </Button>
                    <Button onClick={handleClose} variant="outlined">
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Drawer>
            </Box>


            <Box sx={{ mt: 6 }}>
              <Box sx={{ ml: 2 }} ><Typography variant='h6'> <strong>Balance  </strong></Typography></Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography sx={{ color: "#697991" }} variant='h7'>Credits Available</Typography>
                  </Box>
                  <Box sx={{ fontWeight: 600, fontSize: '20px' }}>$0.00</Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography sx={{ color: "#697991" }} variant='h7'>Outstanding Balance</Typography>
                  </Box>
                  <Box sx={{ fontWeight: 600, fontSize: '20px' }}>$0.00</Box>
                </Box>
              </Box>
            </Box>


            <Box mt={3}>
              <Box sx={{ ml: 2, }}><Typography variant='h6'><strong>Contact info</strong> </Typography></Box>
              <Divider />
              <Box sx={{ padding: 2 }}>
                <Typography variant="h6">Phone</Typography>
                <Typography variant="body1">(925) 800-3561</Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Address</Typography>
                <Typography variant="body1">
                  3015 Hopyard Rd, Ste M, Pleasanton, CA 94588
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Email</Typography>
                <Typography variant="body1">
                  <Link href="mailto:silpa@snptaxandfinancials.com" underline="hover">
                    silpa@snptaxandfinancials.com
                  </Link>
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Website</Typography>
                <Typography variant="body1">
                  <Link href="http://www.snptaxandfinancials.com" target="_blank" underline="hover">
                    www.snptaxandfinancials.com
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
