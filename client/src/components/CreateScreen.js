import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const CreateScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    function handleSave (event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let newName=formData.get('listName');
        let newitems=[formData.get('item2'),formData.get('item3'),formData.get('item4'),formData.get('item5'),formData.get('item6')];
        store.editList(store.currentList._id,newName,newitems);
    };
    function handlePublish(event){
        store.publish(store.currentList._id);
    }
    let i = 1;
    let add=
        store.currentList.items.map((item)=>
            <Box sx={{justifyContent:'space-evenly',flexDirection:'row', bgcolor:'#d4af36',margin:2, fontSize:36, flexWrap:'wrap',justifyContent:'center'}}>
                <Typography variant="h3" sx={{flexDirection:'row', width:0.1}}>{(i++)+"."}</Typography>
                <Box><TextField sx={{width:0.9, flexDirection:'row'}} id={"item"+i} class='list-card' name={"item"+i} defaultValue={item}></TextField></Box>
            </Box>
        )
    return (
        <Box sx={{bgcolor:'#2C2F70'}} component="form" onSubmit={handleSave}>
            <TextField sx={{width:0.5,bgcolor:'white'}} id="listName" name="listName" defaultValue={store.currentList.name}></TextField>
            <Box sx={{width:1,flexWrap:'wrap'}}>
                {add}
            </Box>
            <Button sx={{flexDirection:'reverse-row', bgcolor:'gray', color:'black'}} type="submit">Save</Button>
            <Button sx={{flexDirection:'reverse-row', bgcolor:'gray', color:'black'}}  onClick={(event) => {
            handlePublish(event)}}>
                Publish
            </Button>
        </Box>
    );
}

export default CreateScreen;