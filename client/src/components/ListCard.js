import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ThumbsUp from '@mui/icons-material/ThumbUpOutlined';
import ThumbsDown from '@mui/icons-material/ThumbDownOutlined';
import Delete from '@mui/icons-material/DeleteOutlined';
import Open from '@mui/icons-material/KeyboardArrowDownOutlined';
import Work from './WorkspaceScreen';
import Close from '@mui/icons-material/KeyboardArrowUpOutlined';

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
    const [anchorEl, setAnchorEl] = useState(false);
    const isOpen = Boolean(anchorEl);
    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id,true);
        }
    }
    function handleLike(){
        store.like(idNamePair._id);
    }
    function handleDislike(){
        store.dislike(idNamePair._id);
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
    function handleOpen(id){
        if(!isOpen){
            setAnchorEl(!isOpen);
            store.setCurrentList(id);
        }
    }
    function handleClose(){
        setAnchorEl(!isOpen);
        store.closeCurrentList();
    }
    let open="";
    let color="unpublished-list-card"
    let publish= <Button sx={{color:"red" }} onClick={(event) => {
                    handleLoadList(event, idNamePair._id)
                }}>
                    Edit
                </Button>;
    if (idNamePair.published.published){
        color="published-list-card";
        publish="Published:"+idNamePair.published.time;
        open=
        <IconButton onClick={(event) => {handleOpen(idNamePair._id)}}>
            <Open style={{fontSize: '18pt'}}/>
        </IconButton>  
    }
    let list="";
    if(isOpen){
        list=<Work></Work>;
        open=
        <IconButton onClick={(event) => {handleClose(idNamePair._id)}}>
            <Close style={{fontSize: '18pt'}}/>
        </IconButton>
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, height:'50%' }}
            disabled={store.isListNameEditActive}
            class={color}
        >
                <div class="firstrow">
                    <div width="50%">
                        <Box sx={{ width:0.5, fontSize:24}}>{idNamePair.name}</Box>
                        <Box sx={{ width:0.5, fontSize:12, color:'blue'  }}>{"By: "+idNamePair.author}</Box>
                    </div>
                    <div width="50%">
                        <IconButton onClick={handleLike} aria-label='edit' disabled={store.isListNameEditActive}>
                                <ThumbsUp style={{fontSize:'36pt'}} />
                                {idNamePair.likes.length}
                            </IconButton>
                            <IconButton onClick={(event) => {
                                handleDislike(event, idNamePair._id)
                            }} aria-label='delete' disabled={store.isListNameEditActive}>
                                <ThumbsDown style={{fontSize:'36pt'}} />
                                {idNamePair.dislikes.length}
                            </IconButton>
                            <IconButton  onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete' disabled={store.isListNameEditActive}>
                                    <Delete style={{fontSize:'36pt'}} />
                            </IconButton>
                    </div>
                </div>
                <div id="worspace-edit">
                    {list}
                </div>
                <div class="secondrow">   
                    <Box sx={{ fontSize:12 }}>{publish}</Box>
                    <div font-size="12">
                        {"Views: "+idNamePair.view}
                        {open}
                    </div>                        
                </div>
                
        </ListItem>
    return (
        cardElement
    );
}

export default ListCard;