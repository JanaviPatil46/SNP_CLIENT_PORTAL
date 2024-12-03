// import React from 'react'

// const Documents = () => {
//   return (
//     <div style={{border:'3px solid blue'}}>
//       cvbvcvbvgfhfghgh
//     </div>
//   )
// }

// export default Documents


import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Drawer, Card, CardContent, Button, useTheme, List, Input, IconButton } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import DocumentData from '../DummyData/DocumentData';
import axios from "axios";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { FaRegFilePdf, FaRegImage } from "react-icons/fa6";
import { useMediaQuery } from "@mui/material";
import { FaFolder } from "react-icons/fa";

import { PiMicrosoftWordLogoFill } from "react-icons/pi";
import { BsFiletypeXlsx } from "react-icons/bs";
import { AiFillFileUnknown } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";

const Documents = () => {
    const [folderData, setFolderData] = useState([]);
    const [expandedFolders, setExpandedFolders] = useState({});
    const [selectedFolder, setSelectedFolder] = useState(null);
console.log(selectedFolder)
    useEffect(() => {
        fetchAllFolders();
    }, []);
    const fetchAllFolders = async () => {
        try {
            const response = await fetch(
                'http://127.0.0.1:8002/clientdocs/folders/674aef818b91e860647a4343'
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result)
            // Filter out the "Private" folder
            const filteredContents = result.contents.filter(
                (folder) => folder.name !== "Private"
            );

            setFolderData(filteredContents);// Set the fetched data
        }
        catch (error) {
            console.error("Error fetching all folders:", error.response.data.error);
        }
    };
    const toggleFolder = (folderName) => {
        setExpandedFolders((prevState) => ({
            ...prevState,
            [folderName]: !prevState[folderName],
        }));
    };
    const renderContents = (contents) => {
        return (
            <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
                {contents.map((item) => (
                    <li key={item.name}>
                        {item.type === "folder" ? (
                            <div>
                                <IconButton
                                    onClick={() => toggleFolder(item.name)}
                                    style={{ verticalAlign: "middle" }}
                                >
                                    <FaFolder />
                                </IconButton>
                                <strong  onClick={() => setSelectedFolder(item)}  style={{
                                    cursor: "pointer",
                                    
                                }}>{item.name}</strong>
                                {expandedFolders[item.name] && item.contents.length > 0 && (
                                    <div style={{ marginLeft: "20px" }}>
                                        {renderContents(item.contents)}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {getFileIcon(item.name)}
                                <strong>{item.name}</strong>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -25,
            top: 12,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    const getFileIcon = (fileName) => {
        const extension = fileName.split(".").pop().toLowerCase();
        if (extension === "pdf") {
            return <FaRegFilePdf style={{ color: "red" }} />;
        } else if (extension === "jpg" || extension === "jpeg") {
            return <FaRegImage />;
        } else if (extension === "xlsx" || extension === "xls") {
            return <BsFiletypeXlsx style={{ color: "green" }} />;
        } else if (extension === "txt") {
            return <PiMicrosoftWordLogoFill style={{ color: "blue" }} />;
        } else {
            return <AiFillFileUnknown style={{ color: "grey" }} />;
        }
    };


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [file, setFile] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleFileChange = async (e) => {
        setFile(e.target.files[0]);
      };
    const handleUploadDocDrawer = () => {
        setIsDrawerOpen(true);
    };
    const handleFormClose = () => {
        setIsDrawerOpen(false);
    };
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px' }}>
                    <Typography variant='h6'>Documents</Typography>
                    <HelpOutlineRoundedIcon style={{ color: '#0496ff', fontSize: '25px', cursor: 'pointer', }} />
                </Box>

                <Box>
                    <Box>
                        <StyledBadge badgeContent={1} color="success">
                            <Typography ml={2}>Waiting for action</Typography>
                        </StyledBadge>
                    </Box>

                    <Box sx={{ height: '25vh', backgroundColor: '#F1F5F9', borderRadius: '15px', }}>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, }}>
                            {DocumentData.map((card, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        height: '22vh',
                                        width: '18%',
                                        border: '1px solid #EFF3F8',
                                        ml: 2,
                                        margin: 1


                                    }}
                                >
                                    <Box sx={{ cursor: 'pointer' }}>
                                        <CardContent >
                                            <Box sx={{ alignItems: 'center' }}>
                                                <Box sx={{ color: 'rgb(235, 88, 88)', ml: 2 }}>
                                                    {card.icon}
                                                </Box>
                                                <Box sx={{ marginLeft: 2 }}>
                                                    <Typography>{card.title}</Typography>
                                                    <Typography color='#697991' variant="body2">{card.description}</Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Box>
                                </Card>
                            ))}
                        </Box>

                    </Box>

                </Box>

                <Box className="client-document">
                    <Box
                        className="client-document-nav"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mt: 5,
                            width: '100%',
                            margin: '20px',
                            gap: '10px',
                            '& a': {
                                textDecoration: 'none',
                                padding: '10px 16px',
                                borderRadius: '4px',
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                },
                                '&.active': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                },
                            },
                        }}
                    >
                        <NavLink to='recent'>Recent</NavLink>
                        <NavLink to='folders'>Folders</NavLink>
                        <NavLink to='trash'>Trash</NavLink>
                        
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton component="label" htmlFor="fileInput" sx={{ color: "#e87800" }}>
            <HiDocumentArrowUp size={24} />
          </IconButton>
          <Typography variant="body1" component="label" htmlFor="fileInput" sx={{ cursor: "pointer" }}>
            Upload Document
          </Typography>
          <Input
            type="file"
            id="fileInput"
            onChange={(e) => {
              handleFileChange(e);
              handleUploadDocDrawer(e);
            }}
            sx={{ display: "none" }}
          />
        </Box>
                    </Box>

                    <Divider sx={{ my: 2, margin: '20px' }} />
                    <Outlet />
                </Box>

            </Box>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
                        width: isSmallScreen ? "100%" : 600,
                        maxWidth: "100%",
                        [theme.breakpoints.down("sm")]: {
                            width: "100%",
                        },
                        id: "tag-drawer",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", ml: 1 }}>
                    <Typography sx={{ fontWeight: "bold" }} variant="h6">
                        Upload Documents
                    </Typography>
                    <IconButton onClick={() => setIsDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>
                    {folderData.length > 0 && (
                        renderContents(folderData)
                    )}
                </Box>
                <Box mt={5} display="flex" alignItems="center" gap={2} p={3}>

                    <Button variant="contained" >
                        Upload
                    </Button>
                    <Button variant="outlined" onClick={handleFormClose}>
                        Cancel
                    </Button>
                </Box>
            </Drawer>
        </>
    )
}

export default Documents

