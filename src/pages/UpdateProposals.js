
// import React, { useState, useEffect } from 'react';
// import { Box, Container, Button, Typography, Stack, Menu, MenuItem, Paper, Divider } from '@mui/material';
// import snplogo from '../Imgs/snplogo.png';
// import Grid from '@mui/material/Grid';
// import { ExpandMore, ExpandLess } from '@mui/icons-material';
// import DownloadIcon from '@mui/icons-material/Download';
// import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
// import { useParams } from 'react-router-dom';


// const UpdateProposals = () => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [expanded, setExpanded] = useState(false);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const toggleArrow = () => {
//         setExpanded(!expanded);
//     };

//     //
//     const [termsanConditions, setTermsanConditions] = useState("")
//     const [termsandconditionsname, settermsandconditionsname] = useState()

//     const { _id } = useParams();
//     console.log(_id)
//     const fetchIdwisePrprosals = async () => {
//         try {
//             const url = `http://127.0.0.1:7400/proposalandels/proposalaccountwise/${_id}`;

//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error("Failed to fetch Proposals templates");
//             }
//             const result = await response.json();
//             console.log(result.proposalesandelsAccountwise)
//             setTermsanConditions(result.proposalesandelsAccountwise.termsandconditions);
//             console.log(result.proposalesandelsAccountwise.termsandconditions)
//             settermsandconditionsname(result.proposalesandelsAccountwise.termsandconditionsname)
//             console.log(result.proposalesandelsAccountwise.termsandconditionsname)
//         } catch (error) {
//             console.error("Error fetching Proposals  templates:", error);
//         }
//     };

//     useEffect(() => {
//         fetchIdwisePrprosals();
//     }, []);



//     return (
//         <Box>
//             <Box sx={{ mt: 2 }}>
//                 <Grid container >
//                     <Grid xs={12} sm={4} >
//                         <Box sx={{ display: 'flex', alignItems: 'center', mt: 5, position: 'fixed', }}>
//                             <Box
//                                 component="img"
//                                 src={snplogo}
//                                 alt="SNP Logo"
//                                 sx={{
//                                     width: '120px',
//                                     height: 'auto',
//                                     display: 'block',

//                                 }}
//                             />
//                             <Typography variant="h6">SNP Tax & Financials</Typography>
//                         </Box>
//                     </Grid>

//                     <Grid xs={12} sm={8}>
//                         <Box
//                             sx={{
//                                 border: '1px solid #d9eafc',
//                                 padding: '20px',
//                                 borderRadius: 1,
//                                 background: '#eafcee',
//                                 position: 'fixed',
//                                 top: 0,
//                                 // zIndex: -1,
//                                 mt: 3,
//                                 mr: 2
//                             }}
//                         >
//                             <Stack direction="row" alignItems="center" justifyContent="space-between">
//                                 <Box>
//                                     <Typography variant="h6">
//                                         <b>SNP-EN (US) Letter of Engagement – Financial Statements & Tax Services</b>
//                                     </Typography>
//                                     <Typography color='#697991' variant="body1">
//                                         Successfully signed by all parties Apr-02-2024, 10:00 PM (GMT -07:00)
//                                     </Typography>
//                                 </Box>

//                                 <Box display="flex" gap={1}>
//                                     <Button
//                                         sx={{ color: '#24c875' }}
//                                         endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
//                                         onClick={(event) => {
//                                             toggleArrow();
//                                             handleClick(event);
//                                         }}
//                                     >
//                                         <b>Actions</b>
//                                     </Button>

//                                     <Menu
//                                         anchorEl={anchorEl}
//                                         open={Boolean(anchorEl)}
//                                         onClose={handleClose}
//                                     >
//                                         <MenuItem variant='h6' sx={{ gap: 2, color: '#1976d3', fontSize: '17px', fontWeight: 600, letterSpacing: 1 }}><DownloadIcon /> Download PDF</MenuItem>
//                                         <MenuItem sx={{ gap: 2, color: '#1976d3', fontSize: '17px', fontWeight: 600, letterSpacing: 1 }}><LocalPrintshopIcon />Print</MenuItem>
//                                     </Menu>

