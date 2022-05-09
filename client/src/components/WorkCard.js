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
import { createStore } from 'polotno/model/store';


function WorkCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const { work } = props;

    function handleOpen(event, id){
        event.stopPropagation();
        console.log(id);
        store.setCurrentWork(id);
    }

    async function handleDeleteWork(event, id) {
        event.stopPropagation();
        store.markWorkForDeletion(id);
    }
    
    
    
    let deletebutton=
    <IconButton  onClick={(event) => {
        handleDeleteWork(event, work._id)
        }} aria-label='delete'>
        <DeleteIcon/>
    </IconButton>;
    
    if(auth.user===null){
        deletebutton="";
    }
    else if(auth.user._id!==work.author || store.mode!=="user"){
        deletebutton=
        "";
    }

    const workstore = createStore({ key: 'nFA5H9elEytDyPyvKL7T' });
    var url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvVjITwe377mswrgJw8klsFzO3KT8dmbaeg&usqp=CAU";
    var bookUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9kvIzoVAbJmLgv5k6kHQj6czGK0V0Qew1w&usqp=CAU";
    
    let response=url;
    if(work.workType==0) {response=bookUrl};
  
    
    let workElement =
        <Card key={'card'+work.id} id={work.id} hoverable="true" sx={{ position:"relative",width:"20%",height:"100%",margin:"2.5%" }} onClick={(event) => {handleOpen(event, work._id)}}>
            {deletebutton}
            <CardMedia
                component="img"
                height="140"
                image= {response}
                alt= {work.name}
            />
           
                <Box display="flex" sx={{bgcolor:"lightgreen",position:"relative",width:"100%",height:"20%"}}> 
                <Typography paddingRight="20%" >
                    {work.name}
                </Typography>
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
        </Card>
    return (
        workElement
    );
}

export default WorkCard;