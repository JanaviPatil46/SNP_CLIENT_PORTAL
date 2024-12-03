
// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // PDF icon
// import Chip from '@mui/material/Chip';
// import Box from '@mui/system/Box';
// const columns = [
//   {
//     field: 'name',
//     headerName: 'Name',
//     flex: 2, 
//     renderCell: (params) => (
    
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <PictureAsPdfIcon sx={{ marginRight: 1, color: '#d32f2f' }} />
//         <span style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1976d3' }}>
//       {params.value}
//     </span>
        
//       </div>
//     ),
//   },
//   { field: 'uploaded', headerName: 'Uploaded', flex: 1 }, 
//   { field: 'lastAction', headerName: 'Last Action', flex: 1 }, 
//   {
//     field: 'status',
//     headerName: 'Status',
//     flex: 1,
//     renderCell: (params) => (
//       <Chip 
//         label={params.value} 
//         color={params.value === 'partially signed' ? 'warning' : 'default'} 
//       />
//     ),
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     name: 'utility-june-2024.pdf',
//     uploaded: 'jun-21-2024',
//     lastAction: 'sep-22-2024',
//     status: 'partially signed',
//   },
// ];

// export default function DataTable() {
//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//       <Box ml={2}> 
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5, 10]}
//         sx={{ border: 0 }}
//       />
//       </Box>
//     </Paper>
//   );
// }



import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const Recent = () => {
  const [files, setFiles] = useState([]);
  const fecthAllFiles= ()=>{
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://127.0.0.1:8002/clientlist/documents/account/648eff1234567890abcdef12", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setFiles(result);
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    fecthAllFiles()
}, []);
  return (
    <>
     <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Uploaded At</TableCell>
            <TableCell>Uploaded By</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>New File</TableCell>
            <TableCell>Days Since Upload</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Download</TableCell>
            <TableCell>Upload</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file._id}>
              <TableCell>{file.name}</TableCell>
              <TableCell>
                {new Date(file.uploadedAt).toLocaleString()}
              </TableCell>
              <TableCell>{file.uploadedBy}</TableCell>
              <TableCell>{file.path}</TableCell>
              <TableCell>{file.isNewFile ? "Yes" : "No"}</TableCell>
              <TableCell>{file.daysSinceUpload}</TableCell>
              <TableCell>
                {file.permissions.update ? (
                  <Button variant="contained" color="primary" size="small">
                    Update
                  </Button>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {file.permissions.delete ? (
                  <Button variant="contained" color="error" size="small">
                    Delete
                  </Button>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {file.permissions.download ? (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => window.open(file.path, "_blank")}
                  >
                    Download
                  </Button>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {file.permissions.upload ? (
                  <Button variant="contained" color="secondary" size="small">
                    Upload
                  </Button>
                ) : (
                  "N/A"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default Recent