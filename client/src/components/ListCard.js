import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ThumbsUp from '@mui/icons-material/ThumbUpOutlined';
import ThumbsDown from '@mui/icons-material/ThumbDownOutlined';
import Delete from '@mui/icons-material/DeleteOutlined';
import Open from '@mui/icons-material/KeyboardArrowDownOutlined';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        setText(idNamePair.name);
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleEdit(){
    }
    let color="#fffef2"
    let publish= <Button sx={{color:"red" }} onClick={(event) => {
                    handleLoadList(event, idNamePair._id)
                }}>
                    Edit
                </Button>;
    if (idNamePair.published.published){
        color="#d3d4f6"
        publish="Published:"+idNamePair.published.time;
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, bgcolor:color, height:'50%' }}
            disabled={store.isListNameEditActive}
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1, height:'40%' }}>
                    <Box sx={{ flexDirection: 'column', fontSize:24}}>{idNamePair.name}</Box>
                    <Box sx={{ flexDirection: 'column', fontSize:12, color:'blue'  }}>{"By: "+idNamePair.author}</Box>
                    <Box sx={{ flexDirection: 'column', fontSize:12 }}>{publish}</Box>
                </Box>
                <Box sx={{ flexDirection:'row'}}>
                    <Box sx={{ p: 1,height:'40%' }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit' disabled={store.isListNameEditActive}>
                            <ThumbsUp style={{fontSize:'36pt'}} />
                            {idNamePair.likes.length}
                        </IconButton>
                        <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete' disabled={store.isListNameEditActive}>
                            <ThumbsDown style={{fontSize:'36pt'}} />
                            {idNamePair.dislikes.length}
                        </IconButton>
                    </Box>
                    <Box sx={{ height:'40%' }}>
                        <Box sx={{ fontSize:12}}>{"Views: "+idNamePair.view}</Box>
                    </Box>
                </Box>
                <Box sx={{ height:'40%', flexDirection: 'column', justifyContent:'space-around'}}>
                    <Box >
                        <IconButton sx={{flexDirection:'column'}} onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete' disabled={store.isListNameEditActive}>
                                <Delete style={{fontSize:'18pt'}} />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton>
                            <Open style={{fontSize: '18pt'}}/>
                        </IconButton>
                    </Box>    
                </Box>
                
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;