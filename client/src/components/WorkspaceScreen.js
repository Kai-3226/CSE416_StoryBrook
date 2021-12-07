import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AuthContext from '../auth/';
import ListItem from '@mui/material/ListItem';

 
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const auth = useContext(AuthContext);
    const [input,setInput] = useState("");
    function handleUpdateText(event) {
        setInput(event.target.value);
    }
    function handleKeyPress(event) {
        console.log(store.currentList,"asdfadf");
        if(event.code === "Enter") {
            let comment=input;
            let author=""
            store.comment(input,store.currentList._id);
            store.closeCurrentList();
        }
    }
    let editItems = "";
    let comment = "";
    if (store.currentList) {
        editItems = (  
            <Box id="edit-numbering">
            {store.currentList.items.map((item) => (
                <Box className='item-number'sx={{flexDirection:"column",color:'#d4af36', bgcolor: 'inherit'}}>
                    {(store.currentList.items.indexOf(item)+1)+". "+store.currentList.items[store.currentList.items.indexOf(item)]}
                </Box>
            ))}
            </Box>
        );
        comment = (
            <Box id="edit-numbering" sx={{overflow:'scroll'}}>
            <ListItem sx={{ marginTop: '15px', display: 'flex', p: 1, height:'100%', flexDirection:'column' }}>
            {store.currentList.comment.map((text) => (
                <Box className='item-number' sx={{flexDirection:"column",color:'black', bgcolor: '#d4af36', overflow: 'scroll'}}>
                    <Box sx={{color:'blue'}}>{text.author}</Box>
                    <Box>{text.comment}</Box>
                </Box>
            ))}
            </ListItem>
            <TextField sx={{bgcolor:'white',color:'white'}} label="add comment..." 
            onKeyPress={(event) => {
                handleKeyPress(event)
            }}
            onChange={(event) => {handleUpdateText(event)}}
            name="comment"
            id="comment"></TextField>
            </Box>
        );
    }
    console.log(comment);
    return (
        <div id="top5-workspace">
            <div id="workspace-edit">
                {editItems}
                {comment}
            </div>
        </div>
    )
            
}

export default WorkspaceScreen;