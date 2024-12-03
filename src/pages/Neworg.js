import React, { useState, useEffect } from 'react'
import { Box, TextField, Autocomplete } from '@mui/material';
const NewOrganizer = () => {

    // pipeline data
    const [pipelineData, setPipelineData] = useState([]);
    const [selectedPipeline, setselectedPipeline] = useState();

    const handlePipelineChange = (selectedOptions) => {
        setselectedPipeline(selectedOptions);
        console.log(selectedOptions)
    }
    useEffect(() => {
        fetchPipelineData();
    }, []);
    const ORGANIZER_API = process.en.REACT_APP_ORGANIZER_TEMP_URL;
    const fetchPipelineData = async () => {
        try {
            const url = `${ORGANIZER_API}workflow/organizers/organizertemplate/`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            setPipelineData(data.OrganizerTemplates);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const optionpipeline = pipelineData.map((pipelineData) => ({
        value: pipelineData._id,
        label: pipelineData.organizerName

    }));
    
    return (
        <div>
            <Box mt={2}>
                <label className='job-input-label'>Pipeline</label>

                <Autocomplete
                    options={optionpipeline}
                    getOptionLabel={(option) => option.label}
                    value={selectedPipeline}
                    onChange={(event, newValue) => handlePipelineChange(newValue)}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            {...props}
                            sx={{ cursor: 'pointer', margin: '5px 10px' }} // Add cursor pointer style
                        >
                            {option.label}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{ backgroundColor: '#fff' }}
                            placeholder="Pipeline"
                            variant="outlined"
                            size="small"
                        />
                    )}
                    sx={{ width: '100%', marginTop: '8px' }}
                    clearOnEscape // Enable clearable functionality
                />
            </Box>

          
        </div>
    )
}

export default NewOrganizer
