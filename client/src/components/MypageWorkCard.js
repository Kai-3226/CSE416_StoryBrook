//author kai

import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';


function MypageWorkCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { work } = props;

    function handleOpen(event, id){
        event.stopPropagation();
        store.setCurrentWork(id);
    }

    function handleDeleteWork(event, id) {
        event.stopPropagation();
        store.markWorkForDeletion(id);
    }
    
    let deletebutton=''
    let publishflag="published";
    if(work.published.publish==false) {publishflag="editing";}
    
    if(auth.user===null){
        deletebutton="";
    }
    else if(auth.user.email==work.author){
        deletebutton= 
                <IconButton  onClick={(event) => {
                    handleDeleteWork(event, work._id)
                    }} aria-label='delete'>
                    <DeleteIcon/>
                </IconButton>;
    }
    var url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvVjITwe377mswrgJw8klsFzO3KT8dmbaeg&usqp=CAU";
    var bookUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9kvIzoVAbJmLgv5k6kHQj6czGK0V0Qew1w&usqp=CAU";
   
    
    let response=url;
    if(work.workType==0) {response=bookUrl};

    let workElement =
        <Box key={work.id} sx={{ position:"relative",width:"35%",height:"100%",marginLeft:"8%",marginTop:"5%",marginBottom:"5%" }}> 
            {deletebutton}

        <Card id={work.id} hoverable="true" sx={{ position:"relative",width:"100%",height:"100%"}} onClick={(event) => {handleOpen(event, work._id)}}>
           <Box sx={{bgcolor:"lightgrey",position:"absolute",height:"10%"}}> {publishflag} </Box>
            <CardMedia
                component="img"
                height="100%"
                image= {response}
                alt= {work.name}
            />
           
                <Box display="flex" sx={{bgcolor:"lightgreen",position:"relative",width:"100%",height:"20%",justifyContent: 'space-between'}}> 
                    <Box  sx={{bgcolor:"",position:"relative",width:"30%"}}>
                    <Typography sx={{justifyContent:'center'}}>
                        {work.name}
                    </Typography>
                    </Box>
                    <Box sx={{display:"flex",alignContent:'center'}}>
                        <RemoveRedEyeIcon></RemoveRedEyeIcon>
                        <Typography >
                            {work.view}
                        </Typography>
                        <ThumbUpIcon size='20%'></ThumbUpIcon>
                        <Typography>
                            {work.likes.length}
                        </Typography>
                        <Avatar alt={work.author} src={work.avatar} />
                    </Box>
                </Box>
        </Card>
        </Box>
    return (
        workElement
    );
}

export default MypageWorkCard;