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
    console.log(props);
    function handleMessage(){

    }
    function handleDelete(){
        
    }
    let cardElement =""
    if(store.mode=="friends"){
        console.log(user);
        cardElement =
            <ListItem>
                <Box sx={{ p: 1, flexGrow: 1 }}>{props.email}</Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleMessage} aria-label='edit'>
                        <MessageIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDelete(event, user._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
            </ListItem>
        }
    else if (store.mode=="followings"){
        console.log(props);
        cardElement =
            <ListItem>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{props.email}</Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                            handleDelete(event, user._id)
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
