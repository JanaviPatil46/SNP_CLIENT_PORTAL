import React,{useContext} from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Container, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../Contextprovider/Context';
const NewOrganizer = () => {
  const [organizerTemplate, setOrganizerTemplate] = useState([]);
  const [organizerTemp, setOrganizerTemp] = useState(null)
 
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [showOrganizerForm, setShowOrganizerForm] = useState(false);
  const [organizeraccountwise, setorganizeraccountwise] = useState();
  const [organizeraccountwiseid, setorganizeraccountwiseid] = useState();

  const navigate = useNavigate();
  const LOGIN_API = process.env.REACT_APP_USER_LOGIN;
  const ORGANIZER_API = process.en.REACT_APP_ORGANIZER_TEMP_URL;
  const[accountId, setAccountId] = useState('')
  const { logindata } = useContext(LoginContext);
  const fetchAccountId = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
   
    fetch(`${LOGIN_API }/admin/accountdetails/accountdetailslist/listbyuserid/${logindata.user.id}`, requestOptions)
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



  const fetchOrganizerTemplateData = async () => {
    try {
      const url = `${ORGANIZER_API}/workflow/organizers/organizertemplate/`;
      const response = await fetch(url);
      const result = await response.json();
      setOrganizerTemplate(result.OrganizerTemplates);
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [selectedOrganizerTemplate, setSelectedOrganizerTemplate] = useState('');

  const handleOrganizerTemplateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOrganizerTemplate(selectedValue);
    fetchOrganizerTemplateDataByTempId(selectedValue);
  };
  const OrganizerTemplateOptions = organizerTemplate.map((organizertemp) => ({
    value: organizertemp._id,
    label: organizertemp.organizerName,
  }));
  const handleOrganizerFormClose = () => {
    setTimeout(() => {}, 1000);
  };

  const [sections, setSections] = useState([]);
  const fetchOrganizerTemplateDataByTempId = async (selectedOrganizerTempid) => {
    try {
      const url = `${ORGANIZER_API}/workflow/organizers/organizertemplate/${selectedOrganizerTempid}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      console.log(result.organizerTemplate.sections);
      setSelectedOrganizerTempData(result.organizerTemplate);
      setSections(result.organizerTemplate.sections);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  console.log(sections);
  const [selectedOrganizerTempData, setSelectedOrganizerTempData] = useState();
  const createOrganizerOfAccount = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      accountid: accountId,
      organizertemplateid: selectedOrganizerTemplate,
      // reminders: reminder,
      jobid: ["661e495d11a097f731ccd6e8"],
      sections:
        selectedOrganizerTempData?.sections?.map((section) => ({
          name: section?.text || "",
          id: section?.id?.toString() || "",
          text: section?.text || "",
          formElements:
            section?.formElements?.map((question) => ({
              type: question?.type || "",
              id: question?.id || "",
              sectionid: question?.sectionid || "",
              options:
                question?.options?.map((option) => ({
                  id: option?.id || "",
                  text: option?.text || "",
                  selected: option?.selected || false,
                })) || [],
              text: question?.text || "",
              textvalue: question?.textvalue || "",
              questionsectionsettings: {
                required: question?.questionsectionsettings?.required || false,
                prefilled: question?.questionsectionsettings?.prefilled || false,
                conditional: question?.questionsectionsettings?.conditional || false,
                conditions: question?.questionsectionsettings?.conditions || [],
                descriptionEnabled: question?.questionsectionsettings?.descriptionEnabled || false,
                description: question?.questionsectionsettings?.description || "",
                mode: question?.questionsectionsettings?.mode || "Any"  
              }
            })) || [],
        })) || [],
      active: true,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log(raw);
    // const url = "http://127.0.0.1:7600/organizer-account-wise";
  const url = `${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/org`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.newOrganizerAccountWise.accountid);
        const { _id } = result.newOrganizerAccountWise;

        console.log(_id); // "66f7e5d97114d8ad832c2d3e"
        setorganizeraccountwise(result.newOrganizerAccountWise);
        setShowOrganizerForm(true);
        setSelectedOrganizerTemplate(selectedOrganizerTemplate);
        console.log(selectedOrganizerTemplate);
        navigate(`/organizerform/${_id}`);

      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchOrganizerTemplateData();
  }, []);
  // const fetchOrganizerTemplateData = async (_id) => {
  //   try {
  //     const url = `http://127.0.0.1:7600/workflow/organizers/organizertemplate/${_id}`;
  //     const response = await fetch(url);
  //     const result = await response.json();
  //     console.log(result)
  //     console.log(result.organizerTemplate.sections)
  //     // setOrganizerTemplate(result.OrganizerTemplates);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  return (
    <Container>
      <Box p={2}>
        <Typography>
          <strong>Organizer</strong>
        </Typography>
      </Box>
      <Divider />

      <Box mt={3} borderBottom={"2px solid #e2e8f0"} p={2}>
        <Typography fontSize={20}>
          <strong>Create organizer</strong>
        </Typography>
      </Box>

      <Box mt={3}>
        <FormControl fullWidth sx={{ marginBottom: "10px" }}>
          <InputLabel>Organizer Template</InputLabel>

          <Select
            value={selectedOrganizerTemplate}
            onChange={handleOrganizerTemplateChange}
           
            label="Organizer Template"
          >
            {OrganizerTemplateOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display={"flex"} gap={2} alignItems={"center"} mt={2}>
        <Box>
          <Button onClick={createOrganizerOfAccount} variant="contained">
            Create
          </Button>
        </Box>

        <Box>
          <Button onClick={handleOrganizerFormClose} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewOrganizer;