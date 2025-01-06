
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleRight, FaChevronCircleLeft, } from "react-icons/fa";
import logo from '../Imgs/snplogo.png';
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Button, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import iconMapping from './iconMapping';
import { MdLogout } from "react-icons/md";
import { LoginContext } from "../Contextprovider/Context";
import "./sidebar.css";
import Cookies from "js-cookie";
import user from "../Imgs/user.png";
import { FaBars } from "react-icons/fa6";

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sidebarItems, setSidebarItems] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const { logindata, setLoginData } = useContext(LoginContext);

    const navigate = useNavigate();
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsSidebarVisible(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const SIDEBAR_API = process.env.REACT_APP_SIDEBAR_URL
    useEffect(() => {
        const fetchSidebarData = async () => {
            try {
                const response = await axios.get(`${SIDEBAR_API}/api/`);
                setSidebarItems(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching sidebar data:", error);
            }
        };

        fetchSidebarData();
    }, []);

    const handleToggleSidebar = () => {
        if (isSmallScreen) {
            setIsSidebarVisible(!isSidebarVisible);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };



    const history = useNavigate();
    const LOGIN_API = process.env.REACT_APP_USER_LOGIN;
    const logoutuser = async () => {
        let token = localStorage.getItem("clientdatatoken");
        const url = `${LOGIN_API}/common/clientlogin/logout/`;

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };

        const res = await fetch(url, requestOptions);

        const data = await res.json();

        if (data.status === 200) {
            console.log("user logout");
            localStorage.removeItem("clientdatatoken");
            Cookies.remove("clientuserToken");
            setLoginData(false);

            history("/");
        } else {
            console.log("error");
        }
    };

    const [data, setData] = useState(false);
    const [loginsData, setloginsData] = useState("");


    const DashboardValid = async () => {
        let token = localStorage.getItem("clientdatatoken");

        const url = `${LOGIN_API}/common/clientlogin/verifytokenforclient`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        console.log(token);


        const data = await res.json();

        if (data.message === "Invalid token") {
            navigate("/");
        } else {
            setLoginData(data);
            setloginsData(data.user.id);

            if (data.user.role === "Client") {
                fetchUserData(data.user.id);
                getclient(data.user.id)
                navigate("/home");

            } else {

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        }
    };
    useEffect(() => {
        DashboardValid();
        setData(true);
       
    }, []);


    const [userData, setUserData] = useState("");
    const [username, setUsername] = useState("");

     const [userID,setUserId]= useState();

    const fetchUserData = async (id) => {
        const maxLength = 15;
        const myHeaders = new Headers();

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        const url = `${LOGIN_API}/common/user/${id}`;
        console.log(id)
        fetch(url + loginsData, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("id", result);
                if (result.email) {
                    setUserData(truncateString(result.email, maxLength));

                }
                setUserId(result._id)
                console.log(result._id)
                setUsername(result.username);
            });
    };
    const truncateString = (str, maxLength) => {
        if (str && str.length > maxLength) {
            return str.substring(0, maxLength) + "...";
        } else {
            return str;
        }
    };

    // const [profilePicture, setProfilePicture] = useState("");
    // const getclient = async (id) => {
    //     console.log("tset", id)
    //     const requestOptions = {
    //       method: "GET",
    //       redirect: "follow",
    //     };
    
    //     const url = `${LOGIN_API}/admin/client/${id}`;
    //     console.log(id)
    //     fetch(url + loginsData, requestOptions)
    //       .then((response) => response.json())
    //       .then((result) => {
    //         console.log("id", result);
    //         const profilePicFilename = result.client.profilePicture.split("\\").pop(); // Extract filename
    
    //         setProfilePicture(`${LOGIN_API}/uploads/${profilePicFilename}`);
    //         console.log(profilePicture)
    
    //       });
    //   };
    
    const [profilePicture, setProfilePicture] = useState("");

    const getclient = async (id) => {
      console.log("test", id);
    
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
    
      const url = `${LOGIN_API}/admin/client/${id}`;
      console.log(id);
    
      try {
        const response = await fetch(url + loginsData, requestOptions);
        const result = await response.json();
    
        console.log("id", result);
    
        // Check if result.client and result.client.profilePicture exist
        if (result.client && result.client.profilePicture) {
          const profilePicFilename = result.client.profilePicture.split("\\").pop(); // Extract filename
          setProfilePicture(`${LOGIN_API}/uploads/${profilePicFilename}`);
        } else {
          console.error("Client data or profilePicture is undefined");
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
    
    return (
        <div className="grid-container">
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isSidebarVisible ? 'show' : ''}`}>
                <IconButton
                    onClick={handleToggleSidebar}
                    className="toggle-button"
                >
                    {isCollapsed ? <FaChevronCircleRight className="toggle-icon" /> : <FaChevronCircleLeft className="toggle-icon" />}
                </IconButton>
                 <Box className='bar-icon'>
                 <FaBars onClick={handleToggleSidebar} style={{ fontSize: '1.8rem',border:"2px solid red" }} />
               </Box>

                <Box
                    component="aside"
                    style={{
                        width: isCollapsed ? '50px' : '225px',
                        padding: 5,
                        transition: 'width 0.3s',
                    }}
                >
                    <Box >
                        {!isCollapsed && (
                            <Box sx={{ backgroundColor: '#fff', width: '100%', height: '5vh' }}>
                                <img style={{ width: "100%", display: "block", height: '10vh' }} src={logo} alt="" />
                            </Box>
                        )}
                    </Box>
                    <Box className="sidebar-contents" sx={{ mt: 3 }}>
                        <List sx={{ cursor: 'pointer' }}>
                            {sidebarItems.map(item => (
                                <Box key={item._id}>
                                    <ListItem component={Link} to={item.path} className="menu-item">
                                        <ListItemIcon sx={{ fontSize: '1.5rem', color: 'black' }}>
                                            {iconMapping[item.icon] ? React.createElement(iconMapping[item.icon]) : null}
                                        </ListItemIcon>
                                        {!isCollapsed && (
                                            <ListItemText primary={item.label} sx={{ ml: -2 }} />
                                        )}
                                    </ListItem>
                                </Box>
                            ))}
                        </List>




                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    // mt: 30,
                                    // backgroundColor: '#fff',
                                    // color: '#000',
                                    // fontWeight: 'bold',
                                    // width: isCollapsed ? '10%' : '100%',
                                    // ml: isCollapsed ? -1 : 0,
                                    // display: 'flex',
                                    // alignItems: 'center',
                                    // justifyContent: 'space-between',
                                    // textTransform: 'none',
                                    mt: 30,
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    width: isCollapsed ? '10%' : '100%',
                                    ml: isCollapsed ? -1 : 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    textTransform: 'none',
                                    height: '60px', // Decrease the height here
                                    padding: '10px 16px',
                                }}
                            >
                                {/* {!isCollapsed && (
                                    
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1 }}>
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: 'bold', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        >
                                            {username}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'gray',
                                                fontSize: '12px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {userData}
                                        </Typography>
                                    </Box>
                                    
                                )} */}

                                {!isCollapsed && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center', // Align image and text horizontally
                                             gap:2
                                        }}
                                    >
                                        <img
                                            src={profilePicture || user}
                                            alt="user"
                                            className="user-icon"
                                            style={{
                                                height: '50px',
                                                width: '50px',
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                flexGrow: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: '#000',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {username}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'gray',
                                                    fontSize: '12px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {userData}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}

                                <MdLogout
                                    onClick={logoutuser}
                                    style={{ cursor: 'pointer' }}
                                    color="#000"
                                    fontSize="20px"
                                />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </aside>
            <main className="main">
                <Box
                    component="main"
                    sx={{
                        padding: 1,
                        height: '100vh',

                    }}
                >
                    <Outlet />
                </Box>
            </main>
        </div>
    );
}
export default Sidebar;