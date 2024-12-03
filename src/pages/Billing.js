// import React from 'react'
// import { Box, Typography, Divider,Paper,Card,CardContent} from '@mui/material'
// import { NavLink, Outlet } from 'react-router-dom'
// import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
// import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
// import billingCardData from '../DummyData/BillingData';

// import { useNavigate } from 'react-router-dom';
// // import './billing.css';


// const ClientBilling = () => {
//     const StyledBadge = styled(Badge)(({ theme }) => ({
//         '& .MuiBadge-badge': {
//           right: -25,
//           top: 12,
//           border: `2px solid ${theme.palette.background.paper}`,
//           padding: '0 4px',
//         },
//       }));

//       const navigate = useNavigate();

//       const handdlebill=()=>{
//         navigate('/bill')
//       }
//     return (
//         <>
//             <Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px' }}>
//                     <Typography variant='h6'> Billing</Typography>
//                     <HelpOutlineRoundedIcon style={{ color: '#0496ff', fontSize: '25px', cursor: 'pointer', }} />
//                 </Box>

//               <Box>
//                 <Box> 
//               <StyledBadge badgeContent={1} color="success">
//                 <Typography ml={2}>Waiting for action</Typography>
//                 </StyledBadge>
//                 </Box>

//                  <Box sx={{height:'25vh',backgroundColor:'#F1F5F9',borderRadius:'15px',}}>

//                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 ,}} >
//                             {billingCardData.map((card, index) => (
//                                 <Card
//                                     key={index}
//                                     sx={{
//                                         height: '22vh',
//                                         width: '18%',
//                                         border: '1px solid #EFF3F8',

//                                         margin:1


//                                     }}
//                                 >
//                                     <Box onClick ={handdlebill} sx={{ cursor: 'pointer' }}>
//                                         <CardContent >
//                                             <Box sx={{ alignItems: 'center' }}>
//                                                 <Box sx={{ color: 'rgb(50, 205, 50)', ml: 2 }}>
//                                                     {card.icon}
//                                                 </Box>
//                                                 <Box sx={{ marginLeft: 2 }}>
//                                                     <Typography>{card.title}</Typography>
//                                                     <Typography color='#697991' variant="body2">{card.description}</Typography>
//                                                 </Box>
//                                             </Box>
//                                         </CardContent>
//                                     </Box>
//                                 </Card>
//                             ))}
//                         </Box>

//                  </Box>

//               </Box>

//                 <Box className="client-billing">
//                     <Box
//                         className="client-billing-nav"
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'row',
//                             mt: 5,
//                             width: '100%',
//                             margin: '20px',
//                             gap: '10px',
//                             '& a': {
//                                 textDecoration: 'none',
//                                 padding: '10px 16px',
//                                 borderRadius: '4px',
//                                 color: 'primary.main',
//                                 '&:hover': {
//                                     backgroundColor: 'primary.light',
//                                     color: 'white',
//                                 },
//                                 '&.active': {
//                                     backgroundColor: 'primary.main',
//                                     color: 'white',
//                                 },
//                             },
//                         }}
//                     >
//                         <NavLink to='invoices'>Invoices</NavLink>
//                         <NavLink to='recurringinvoice'>Recurring Invoices</NavLink>
//                         <NavLink to='payments'>Payments</NavLink>
//                     </Box>
//                     <Divider sx={{ my: 2, margin: '20px' }} />
//                     <Outlet />
//                 </Box>

//             </Box>
//         </>
//     )
// }

// export default ClientBilling


import React, { useContext } from 'react';
import { LoginContext } from '../Contextprovider/Context';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Card, CardContent } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';


const ClientBilling = () => {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -25,
            top: 12,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));



    //

    const [accountId, setAccountId] = useState('')
    const { logindata } = useContext(LoginContext);

    const LOGIN_API = process.env.REACT_APP_USER_LOGIN;

    const fetchAccountId = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${LOGIN_API}/admin/accountdetails/accountdetailslist/listbyuserid/${logindata.user.id}`, requestOptions)
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

    const INVOICE_API = process.env.REACT_APP_INVOICES_URL
    const [BillingInvoice, setBillingInvoice] = useState([]);

    const fetchidwiseData = async (accountId) => {
        try {
            const url = `${INVOICE_API}/workflow/invoices/invoice/invoicelist/getInvoiceListByAccountId/${accountId}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch task templates");
            }
            const data = await response.json();
            console.log(data)
            setBillingInvoice(data.invoices);


            console.log(data.invoices[0]._id)
        } catch (error) {
            console.error("Error fetching task templates:", error);
        }
    };

    const navigate = useNavigate();

    const [selectedInvoice, SetSelectedInvoice] = useState();

    const handleEditInvoice = (invoiceId) => {
        // Navigate to the edit page with the invoice ID
        navigate(`/bill/${invoiceId}`);
    };

    console.log(selectedInvoice)

    useEffect(() => {
        fetchidwiseData(accountId);
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

    
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px' }}>
                    <Typography variant='h6'> Billing</Typography>
                    <HelpOutlineRoundedIcon style={{ color: '#0496ff', fontSize: '25px', cursor: 'pointer', }} />
                </Box>

                <Box>
                    <Box>
                        <StyledBadge badgeContent={BillingInvoice.length} color="success">
                            <Typography ml={2}>Waiting for action</Typography>
                        </StyledBadge>
                    </Box>
                    
                   
                    <Box sx={{ padding: '40px',gap:'80px'}}>
                        {BillingInvoice.length > 0 ? (
                            <Slider {...settings}>
                                {BillingInvoice.map((invoice) => (
                                    <Card
                                        key={invoice._id}
                                        sx={{
                                            height: '20vh',
                                            border: '1px solid #EFF3F8',
                                            cursor: 'pointer',
                                             margin: '10px'
                                        }}
                                        onClick={() => handleEditInvoice(invoice._id)}
                                    >
                                        <CardContent>
                                            <Box display="flex"  flexDirection={'column'}>
                                                <Box sx={{ color: 'rgb(50, 205, 50)', }}>
                                                    <CreditCardIcon sx={{ml:'15px',fontSize:'30px'}}/>
                                                </Box>
                                                <Box sx={{ marginLeft: 2 }}>
                                                    <Typography variant="h6">Pay invoice $1.00</Typography>
                                                    <Typography color="#697991" fontSize={18}>
                                                        #{invoice.invoicenumber}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Slider>
                        ) : (
                            <Typography>No invoices available.</Typography>
                        )}
                    </Box>




                </Box>

                <Box className="client-billing">
                    <Box
                        className="client-billing-nav"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mt: 5,
                            width: '100%',
                            margin: '20px',
                           
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
                        <NavLink to='invoices'>Invoices</NavLink>
                        <NavLink to='recurringinvoice'>Recurring Invoices</NavLink>
                        <NavLink to='payments'>Payments</NavLink>
                    </Box>
                    <Divider sx={{ my: 2, margin: '20px' }} />
                    <Outlet />
                </Box>

            </Box>
        </>
    )
}

export default ClientBilling



