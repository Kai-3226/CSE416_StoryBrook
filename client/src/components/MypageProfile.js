import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField'
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../auth';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Copyright from './Copyright'
import { Link } from 'react-router-dom'

export default function Profile(){
    const { auth } = useContext(AuthContext);
    const history = useHistory();
    //const fileUploaderRef = useRef();

    const fileUploadOnClick = async ()=>{
        // console.log("Hello")
        // const formData = new FormData();
        // formData.append("imgFile",
        // this.state.selectedFile);
        // auth.updateUser(formData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.user.profile.age = formData.get('age')
        auth.user.profile.gender=formData.get('gender')
        auth.user.profile.userName=formData.get('userName')
        auth.user.profile.myStatement=formData.get('myStatement')
        auth.updateUser();
        history.push("/")
    };

    return (
        <>
        <div style={{display:"flex", width:"100%" ,alignItems:"center", background:"rgba(209, 247, 255, 1)"}}>
            <Container component="main" maxWidth="xl" >
                <Box id="profilePage" 
                sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                    <Box style={{width: "40vw", float:"right", marginTop: "10vh", display:"flex", flexDirection:"column", alignItems:"center"}}>
                        {/* <img alt="Avatar" src={auth.user.icon} style={{width:"50%", height:"auto", borderRadius:"50%"}}>
                        </img>
                            <input type="file" ref={fileUploaderRef} accept="image/*"/>
                            <button onClick={fileUploadOnClick}>
                            Upload!
                            </button> */}
                    </Box>
                    <Box id="profile-setting">
                        <Box>Main Settings</Box>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        name="userName"
                                        defaultValue={auth.user.profile.userName}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="age"
                                        label="Age"
                                        name="age"
                                        defaultValue={auth.user.profile.age}
                                        autoFocus
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="gender"
                                        label="Gender"
                                        name="gender"
                                        defaultValue={auth.user.profile.gender}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="userEmail"
                                        defaultValue={auth.user.email}
                                        label="Email"
                                        autoFocus
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        label="My Statement"
                                        name="myStatement"
                                        defaultValue={auth.user.profile.myStatement}
                                        required
                                        fullWidth
                                        id="myStatement"
                                        autoFocus
                                    />
                                </Grid>
                            </Grid>
                            <Button 
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save
                            </Button>
                            <Grid container justifyContent="flex-end">
                                    <Link to="/changePassword/" variant="h6">
                                        Want to change password?
                                    </Link>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Container>
        
        </div>
        <Copyright/>
        </>
    );
}
