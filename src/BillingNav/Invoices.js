
import React,{useContext} from 'react';
import { Box, Typography, Divider, Grid, styled } from '@mui/material';
import { LoginContext } from '../Contextprovider/Context';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

import { useNavigate } from 'react-router-dom';
;

const Invoices = () => {
  const[accountId, setAccountId] = useState('')
  const { logindata } = useContext(LoginContext);
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
        console.log(result.accounts[0]._id)
      })
      .catch((error) => console.error(error));
  };

  console.log(accountId)

  useEffect(() => {
    fetchAccountId()
  }, []);




  const [BillingInvoice, setBillingInvoice] = useState([]);
  const[InvoiceTempId,setInvoiceTempId]=useState( );

  
  
  const fetchidwiseData = async (accountId) => {
    try {
      const url = `http://127.0.0.1:7650/workflow/invoices/invoice/invoicelist/getInvoiceListByAccountId/${accountId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch task templates");
      }
      const data = await response.json();
      console.log(data)
      setBillingInvoice(data.invoices);
       console.log(data.invoices[0].summary.total)
       setInvoiceTempId(data.invoices[0]._id)  
       console.log(data.invoices[0]._id)
    } catch (error) {
      console.error("Error fetching task templates:", error);
    }
  };

  const navigate = useNavigate();
  
  const [selectedInvoice, SetSelectedInvoice] = useState({});


  const handleEdit = (_id) => {
    SetSelectedInvoice(_id);
    console.log(_id)
    navigate('/bill/' +_id); 
  };
console.log(selectedInvoice)

  useEffect(() => {
    fetchidwiseData(accountId);
  }, [accountId]);
  const columns = useMemo(() => [
    {
      accessorKey: 'invoicenumber',
      header: 'Invoice',
      Cell: ({ row }) => (
        <span
          onClick={() => handleEdit(row.original._id)}
          style={{ cursor: 'pointer', color:'#2c59fa',fontWeight:'bold' }}
        >
          {row.getValue('invoicenumber')}
        </span>
      )
    },
    {
      accessorKey: 'summary.total',
       header: 'Total',
    },

    {
      accessorKey: 'Amount Paid',
       header: 'Amount Paid',
       Cell: () => '$0.00',
    },

    {
      accessorKey: 'summary.total',
       header: 'Balance Due',
      
    },

    {
      accessorKey: 'description',
       header: 'Discription',
    },

    {
      accessorKey: 'createdAt',
       header: 'Posted',
       Cell: ({ cell }) => {
        const date = new Date(cell.getValue());
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      },
    },
    

  ], []);
  const table = useMaterialReactTable({
    columns,
    data: BillingInvoice,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom", // Render own filtering UI
    enableRowSelection: true, // Enable row selection
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "tagName"], right: ['settings'], },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark-theme" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }} className='cbilling-cards'>
        <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
          <Box sx={{ border: '2px dotted #94a3b8', width: '60%', minHeight: '148px', maxHeight: '148px' }} className='card1'>

            <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <PaymentsRoundedIcon sx={{ fontSize: '70px' }} />
                  <MonetizationOnRoundedIcon sx={{ position: 'absolute', top: 0, left: 0, fontSize: '24px', backgroundColor: '#fff', borderRadius: '50%', color: '#24c875' }} />
                </Box>
                <Typography sx={{ color: '#697991' }} variant="h7">outstanding balance</Typography>
              </Box>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#1976d3" }}>
              <Typography sx={{ fontSize: '30px' }} variant='h6'>$0.00</Typography>
            </Box>


          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
          <Box sx={{ border: '2px dotted #94a3b8', width: '60%', minHeight: '148px', maxHeight: '148px' }} className='card1'>

            <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <PaymentsRoundedIcon sx={{ fontSize: '70px' }} />
                  <StarsRoundedIcon sx={{ position: 'absolute', top: 0, left: 0, fontSize: '24px', backgroundColor: '#fff', borderRadius: '50%', color: '#24c875' }} />
                </Box>
                <Typography sx={{ color: '#697991' }} variant="h7">Credits Available</Typography>
              </Box>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#24c875" }}>
              <Typography sx={{ fontSize: '30px' }} variant='h6'>$0.00</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
      <Box>

        <MaterialReactTable columns={columns} table={table} />
      </Box>
    </Box>
  )
}

export default Invoices

