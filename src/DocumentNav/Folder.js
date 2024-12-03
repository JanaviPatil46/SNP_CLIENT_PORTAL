
import {  Box,  Typography,  } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Documents = () => {
 


  
  

// Component to render folders and files recursively
const FolderContents = ({ contents }) => {
  return (
    <ul>
      {contents.map((item, index) => (
        <li key={index}>
          {item.type === 'folder' ? (
            <details>
              <summary>📁 {item.name}</summary>
              <FolderContents contents={item.contents} />
            </details>
          ) : (
            <span>📄 {item.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
};


  const [folderdata, setData] = useState(null); // Store the API response
  const [error, setError] = useState(null); // Store error if any
  const [loading, setLoading] = useState(true); // Track loading state
  const CLIENT_DOCS = process.env.REACT_APP_CLIENT_DOCS_MANAGE
  const fetchFolders = async () => {
    try {
      const response = await fetch(
      `${CLIENT_DOCS}/clientdocs/folders/674aef818b91e860647a4343`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result); // Set the fetched data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   fetchFolders();
  }, []);

  if (loading) {
    return <p>Loading folder structure...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <Box>
      


      <Typography>Show folders and file</Typography>
      <Box> {folderdata && folderdata.contents ? (
        <FolderContents contents={folderdata.contents} />
      ) : (
        <p>No contents found.</p>
      )}</Box>
    </Box>
  );
};

export default Documents;