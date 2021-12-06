import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import TextField from '@mui/material/TextField';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    let editItems = "";
    let comment = "";
    let i = 1;
    if (store.currentList) {
        comment =
            <List sx={{width:0.5, bgcolor:"#d4af36"}}>
                {
                store.currentList.comment.map((comment) => (
                    <div>
                        <div>{comment.author}</div>
                        <div>{comment.comment}</div>
                    </div>
                ))
                }
            </List>;
        editItems = 
            <List sx={{width:0.5, bgcolor:"#d4af36"}}>
                {
                store.currentList.items.map((item) => (
                    <div>{(i++)+". "+item}</div>
                ))
                }
            </List>;
    }
    return (
        <div id="top5-workspace">
            <div id="workspace-edit">
                {editItems}
            </div>
            <div id="edit-items">
                {comment}
                <TextField></TextField>
            </div>
        </div>
    )
}

export default WorkspaceScreen;