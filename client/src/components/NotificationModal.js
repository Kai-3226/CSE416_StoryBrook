import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { autocompleteClasses } from '@mui/material';
import NotificationCard from './NotificationCard';
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
    top: '5%',
    left: '65%',
    width: 300,
    minHeight:100,
    maxHeight:500,
    overflowY: 'auto',
    bgcolor:'white',
    border: '1px solid #000',
    borderRadius:'0.25cm',
    zIndex:'1',
  };

function NotificationModal() {

    let open=true;
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
     
        <Box sx={style}  visibility='vision'>
            <Box id="NotificationModal_banner" sx={{position:'relative',width:'100%',height:40,borderBottom:'1px solid #000',marginBottom:0.5}}>
            <Typography component="h1" variant="h4" >
              Notification
            </Typography> 
            </Box>
            {/* <Box  sx={{position:'relative',maxWidth:'100%',height:80,border:'1px solid #000'}}>
                NotificationCard1
            </Box>
            <Box  sx={{position:'relative',maxWidth:'100%',height:80,border:'1px solid #000'}}>
                NotificationCard2
            </Box> */}
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>
            <NotificationCard/>


                
        </Box>
   
    </div>
  );
}

export default NotificationModal;