
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from '../Contextprovider/Context';
import {
   Box, Button, Typography,  TextField,  Divider, Checkbox
} from '@mui/material';
import Editor from '../pages/Texteditor';
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Grid from '@mui/material/Grid';

const Communication = () => {
  const [accountId, setAccountId] = useState([])
  const { logindata } = useContext(LoginContext)
  const [isActiveTrue, setIsActiveTrue] = useState(true);
  console.log(logindata)
  const { _id } = useParams();
  console.log(_id)
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
        console.log("accountwiseChatlist :",result);

        if (result.chataccountwise && result.chataccountwise.length > 0) {

          result.chataccountwise.forEach((chat) => {
            console.log(chat.chatsubject);
            console.log(chat.description);

            chat.description.forEach((message) => {
              console.log(message._id);
            });
            setAccountName(chat.accountid.accountName);
            setTime(chat.updatedAt)
            
             console.log(chat._id)
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
    if (!description.trim()) return; 

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
   
    const url = `${CLEINT_CHAT_API}/chats/chatsaccountwise/chatupdatemessage/${_id}`
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
        const formattedTime = formatDate(latestDescription.time); 
        setDescriptionTime(formattedTime); 
        console.log(formattedTime); 
        setAdminChatSubject(result.updatedChats.chatsubject);
        setAdminChatDiscription(result.updatedChats.description);
        setExpanded(true);
        // setActiveChatIndex(index);
        IdwiseChat();

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
    setClientTasks((prevTasks) => {
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
    const updatedTasks = [...clientTasks];
    updatedTasks[groupIndex][taskIndex].text = newText;
    console.log(updatedTasks)
    setClientTasks(updatedTasks);
  };

  const updateClientTask = (updatedTasks) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      chatId: _id,
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
    fetch(`${CLEINT_CHAT_API}/chats/chatsaccountwise/chatupdatemessage/${_id}`, requestOptions)
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
        
        toast.success("Chat description updated successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to update chat description. Please try again.");
      });
  };

const[chatsubject,setchatsubject]=useState()
const[clientTasks,setClientTasks]=useState([])
const IdwiseChat=()=>{
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(`http://127.0.0.1:9090/chats/chatsaccountwise/${_id}`, requestOptions)

        .then((response) => response.json())
        .then((result) => {
           console.log("IdwiseChat",result)
          
           setchatsubject(result.accountChats.chatsubject); 
           console.log(result.accountChats.chatsubject);

           setDescription(result.accountChats.description);
           console.log(result.accountChats.description);


           setClientTasks(result.accountChats.clienttasks);
           console.log(result.accountChats.clienttasks)


          })
          
        .catch((error) => console.error(error));
  }

  useEffect(() => {
    IdwiseChat();
  }, []);
          
        

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
               
                {/* Second Grid: Shown on Expand */}

                <Grid xs={6}>
                 
                    <Box maxWidthwidth={'100%'}>
                      <Grid spacing={3} sx={{ height: 'auto', mt: 2 }}>
                        <Grid  >
                          <Box ml={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography fontSize={23} m={2}>
                                <strong>{chatsubject}</strong>
                              </Typography>
                              
                            </Box>
                            <Divider />

                            <Box mt={2}>
                              <Box sx={{ width: '100%', mb: 6 }}>
                                <Box
                                  sx={{
                                    overflowY: 'auto',
                                    height: '18vh',

                                  }}
                                >
                                  
                                <div>
                                  {Array.isArray(description) && description.length > 0 && (
                                    description.map((desc) => (
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
                                          {desc.fromwhome || 'Unknown'}
                                        </Typography>
                                        <Typography
                                          component="p"
                                          sx={{ m: 0, fontSize: '14px', lineHeight: 1.5, color: '#555' }}
                                          dangerouslySetInnerHTML={{
                                            __html: typeof desc.message === 'string'
                                              ? desc.message.replace(/<[^>]+>/g, '')
                                              : desc.message || 'No message available',
                                          }}
                                        />
                                        <Typography fontSize={13} color="#697991">
                                          {formattedTime || ''}
                                        </Typography>
                                      </Box>
                                    ))
                                  )}
                                </div>
                                </Box>

                                {!isEditing && (
                                  <Box sx={{ width: '100%', mb: 6 }}>
                                    <Box mt={5} ml={2}>
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

                 
                </Grid>

                <Grid item xs={6}>
                  {/* {showClientTaskGrid && ( */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '90vh',

                        borderLeft: '1px solid #697991',
                        width: '100%',
                      }}
                    >
                      {clientTasks && clientTasks.length > 0 ? (
                        clientTasks.map((taskGroup, groupIndex) => (
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
                  {/* // )} */}
                </Grid>
              </Grid>

            </Box>
          </Box>

        </Box>

      </Box>
    
    </Box>
  );
};

export default Communication;



























// import React, { useState, useEffect, useContext } from "react";
// import { LoginContext } from '../Contextprovider/Context';
// import {
//    Box, Button, Typography,  TextField,  Divider, Checkbox
// } from '@mui/material';
// import Editor from '../pages/Texteditor';
// import { useParams } from "react-router-dom"
// import { toast } from "react-toastify"
// import Grid from '@mui/material/Grid';

// const Communication = () => {
//   const [accountId, setAccountId] = useState([])
//   const { logindata } = useContext(LoginContext)
//   const [isActiveTrue, setIsActiveTrue] = useState(true);
//   console.log(logindata)
//   const { _id } = useParams();
//   console.log(_id)
//   const fetchAccountId = async () => {
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow"
//     };

//     fetch(`http://127.0.0.1:7000/accounts/accountdetails/accountdetailslist/listbyuserid/${logindata.user.id}`, requestOptions)
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
//   const CHAT_TEMP_API = process.env.REACT_APP_CHAT_TEMP_URL
//   const fetchChatTemplates = async () => {
//     try {
//       const url = `${CHAT_TEMP_API}/Workflow/chats/chattemplate`;
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
//   const CLEINT_CHAT_API = process.env.REACT_APP_CHAT_API
//   //for accountwise 
//   const [accountData, setAccountData] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState([]);

//   const [chatId, setChatId] = useState()
  
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
//     const url = `${CLEINT_CHAT_API}/chats/chatsaccountwise/isactivechat/${accId}/${ActiveTrue}`

//     fetch(url, requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         console.log("accountwiseChatlist :",result);

//         if (result.chataccountwise && result.chataccountwise.length > 0) {

//           result.chataccountwise.forEach((chat) => {
//             console.log(chat.chatsubject);
//             console.log(chat.description);

//             chat.description.forEach((message) => {
//               console.log(message._id);
//             });
//             setAccountName(chat.accountid.accountName);
//             setTime(chat.updatedAt)
            
//              console.log(chat._id)
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
//     if (!description.trim()) return; 

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
   
//     const url = `${CLEINT_CHAT_API}/chats/chatsaccountwise/chatupdatemessage/${_id}`
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
//         const formattedTime = formatDate(latestDescription.time); 
//         setDescriptionTime(formattedTime); 
//         console.log(formattedTime); 
//         setAdminChatSubject(result.updatedChats.chatsubject);
//         setAdminChatDiscription(result.updatedChats.description);
//         setExpanded(true);
//         // setActiveChatIndex(index);
//         IdwiseChat();

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
//     setClientTasks((prevTasks) => {
//       const updatedTasks = prevTasks.map((group) =>
//         group.map((task) =>
//           task.id === id
//             ? { ...task, checked: task.checked === "true" ? "false" : "true" }
//             : task
//         )
//       );

//       // Flatten tasks for backend update
//       const flattenedTasks = updatedTasks.flat();
//       updateClientTask(flattenedTasks);

//       return updatedTasks; // Return updated state correctly
//     });
//   };

  


//   console.log(checkedSubtasks)
//   const handleTaskTextChange = (groupIndex, taskIndex, newText) => {
//     const updatedTasks = [...clientTasks];
//     updatedTasks[groupIndex][taskIndex].text = newText;
//     console.log(updatedTasks)
//     setClientTasks(updatedTasks);
//   };

//   const updateClientTask = (updatedTasks) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//       chatId: _id,
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

//     fetch(`${CLEINT_CHAT_API}/chats/chatsaccountwise/updateTaskCheckedStatus`, requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         console.log("Backend response:", result);
//         const allChecked = updatedTasks.every(task => task.checked === true || task.checked === "true");

//         if (allChecked) {
//           const taskMessages = updatedTasks.map(task => task.text).join(", ");
//           const description = `${taskMessages}`;
//           console.log("All tasks are checked. Updating description:", description);
//           updateClientChatDescription(description);
//         } else {
//           console.log("Not all tasks are checked. Description not updated.");
//         }
//       })
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
//     fetch(`${CLEINT_CHAT_API}/chats/chatsaccountwise/chatupdatemessage/${_id}`, requestOptions)
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
        
//         toast.success("Chat description updated successfully");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         toast.error("Failed to update chat description. Please try again.");
//       });
//   };

// const[chatsubject,setchatsubject]=useState()
// const[clientTasks,setClientTasks]=useState([])
// const IdwiseChat=()=>{
//     const requestOptions = {
//         method: "GET",
//         redirect: "follow"
//       };
      
//       fetch(`http://127.0.0.1:9090/chats/chatsaccountwise/${_id}`, requestOptions)

//         .then((response) => response.json())
//         .then((result) => {
//            console.log("IdwiseChat",result)
          
//            setchatsubject(result.accountChats.chatsubject); 
//            console.log(result.accountChats.chatsubject);

//            setDescription(result.accountChats.description);
//            console.log(result.accountChats.description);


//            setClientTasks(result.accountChats.clienttasks);
//            console.log(result.accountChats.clienttasks)


//           })
          
//         .catch((error) => console.error(error));
//   }

//   useEffect(() => {
//     IdwiseChat();
//   }, []);
          
        

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
               
//                 {/* Second Grid: Shown on Expand */}

//                 <Grid xs={6}>
                 
//                     <Box maxWidthwidth={'100%'}>
//                       <Grid spacing={3} sx={{ height: 'auto', mt: 2 }}>
//                         <Grid  >
//                           <Box ml={2}>
//                             <Box display="flex" justifyContent="space-between" alignItems="center">
//                               <Typography fontSize={23} m={2}>
//                                 <strong>{chatsubject}</strong>
//                               </Typography>
                              
//                             </Box>
//                             <Divider />

//                             <Box mt={2}>
//                               <Box sx={{ width: '100%', mb: 6 }}>
//                                 <Box
//                                   sx={{
//                                     overflowY: 'auto',
//                                     height: '18vh',

//                                   }}
//                                 >
                                  
//                                 <div>
//                                   {Array.isArray(description) && description.length > 0 && (
//                                     description.map((desc) => (
//                                       <Box
//                                         key={desc._id}
//                                         sx={{
//                                           mb: '10px',
//                                           backgroundColor:
//                                             desc.fromwhome === 'admin'
//                                               ? '#ffcccc'
//                                               : desc.fromwhome === 'client'
//                                                 ? '#eff7ff'
//                                                 : '#dbe1e8',
//                                           border: '1px solid transparent',
//                                           borderRadius: '12px',
//                                           p: '30px 20px',
//                                           width: 'fit-content',
//                                           textAlign: 'left',
//                                           boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//                                           position: 'relative',
//                                           borderBottomRightRadius: '1px',
//                                           ml: desc.fromwhome === 'client' ? 'auto' : '10px',
//                                           mr: desc.fromwhome === 'admin' ? 'auto' : '10px',
//                                         }}
//                                       >
//                                         <Typography
//                                           component="strong"
//                                           sx={{
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'space-between',
//                                             mb: 1,
//                                             color: '#333',
//                                           }}
//                                         >
//                                           {desc.fromwhome || 'Unknown'}
//                                         </Typography>
//                                         <Typography
//                                           component="p"
//                                           sx={{ m: 0, fontSize: '14px', lineHeight: 1.5, color: '#555' }}
//                                           dangerouslySetInnerHTML={{
//                                             __html: typeof desc.message === 'string'
//                                               ? desc.message.replace(/<[^>]+>/g, '')
//                                               : desc.message || 'No message available',
//                                           }}
//                                         />
//                                         <Typography fontSize={13} color="#697991">
//                                           {formattedTime || ''}
//                                         </Typography>
//                                       </Box>
//                                     ))
//                                   )}
//                                 </div>
//                                 </Box>

//                                 {!isEditing && (
//                                   <Box sx={{ width: '100%', mb: 6 }}>
//                                     <Box mt={5} ml={2}>
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

                 
//                 </Grid>

//                 <Grid item xs={6}>
//                   {/* {showClientTaskGrid && ( */}
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         height: '90vh',

//                         borderLeft: '1px solid #697991',
//                         width: '100%',
//                       }}
//                     >
//                       {clientTasks && clientTasks.length > 0 ? (
//                         clientTasks.map((taskGroup, groupIndex) => (
//                           <Box key={groupIndex} m={2}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                               <Typography fontSize={25} whiteSpace="nowrap">
//                                 <b>Client tasks</b>
//                               </Typography>

//                             </Box>
//                             <Divider sx={{ mt: 2, mb: 5, }} />

//                             <Box m={1} width="100%">
//                               {taskGroup && taskGroup.length > 0 ? (
//                                 taskGroup.map((task, taskIndex) => (
//                                   <Box key={task.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                     <Checkbox
//                                       checked={task.checked === "true"}
//                                       onChange={() => handleCheckboxChange(task.id)}
//                                     />
//                                     <TextField
//                                       fullWidth
//                                       variant="outlined"
//                                       value={task.text}
//                                       onChange={(e) => handleTaskTextChange(groupIndex, taskIndex, e.target.value)}
//                                     />
//                                   </Box>
//                                 ))
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
//                   {/* // )} */}
//                 </Grid>
//               </Grid>

//             </Box>
//           </Box>

//         </Box>

//       </Box>
    
//     </Box>
//   );
// };

// export default Communication;























