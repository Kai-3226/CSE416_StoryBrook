import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField'
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import { changePassword } from '../api';

export default function Profile(){
    const store=useContext(GlobalStoreContext);
    const [ editActive, setEditActive ] = useState(false);
    const [ password, setPassword ] = useState("");
    const { auth } = useContext(AuthContext);

    function getAccountMenu(loggedIn) {
        if(loggedIn){
            let lastname=auth.user.lastName.substring(0,1).toUpperCase();
            let firstname=auth.user.firstName.substring(0,1).toUpperCase();
            return(
                <Button sx={{color:"e0e0e0"}}
                variant="outlined">
                    {firstname+lastname}
                </Button>
            );
        }
        return <AccountCircle />;
    }
    const changePassword=(event)=>{
        event.preventDefault();
        auth.changePassword(password);
    }

    return (
        <div>
            <Box id="profilePage">
                <Box id="profile-head" >
                    {/* <AccountCircle id="profile=ac"></AccountCircle> */}
                    { getAccountMenu(auth.loggedIn) }
                    {/* <Box id="profile-mg">You can upload your image here</Box>
                    <Box id="profile-upload"><Button sx={{color: 'black',backgroundColor:"#c7ca3d"}}>upload image</Button></Box> */}
                </Box>
                <Box id="profile-setting">
                    <Box>Main Settings</Box>
                    <Box display="flex" sx={{paddingTop:'5%'}}>
                    <Box id="profile-name">User Name
                        <Box><Textfield defaultValue={auth.user.firstName+auth.user.lastName}></Textfield></Box>
                    </Box>
                    <Box id="profile-age">Age
                        <Box><Textfield defaultValue={auth.user.age}></Textfield></Box>
                    </Box>
                    <Box id="profile-gender">Gender
                        <Box><Textfield defaultValue={auth.user.gender}></Textfield></Box>
                    </Box>
                    </Box>
                    <Box id="profile-email" sx={{paddingTop:'5%'}}>User Email
                        <Box>{auth.user.email}</Box>
                    </Box> 
                    <Box>ChangePassword
                        <Box><Textfield></Textfield><Button onsubmit={changePassword} sx={{backgroundColor: '#c4c4c4',
                        borderColor: '#c4c4c4',color:"black"}}>Edit</Button></Box>
                    </Box> 
                </Box>
                <Box id="profile-button"></Box>
                    <Box>
                        <Button id="profile-save" variant="outlined" sx={{backgroundColor: '#c4c4c4',
  borderColor: '#c4c4c4',color:"black"}}>Save</Button>
                        <Button id="profile-cancel" variant="outlined" sx={{backgroundColor: '#c4c4c4',
  borderColor: '#c4c4c4',color:"black"}}>Cancel</Button>
                    </Box>
            </Box>
        </div>
    );
}
