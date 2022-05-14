//card for friend and following author
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import MessageIcon from '@mui/icons-material/MessageOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkCard from './WorkCard'

export default function Card(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)
    const user = auth.searchUser(props);
    console.log(user);
    function handleMessage(){

    }
    function handleDelete(event,target){
        event.stopPropagation();
        auth.unfollowAuthor(target);
    }
    let cardElement =""
    const prop = props.props;
    if (store.mode=="followings"){
        console.log(user);
        cardElement =
            <ListItem sx={{bgcolor: "red",border: "1px solid black"}}>
                <Box sx={{ p: 1, flexGrow: 1 }}>{prop.email}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDelete(event, prop._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
</ListItem>
    }
    else if (store.mode=="works"){
        cardElement=
            <ListItem>
                <WorkCard></WorkCard>
            </ListItem>
    }
    else if (store.mode=="library"){
        cardElement=
            <ListItem>
                <WorkCard></WorkCard>
            </ListItem>
    }
    else if (store.mode=="likes"){
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
