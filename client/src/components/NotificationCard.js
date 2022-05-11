import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function NotificationCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { infor } = props;

    function handleOpen(event, id){
        event.stopPropagation();
        console.log(id);
        store.setCurrentWork(id);
        auth.ignoreWork(id);
    }

    function handleAddFriend(event, id){
        event.stopPropagation();
        console.log(id);
        auth.addFriend(id);
    }

    function handleRefuceFriend(event, id){
        event.stopPropagation();
        console.log(id);
        auth.refuseFriend(id);
    }

    function handleIgnore(event, id){
        event.stopPropagation();
        console.log(id);
        auth.ignoreWork(id);
    }
    
    let acceptbutton=
    <Button  onClick={(event) => {
        handleAddFriend(event, infor._id)
        }} aria-label='accept' size='small'>
    Accept
    </Button>;

    let refusebutton=
    <Button  onClick={(event) => {
        handleRefuceFriend(event, infor._id)
        }} aria-label='refuce' size='small'>
    Refuse
    </Button>;
    
    let viewbutton=
    <Button  onClick={(event) => {
        handleOpen(event, infor._workId)
        }} aria-label='view' size='small'>
    View
    </Button>;

    let ignorebutton=
    <Button  onClick={(event) => {
        handleIgnore(event, infor._workId)
        }} aria-label='ignore' size='small'>
    Ignore
    </Button>;

    let friendElement = 
    <Box id='NotificationCard'   width='100%' height='100%' marginTop='5%'>
        <Box id='NotificationType' height='20%'>
            <Typography fontSize='15px'>
            You recieve a friend request from:
            </Typography>
        </Box>
        <Box id='NotificationName' display='flex' height='50%' marginTop='2%'>
            <Avatar alt={infor.user} src={infor.avatar} />
            <Box id='NotificationCard_name' sx={{textAlign:'center',position:'relative',width:'70%',height:'100%',paddingTop:'4%'}}> {infor.userName}</Box>
        </Box>
        <Box id='NotificationButton' alignContent='center' display='flex' height='25%'>
            {acceptbutton}
            {refusebutton}
        </Box>
    </Box>;

    let workElement = 
    <Box id='NotificationCard'   width='100%' height='100%' marginTop='5%'>
        <Box id='NotificationType' height='20%'>
            <Typography fontSize='15px'>
            Check out the new work post by: 
            </Typography>
        </Box>
        <Box id='NotificationName' display='flex' height='50%' marginTop='2%'>
            <Avatar alt={infor.user} src={infor.avatar} />
            <Box id='NotificationCard_name' sx={{textAlign:'center',position:'relative',width:'70%',height:'100%',paddingTop:'4%'}}> {infor.userName}</Box>
        </Box>
        <Box id='NotificationButton' alignContent='center' display='flex' height='25%'>
            {viewbutton}
            {ignorebutton}
        </Box>
    </Box>;

    let element = "";
    if (infor.type === 0){
        element = friendElement;
    } else {
        element = workElement;
    }
    
    let cardElement =
        <Box sx={{height:100,width:'100%',bgcolor:'#47D366'}}>     
               {element}
        </Box>
    return (
        cardElement
    );
}

export default NotificationCard;