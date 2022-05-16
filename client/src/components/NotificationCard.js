import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function NotificationCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { infor } = props;
    console.log(infor);

    function handleOpen(event, id){
        event.stopPropagation();
        console.log(id);
        store.readWork(id);
        auth.ignoreWork(id);
    }

    function handleIgnore(event, id){
        event.stopPropagation();
        console.log(id);
        auth.ignoreWork(id);
    }
    
    let viewbutton=
    <Button  onClick={(event) => {
        console.log(infor);
        handleOpen(event, infor.workId)
        }} aria-label='view' size='small'>
    View
    </Button>;

    let ignorebutton=
    <Button  onClick={(event) => {
        handleIgnore(event, infor.workId)
        }} aria-label='ignore' size='small'>
    Ignore
    </Button>;

    let icon = "";
    for (let i = 0; i < auth.userList.length; i++){
        if (infor.userId === auth.userList[i]._id){
            icon = auth.userList[i].profile.icon;
        }
    }

    let element = 
    <Box id='NotificationCard'   width='100%' height='100%' marginTop='5%' bgcolor="#D2B4DE" position="relative" display="flex" fontFamily="Comic Sans MS" borderRadius="0.5cm">
         <Box id='NotificationName' height='50%' marginTop='2%' >
            <Avatar alt={infor.userName} src={icon} />
            <Box id='NotificationCard_name' sx={{position:'relative',height:'100%',paddingTop:'4%',overflow: "hidden", width:"70px",whiteSpace: "nowrap",textOverflow:"ellipsis"}}> {infor.userName}</Box>
        </Box>
        <Box id='NotificationType' height='20%' marginLeft="10%" >
            <Typography fontSize='15px' fontFamily="Comic Sans MS">
            Check out the new work 
            </Typography>
            <Typography fontSize='20px' marginTop="5%" fontFamily="Comic Sans MS" color="#000000" sx={{overflow: "hidden", width:"180px",whiteSpace: "nowrap",textOverflow:"ellipsis"}}>
            {infor.workName}
            </Typography>

            <Box id='NotificationButton' alignContent='center' marginTop="5%" display='flex' height='25%' fontFamily="Comic Sans MS">
                {viewbutton}
                {ignorebutton}
            </Box>
        </Box>
       
       
    </Box>;
    
    let cardElement =
        <Box sx={{height:100,width:'100%'}}>     
               {element}
        </Box>
    return (
        cardElement
    );
}

export default NotificationCard;