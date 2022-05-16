import React from "react";
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Avatar from '@mui/material/Avatar';
import Cards from '@mui/material/Card';

export function Card(props) {
  const { store } = React.useContext(GlobalStoreContext);
  const { auth } = React.useContext(AuthContext);
  const { work } = props;
  
  var bookUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9kvIzoVAbJmLgv5k6kHQj6czGK0V0Qew1w&usqp=CAU";
  let response="";
  if(work.workType===1) {response=work.content[0];}
  if(work.workType===0) {response=bookUrl};

  function handleOpen(event, id){
    event.stopPropagation();
    console.log(id);
    store.readWork(id);
  }

  let icon = "";
    for (let i = 0; i < auth.userList.length; i++){
      if (work.authorId === auth.userList[i]._id){
        if (auth.userList[i].profile.icon === "") {
            let lastname=auth.userList[i].lastName.substring(0,1).toUpperCase();
            let firstname=auth.userList[i].firstName.substring(0,1).toUpperCase();
            icon = 
                <Box position='relative' alignContent='center' sx={{height:'40px',width:'40px',bgcolor:"darkgrey",border:"1px solid",borderRadius:"0.8cm",paddingTop:'10%'}}>
                    {firstname+lastname}
                </Box>
            ;
        } else {
            icon = 
                <Avatar alt={work.author} src={auth.userList[i].profile.icon} />
            ;
        }
    }
    }
  
  return (
    <Cards  hoverable="true" sx={{width:"20vw",height:"38vh",marginLeft:"4vw", userSelect: "none" }} 
      role="button"
      
      // sx={{
      //   border: "1px solid",
      //   borderRadius: "0.2cm",
      //   margin: "0 10px",
      //   height: "220px",
      //   width: "25vw",
      //   userSelect: "none"
      // }}
      tabIndex={0}
      className="card"
      onClick={(event) => {handleOpen(event, work._id)}}
    >
       <CardMedia
                component="img"
                height="80%"
                image= {response}
                alt= {work.name}
            />
                <Box display="flex" sx={{bgcolor:"#C39BD3",position:"relative",width:"100%",height:"20%",justifyContent: 'space-between'}}> 
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
                        {icon}
                    </Box>
                </Box>

    </Cards>
  );
}
