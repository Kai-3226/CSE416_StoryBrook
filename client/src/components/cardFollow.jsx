import React from "react";
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Cards from '@mui/material/Card';
import thumbup from '../Images/thumbup.png'
import view from '../Images/view.png'

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
                <Avatar position='relative' alignContent='center' sx={{height:'40px',width:'40px',bgcolor:"darkgrey",border:"1px solid",borderRadius:"0.8cm",marginRight: '5%'}}>
                    {firstname+lastname}
                </Avatar>
            ;
        } else {
            icon = 
                <Avatar alt={work.author} src={auth.userList[i].profile.icon} sx={{marginRight: '5%'}} />
            ;
        }
    }
    }
  
  return (
    <Cards  hoverable="true" sx={{width:"25vw",height:"90%",marginLeft:"4vw", userSelect: "none" }}  
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
                width="100%"
                image= {response}
                alt= {work.name}
            />
                <Box display="flex" sx={{bgcolor:"#C39BD3",position:"relative",width:"100%",height:"20%",justifyContent: 'space-between'}}> 
                    <Box sx={{position:"relative",width:"30%"}}>
                      <Typography sx={{p: 1, flexGrow: 1,fontSize: "25px", fontFamily: "Comic Sans MS",paddingLeft: "3%"}}>
                          {work.name}
                      </Typography>
                    </Box>
                    <Box sx={{position:"relative",width:"60%",display:"flex", paddingTop:'2%'}}>
                        <img src={view} alt="" height='75%' width='20%'></img>
                        <Typography sx={{marginLeft: '2%', marginRight: '2%', fontSize: "25px", fontFamily: "Comic Sans MS"}} >
                            {work.view}
                        </Typography>
                        <img src={thumbup} alt="" height='75%' width='17.5%'></img>
                        <Typography sx={{marginLeft: '2%', marginRight: '2%', fontSize: "25px", fontFamily: "Comic Sans MS"}}>
                            {work.likes.length}
                        </Typography>
                        {icon}
                    </Box>
                </Box>
    </Cards>
  );
}
