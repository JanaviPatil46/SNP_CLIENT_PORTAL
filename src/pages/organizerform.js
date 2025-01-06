
import { RawOffRounded } from '@mui/icons-material';
import { Box, LinearProgress, TextField, Typography, FormControlLabel, FormControl, RadioGroup, Radio, Container, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const OrganizerFormPage = () => {
    const { _id } = useParams();
    console.log(_id)

    const [fileInputs, setFileInputs] = useState({});
    const findQuestionByText = (questionText) => {
        for (const section of organizerData.sections) {
            for (const formElement of section.formElements) {
                if (formElement.text === questionText) {
                    return formElement;
                }
            }
        }
        return null;
    };

    const navigate = useNavigate();
    const [organizerData, setOrganizerData] = useState()
    const[issubmited,setissubmited]= useState(false)

    const ORGANIZER_API = process.env.REACT_APP_ORGANIZER_TEMP_URL;

    const accountwiseorganizerBYId = async (_id) => {
        console.log(_id)
        const requestOptions = {
            method: "Get",
            redirect: "follow",
        };



        try {
            const response = await fetch(`${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/${_id}`, requestOptions);
            console.log(_id);
            if (!response.ok) {

                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            // Log the result in a structured way
            console.log("Fetched Data:", result.organizerAccountWise);
            console.log("Fetched Data:", result.organizerAccountWise._id);

            setOrganizerData(result.organizerAccountWise)





        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    console.log(organizerData)


    const [issubmitted, setissubmitted] = useState(false); 

    const handleClick = async  () => {
        setissubmitted(true);
        await uppdateaccountwiseorganizerBYId(true);
    };

    const uppdateaccountwiseorganizerBYId = async (issubmitted) => {
        console.log(_id);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            jobid: ["661e495d11a097f731ccd6e8"],
            sections: organizerData?.sections?.map(section => ({
                name: section?.text || '',
                id: section?.id?.toString() || '',
                text: section?.text || '',
                issubmited: issubmitted,
                formElements: section?.formElements?.map(question => ({
                    type: question?.type || '',
                    id: question?.id || '',
                    sectionid: question?.sectionid || '',
                    options: question?.options?.map(option => ({
                        id: option?.id || '',
                        text: option?.text || '',
                        selected: option?.selected || false,
                    })) || [],
                    text: question?.text || '',
                    textvalue: question?.textvalue || '',
                })) || []
            })) || [],
            
            active: true
         
        });

        const requestOptions = {
            method: "PATCH",
            body: raw,
            headers: {
                "Content-Type": "application/json",
            },
        };

        console.log("test",raw);
        const url = `${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/${_id}`;
        console.log(url);
        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                toast.success("New organizer created successfully!");
                navigate('/organizers');
                console.log(result);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                toast.error(`Fetch error: ${error.message}`);
            });


    };
    useEffect(() => {
        accountwiseorganizerBYId(_id);
    }, []);

    const shouldShowQuestion = (question) => {
        const { required, prefilled, conditional, conditions } = question.questionsectionsettings;

        // If the question is not conditional, show it
        if (!conditional) {
            return true;
        }
        // If conditions exist, check if they are met
        if (conditional && conditions.length > 0) {
            return conditions.every(condition => {
                const relatedQuestion = findQuestionByText(condition.question);
                if (relatedQuestion) {
                    // Check if the answer to the related question matches the condition
                    const selectedOption = relatedQuestion.options.find(option => option.selected);
                    return selectedOption && selectedOption.text === condition.answer;
                }
                return false;
            });
        }
        // Default to show the question if none of the above applies
        return true;
    };

    const handleRadioToggle = (questionId, optionId) => {
        setOrganizerData(prevOrganizerTemp => {
            const updatedSections = prevOrganizerTemp.sections.map(section => ({
                ...section,
                formElements: section.formElements.map(question => {
                    if (question.id === questionId) {
                        return {
                            ...question,
                            options: question.options.map(option => ({
                                ...option,
                                selected: option.id === optionId
                            }))
                        };
                    }
                    return question;
                })
            }));
            return {
                ...prevOrganizerTemp,
                sections: updatedSections
            };
        });
    };

    const handleInputChange = (questionId, value) => {
        setOrganizerData(prevOrganizerTemp => {
            const updatedSections = prevOrganizerTemp.sections.map(section => ({
                ...section,
                formElements: section.formElements.map(question => {
                    if (question.id === questionId) {
                        return {
                            ...question,
                            textvalue: value
                        };
                    }
                    return question;
                })
            }));
            console.log('Updated Sections:', updatedSections); // Debugging
            return {
                ...prevOrganizerTemp,
                sections: updatedSections
            };
        });
    };

    const handleFileInputChange = (questionId, event) => {
        const files = event.target.files;
        setFileInputs(prevState => ({
            ...prevState,
            [questionId]: files[0]
        }));
    };


    //for stepper
    const [currentStep, setCurrentStep] = useState(0); // State to track the current step

    const handleNext = () => {
        if (currentStep < organizerData.sections.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const sanitizeText = (text) => {
        return text.replace(/<\/?(p|a|strong|l)[^>]*>/gi, '');
    };

    return (
        <Container>
            <Box>
                {organizerData && (
                    <Box className="organizerform-details">
                        <form key={organizerData._id} id={organizerData._id} className="template-form">
                            <Box p={2}>

                                <LinearProgress variant="determinate" value={(currentStep + 1) / organizerData.sections.length * 100} />
                            </Box>

                            <Box className="section">
                                {currentStep < organizerData.sections.length && (
                                    <>
                                        <Typography variant="h3" style={{ margin: "50px 0px 20px 0" }}>
                                            {organizerData.sections[currentStep].name}
                                        </Typography>
                                        {organizerData.sections[currentStep].formElements.map((question) => (
                                            <Box key={question.id} className="question">
                                                {shouldShowQuestion(question) && (
                                                    <>
                                                        <Typography style={{ margin: "13px 0" }}>
                                                            {sanitizeText(question.text)}
                                                        </Typography>

                                                        {/* Radio Buttons */}
                                                        {question.type === "Radio Buttons" && (
                                                            <FormControl component="fieldset" className="radio-container">
                                                                {/* <FormLabel component="legend">Choose an option</FormLabel> */}
                                                                <RadioGroup name={`question-${question.id}`}>
                                                                    {question.options.map((option) => (
                                                                        <FormControlLabel
                                                                            key={option.id}
                                                                            control={
                                                                                <Radio
                                                                                    checked={option.selected || false}
                                                                                    onChange={() => handleRadioToggle(question.id, option.id)}
                                                                                />
                                                                            }
                                                                            label={
                                                                                <Button
                                                                                    type="button"
                                                                                    className={`radio-button ${option.selected ? "selected" : ""}`}
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        handleRadioToggle(question.id, option.id);
                                                                                    }}
                                                                                >
                                                                                    {option.text}
                                                                                </Button>
                                                                            }
                                                                        />
                                                                    ))}
                                                                </RadioGroup>
                                                            </FormControl>
                                                        )}

                                                        {/* Free Entry, Number, Email */}
                                                        {(question.type === "Free Entry" || question.type === "Number" || question.type === "Email") && (
                                                            <Box>
                                                                <TextField
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    multiline
                                                                    name={`question-${question.id}`}
                                                                    className="organizerInputBoxes"
                                                                    placeholder={`${question.type} Answer`}
                                                                    value={question.textvalue ? sanitizeText(question.textvalue) : ""}
                                                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                                                    inputProps={{
                                                                        type: question.type === "Free Entry" ? "text" : question.type.toLowerCase(),
                                                                    }}
                                                                />
                                                            </Box>
                                                        )}

                                                        {/* File Upload */}
                                                        {question.type === "File Upload" && (
                                                            <Box className="file-upload-container">
                                                                <input
                                                                    type="file"
                                                                    name={`question-${question.id}`}
                                                                    className="file-upload-input"
                                                                    onChange={(e) => handleFileInputChange(question.id, e)}
                                                                />
                                                                <Button
                                                                    variant='contained'
                                                                    type="button"
                                                                    className="file-upload-button"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        console.log(`File uploaded for question ${question.id}:`, fileInputs[question.id]);
                                                                    }}
                                                                >
                                                                    Upload
                                                                </Button>
                                                            </Box>
                                                        )}
                                                    </>
                                                )}
                                            </Box>
                                        ))}
                                    </>
                                )}
                            </Box>
                            {/* Navigation Buttons */}
                            <Box display="flex" alignItems="center" justifyContent={'space-between'}>
                                <Box>
                                    <Button disabled={currentStep === 0} onClick={handleBack}>Back</Button>
                                    {currentStep === organizerData.sections.length - 1 ? (
                                        <Button onClick={handleClick} >Submit</Button>
                                    ) : (
                                        <Button onClick={handleNext}>Next</Button>
                                    )}
                                </Box>

                                <Typography variant="subtitle1">
                                    <strong>Steps {currentStep + 1}/{organizerData.sections.length}</strong>
                                </Typography>
                            </Box>

                        </form>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default OrganizerFormPage;
















// const uppdateaccountwiseorganizerBYId = async () => {
    //     // Dynamically determine `issubmited` based on frontend conditions
    //     const isFormComplete = organizerData?.sections?.every(
    //         (section) =>
    //             section.formElements?.every(
    //                 (element) => element.textvalue || element.options?.some((opt) => opt.selected)
    //             )
    //     );
    
    //     const raw = JSON.stringify({
    //         jobid: ["661e495d11a097f731ccd6e8"],
    //         sections: organizerData?.sections,
    //         active: true,
    //         issubmited: isFormComplete, // Set dynamically based on conditions
    //     });
    // console.log(raw)
    //     const requestOptions = {
    //         method: "PATCH",
    //         body: raw,
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     };
    
    //     const url = `${ORGANIZER_API}/workflow/orgaccwise/organizeraccountwise/${_id}`;
    //     try {
    //         const response = await fetch(url, requestOptions);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const result = await response.json();
    //         toast.success("Organizer updated successfully!");
    //         // console.log(result);
    //     } catch (error) {
    //         console.error("Fetch error:", error);
    //         toast.error(`Fetch error: ${error.message}`);
    //     }
    // };
    
    