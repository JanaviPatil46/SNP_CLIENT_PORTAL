
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Box, Typography,TextField, FormControlLabel, Checkbox, Radio, Button, Grid, Paper, } from "@mui/material"; // Make sure you have MUI installed
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const UpdateOrganizer = ({ OrganizerData, onClose = () => {} }) => {

  const {_id } = useParams();
  console.log(_id)



  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedOrganizerTemplate, setSelectedOrganizerTemplate] = useState(null);
  
  const [organizerName, setOrganizerName] = useState("");
  const [reminder, setReminder] = useState(false);
  const [organizerTemp, setOrganizerTemp] = useState(null); // Set initial state to null
  const [fileInputs, setFileInputs] = useState({});
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchOrganizerOfAccount(OrganizerData);
    
  }, [OrganizerData]);
  const ORGANIZER_API = process.env.REACT_APP_ORGANIZER_TEMP_URL;

  const fetchOrganizerOfAccount = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const url = `${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/${_id}`;
   
    fetch(url, requestOptions)
      .then((response) => response.json())

      .then((result) => {
        console.log(result)
        const selectedOrganizer = result.organizerAccountWise;
        if (selectedOrganizer) {
          setOrganizerTemp(selectedOrganizer);
          setSections(selectedOrganizer.sections)
          console.log(selectedOrganizer.sections)
        } else {
          console.error("Organizer data not found");
        }
      })
      .catch((error) => console.error(error));
  };





  const handleCheckboxToggle = (questionId, optionId) => {
    setOrganizerTemp((prevOrganizerTemp) => {
      const updatedSections = prevOrganizerTemp.sections.map((section) => ({
        ...section,
        formElements: section.formElements.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              options: question.options.map((option) => ({
                ...option,
                selected: option.id === optionId ? !option.selected : option.selected,
              })),
            };
          }
          return question;
        }),
      }));

      return {
        ...prevOrganizerTemp,
        sections: updatedSections,
      };
    });
  };

  const handleRadioToggle = (questionId, selectedOptionId) => {
    setOrganizerTemp((prevOrganizerTemp) => {
      const updatedSections = prevOrganizerTemp.sections.map((section) => ({
        ...section,
        formElements: section.formElements.map((question) => {
          if (question.id === questionId) {
            return {
              ...question,
              options: question.options.map((option) => ({
                ...option,
                selected: option.id === selectedOptionId, // Compare based on ID
              })),
            };
          }
          return question;
        }),
      }));

      return {
        ...prevOrganizerTemp,
        sections: updatedSections,
      };
    });
  };

  const handleInputChange = (questionId, value) => {
    console.log(questionId, value);
    setOrganizerTemp((prevOrganizerTemp) => {
      const updatedSections = prevOrganizerTemp.sections.map((section) => ({
        ...section,
        formElements: section.formElements.map((question) => {
          if (question.id === questionId) {
            console.log(`Updating question ${questionId} with value: ${value}`); // Debug log
            return {
              ...question,
              textvalue: value, // Update with the entire input value
            };
          }
          return question;
        }),
      }));

      const newOrganizerTemp = {
        ...prevOrganizerTemp,
        sections: updatedSections,
      };

      console.log("Updated organizerTemp:", newOrganizerTemp); // Debug log to inspect the entire updated state
      return newOrganizerTemp;
    });
  };

  const handleFileInputChange = (questionId, event) => {
    const files = event.target.files;
    setFileInputs((prevState) => ({
      ...prevState,
      [questionId]: files[0],
    }));
  };


  const handleOrganizerFormClose = () => {
    onClose();
  };
  const createOrganizerOfAccount = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      accountid: selectedAccounts?.value,
      organizertemplateid: selectedOrganizerTemplate?.value,
      reminders: reminder,
      jobid: ["661e495d11a097f731ccd6e8"],
      sections:
        organizerTemp?.sections?.map((section) => ({
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
            })) || [],
        })) || [],
      active: true,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(raw);
    const url = `${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/${_id}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        toast.success("Organizer AccountWise Updated successfully");
        // onClose();
        handleOrganizerFormClose();
      })
      .catch((error) => console.error(error));
  };





  //Sections
  const [activeStep, setActiveStep] = useState(0);
  const [radioValues, setRadioValues] = useState({});
  const [checkboxValues, setCheckboxValues] = useState({});
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");

  const shouldShowSection = (section) => {
    if (!section.sectionsettings?.conditional) return true;

    const condition = section.sectionsettings?.conditions?.[0];
    if (condition && condition.question && condition.answer) {
      const radioAnswer = radioValues[condition.question];
      const checkboxAnswer = checkboxValues[condition.question];
      const dropdownAnswer = selectedDropdownValue;
      // For radio buttons
      if (radioAnswer !== undefined && condition.answer === radioAnswer) {
        return true;
      }
      // For checkboxes: check if the condition answer is in the selected checkbox values
      if (checkboxAnswer && checkboxAnswer[condition.answer]) {
        return true;
      }
      // For dropdowns: check if the condition answer matches the selected dropdown value
      if (dropdownAnswer !== undefined && condition.answer === dropdownAnswer) {
        return true;
      }
      return false;
    }
    return true;
  };
  console.log(sections);
  const getVisibleSections = () => sections.filter(shouldShowSection);
  const visibleSections = getVisibleSections();
  console.log(visibleSections);
  const totalSteps = visibleSections.length;


  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const shouldShowElement = (element) => {
    if (!element.questionsectionsettings?.conditional) return true;

    const condition = element.questionsectionsettings?.conditions?.[0];

    if (condition && condition.question && condition.answer) {
      const radioAnswer = radioValues[condition.question];
      const checkboxAnswer = checkboxValues[condition.question];
      const dropdownAnswer = selectedDropdownValue;
      // For radio buttons
      if (radioAnswer !== undefined && condition.answer === radioAnswer) {
        return true;
      }
      // For checkboxes: check if the condition answer is in the selected checkbox values
      if (checkboxAnswer && checkboxAnswer[condition.answer]) {
        return true;
      }
      // For dropdowns: check if the condition answer matches the selected dropdown value
      if (dropdownAnswer !== undefined && condition.answer === dropdownAnswer) {
        return true;
      }
      return false;
    }
    return true;
  };
  return (
    <Container>

      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Update Organizer
        </Typography>

        {organizerTemp && (
          <form key={organizerTemp.organizertemplateid} id={organizerTemp.organizertemplateid} className="template-form">
            <Typography variant="h5" gutterBottom>
              {organizerName}
            </Typography>
            {organizerTemp.sections.map(
              (section, sectionIndex) =>
                sectionIndex === activeStep && (
                  <div key={section.id} className="section">
                    <Typography variant="h6" style={{ margin: "50px 0px 20px 0" }}>
                      {section.name}
                    </Typography>
                    {section.formElements.map(
                      (question) =>
                        shouldShowElement(question) && (
                          <div key={question.id} className="question">
                            <Typography style={{ margin: "13px 0" }}>{question.text}</Typography>
                            {question.type === "Checkboxes" && (
                              <div className="checkbox-container">
                                {question.options.map((option) => (
                                  <FormControlLabel key={option.id} control={<Checkbox checked={option.selected || false} onChange={() => handleCheckboxToggle(question.id, option.id)} />} label={option.text} />
                                ))}
                              </div>
                            )}
                            {question.type === "Radio Buttons" && (
                              <div className="radio-container">
                                {question.options.map((option) => (
                                  <FormControlLabel
                                    key={option.id}
                                    control={
                                      <Radio
                                        checked={option.selected || false}
                                        onChange={() => handleRadioToggle(question.id, option.id)} // Pass the option ID
                                      />
                                    }
                                    label={option.text}
                                  />
                                ))}
                              </div>
                            )}
                            {question.type === "Yes/No" && (
                              <div className="radio-container">
                                {question.options.map((option) => (
                                  <FormControlLabel key={option.id} control={<Radio checked={option.selected || false} onChange={() => handleRadioToggle(question.id, option.id)} />} label={option.text} />
                                ))}
                              </div>
                            )}
                            {(question.type === "Free Entry" || question.type === "Number" || question.type === "Email") && <TextField fullWidth variant="outlined" multiline={question.type === "Free Entry"} placeholder={`${question.type} Answer`} value={question.textvalue || ""} onChange={(e) => handleInputChange(question.id, e.target.value)} style={{ marginBottom: "10px" }} />}
                            {question.type === "File Upload" && (
                              <div className="file-upload-container">
                                <input type="file" onChange={(e) => handleFileInputChange(question.id, e)} />
                                <Button
                                  variant="contained"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    console.log(`File uploaded for question ${question.id}:`, fileInputs[question.id]);
                                  }}
                                >
                                  Upload
                                </Button>
                              </div>
                            )}
                          </div>
                        )
                    )}
                  </div>
                )
            )}

            <Box mt={3} display="flex" gap={3} alignItems="center">
              <Button disabled={activeStep === 0} onClick={handleBack} variant="contained">
                Back
              </Button>
              <Button onClick={handleNext} disabled={activeStep === totalSteps - 1} variant="contained">
                Next
              </Button>
            </Box>
          </form>
        )}

        <Grid container spacing={2} style={{ marginTop: "20px", marginLeft: "3px" }} display="flex" gap={3} alignItems="center">
          <Grid>
            {/* <Link to={`/accountsdash/organizers/${selectedAccounts?.value}`}> */}
            <Button variant="contained" color="primary" onClick={createOrganizerOfAccount}>
              Save
            </Button>
            {/* </Link> */}
          </Grid>
          <Grid>
            <Button variant="outlined" color="secondary" onClick={handleOrganizerFormClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
        <div>
      <ToastContainer />
      {/* Other components */}
    </div>

      </Paper>
    </Container>
  );
};

export default UpdateOrganizer;
































// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { Container, Box, Typography,TextField, FormControlLabel, Checkbox, Radio, Button, Grid, Paper, } from "@mui/material"; // Make sure you have MUI installed

// const UpdateOrganizer = ({ OrganizerData, onClose }) => {
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [selectedOrganizerTemplate, setSelectedOrganizerTemplate] = useState(null);
  
//   const [organizerName, setOrganizerName] = useState("");
//   const [reminder, setReminder] = useState(false);
//   const [organizerTemp, setOrganizerTemp] = useState(null); // Set initial state to null
//   const [fileInputs, setFileInputs] = useState({});
//   const [sections, setSections] = useState([]);

//   useEffect(() => {
//     fetchOrganizerOfAccount(OrganizerData);
    
//   }, [OrganizerData]);
//   const ORGANIZER_API = process.env.REACT_APP_ORGANIZER_TEMP_URL;
//   const fetchOrganizerOfAccount = () => {
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow",
//     };
//     const url = `${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/${OrganizerData}`;

//     fetch(url, requestOptions)
//       .then((response) => response.json())

//       .then((result) => {
//         console.log(result)
//         const selectedOrganizer = result.organizerAccountWise;
//         if (selectedOrganizer) {
//           setOrganizerTemp(selectedOrganizer);
//           setSections(selectedOrganizer.sections)
//           console.log(selectedOrganizer.sections)
//         } else {
//           console.error("Organizer data not found");
//         }
//       })
//       .catch((error) => console.error(error));
//   };





//   const handleCheckboxToggle = (questionId, optionId) => {
//     setOrganizerTemp((prevOrganizerTemp) => {
//       const updatedSections = prevOrganizerTemp.sections.map((section) => ({
//         ...section,
//         formElements: section.formElements.map((question) => {
//           if (question.id === questionId) {
//             return {
//               ...question,
//               options: question.options.map((option) => ({
//                 ...option,
//                 selected: option.id === optionId ? !option.selected : option.selected,
//               })),
//             };
//           }
//           return question;
//         }),
//       }));

//       return {
//         ...prevOrganizerTemp,
//         sections: updatedSections,
//       };
//     });
//   };

//   const handleRadioToggle = (questionId, selectedOptionId) => {
//     setOrganizerTemp((prevOrganizerTemp) => {
//       const updatedSections = prevOrganizerTemp.sections.map((section) => ({
//         ...section,
//         formElements: section.formElements.map((question) => {
//           if (question.id === questionId) {
//             return {
//               ...question,
//               options: question.options.map((option) => ({
//                 ...option,
//                 selected: option.id === selectedOptionId, // Compare based on ID
//               })),
//             };
//           }
//           return question;
//         }),
//       }));

//       return {
//         ...prevOrganizerTemp,
//         sections: updatedSections,
//       };
//     });
//   };

//   const handleInputChange = (questionId, value) => {
//     console.log(questionId, value);
//     setOrganizerTemp((prevOrganizerTemp) => {
//       const updatedSections = prevOrganizerTemp.sections.map((section) => ({
//         ...section,
//         formElements: section.formElements.map((question) => {
//           if (question.id === questionId) {
//             console.log(`Updating question ${questionId} with value: ${value}`); // Debug log
//             return {
//               ...question,
//               textvalue: value, // Update with the entire input value
//             };
//           }
//           return question;
//         }),
//       }));

//       const newOrganizerTemp = {
//         ...prevOrganizerTemp,
//         sections: updatedSections,
//       };

//       console.log("Updated organizerTemp:", newOrganizerTemp); // Debug log to inspect the entire updated state
//       return newOrganizerTemp;
//     });
//   };

//   const handleFileInputChange = (questionId, event) => {
//     const files = event.target.files;
//     setFileInputs((prevState) => ({
//       ...prevState,
//       [questionId]: files[0],
//     }));
//   };


//   const handleOrganizerFormClose = () => {
//     onClose();

//   };


//   const createOrganizerOfAccount = () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//       accountid: selectedAccounts?.value,
//       organizertemplateid: selectedOrganizerTemplate?.value,
//       reminders: reminder,
//       jobid: ["661e495d11a097f731ccd6e8"],
//       sections:
//         organizerTemp?.sections?.map((section) => ({
//           name: section?.text || "",
//           id: section?.id?.toString() || "",
//           text: section?.text || "",
//           formElements:
//             section?.formElements?.map((question) => ({
//               type: question?.type || "",
//               id: question?.id || "",
//               sectionid: question?.sectionid || "",
//               options:
//                 question?.options?.map((option) => ({
//                   id: option?.id || "",
//                   text: option?.text || "",
//                   selected: option?.selected || false,
//                 })) || [],
//               text: question?.text || "",
//               textvalue: question?.textvalue || "",
//             })) || [],
//         })) || [],
//       active: true,
//     });

//     const requestOptions = {
//       method: "PATCH",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };
//     console.log(raw);
//     const url = `${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/${organizerTemp._id}`;
//     fetch(url, requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         toast.success("Organizer AccountWise Updated successfully");
//         // onClose();
//         handleOrganizerFormClose();
//       })
//       .catch((error) => console.error(error));
//   };





//   //Sections
//   const [activeStep, setActiveStep] = useState(0);
//   const [radioValues, setRadioValues] = useState({});
//   const [checkboxValues, setCheckboxValues] = useState({});
//   const [selectedDropdownValue, setSelectedDropdownValue] = useState("");

//   const shouldShowSection = (section) => {
//     if (!section.sectionsettings?.conditional) return true;

//     const condition = section.sectionsettings?.conditions?.[0];
//     if (condition && condition.question && condition.answer) {
//       const radioAnswer = radioValues[condition.question];
//       const checkboxAnswer = checkboxValues[condition.question];
//       const dropdownAnswer = selectedDropdownValue;
//       // For radio buttons
//       if (radioAnswer !== undefined && condition.answer === radioAnswer) {
//         return true;
//       }
//       // For checkboxes: check if the condition answer is in the selected checkbox values
//       if (checkboxAnswer && checkboxAnswer[condition.answer]) {
//         return true;
//       }
//       // For dropdowns: check if the condition answer matches the selected dropdown value
//       if (dropdownAnswer !== undefined && condition.answer === dropdownAnswer) {
//         return true;
//       }
//       return false;
//     }
//     return true;
//   };
//   console.log(sections);
//   const getVisibleSections = () => sections.filter(shouldShowSection);
//   const visibleSections = getVisibleSections();
//   console.log(visibleSections);
//   const totalSteps = visibleSections.length;


//   const handleNext = () => {
//     if (activeStep < totalSteps - 1) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     }
//   };

//   const shouldShowElement = (element) => {
//     if (!element.questionsectionsettings?.conditional) return true;

//     const condition = element.questionsectionsettings?.conditions?.[0];

//     if (condition && condition.question && condition.answer) {
//       const radioAnswer = radioValues[condition.question];
//       const checkboxAnswer = checkboxValues[condition.question];
//       const dropdownAnswer = selectedDropdownValue;
//       // For radio buttons
//       if (radioAnswer !== undefined && condition.answer === radioAnswer) {
//         return true;
//       }
//       // For checkboxes: check if the condition answer is in the selected checkbox values
//       if (checkboxAnswer && checkboxAnswer[condition.answer]) {
//         return true;
//       }
//       // For dropdowns: check if the condition answer matches the selected dropdown value
//       if (dropdownAnswer !== undefined && condition.answer === dropdownAnswer) {
//         return true;
//       }
//       return false;
//     }
//     return true;
//   };
//   return (
//     <Container>

//       <Paper elevation={3} style={{ padding: "20px" }}>
//         <Typography variant="h6" gutterBottom>
//           Update Organizer
//         </Typography>

//         {organizerTemp && (
//           <form key={organizerTemp.organizertemplateid} id={organizerTemp.organizertemplateid} className="template-form">
//             <Typography variant="h5" gutterBottom>
//               {organizerName}
//             </Typography>
//             {organizerTemp.sections.map(
//               (section, sectionIndex) =>
//                 sectionIndex === activeStep && (
//                   <div key={section.id} className="section">
//                     <Typography variant="h6" style={{ margin: "50px 0px 20px 0" }}>
//                       {section.name}
//                     </Typography>
//                     {section.formElements.map(
//                       (question) =>
//                         shouldShowElement(question) && (
//                           <div key={question.id} className="question">
//                             <Typography style={{ margin: "13px 0" }}>{question.text}</Typography>
//                             {question.type === "Checkboxes" && (
//                               <div className="checkbox-container">
//                                 {question.options.map((option) => (
//                                   <FormControlLabel key={option.id} control={<Checkbox checked={option.selected || false} onChange={() => handleCheckboxToggle(question.id, option.id)} />} label={option.text} />
//                                 ))}
//                               </div>
//                             )}
//                             {question.type === "Radio Buttons" && (
//                               <div className="radio-container">
//                                 {question.options.map((option) => (
//                                   <FormControlLabel
//                                     key={option.id}
//                                     control={
//                                       <Radio
//                                         checked={option.selected || false}
//                                         onChange={() => handleRadioToggle(question.id, option.id)} // Pass the option ID
//                                       />
//                                     }
//                                     label={option.text}
//                                   />
//                                 ))}
//                               </div>
//                             )}
//                             {question.type === "Yes/No" && (
//                               <div className="radio-container">
//                                 {question.options.map((option) => (
//                                   <FormControlLabel key={option.id} control={<Radio checked={option.selected || false} onChange={() => handleRadioToggle(question.id, option.id)} />} label={option.text} />
//                                 ))}
//                               </div>
//                             )}
//                             {(question.type === "Free Entry" || question.type === "Number" || question.type === "Email") && <TextField fullWidth variant="outlined" multiline={question.type === "Free Entry"} placeholder={`${question.type} Answer`} value={question.textvalue || ""} onChange={(e) => handleInputChange(question.id, e.target.value)} style={{ marginBottom: "10px" }} />}
//                             {question.type === "File Upload" && (
//                               <div className="file-upload-container">
//                                 <input type="file" onChange={(e) => handleFileInputChange(question.id, e)} />
//                                 <Button
//                                   variant="contained"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     console.log(`File uploaded for question ${question.id}:`, fileInputs[question.id]);
//                                   }}
//                                 >
//                                   Upload
//                                 </Button>
//                               </div>
//                             )}
//                           </div>
//                         )
//                     )}
//                   </div>
//                 )
//             )}

//             <Box mt={3} display="flex" gap={3} alignItems="center">
//               <Button disabled={activeStep === 0} onClick={handleBack} variant="contained">
//                 Back
//               </Button>
//               <Button onClick={handleNext} disabled={activeStep === totalSteps - 1} variant="contained">
//                 Next
//               </Button>
//             </Box>
//           </form>
//         )}

//         <Grid container spacing={2} style={{ marginTop: "20px", marginLeft: "3px" }} display="flex" gap={3} alignItems="center">
//           <Grid>
//             {/* <Link to={`/accountsdash/organizers/${selectedAccounts?.value}`}> */}
//             <Button variant="contained" color="primary" onClick={createOrganizerOfAccount}>
//               Save
//             </Button>
//             {/* </Link> */}
//           </Grid>
//           <Grid>
//             <Button variant="outlined" color="secondary" onClick={handleOrganizerFormClose}>
//               Cancel
//             </Button>
//           </Grid>
//         </Grid>

//       </Paper>
//     </Container>
//   );
// };

// export default UpdateOrganizer;

