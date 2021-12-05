import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const CreateScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    function handleClick () {
        store.closeCurrentList();
    }
    let i = 1;
    let add=
        store.currentList.items.map((item)=>
            <Box sx={{justifyContent:'space-evenly',flexDirection:'row', bgcolor:'#d4af36',margin:2, fontSize:36, flexWrap:'wrap',justifyContent:'center'}}>
                <Typography variant="h3" sx={{flexDirection:'row', width:0.1}}>{(i++)+"."}</Typography>
                <Box><TextField sx={{width:0.9, flexDirection:'row'}}>{item}</TextField></Box>
            </Box>
        )
    return (
        <Box sx={{bgcolor:'#2C2F70'}}>
            <TextField sx={{width:0.5,bgcolor:'white'}}></TextField>
            <Box sx={{width:1,flexWrap:'wrap'}}>
                {add}
            </Box>
            <Button sx={{flexDirection:'reverse-row', bgcolor:'gray', color:'black'}} onClick={handleClick}>Save</Button>
            <Button sx={{flexDirection:'reverse-row', bgcolor:'gray', color:'black'}}>Publish</Button>
        </Box>
    );
}

export default CreateScreen;