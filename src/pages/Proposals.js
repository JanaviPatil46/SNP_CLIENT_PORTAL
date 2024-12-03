
import React, { useState, useEffect,useContext } from 'react'
import { Paper, Table, TableHead, TableBody, TableRow, TableCell,Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { toast } from "react-toastify";
import { LoginContext } from '../Contextprovider/Context';

const ProposalsEls = () => {
    const [accountId, setAccountId] = useState('')
    const { logindata } = useContext(LoginContext);

   
    const [ProposalsTemplates, setProposalsTemplates] = useState([]);
    const [proposaltempId,setProposalTempId]=useState()


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

   
    const navigate = useNavigate();
    const PROPOSALS_API = process.env.REACT_APP_PROPOSAL_URL

    // const fetchPrprosalsAllData = async () => {
    //     try {
    //         const url = `${PROPOSALS_API}/proposalandels/proposalaccountwise/allproposallist/list`;

    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch Proposals templates");
    //         }
    //         const result = await response.json();
    //         console.log(result.proposalesandelsAccountwise)
    //         setProposalsTemplates(result.proposalesandelsAccountwise);
    //         setProposalTempId(result._id)
    //         console.log(result._id)

    //     } catch (error) {
    //         console.error("Error fetching Proposals  templates:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchPrprosalsAllData();
    // }, []);

    const handleEdit = (_id, data) => {
        console.log(_id)
        console.log(data)
        
         navigate('/updateProposals/'+ _id)
         console.log(_id);
    };
    const fetchPrprosalsAllData = async (accountId) => {
        try {
            const url = `http://127.0.0.1:7400/proposalandels/proposalaccountwise/proposalbyaccount/${accountId}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch Proposals templates");
            }
            const result = await response.json();
            console.log(result.proposalesandelsAccountwise)
            setProposalsTemplates(result.proposalesandelsAccountwise);
            setProposalTempId(result._id)
            console.log(result._id)

        } catch (error) {
            console.error("Error fetching Proposals  templates:", error);
        }
    };

    useEffect(() => {
        fetchPrprosalsAllData(accountId);
    }, [accountId]);


    return (
        <Box sx={{ mt: 2 }}>
            <Box>
                <Typography variant="h4" fontWeight="bold">
                    Proposals & Els
                </Typography>
            </Box>
            <Paper>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>
                                <strong>Client Name</strong>
                            </TableCell> */}
                            <TableCell>
                                <strong>Proposal Name</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Status</strong>
                            </TableCell>
                            {/* <TableCell>
                                <strong>Payment</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Auth</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Invoicing</strong>
                            </TableCell> */}
                            <TableCell>
                                <strong>Date</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Signed</strong>
                            </TableCell>
                            <TableCell>
                                <strong></strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ProposalsTemplates.map((row) => (
                            <TableRow key={row._id}>
                                {/* <TableCell>
                                    <Typography sx={{ color: "#2c59fa", cursor: "pointer", fontWeight: "bold" }} 
                                    // onClick={() => handleAccountDash(row._id, row.accountid._id)}
                                    >
                                        {row.accountid.accountName}
                                    </Typography>
                                </TableCell> */}
                                <TableCell>
                                    <Typography sx={{ color: "#2c59fa", cursor: "pointer", fontWeight: "bold" }} 
                                    onClick={() => handleEdit(row._id, row.accountid._id)}
                                    >
                                        {row.proposalname}
                                    </Typography>
                                </TableCell>
                                <TableCell> </TableCell>
                                {/* <TableCell>b</TableCell> */}
                                {/* <TableCell>c</TableCell> */}
                                {/* <TableCell>d</TableCell> */}
                                <TableCell>{new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</TableCell>

                                <TableCell></TableCell>
                                <TableCell sx={{ textAlign: "end" }}>
                                    {/* <IconButton onClick={() => toggleMenu(row._id)} style={{ color: "red" }}>
                    <CiMenuKebab style={{ fontSize: "25px" }} />
                    {openMenuId === row._id && (
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          backgroundColor: "#fff",
                          boxShadow: 1,
                          borderRadius: 1,
                          p: 1,
                          // left:0,
                          right: "30px",
                          m: 2,
                          top: "10px",
                          width: "80px",
                          textAlign: "start",
                        }}
                      >
                        <Typography sx={{ fontSize: "12px", color: "red", fontWeight: "bold" }} onClick={() => handleDelete(row._id)}>
                          Delete
                        </Typography>
                        <Typography sx={{ fontSize: "12px", fontWeight: "bold" }} onClick={() => handleEdit(row._id)}>
                         Edit   
                        </Typography>
                      </Box>
                    )}
                  </IconButton> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    )
}

export default ProposalsEls