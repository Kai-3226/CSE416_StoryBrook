//author kai

import { useContext} from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import thumbup from '../Images/thumbup.png'
import view from '../Images/view.png'


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
    if(work.published.publish===false) {publishflag="editing";}
    
    if(auth.user===null){
        deletebutton="";
    }
    else if(auth.user.email===work.author){
        deletebutton= 
                <IconButton style={{bottom:'0%'}} onClick={(event) => {
                    handleDeleteWork(event, work._id)
                    }} aria-label='delete'>
                    <DeleteIcon/>
                </IconButton>;
    }
    var url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvVjITwe377mswrgJw8klsFzO3KT8dmbaeg&usqp=CAU";
    var bookUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9kvIzoVAbJmLgv5k6kHQj6czGK0V0Qew1w&usqp=CAU";
   
    let response=url;
    if(work.workType===1&&work.published.publish===true) {response=work.content[0]}
    if(work.workType===0) {response=bookUrl};

    let icon = "";
    for (let i = 0; i < auth.userList.length; i++){
        if (work.authorId === auth.userList[i]._id){
            if (auth.userList[i].profile.icon === "") {
                let lastname=auth.userList[i].lastName.substring(0,1).toUpperCase();
                let firstname=auth.userList[i].firstName.substring(0,1).toUpperCase();
                icon = 
                    <Avatar position='relative' alignContent='center' sx={{height:'40px',width:'40px',bgcolor:"darkgrey",border:"1px solid",borderRadius:"0.8cm"}}>
                        {firstname+lastname}
                    </Avatar>
                ;
            } else {
                icon = 
                    <Avatar alt={work.author} src={auth.userList[i].profile.icon} />                ;
            }
        }
    }

    let workElement =
        <Box key={work.id} sx={{position:"relative",width:"30%",height:"50%",marginLeft:"10%",marginTop:"2%",marginBottom:"2.5%",mr:"5%" }}> 
           
        <Card id={work.id} hoverable="true" sx={{ position:"relative",width:"100%",height:"60%"}} onClick={(event) => {handleOpen(event, work._id)}}>
           <Box display= "flex" sx={{bgcolor:"lightgrey",position:"absolute",height:"10%",borderRadius:"0.1cm",alignItems:'center',paddingRight:"5%"}}> {deletebutton}{publishflag}  </Box>
            <CardMedia
                component="img"
                height="140"
                width="auto"
                image= {response}
                alt= {work.name}
            />
           
                <Box display="flex" sx={{bgcolor:"#C39BD3",position:"relative",width:"100%",height:"12.5%",justifyContent: 'space-between'}}> 
                    <Box sx={{position:"relative",width:"30%"}}>
                      <Typography sx={{p: 1, flexGrow: 1,fontSize: "25px", fontFamily: "Comic Sans MS",marginLeft: "3%"}}>
                          {work.name}
                      </Typography>
                    </Box>
                    <Box sx={{position:"relative",width:"35%",display:"flex", paddingTop:'2%'}}>
                        <img src={view} alt="" height='75%' width='20%'></img>
                        <Typography sx={{marginLeft: '5%', marginRight: '5%', fontSize: "25px", fontFamily: "Comic Sans MS"}} >
                            {work.view}
                        </Typography>
                        <img src={thumbup} alt="" height='75%' width='17.5%'></img>
                        <Typography sx={{marginLeft: '5%', marginRight: '5%', fontSize: "25px", fontFamily: "Comic Sans MS"}}>
                            {work.likes.length}
                        </Typography>
                        {icon}
                    </Box>
                </Box>
        </Card>
        </Box>
    return (
        workElement
    );
}

export default MypageWorkCard;