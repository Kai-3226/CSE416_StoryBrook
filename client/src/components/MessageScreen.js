import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBanner from './AppBanner';
import { flexbox, maxHeight } from '@mui/system';
import { blue, grey, lightBlue, yellow } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import FriendCard from './FriendCard'
import MessageCard from './MessageCard';

const MessageScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    // function handleSave (event) {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);
    //     let newName=formData.get('listName');
    //     let newitems=[formData.get('item2'),formData.get('item3'),formData.get('item4'),formData.get('item5'),formData.get('item6')];
    //     store.editList(store.currentList._id,newName,newitems);
    // };
    // function handlePublish(event){
    //     store.publish(store.currentList._id);
    // }
    // let i = 1;
    //let add=
        // store.currentList.items.map((item)=>
        //     <Box sx={{justifyContent:'space-evenly',flexDirection:'row', bgcolor:'#d4af36',margin:2, fontSize:36, flexWrap:'wrap',justifyContent:'center'}}>
        //         <Typography variant="h3" sx={{flexDirection:'row', width:0.1}}>{(i++)+"."}</Typography>
        //         <Box><TextField sx={{width:0.9, flexDirection:'row'}} id={"item"+i} class='list-card' name={"item"+i} defaultValue={item}></TextField></Box>
        //     </Box>
        // )
    return (
       
       <Box id="messagePage_screen" sx={{bgcolor:'white'} } component="form" > 
                <Box id="messagePage_sideBar" >
                    <Box id="messagePage_sideBar_banner">
                        <Typography align='center'component="h1" variant="h4" >Chat</Typography>
                    </Box>
                        <Button color="primary" aria-label="add" sx={{position:'relative',left:"15%"}}>   <AddIcon />New Chat!</Button>
                    <Box id="messagePage_sideBar_friendList" sx={{position:'relative',height:'80%',overflowY:'auto'}}>
                        <FriendCard/>
                      
                    </Box>
                </Box> 
                
      
                <Box id="messagePage_workPlace">
                    <MessageCard isyou={true} />
                    <MessageCard isyou={false}/>
                  
                </Box>
                
                <Box id= "messagePage_text">
                    <TextField id="messageTextField" defaultValue="Message field" sx={{top:'20%',width:'80%',borderRadius:'0.1cm',bgcolor:'lightgrey'}}></TextField>
                   <Button  variant="outlined" id="sendMessageButton" sx={{top:'25%',left:'5%'}}>Send</Button> 
                </Box>  
            
        </Box>
       
    );
}

export default MessageScreen;