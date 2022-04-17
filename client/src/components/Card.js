import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import MessageIcon from '@mui/icons-material/MessageOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
//import WorkCard from './WorkCard'

export default function Card(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)
    function handleMessage(){

    }
    function handleDelete(){
        
    }
    let cardElement =""
    if(store.mode=="friends"){
        const user = auth.searchUser(props)
        cardElement =
            <ListItem>
                <Box sx={{ p: 1, flexGrow: 1 }}>{user.firstName+" "+user.lastName}</Box>
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
        const user = auth.searchUser(props)
        cardElement =
            <ListItem>
                    <Box sx={{ p: 1, flexGrow: 1 }}>{user.firstName+" "+user.lastName}</Box>
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
            
            </ListItem>
    }
    else if (store.mode=="library"){
        <ListItem>
                
            </ListItem>
    }
    else if (store.mode=="likes"){
        <ListItem>
              
            </ListItem>
    }
    else{
        cardElement="";
    }
        

    return (
        cardElement
    );
}
