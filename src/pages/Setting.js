import React, { useState, useRef, useEffect, useContext } from 'react';
import '../pages/setting.css';
import Box from '@mui/material/Box';
import { OutlinedInput, InputAdornment, Typography, InputLabel, useMediaQuery, Button, Select, MenuItem, TextField, Divider, Autocomplete, Grid } from '@mui/material';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { useTheme } from '@mui/material/styles';
import user from "../Imgs/user.png";
import { Switch, } from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Link } from "react-router-dom";
import { LoginContext } from "../Contextprovider/Context";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink } from "react-router-dom";
import android from '../Imgs/android.png';
import apple from '../Imgs/apple.png';
import { useNavigate } from 'react-router-dom';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
// import Draggable from 'react-draggable';


const Setting = () => {
  const navigate = useNavigate();
  ClassNameGenerator.configure((componentName) => `foo-bar-${componentName}`);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showSaveButtons, setShowSaveButtons] = useState(false);
  const handleEditClick = () => {
    setShowSaveButtons(true);
    setShowUpload(!showUpload);
  };
  const handleCancelButtonClick = () => {
    setShowSaveButtons(false);
  };

  const [showAlert, setShowAlert] = useState(false);

  const [showDialog, setShowDialog] = useState(false);





  const [SystemLang, setSystemLang] = React.useState('');
  // const options = [
  //   { value: "en", label: "English" },
  //   { value: "fr", label: "French" },
  //   { value: "es", label: "Spanish" },
  //   { value: "de", label: "German" },
  //   { value: "it", label: "Italian" },
  //   { value: "pt", label: "Portuguese" },
  //   { value: "ru", label: "Russian" },
  //   { value: "zh", label: "Chinese" },
  //   { value: "ja", label: "Japanese" },
  //   { value: "ko", label: "Korean" },

  // ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpenA = () => {
    setOpen(true);
  };

  const handleCloseA = () => {
    setOpen(false);
  };

  const handleResetPassword = () => {
    navigate('/forgotpass');
  };

  //Integration
  const [showButtons, setShowButtons] = useState(false);
  const StaySignedInOptions = ["30 min", "4 hours", "8 hours"];
  const handleStaySignedInEditClick = () => {
    setIsEditable(true);
    setShowButtons(true);
  };


  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState()

  const [signedtime, setSignedTime] = useState("");
  const { logindata } = useContext(LoginContext);
  const [clientdata, setClientdata] = useState();
  const formatTimePeriod = (seconds) => {
    if (seconds < 3600) {
      return `${Math.ceil(seconds / 60)} minutes`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`;
    }
  };
  const LOGIN_API = process.env.REACT_APP_USER_LOGIN;
  const [userdata, setuserdata] = useState();
  const fetchData = async () => {
    try {
      const url = `${LOGIN_API}/common/user/${logindata.user.id}`;
      const response = await fetch(url);
      const data = await response.json();

      const validTime = logindata.user.exp - logindata.user.iat;
      setSignedTime(formatTimePeriod(validTime));

      setuserdata(data);
      console.log(data);
      setEmail(data.email);
      console.log(data.email);
      setUserName(data.username);
      console.log(data.username);
      setClientdata(data._id);
      console.log(data._id)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [isEditable, setIsEditable] = useState(false);

  //upload photo
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  // const handlePhotoUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setUploadedPhoto(reader.result); // Store the photo data as a URL
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleDeletePhoto = () => {
    setSelectedFile(null); // Remove the uploaded photo
  };
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if file size exceeds 1MB (1048576 bytes)
      if (file.size > 1048576) {
        setError('File size exceeds 1MB. Please upload a smaller file.');
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // Check if the image size exceeds 512x512 pixels
        if (width > 512 || height > 512) {
          setError('Image dimensions exceed 512x512 pixels. Please resize the image.');
        } else {
          // File is valid, proceed with setting the file
          setError('');
          setSelectedFile(file);
          setUploadedPhoto(URL.createObjectURL(file)); // For displaying the preview
        }
      };
    }
  };




  const updateProfilePicture = () => {
    const formdata = new FormData();

    if (selectedFile) { // Check directly if selectedFile is set
      formdata.append("ProfilePicture", selectedFile);
      console.log(selectedFile); // Debugging: Log the selected file

      const requestOptions = {
        method: "PATCH",
        body: formdata,
        redirect: "follow"
      };

      fetch(`${LOGIN_API}/common/user/${logindata.user.id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } else {
      console.error("No file selected"); // This will execute if no file is selected
    }
  };


  const [openA, setOpenA] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cpassword, setCpassword] = useState("");


  const handleClickOpen = () => {
    setOpenA(true);
  };

  const handleClose = () => {
    setOpenA(false);
  };


  const handleToggleCPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // const [isLoginEditable, setIsLoginEditable] = useState(true);

  const [userUpdate, setUserUpdate] = useState();
  const [password, setPassword] = useState("");

  const handleUpdatePasswordClick = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const url = `${LOGIN_API}/common/user/verifyuserandpassword/`;

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.user);
        setUserUpdate(result.user);


        setOpenA(false);

        // setShowUpdatePassButton(true);
        // setShowAlert(false);
        // updatePassword(result.user._id )
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Box>
        <Typography variant="h4">Account Settings</Typography>
      </Box>
      <Box className="account-settings">
        <Box mt={1.5} className="accounts-details-user">
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box className='hr'>
                <Typography variant="h6">Personal details</Typography>
              </Box>
              <Box className='user-profile-container'>
                <img src={user} alt="" className="user-profile-image" style={{ width: "40px", height: "40px", borderRadius: "50%", marginTop: "25px" }} />
              </Box>
              <Box className='hr'>
                <BorderColorRoundedIcon sx={{ float: "right", marginBottom: "10px", cursor: "pointer", color: '#1168bf' }} onClick={handleEditClick} />
              </Box>
            </Box>
            {showUpload && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'block', margin: '0 auto' }}
                />
              </Box>
            )}
            {uploadedPhoto && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleDeletePhoto}
                  sx={{ mt: 1 }}
                >
                  Delete Photo
                </Button>
              </Box>
            )}

            <Box>
              <Typography sx={{ textAlign: 'center', fontSize: 25, mt: 2 }}><b>{userName}</b></Typography>
            </Box>
            <Box className="contact-details">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isSmallScreen ? 'column' : 'row',
                  gap: 5,
                  padding: '1px 25px 0 5px',

                }}
              >
              </Box>

            </Box>
            {showSaveButtons && (

              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  padding: '1px 5px 0 5px',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={updateProfilePicture}
                  sx={{
                    mt: 2,
                    width: isSmallScreen ? '100%' : 'auto',
                    borderRadius: '10px',
                  }}
                >
                  Save

                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={handleCancelButtonClick}
                  sx={{
                    mt: 2,
                    width: isSmallScreen ? '100%' : 'auto',
                    borderRadius: '10px',
                  }}
                >
                  Cancel
                </Button>
              </Box>

            )}
          </Box>

          <Box className="login-details-user" >
            <Box className="login-header">
              <Typography variant="h6" ml={1}>Profile access</Typography>
            </Box>

            <Box className="hr" style={{ marginTop: "10px" }}></Box>

            <Box sx={{ ml: 1, }}>
              <Typography variant='h6'>Email</Typography>
              <Box>{email}</Box>
            </Box>

            <Box>
              <Button sx={{ mt: 2 }} autoFocus onClick={handleClickOpen}>
                Reset Password
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                // PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  Reset password?
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <DialogContentText>
                    You're about to send password reset instructions to <b>{email}</b>!Are you sure?

                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant='contained' onClick={handleResetPassword}>Reset Password</Button>
                </DialogActions>
              </Dialog>
            </Box>

          </Box>
          <Box>
          </Box>

          <Box className="authentication">
            <Box className="authentication-header">
              <Typography variant="h6" ml={1}>Two-factor authentication</Typography>
            </Box>

            <Box className="hr" style={{ marginTop: "10px" }}></Box>
            <Box style={{ display: "flex", gap: "10px", marginTop: "25px", cursor: "pointer", alignItems: "center" }}>
              <Switch
                onClick={handleClickOpen}
              // checked={showAuthenticationAlert}
              />
              <Box style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <p >Turn on two-factor authentication</p>
                <HelpOutlineRoundedIcon style={{ color: "blue" }} />
              </Box>
            </Box>

            {/* MUI Dialog */}
            <Dialog
              open={openA}
              onClose={handleCloseA}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Authentication"}
              </DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  In order to change your login details you must provide your current password.
                </DialogContentText>

                <Box mt={2}>
                  <Typography htmlFor="confirmPassword"> Password</Typography>
                  <OutlinedInput
                    type={showConfirmPassword ? "text" : "password"}
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    size="small"

                    placeholder="Password"

                    sx={{ width: "100%", borderRadius: "10px", mt: 1 }}
                    endAdornment={
                      <InputAdornment position="end" sx={{ cursor: "pointer" }} onClick={handleToggleCPasswordVisibility}>
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </InputAdornment>
                    }
                  />
                </Box>

                <Box mt={1}><NavLink to="/forgotpass" style={{ color: "rgb(25, 118, 211)", textDecoration: "none" }}>
                  <b>Forgot Password?</b>
                </NavLink>
                </Box>


              </DialogContent>
              <DialogActions>
                <Button variant='contained' onClick={handleUpdatePasswordClick}>Submit</Button>
                <Button variant='outlined' onClick={handleCloseA} >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Box>


          {/* <Box>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Authentication</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  In order to change your login details, you must provide your current password.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Current Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleCloseDialog} color="primary">Submit</Button>
              </DialogActions>
            </Dialog>
          </Box> */}



        </Box>

        <Box className='notifiaction-details' >

          <Box className="preferences">
            <Box className="preferences-header" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">Login details</Typography>
              <BorderColorRoundedIcon onClick={handleStaySignedInEditClick}
                sx={{
                  float: "right",
                  marginTop: "10px",
                  cursor: "pointer",
                  color: '#1168bf'
                }}

              />
            </Box>



            <Box className="hr" style={{ marginTop: "10px" }}></Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1 }}>
              <InputLabel sx={{ color: 'black', mt: 2 }}>Stay signed in for</InputLabel>
              <Autocomplete
                disablePortal
                options={StaySignedInOptions}
                value="8 hours"
                fullWidth
                size='small'
                renderInput={(params) => <TextField {...params} disabled={!isEditable} />}
              />
            </Box>
            {showButtons && (
              <Box mt={2} display={'flex'} gap={2}>
                <Button variant='contained'>Save</Button>
                <Button variant='outlined'>Cancel</Button>
              </Box>
            )}

          </Box>


          <Box className="emailsyns" style={{}}>
            <Box>
              <Typography variant="h6">Download app</Typography>
              <Box className="hr" style={{ marginTop: "10px" }}></Box>

              <Grid container spacing={2} gap={2} justifyContent="center" alignItems="center">
                <Grid item>
                  <NavLink to="https://play.google.com/store/apps/details?id=com.linkedin.android&hl=en_IN&gl=US">
                    <img style={{ width: "110%" }} src={android} alt="Play Store Logo" />
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="https://apps.apple.com/us/app/linkedin-network-job-finder/id288429040">
                    <img style={{ width: "80%" }} src={apple} alt="App Store Logo" />
                  </NavLink>
                </Grid>
              </Grid>
            </Box>


          </Box>

          <Box className="emailsyns">
            <Box>
              <Typography variant="h6">International settings</Typography>
            </Box>
            <Box className="hr" style={{ marginTop: "10px" }}></Box>


            <Box>
              <Box className="base-TextField-root">
                <label htmlFor="subject">System Language</label>
                <TextField
                  value={SystemLang || "English (US)"}
                  onChange={(e) => setSystemLang(e.target.value)}
                  sx={{ width: '100%', mt: 2, mb: 2 }}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>


        </Box>
      </Box>
    </>
  )
}

export default Setting

