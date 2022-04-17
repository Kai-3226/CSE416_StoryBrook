import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField'
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
export default function Profile(){
    return (
        <div>
            <Box id="profilePage">
                <Box id="profile-head" >
                    <AccountCircle id="profile=ac"></AccountCircle>
                    <Box id="profile-mg">You can uploadyour image here</Box>
                    <Box id="profile-upload"><Button sx={{color: 'black',backgroundColor:"#c7ca3d"}}>upload image</Button></Box>
                </Box>
                <Box id="profile-setting">
                    <Box>Main Settings</Box>
                    <Box id="profile-name">User Name
                        <Box><Textfield></Textfield></Box>
                    </Box>
                    <Box id="profile-age">Age
                        <Box><Textfield></Textfield></Box>
                    </Box>
                    <Box id="profile-gender">Gender
                        <Box><Textfield></Textfield></Box>
                    </Box>
                    <Box id="profile-email">User Email
                        <Box>user email will be displyaed here.</Box>
                    </Box>  
                    <Box id="profile-statement">My Statement
                        <Box><Textfield></Textfield></Box>
                    </Box>
                </Box>
                <Box id="profile-button"></Box>
                    <Box>
                        <Button id="profile-save" variant="outlined" sx={{color: 'black'}}>Save</Button>
                        <Button id="profile-cancel" variant="outlined" sx={{color: 'black'}}>Cancel</Button>
                    </Box>
            </Box>
        </div>
    );
}
