
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import FriendCard from './FriendCard'
import MessageCard from './MessageCard';
import Container from '@mui/material/Container';

const MessageScreen = () => {
    
    return (
        <Container component="main" maxWidth="xs">
       <Box id="messagePage_screen" sx={{bgcolor:'white'} } component="form" > 
                <Box id="messagePage_sideBar" >
                    <Box id="messagePage_sideBar_banner">
                        <Typography align='center'component="h1" variant="h4" >Chat</Typography>
                    </Box>
                        <Button color="primary" aria-label="add" sx={{position:'relative',left:"15%"}}>   <AddIcon />New Chat!</Button>
                    <Box id="messagePage_sideBar_friendList" sx={{position:'relative',height:'80%',overflowY:'auto'}}>
                        <FriendCard/>
                      
                    </Box>
                </Box>                    
                <Box id="messagePage_workPlace">
                    <MessageCard isyou={true} />
                    <MessageCard isyou={false}/>
                  
                </Box>
                
                <Box id= "messagePage_text">
                    <TextField id="messageTextField" defaultValue="Message field" sx={{top:'20%',width:'80%',borderRadius:'0.1cm',bgcolor:'lightgrey'}}></TextField>
                   <Button  variant="outlined" id="sendMessageButton" sx={{top:'25%',left:'5%'}}>Send</Button> 
                </Box>  
            
        </Box>
        </Container>
    );
}

export default MessageScreen;