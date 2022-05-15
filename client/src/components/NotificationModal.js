import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  // let open = "";
  // if (store.openNotification === true){
  //   open = "visible";
  // } else {
  //   open = "hidden";
  // }
  
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

  let notification = "";
  let list = [];
  if(auth.user !== null){
    list = auth.user.notification;
    for (let s = 0; s < list.length; s++) {
      if(list[s].workType !== store.status) {
          list.splice(s,1);
      }
  }
    notification = list.map((item) => (<NotificationCard infor={item}/>))
  }
  // visibility={open}
  return (
    <div>
     
        <Box sx={style}  >  
            <Box id="NotificationModal_banner" sx={{position:'relative',width:'100%',height:40,borderBottom:'1px solid #000',marginBottom:0.5}}>
            <Typography component="h1" variant="h4"  color="black">
              Notification
            </Typography> 
            </Box>
            {notification}
        </Box>
   
    </div>
  );
}

export default NotificationModal;