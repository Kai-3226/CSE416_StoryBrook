import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TextField } from '@mui/material';
import FriendCard from './FriendCard';
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author McKilla Gorilla
*/

const style = {  
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', 
    width: 600,
    minHeight:400,
    maxHeight:400,
    border: '2px solid #000',
    boxShadow: 24,
    bgcolor: '#E46B6B',
    border: '1px solid #000',
    borderRadius:'0.25cm',
    zIndex: 1,
   
  };

function FriendModal() {

    // const { store } = useContext(GlobalStoreContext);
    // let name = "";
    // if (store.listMarkedForDeletion) {
    //     name = store.listMarkedForDeletion.name;
    //     open=true;
    // }
    // function handleDeleteList(event) {
    //     store.deleteMarkedList();
    //     handleClose();
    // }
    // function handleClose(event){
    //     store.unmarkListForDeletion();
    //     open=false;
    // }
    
  return (
    <div>
     
        <Box sx={style} visibility='hidden'>
            <Box id="FriendModal_banner" sx={{textAlign:'center' ,position:'relative',width:'100%',height:40,borderBottom:'1px solid #000',marginBottom:0.5}}>
            <Typography component="h1" variant="h4" color="white">
            Select a friend to start the chat
            </Typography> 
            </Box>
            <TextField id="FriendModal_textField" defaultValue="Search Friend" sx={{top:'0%',width:'80%',left:'10%',borderRadius:'0.1cm',bgcolor:'#C4C4C4',marginBottom:0.5,opacity:'80%'}}>
                
            </TextField>

            <Box id="friendModal_listPlace" sx={{position:'relative',width:'80%',left:'10%',maxHeight:280,bgcolor:'inherit',overflowY:'auto'} } component="form" > 
                 
                  
                    <FriendCard/>
                    <FriendCard/> 
                    <FriendCard/>
                    <FriendCard/>
                    <FriendCard/>
                    <FriendCard/>
                    <FriendCard/>
                    <FriendCard/>
                    <FriendCard/>
            </Box>
        </Box>
   
    </div>
  );
}

export default FriendModal;