//                                     <Button variant="contained" sx={{ background: '#24c875', minWidth: '150px', whiteSpace: 'nowrap' }}>
//                                         <b>To client portal</b>
//                                     </Button>
//                                 </Box>
//                             </Stack>
//                         </Box>
//                     </Grid>
//                 </Grid>
//                 <Grid container >
//                     <Grid xs={12} sm={4}>
//                     </Grid>

//                     <Grid xs={12} sm={8}>
//                         <Paper sx={{ mt: 20 }}>
//                             <Box boxShadow={'0px 0px 6px 4px #e2e8f0'} padding={1} >
//                                 <Box m={3}>
//                                     <Typography variant="h6">
//                                         Engagement letter
//                                     </Typography>
//                                     <Divider sx={{ my: 1 }} />
//                                 </Box>
//                                 <Box m={3}>
//                                     <Box>

//                                         <Box>

//                                             <Typography variant="h6"><b>{termsandconditionsname}</b></Typography>
//                                         </Box>

//                                         <Box>
//                                             <Typography variant="h6" dangerouslySetInnerHTML={{ __html: termsanConditions }} />
//                                         </Box>



//                                     </Box>

//                                 </Box>
//                             </Box>
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Box>
//     );
// };

// export default UpdateProposals;






import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Button, Typography, Stack, Menu, MenuItem, Paper, Divider } from '@mui/material';
import snplogo from '../Imgs/snplogo.png';
import Grid from '@mui/material/Grid';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { Link } from 'react-router-dom';

