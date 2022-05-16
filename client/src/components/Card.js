//card for friend and following author
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import WorkCard from './WorkCard'
import Avatar from '@mui/material/Avatar';
import DeleteButton from '../Images/delete.png';

export default function Card(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)
    const user = auth.searchUser(props);
    console.log(props.props._id);
    console.log(props.props.author)

    function handleDelete(event,target){
        event.stopPropagation();
        auth.unfollowAuthor(target);
    }
    let cardElement =""
    const prop = props.props;
    console.log(prop)

    let icon = "";
    for (let i = 0; i < auth.userList.length; i++){
        if (prop._id === auth.userList[i]._id){
            if (auth.userList[i].profile.icon === "") {
                let lastname=auth.userList[i].lastName.substring(0,1).toUpperCase();
                let firstname=auth.userList[i].firstName.substring(0,1).toUpperCase();
                icon = 
                    <Avatar position='relative' alignContent='center' sx={{height:'50px',width:'50px',bgcolor:"darkgrey",border:"1px solid",borderRadius:"50%"}}>
                        {firstname+lastname}
                    </Avatar>
                ;
            } else {
                icon = 
                    <Avatar alt={prop.profile.userName} src={prop.profile.icon} sx={{height:'100%',width:'5%', bgcolor:"white"}} />
                ;
            }
        }
    }

    if (store.mode==="followings"){
        console.log(user);
        cardElement =
            <ListItem sx={{height: '100px', bgcolor: "#CE8FE7",borderRadius:"0.5cm", width: "97.5%",marginLeft: "1%"}}>
                {icon}
                <Box sx={{ p: 1, flexGrow: 1, color:"white", fontSize: "50px", fontFamily: "Comic Sans MS" }}>{prop.profile.userName}</Box>
                <Box sx={{ p: 1, flexGrow: 1, color:"#F9E79F", fontSize: "50px", fontFamily: "Comic Sans MS" }}>"{prop.profile.myStatement}"</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDelete(event, prop._id)
                    }} aria-label='delete' sx={{ width: "100%", height: "100%",  
                    backgroundPosition: "center",backgroundSize: "contain", backgroundRepeat: "no-repeat", cursor: "pointer" }}>
                        <img src={DeleteButton} alt="" height='100%' width='10%'></img>
                    </IconButton>
                </Box>
            </ListItem>
    }
    else if (store.mode==="works"){
        cardElement=
            <ListItem>
                <WorkCard></WorkCard>
            </ListItem>
    }
    else if (store.mode==="library"){
        cardElement=
            <ListItem>
                <WorkCard></WorkCard>
            </ListItem>
    }
    else if (store.mode==="likes"){
        cardElement=
            <ListItem>
                <WorkCard></WorkCard>
            </ListItem>
    }
    else{
        cardElement="";
    }
        

    return (
        cardElement
    );
}
