
// import React, { useState, useEffect, useContext } from "react";
// import { LoginContext } from '../Contextprovider/Context';

// import {
//   Container, Box, Button, Typography, Drawer, TextField, InputLabel, Divider, Checkbox
// } from '@mui/material';

// import CloseIcon from '@mui/icons-material/Close';
// import Editor from '../pages/Texteditor';

// import { useParams } from "react-router-dom"
// import { toast } from "react-toastify"
// import Grid from '@mui/material/Grid';
// import TelegramIcon from '@mui/icons-material/Telegram';



// const Communication = () => {
//   const [accountId, setAccountId] = useState([])
//   const { logindata } = useContext(LoginContext)
//   const [isActiveTrue, setIsActiveTrue] = useState(true);
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
//         accountwiseChatlist(result.accounts[0]._id, isActiveTrue);
//         console.log(result.accounts[0]._id)
//       })
//       .catch((error) => console.error(error));
//   };

//   console.log(accountId)
//   useEffect(() => {
//     fetchAccountId()

//   }, []);

//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const handleEditEditorChange = (newContent) => {
//     setDescription(newContent);
//   };

//   const [open, setOpen] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const { data } = useParams();

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   //for shortcode
//   const [inputText, setInputText] = useState('');
//   const [inputTextError, setInputTextError] = useState('');

//   const handlechatsubject = (e) => {
//     const { value } = e.target;
//     setInputText(value);
//   };

//   //for texteditor.
//   const [description, setDescription] = useState('');
//   const handleEditorChange = (content) => {
//     setDescription(content);
//   };

//   //Integration
//   //chattemps
//   useEffect(() => {
//     fetchChatTemplates();
//   }, []);

//   const fetchChatTemplates = async () => {
//     try {
//       const url = 'http://127.0.0.1:7500/Workflow/chats/chattemplate';
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch ChatTemplate");
//       }
//       const data = await response.json();

//       console.log(data.chatTemplate);
//     } catch (error) {
//       console.error("Error fetching ChatTemplate:", error);
//     }
//   };


//   //for accountwise 
//   const [accountData, setAccountData] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState([]);

//   const [chatId, setChatId] = useState()
//   ///for drawer save btn
//   const saveChat = () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     const messageData = [{
//       message: description,
//       fromwhome: "Client",
//     }];
//     console.log(messageData)
//     const raw = JSON.stringify({
//       accountids: [accountId],
//       chatsubject: inputText,
//       description: messageData,
//       active: "true"
//     });
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow"
//     };
//     console.log(raw)
//     fetch('http://127.0.0.1:9090/chats/chatsaccountwise', requestOptions)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((result) => {
//         console.log(result);
//         toast.success("New Chat created successfully");

//         setIsSubmitted(true);
//         accountwiseChatlist(accountId, isActiveTrue);
//         handleClose()

//       })
//       .catch((error) => {
//         console.error("Fetch error: ", error.message);
//         toast.error("Failed to create new chat. Please try again.");
//       });
//   };
//   const [adminChatSubject, setAdminChatSubject] = useState()
//   const [adminChatDiscription, setAdminChatDiscription] = useState()
//   const [accountName, setAccountName] = useState()
//   const [time, setTime] = useState()
//   const [chatList, setChatList] = useState([]);

//   const accountwiseChatlist = (accId, ActiveTrue) => {
//     console.log(accId)
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow",
//     };
//     const url = `http://127.0.0.1:9090/chats/chatsaccountwise/isactivechat/${accId}/${ActiveTrue}`

//     fetch(url, requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);

//         if (result.chataccountwise && result.chataccountwise.length > 0) {

//           result.chataccountwise.forEach((chat) => {
//             console.log(chat.chatsubject);
//             console.log(chat.description);
           
//             chat.description.forEach((message) => {
//               console.log(message._id); 
//             });
//             setAccountName(chat.accountid.accountName);
//             setTime(chat.updatedAt)

