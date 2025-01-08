
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { LoginContext } from '../Contextprovider/Context';
import { Box, Typography, Divider, Card, CardContent, Button, DialogContent, Dialog } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import UpdateOrganizer from '../pages/UpdateOrganizer';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EventNoteIcon from '@mui/icons-material/EventNote';

const Organizers = () => {

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -25,
            top: 12,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    const navigate = useNavigate();

    const handdleneworganizer = () => {
        navigate('/neworganizer')
    };

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
            console.log('fetchOrganizerTemplates:', data);
            setOrganizerTemplatesData(data.organizerAccountWise);
            console.log(data.organizerAccountWise[0]._id)
        } catch (error) {
            console.error("Error fetching organizerTemplatesData:", error);
        }
    };
    useEffect(() => {
        fetchOrganizerTemplates(accountId);
    }, [accountId]);

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: (
            <Box sx={{ position: 'absolute', top: '50%', left: '-20px', zIndex: 10 }}>
                <ArrowBackIos sx={{ color: 'gray', fontSize: 30 }} />
            </Box>
        ),
        nextArrow: (
            <Box sx={{ position: 'absolute', top: '50%', right: '-20px', zIndex: 10 }}>
                <ArrowForwardIos sx={{ color: 'gray', fontSize: 30 }} />
            </Box>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,

                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,

                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,

                },
            },
        ],
    };

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

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px' }}>
                <Typography variant='h6'>Organizers</Typography>
                <HelpOutlineRoundedIcon style={{ color: '#0496ff', fontSize: '25px', cursor: 'pointer', }} />
            </Box>

            <Box>

                <Box>
                    <Box>
                        <StyledBadge badgeContent={organizerTemplatesData.filter((organizerAccountWise) => !organizerAccountWise.issubmited).length} color="success">
                            <Typography ml={2}>Waiting for action</Typography>
                        </StyledBadge>
                    </Box>

                    {/* <Box sx={{ padding: '40px', gap: '80px' }}>
                        {organizerTemplatesData.length > 0 ? (
                            <Slider {...settings}>
                                {organizerTemplatesData.map((organizerAccountWise) => (
                                    <Card
                                        key={organizerAccountWise._id}
                                        sx={{
                                            height: '20vh',
                                            border: '2px solid #EFF3F8',
                                            cursor: 'pointer',
                                            margin: '10px',
                                            width: '18%'
                                        }}
                                       
                                        onClick={() => handleEditOragnizer(organizerAccountWise._id)}
                                    >
                                        <CardContent>
                                            <Box display="flex" flexDirection="column">
                                                <Box sx={{ color: 'rgb(255, 142, 0)',ml:2 }}>
                                                    <EventNoteIcon/>
                                                </Box>
                                                <Box sx={{ marginLeft: 2,}}>
                                                    <Typography variant="h6">Complete Organizer</Typography>
                                                    <Typography sx={{color:'#697991'}}  >
                                                        {organizerAccountWise.organizertemplateid?.organizerName || 'Organizer Name'}
                                                    </Typography>

                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Slider>
                        ) : (
                            <Typography>No organizers available.</Typography>
                        )}
                    </Box> */}
                    <Box sx={{ padding: '40px', gap: '80px' }}>
                        {organizerTemplatesData.length > 0 ? (
                            <Slider {...settings}>
                                {organizerTemplatesData
                                    .filter((organizerAccountWise) => !organizerAccountWise.issubmited) // Filter for issubmited: false
                                    .map((organizerAccountWise) => (
                                        <Card
                                            key={organizerAccountWise._id}
                                            sx={{
                                                height: '20vh',
                                                border: '2px solid #EFF3F8',
                                                cursor: 'pointer',
                                                margin: '10px',
                                                width: '18%',
                                            }}
                                            onClick={() => handleEditOragnizer(organizerAccountWise._id)}
                                        >
                                            <CardContent>
                                                <Box display="flex" flexDirection="column">
                                                    <Box sx={{ color: 'rgb(255, 142, 0)', ml: 2 }}>
                                                        <EventNoteIcon />
                                                    </Box>
                                                    <Box sx={{ marginLeft: 2 }}>
                                                        <Typography variant="h6">Complete Organizer</Typography>
                                                        <Typography sx={{ color: '#697991' }}>
                                                            {organizerAccountWise.organizertemplateid?.organizerName || 'Organizer Name'}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </Slider>
                        ) : (
                            <Typography>No organizers available.</Typography>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box className="client-document">
                <Box
                    className="client-document-nav"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
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
                    <Box>
                        <NavLink to='active'>Active</NavLink>
                        <NavLink to='archived'>Archived</NavLink>
                    </Box>

                    <Box onClick={handdleneworganizer} m={2}>
                        <Button variant="contained">New Organizer</Button>
                    </Box>
                </Box>

                <Divider sx={{ my: 2, margin: '20px' }} />
                <Outlet />
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
        </Box>
    );
};

export default Organizers;
