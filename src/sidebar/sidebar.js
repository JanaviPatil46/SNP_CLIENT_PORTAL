
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleRight, FaChevronCircleLeft, } from "react-icons/fa";
import logo from '../Imgs/snplogo.png';
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import iconMapping from './iconMapping';
import { MdLogout } from "react-icons/md";
import { LoginContext } from "../Contextprovider/Context";
import "./sidebar.css";
import Cookies from "js-cookie";

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

    // const handleLogout = () => {
    //     localStorage.removeItem("authToken");
    //     navigate("/login");
    // };

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
        // Cookies.set("userToken", res.result.token); // Set cookie with duration provided
        // console.log(token);
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
                navigate("/home");
               
            } else {
                // toast.error("You are not a valid user.");
                // fetchUserData(data.user.id);
                // console.log( data.user.id)
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


    const fetchUserData = async (id) => {
        const maxLength = 15;
        const myHeaders = new Headers();

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        const url = `${LOGIN_API}/common/user/${id}`;
        fetch(url + loginsData, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log("id", result);
                if (result.email) {
                    setUserData(truncateString(result.email, maxLength));
                }
                // console.log(userData)
                setUsername(result.username);
            });
    };
    const truncateString = (str, maxLength) => {
        if (str && str.length > maxLength) {
            return str.substring(0, maxLength) + "..."; // Truncate string if it exceeds maxLength
        } else {
            return str;
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
                                // onClick={handleLogout}
                                variant="contained"
                                color="primary"
                                sx={{ mt: 15, backgroundColor: '#fff', color: '#000', fontWeight: "bold", width: isCollapsed ? '10%' : '100%', ml: isCollapsed ? -1 : 0 }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    {!isCollapsed && <span>Logout</span>}
                                    <MdLogout onClick={() => { logoutuser(); }}
                                        color="#000" fontWeight={'bold'} fontSize={'20px'} />
                                </Box>
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