//           });
//           setIsSubmitted(true)
//           setChatList(result.chataccountwise);
//         } else {
//           console.log("No chat data available");
//         }
//       })
//       .catch((error) => console.error(error));
//   };

//   const [expanded, setExpanded] = useState(false);
//   const [activeChatIndex, setActiveChatIndex] = useState(null);


//   const formattedTime = new Date(time).toLocaleDateString("en-US", {
//     month: "short",
//     day: "2-digit",
//   }).replace(',', '');


//   const [allDescriptions, setAllDescriptions] = useState([]); // State to hold all descriptions
//   const [descriptiontime, setDescriptionTime] = useState()

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const day = date.getDate();
//     const month = date.toLocaleString('default', { month: 'short' }); // Get short month name
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const period = hours >= 12 ? 'PM' : 'AM';

//     // Convert 24-hour time to 12-hour time
//     const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero for single digit minutes

//     return `${day} ${month} ${formattedHours}:${formattedMinutes} ${period}`;
//   };

//   const updateChatDescription = () => {
//     if (!description.trim()) return; // Do not send if description is empty

//     const newDescription = {
//       message: description,
//       fromwhome: "client"
//     };
//     setAllDescriptions((prevDescriptions) => [...prevDescriptions, newDescription]);
//     setDescription("");
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     const raw = JSON.stringify({
//       newDescriptions: [newDescription],
//     });
//     const requestOptions = {
//       method: "PATCH",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };
//     console.log("Payload:", raw);
//     console.log(chatId)
//     const url = `http://127.0.0.1:9090/chats/chatsaccountwise/chatupdatemessage/${chatId}`
//     console.log(url)
//     fetch(url, requestOptions)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((result) => {
//         toast.success("Chat description updated successfully");
//         console.log("Response:", result);
//         const latestDescription = result.updatedChats.description[result.updatedChats.description.length - 1];
//         const formattedTime = formatDate(latestDescription.time); // Format the time
//         setDescriptionTime(formattedTime); // Set the formatted time
//         console.log(formattedTime); // Log the formatted time
//         setAdminChatSubject(result.updatedChats.chatsubject);
//         setAdminChatDiscription(result.updatedChats.description);
//         setExpanded(true);
//         // setActiveChatIndex(index);
//         setChatId(result.updatedChats._id)

//         accountwiseChatlist(accountId, isActiveTrue)
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         toast.error("Failed to update chat description. Please try again.");
//       });
//   };

//   //for client task
//   const [showClientTaskGrid, setShowClientTaskGrid] = useState(true);
//   const [adminChatClientsTask, setAdminChatClientsTask] = useState()
//   const [checkedSubtasks, setCheckedSubtasks] = useState([]);


//   const handleCheckboxChange = (id) => {
    
//     setAdminChatClientsTask((prevTasks) => {
//       const updatedTasks = prevTasks.flat().map((task) => {
//         if (task.id === id) {
        
//           return {
//             ...task,
//             checked: task.checked === "true" ? "false" : "true", // Toggle between "true" and "false"
//           };
//         }
//         return task;
//       });
  
      
//       setAdminChatClientsTask(updatedTasks);
//       updateClientTask(updatedTasks); // Update backend
//       return updatedTasks;
//     });
//   };
//   console.log(checkedSubtasks)
//   const handleTaskTextChange = (groupIndex, taskIndex, newText) => {
//     const updatedTasks = [...adminChatClientsTask];
//     updatedTasks[groupIndex][taskIndex].text = newText;
//     console.log(updatedTasks)
//     setAdminChatClientsTask(updatedTasks);
//   };

//   const updateClientTask = (updatedTasks) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//       chatId: chatId,
//       taskUpdates: updatedTasks.map(task => ({
//         id: task.id,
//         text: task.text,
//         checked: task.checked.toString(), // Ensure boolean is sent as string "true"/"false"
//       })),
//     });

//     console.log("Payload to Backend:", raw); // Log to verify

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch("http://127.0.0.1:9090/chats/chatsaccountwise/updateTaskCheckedStatus", requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         console.log("Backend response:", result);
//         const allChecked = updatedTasks.every(task => task.checked === true || task.checked === "true");

//       if (allChecked) {
//         const taskMessages = updatedTasks.map(task => task.text).join(", ");
//         const description = `${taskMessages}`;
//         console.log("All tasks are checked. Updating description:", description);
//         updateClientChatDescription(description);
//       } else {
//         console.log("Not all tasks are checked. Description not updated.");
//       }
//     })
//       .catch(error => console.error("Error updating task:", error));
//   };


//   const updateClientChatDescription = (description) => {
//     const newDescription = {
//       message: description,
//       fromwhome: "client"
//     };
//     setAllDescriptions((prevDescriptions) => [...prevDescriptions, newDescription]);
//     setDescription("");
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     const raw = JSON.stringify({
//       newDescriptions: [newDescription],
//     });
//     const requestOptions = {
//       method: "PATCH",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };
//     console.log("Payload:", raw);
//     fetch(`http://127.0.0.1:9090/chats/chatsaccountwise/chatupdatemessage/${chatId}`, requestOptions)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((result) => {
//         console.log("Response:", result);
//         setAdminChatSubject(result.updatedChats.chatsubject);
//         setAdminChatDiscription(result.updatedChats.description);
//         setExpanded(true);
//         setChatId(result.updatedChats._id);
//         toast.success("Chat description updated successfully");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         toast.error("Failed to update chat description. Please try again.");
//       });
//   };

//   return (
//     <Box>

//       <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
//         <Typography m={1} variant="h4">
//           <b>Chats & tasks</b>
//         </Typography>
//         <Box display={"flex"} alignItems={'center'} gap={2}>

//           <Box onClick={handleOpen}>
//             <Button variant="contained">New Chat</Button>
//           </Box>
//         </Box>
//       </Box>
//       <Box
//         border={'1px solid #e2e8f0'}
//       >
//         <Box mt={3}
//           height={'auto'}
//         >
//           <Box>
//             <Box>
//               <Grid container spacing={3} sx={{ height: 'auto', mt: 2, }}>
//                 <Grid item xs={4} >
//                   <Container sx={{ height: '90vh', borderRight: '1px solid #697991' }}>
//                     {chatList.length > 0 && (
//                       chatList.map((chat, index) => (
//                         <Box key={index} mb={2}>
//                           <Box display="flex" alignItems="center" mb={1}>
//                             <TelegramIcon sx={{ color: 'rgb(113, 53, 247)', mr: 1 }} />
//                             <Typography fontSize={13} color="#697991">
//                               Chat with {chat.accountid.accountName} {/* Accessing accountName */}
//                             </Typography>
//                           </Box>
//                           <Box
//                             sx={{ cursor: 'pointer' }}
//                             onClick={() => {
//                               setAdminChatSubject(chat.chatsubject);
//                               setAdminChatDiscription(chat.description);
//                               setExpanded(true);
//                               setActiveChatIndex(index);
//                               setChatId(chat._id)
//                               setAdminChatClientsTask(chat.clienttasks)
//                             }}
//                           >
//                             <Typography variant="h6" fontSize={16} noWrap ml={1}>
//                               <b>{chat.chatsubject}</b>
//                             </Typography>
//                             <Typography
//                               fontSize={14}
//                               sx={{
//                                 display: '-webkit-box',
//                                 WebkitBoxOrient: 'vertical',
//                                 overflow: 'hidden',
//                                 textOverflow: 'ellipsis',
//                                 WebkitLineClamp: 2, // Show only 2 lines
//                                 ml: 1
//                               }}
//                             >
//                               {chat.description[0]?.message.replace(/<[^>]+>/g, '')} {/* Accessing message from description array */}
//                             </Typography>

//                             <Box display="flex" justifyContent="flex-end" ml={1}>
//                               <Typography fontSize={13} color="#697991">
//                                 {formattedTime}
//                               </Typography>
//                             </Box>
//                             <Divider
//                               sx={{
//                                 borderColor: activeChatIndex === index ? '#2c85de' : '', // Active color and default color
//                               }}
//                             />
//                           </Box>
//                         </Box>
//                       ))
//                     )}
//                   </Container>
//                 </Grid>

//                 {/* Second Grid: Shown on Expand */}

//                 <Grid xs={4}>
//                   {expanded && (
//                     <Box maxWidthwidth={'100%'}>
//                       <Grid spacing={3} sx={{ height: 'auto', mt: 2 }}>
//                         <Grid xs={showClientTaskGrid ? 12 : 12} >
//                           <Box ml={2}>
//                             <Box display="flex" justifyContent="space-between" alignItems="center">
//                               <Typography fontSize={23}>
//                                 <strong>{adminChatSubject}</strong>
//                               </Typography>

//                             </Box>
//                             <Divider sx={{ mt: 2 }} />

//                             <Box mt={2}>
//                               <Box sx={{ width: '100%', mb: 6 }}>
//                                 <Box
//                                   sx={{
//                                     overflowY: 'auto',
//                                     height: '18vh',

//                                   }}
//                                 >
//                                   {adminChatDiscription?.map((desc) => (
//                                     <Box
//                                       key={desc._id}
//                                       sx={{
//                                         mb: '10px',
//                                         backgroundColor:
//                                           desc.fromwhome === 'admin'
//                                             ? '#ffcccc'
//                                             : desc.fromwhome === 'client'
//                                               ? '#eff7ff'
//                                               : '#dbe1e8',
//                                         border: '1px solid transparent',
//                                         borderRadius: '12px',
//                                         p: '30px 20px',
//                                         width: 'fit-content',
//                                         textAlign: 'left',
//                                         boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//                                         position: 'relative',
//                                         borderBottomRightRadius: '1px',
//                                         ml: desc.fromwhome === 'client' ? 'auto' : '10px',
//                                         mr: desc.fromwhome === 'admin' ? 'auto' : '10px',
//                                       }}
//                                     >
//                                       <Typography
//                                         component="strong"
//                                         sx={{
//                                           display: 'flex',
//                                           alignItems: 'center',
//                                           justifyContent: 'space-between',
//                                           mb: 1,
//                                           color: '#333',
//                                         }}
//                                       >
//                                         {desc.fromwhome}
//                                       </Typography>
//                                       <Typography
//                                         component="p"
//                                         sx={{ m: 0, fontSize: '14px', lineHeight: 1.5, color: '#555' }}
//                                         dangerouslySetInnerHTML={{
//                                           __html: typeof desc.message === 'string'
//                                             ? desc.message.replace(/<[^>]+>/g, '')
//                                             : desc.message,
//                                         }}
//                                       />
//                                       <Typography fontSize={13} color="#697991">
//                                         {formattedTime}
//                                       </Typography>
//                                     </Box>
//                                   ))}
//                                 </Box>

//                                 {!isEditing && (
//                                   <Box sx={{ width: '100%', mb: 6 }}>
//                                     <Box mt={5}>
//                                       <Editor onChange={handleEditorChange} />
//                                     </Box>
//                                     <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
//                                       <Button onClick={updateChatDescription} variant="contained">
//                                         Send
//                                       </Button>
//                                     </Box>
//                                   </Box>
//                                 )}

//                                 {isEditing && selectedMessage && (
//                                   <Box>
//                                     <Editor onChange={handleEditEditorChange} initialContent={selectedMessage} />
//                                   </Box>
//                                 )}
//                               </Box>
//                             </Box>
//                           </Box>
//                         </Grid>
//                       </Grid>
//                     </Box>

//                   )}
//                 </Grid>

//                 <Grid item xs={4}>
//                   {showClientTaskGrid && (
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         height: '90vh',

//                         borderLeft: '1px solid #697991',
//                         width: '100%',
//                       }}
//                     >
//                       {adminChatClientsTask && adminChatClientsTask.length > 0 ? (
//                         adminChatClientsTask.map((taskGroup, groupIndex) => (
//                           <Box key={groupIndex} m={2}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                               <Typography fontSize={25} whiteSpace="nowrap">
//                                 <b>Client tasks</b>
//                               </Typography>

//                             </Box>
//                             <Divider sx={{ mt: 2, mb: 5, }} />

//                             <Box m={1} width="100%">
//                               {taskGroup.length > 0 ? (
//                                 taskGroup.map((task, taskIndex) => {
//                                   // Log task to console for debugging
//                                   console.log("Task:", taskGroup);
//                                   const isChecked = task.checked === "true"; 
//                                   return (
//                                     <Box key={task.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                       <Checkbox
//                                         checked={isChecked}
//                                         onChange={() => handleCheckboxChange(task.id, task.checked)}
//                                       />
//                                       <TextField
//                                         fullWidth
//                                         variant="outlined"
//                                         value={task.text}
//                                         onChange={(e) =>
//                                           handleTaskTextChange(groupIndex, taskIndex, e.target.value)
//                                         }
//                                       />
//                                     </Box>
//                                   );
//                                 })
//                               ) : (
//                                 <Typography>No tasks in this group</Typography>
//                               )}
//                             </Box>

//                           </Box>
//                         ))
//                       ) : (
//                         <Typography>No tasks available</Typography>
//                       )}
//                     </Box>
//                   )}
//                 </Grid>
//               </Grid>

//             </Box>
//           </Box>
        
//         </Box>
       
//       </Box>
//       {/* Drawer Section */}
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             width: "40%",
//           },
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
//           {/* Drawer Header */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2 }}>
//             <Typography variant="h6">New chat</Typography>
//             <Box onClick={handleClose} sx={{ cursor: 'pointer', color: '#1976d3' }}>
//               <CloseIcon />
//             </Box>
//           </Box>
//           <Divider />

//           <Box m={1}>
//             <InputLabel sx={{ color: 'black' }}>Subject</InputLabel>
//             <TextField
//               sx={{ mt: 2 }}
//               fullWidth
//               name="subject"
//               value={inputText} onChange={handlechatsubject}
//               placeholder="Subject"
//               size="small"
//               error={!!inputTextError}
//             />
//           </Box>


//           <Box sx={{ m: 1 }}>
//             <Editor onChange={handleEditorChange} />
//           </Box>

//           {/* Drawer Actions */}
//           <Box sx={{ p: 4, display: "flex", alignItems: "center", gap: 2, m: 2, }}>
//             <Button
//               variant="contained" color="primary"
//               // onClick={sendSaveChatMail}
//               onClick={saveChat}
//             >
//               Create chat
//             </Button>
//             <Button onClick={handleClose} variant="outlined">
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// };

// export default Communication;




import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from '../Contextprovider/Context';

import {
  Container, Box, Button, Typography, Drawer, TextField, InputLabel, Divider, Checkbox
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Editor from '../pages/Texteditor';

import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Grid from '@mui/material/Grid';
import TelegramIcon from '@mui/icons-material/Telegram';



const Communication = () => {
  const [accountId, setAccountId] = useState([])
  const { logindata } = useContext(LoginContext)
  const [isActiveTrue, setIsActiveTrue] = useState(true);
  console.log(logindata)

  const fetchAccountId = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`http://127.0.0.1:8880/admin/accountdetails/accountdetailslist/listbyuserid/${logindata.user.id}`, requestOptions)
      .then((response) => response.json()

      )
      .then((result) => {
        console.log(result)
        setAccountId(result.accounts[0]._id)
        accountwiseChatlist(result.accounts[0]._id, isActiveTrue);
        console.log(result.accounts[0]._id)
      })
      .catch((error) => console.error(error));
  };

  console.log(accountId)
  useEffect(() => {
    fetchAccountId()

  }, []);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditEditorChange = (newContent) => {
    setDescription(newContent);
  };

  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data } = useParams();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //for shortcode
  const [inputText, setInputText] = useState('');
  const [inputTextError, setInputTextError] = useState('');

  const handlechatsubject = (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  //for texteditor.
  const [description, setDescription] = useState('');
  const handleEditorChange = (content) => {
    setDescription(content);
  };

  //Integration
  //chattemps
  useEffect(() => {
    fetchChatTemplates();
  }, []);
const CHAT_TEMP_API = process.env.REACT_APP_CHAT_TEMP_URL
  const fetchChatTemplates = async () => {
    try {
      const url = `${CHAT_TEMP_API}/Workflow/chats/chattemplate`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch ChatTemplate");
      }
      const data = await response.json();

      console.log(data.chatTemplate);
    } catch (error) {
      console.error("Error fetching ChatTemplate:", error);
    }
  };

const CLEINT_CHAT_API = process.env.REACT_APP_CHAT_API
  //for accountwise 
  const [accountData, setAccountData] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState([]);

  const [chatId, setChatId] = useState()
  ///for drawer save btn
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
  const [adminChatSubject, setAdminChatSubject] = useState()
  const [adminChatDiscription, setAdminChatDiscription] = useState()
  const [accountName, setAccountName] = useState()
  const [time, setTime] = useState()
  const [chatList, setChatList] = useState([]);

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

  const [expanded, setExpanded] = useState(false);
  const [activeChatIndex, setActiveChatIndex] = useState(null);


  const formattedTime = new Date(time).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  }).replace(',', '');


  const [allDescriptions, setAllDescriptions] = useState([]); // State to hold all descriptions
  const [descriptiontime, setDescriptionTime] = useState()

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour time to 12-hour time
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero for single digit minutes

    return `${day} ${month} ${formattedHours}:${formattedMinutes} ${period}`;
  };

  const updateChatDescription = () => {
    if (!description.trim()) return; // Do not send if description is empty

    const newDescription = {
      message: description,
      fromwhome: "client"
    };
    setAllDescriptions((prevDescriptions) => [...prevDescriptions, newDescription]);
    setDescription("");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      newDescriptions: [newDescription],
    });
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("Payload:", raw);
    console.log(chatId)
    const url = `${CLEINT_CHAT_API}/chats/chatsaccountwise/chatupdatemessage/${chatId}`
    console.log(url)
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        toast.success("Chat description updated successfully");
        console.log("Response:", result);
        const latestDescription = result.updatedChats.description[result.updatedChats.description.length - 1];
        const formattedTime = formatDate(latestDescription.time); // Format the time
        setDescriptionTime(formattedTime); // Set the formatted time
        console.log(formattedTime); // Log the formatted time
        setAdminChatSubject(result.updatedChats.chatsubject);
        setAdminChatDiscription(result.updatedChats.description);
        setExpanded(true);
        // setActiveChatIndex(index);
        setChatId(result.updatedChats._id)

        accountwiseChatlist(accountId, isActiveTrue)
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to update chat description. Please try again.");
      });
  };

  //for client task
  const [showClientTaskGrid, setShowClientTaskGrid] = useState(true);
  const [adminChatClientsTask, setAdminChatClientsTask] = useState()
  const [checkedSubtasks, setCheckedSubtasks] = useState([]);


  const handleCheckboxChange = (id) => {
    setAdminChatClientsTask((prevTasks) => {
      const updatedTasks = prevTasks.map((group) =>
        group.map((task) =>
          task.id === id
            ? { ...task, checked: task.checked === "true" ? "false" : "true" }
            : task
        )
      );
  
      // Flatten tasks for backend update
      const flattenedTasks = updatedTasks.flat();
      updateClientTask(flattenedTasks);
  
      return updatedTasks; // Return updated state correctly
    });
  };
  
  console.log(checkedSubtasks)
  const handleTaskTextChange = (groupIndex, taskIndex, newText) => {
    const updatedTasks = [...adminChatClientsTask];
    updatedTasks[groupIndex][taskIndex].text = newText;
    console.log(updatedTasks)
    setAdminChatClientsTask(updatedTasks);
  };

  const updateClientTask = (updatedTasks) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      chatId: chatId,
      taskUpdates: updatedTasks.map(task => ({
        id: task.id,
        text: task.text,
        checked: task.checked.toString(), // Ensure boolean is sent as string "true"/"false"
      })),
    });

    console.log("Payload to Backend:", raw); // Log to verify

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${CLEINT_CHAT_API}/chats/chatsaccountwise/updateTaskCheckedStatus`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("Backend response:", result);
        const allChecked = updatedTasks.every(task => task.checked === true || task.checked === "true");

      if (allChecked) {
        const taskMessages = updatedTasks.map(task => task.text).join(", ");
        const description = `${taskMessages}`;
        console.log("All tasks are checked. Updating description:", description);
        updateClientChatDescription(description);
      } else {
        console.log("Not all tasks are checked. Description not updated.");
      }
    })
      .catch(error => console.error("Error updating task:", error));
  };


  const updateClientChatDescription = (description) => {
    const newDescription = {
      message: description,
      fromwhome: "client"
    };
    setAllDescriptions((prevDescriptions) => [...prevDescriptions, newDescription]);
    setDescription("");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      newDescriptions: [newDescription],
    });
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("Payload:", raw);
    fetch(`${CLEINT_CHAT_API}/chats/chatsaccountwise/chatupdatemessage/${chatId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Response:", result);
        setAdminChatSubject(result.updatedChats.chatsubject);
        setAdminChatDiscription(result.updatedChats.description);
        setExpanded(true);
        setChatId(result.updatedChats._id);
        toast.success("Chat description updated successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to update chat description. Please try again.");
      });
  };

  return (
    <Box>

      <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
        <Typography m={1} variant="h4">
          <b>Chats & tasks</b>
        </Typography>
        <Box display={"flex"} alignItems={'center'} gap={2}>

          <Box onClick={handleOpen}>
            <Button variant="contained">New Chat</Button>
          </Box>
        </Box>
      </Box>
      <Box
        border={'1px solid #e2e8f0'}
      >
        <Box mt={3}
          height={'auto'}
        >
          <Box>
            <Box>
              <Grid container spacing={3} sx={{ height: 'auto', mt: 2, }}>
                <Grid item xs={4} >
                  <Container sx={{ height: '90vh', borderRight: '1px solid #697991' }}>
                    {chatList.length > 0 && (
                      chatList.map((chat, index) => (
                        <Box key={index} mb={2}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <TelegramIcon sx={{ color: 'rgb(113, 53, 247)', mr: 1 }} />
                            <Typography fontSize={13} color="#697991">
                              Chat with {chat.accountid.accountName} {/* Accessing accountName */}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                              setAdminChatSubject(chat.chatsubject);
                              setAdminChatDiscription(chat.description);
                              setExpanded(true);
                              setActiveChatIndex(index);
                              setChatId(chat._id)
                              setAdminChatClientsTask(chat.clienttasks)
                            }}
                          >
                            <Typography variant="h6" fontSize={16} noWrap ml={1}>
                              <b>{chat.chatsubject}</b>
                            </Typography>
                            <Typography
                              fontSize={14}
                              sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitLineClamp: 2, // Show only 2 lines
                                ml: 1
                              }}
                            >
                              {chat.description[0]?.message.replace(/<[^>]+>/g, '')} {/* Accessing message from description array */}
                            </Typography>

                            <Box display="flex" justifyContent="flex-end" ml={1}>
                              <Typography fontSize={13} color="#697991">
                                {formattedTime}
                              </Typography>
                            </Box>
                            <Divider
                              sx={{
                                borderColor: activeChatIndex === index ? '#2c85de' : '', // Active color and default color
                              }}
                            />
                          </Box>
                        </Box>
                      ))
                    )}
                  </Container>
                </Grid>

                {/* Second Grid: Shown on Expand */}

                <Grid xs={4}>
                  {expanded && (
                    <Box maxWidthwidth={'100%'}>
                      <Grid spacing={3} sx={{ height: 'auto', mt: 2 }}>
                        <Grid xs={showClientTaskGrid ? 12 : 12} >
                          <Box ml={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography fontSize={23}>
                                <strong>{adminChatSubject}</strong>
                              </Typography>

                            </Box>
                            <Divider sx={{ mt: 2 }} />

                            <Box mt={2}>
                              <Box sx={{ width: '100%', mb: 6 }}>
                                <Box
                                  sx={{
                                    overflowY: 'auto',
                                    height: '18vh',

                                  }}
                                >
                                  {adminChatDiscription?.map((desc) => (
                                    <Box
                                      key={desc._id}
                                      sx={{
                                        mb: '10px',
                                        backgroundColor:
                                          desc.fromwhome === 'admin'
                                            ? '#ffcccc'
                                            : desc.fromwhome === 'client'
                                              ? '#eff7ff'
                                              : '#dbe1e8',
                                        border: '1px solid transparent',
                                        borderRadius: '12px',
                                        p: '30px 20px',
                                        width: 'fit-content',
                                        textAlign: 'left',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                        position: 'relative',
                                        borderBottomRightRadius: '1px',
                                        ml: desc.fromwhome === 'client' ? 'auto' : '10px',
                                        mr: desc.fromwhome === 'admin' ? 'auto' : '10px',
                                      }}
                                    >
                                      <Typography
                                        component="strong"
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          mb: 1,
                                          color: '#333',
                                        }}
                                      >
                                        {desc.fromwhome}
                                      </Typography>
                                      <Typography
                                        component="p"
                                        sx={{ m: 0, fontSize: '14px', lineHeight: 1.5, color: '#555' }}
                                        dangerouslySetInnerHTML={{
                                          __html: typeof desc.message === 'string'
                                            ? desc.message.replace(/<[^>]+>/g, '')
                                            : desc.message,
                                        }}
                                      />
                                      <Typography fontSize={13} color="#697991">
                                        {formattedTime}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>

                                {!isEditing && (
                                  <Box sx={{ width: '100%', mb: 6 }}>
                                    <Box mt={5}>
                                      <Editor onChange={handleEditorChange} />
                                    </Box>
                                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                      <Button onClick={updateChatDescription} variant="contained">
                                        Send
                                      </Button>
                                    </Box>
                                  </Box>
                                )}

                                {isEditing && selectedMessage && (
                                  <Box>
                                    <Editor onChange={handleEditEditorChange} initialContent={selectedMessage} />
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>

                  )}
                </Grid>

                <Grid item xs={4}>
                  {showClientTaskGrid && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '90vh',

                        borderLeft: '1px solid #697991',
                        width: '100%',
                      }}
                    >
                      {adminChatClientsTask && adminChatClientsTask.length > 0 ? (
                        adminChatClientsTask.map((taskGroup, groupIndex) => (
                          <Box key={groupIndex} m={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography fontSize={25} whiteSpace="nowrap">
                                <b>Client tasks</b>
                              </Typography>

                            </Box>
                            <Divider sx={{ mt: 2, mb: 5, }} />

                            <Box m={1} width="100%">
  {taskGroup && taskGroup.length > 0 ? (
    taskGroup.map((task, taskIndex) => (
      <Box key={task.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Checkbox
          checked={task.checked === "true"}
          onChange={() => handleCheckboxChange(task.id)}
        />
        <TextField
          fullWidth
          variant="outlined"
          value={task.text}
          onChange={(e) => handleTaskTextChange(groupIndex, taskIndex, e.target.value)}
        />
      </Box>
    ))
  ) : (
    <Typography>No tasks in this group</Typography>
  )}
</Box>


                          </Box>
                        ))
                      ) : (
                        <Typography>No tasks available</Typography>
                      )}
                    </Box>
                  )}
                </Grid>
              </Grid>

            </Box>
          </Box>
        
        </Box>
       
      </Box>
      {/* Drawer Section */}
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
  );
};

export default Communication;