const UpdateProposals = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const proposalRef = useRef();  // Add a ref to the proposal content

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleArrow = () => {
        setExpanded(!expanded);
    };

    const [termsanConditions, setTermsanConditions] = useState("");
    const [termsandconditionsname, settermsandconditionsname] = useState();
    const { _id } = useParams();
    console.log(_id);
    const PROPOSALS_API = process.env.REACT_APP_PROPOSAL_URL
    const fetchIdwisePrprosals = async () => {
        try {
            const url = `${PROPOSALS_API}/proposalandels/proposalaccountwise/${_id}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch Proposals templates");
            }
            const result = await response.json();
            console.log(result.proposalesandelsAccountwise);
            setTermsanConditions(result.proposalesandelsAccountwise.termsandconditions);
            settermsandconditionsname(result.proposalesandelsAccountwise.termsandconditionsname);
        } catch (error) {
            console.error("Error fetching Proposals templates:", error);
        }
    };

    useEffect(() => {
        fetchIdwisePrprosals();
    }, []);

    const handleDownloadPDF = () => {
        const element = proposalRef.current;  // Select the proposal section for PDF conversion
        const filename = termsandconditionsname ? `${termsandconditionsname}.pdf` : 'proposal.pdf'; // Use proposal name or fallback to 'proposal.pdf'

        const currentDate = new Date().toLocaleString(); // Get current date and time for "Created at"

        // Create custom HTML structure for the PDF with logo and timestamp
        const content = `
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${snplogo}" alt="SNP Logo" style="width: 120px; height: auto;" />
                <h3>SNP Tax & Financials</h3>
                <p>Created at: ${currentDate}</p>
            </div>
            <div style="margin-top: 20px;">
                ${element.innerHTML}  <!-- Include the proposal content -->
            </div>
        `;

        html2pdf()
            .set({
                filename: filename,  // Set filename dynamically
                html2canvas: { scale: 2 },
                jsPDF: { orientation: 'portrait' }
            })
            .from(content) // Use the custom content with logo and timestamp
            .save();
    };

    const handlePrint = () => {
        const element = proposalRef.current;  // Select the proposal section for printing
        const currentDate = new Date().toLocaleString(); // Get current date and time for "Created at"
        const printContent = `
            <html>
                <head>
                    <title>Proposal Print</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .content { margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <img src="${snplogo}" alt="SNP Logo" style="width: 120px; height: auto;" />
                        <h3>SNP Tax & Financials</h3>
                        <p>Created at: ${currentDate}</p>
                    </div>
                    <div class="content">
                        ${element.innerHTML}  <!-- Include the proposal content -->
                    </div>
                </body>
            </html>
        `;

        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <Box>
            <Box sx={{ mt: 2 }}>
                <Grid container>
                    <Grid xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 5, position: 'fixed' }}>
                            <Box
                                component="img"
                                src={snplogo}
                                alt="SNP Logo"
                                sx={{
                                    width: '120px',
                                    height: 'auto',
                                    display: 'block',
                                }}
                            />
                            <Typography variant="h6">SNP Tax & Financials</Typography>
                        </Box>
                    </Grid>

                    <Grid xs={12} sm={8}>
                        <Box
                            sx={{
                                border: '1px solid #d9eafc',
                                padding: '20px',
                                borderRadius: 1,
                                background: '#eafcee',
                                position: 'fixed',
                                top: 0,
                                mt: 3,
                                mr: 2
                            }}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography variant="h6">
                                        <b>SNP-EN (US) Letter of Engagement – Financial Statements & Tax Services</b>
                                    </Typography>
                                    <Typography color='#697991' variant="body1">
                                        Successfully signed by all parties Apr-02-2024, 10:00 PM (GMT -07:00)
                                    </Typography>
                                </Box>

                                <Box display="flex" gap={1}>
                                    <Button
                                        sx={{ color: '#24c875' }}
                                        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                                        onClick={(event) => {
                                            toggleArrow();
                                            handleClick(event);
                                        }}
                                    >
                                        <b>Actions</b>
                                    </Button>

                                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                        <MenuItem onClick={handleDownloadPDF} sx={{ gap: 2, color: '#1976d3', fontSize: '17px', fontWeight: 600, letterSpacing: 1 }}>
                                            <DownloadIcon /> Download PDF
                                        </MenuItem>
                                        <MenuItem onClick={handlePrint} sx={{ gap: 2, color: '#1976d3', fontSize: '17px', fontWeight: 600, letterSpacing: 1 }}>
                                            <LocalPrintshopIcon /> Print
                                        </MenuItem>
                                    </Menu>

                                    {/* <Button variant="contained" sx={{ background: '#24c875', minWidth: '150px', whiteSpace: 'nowrap' }}>
                                        <b>To client portal</b>
                                    </Button> */}

                                    <Button
                                        component={Link}
                                        to="/home"
                                        variant="contained"
                                        sx={{ background: '#24c875', minWidth: '150px', whiteSpace: 'nowrap' }}
                                    >
                                        <b>To client portal</b>
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid xs={12} sm={4}>

                    </Grid>

                    <Grid xs={12} sm={8}>
                        <Paper sx={{ mt: 20 }} ref={proposalRef}>  {/* Set ref to the content for PDF */}
                            <Box boxShadow={'0px 0px 6px 4px #e2e8f0'} padding={1}>
                                <Box m={3}>
                                    <Typography variant="h6">Engagement letter</Typography>
                                    <Divider sx={{ my: 1 }} />
                                </Box>
                                <Box m={3}>
                                    <Box>
                                        <Typography variant="h6"><b>{termsandconditionsname}</b></Typography>
                                        <Typography variant="h6" dangerouslySetInnerHTML={{ __html: termsanConditions }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>

                        <Divider sx={{ mt: 5 }} />


                        <Box p={2}>
                            <Typography variant='h5'><b>Sign & accept</b></Typography>
                        </Box>
                        <Box p={2}>
                            <Typography>Your Signature</Typography>
                        </Box>

                        <Divider sx={{ mt: 5 }} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UpdateProposals;
