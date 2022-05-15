//for chat message
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    @author McKilla Gorilla
*/
function MessageCard(props) {
    // function handleLike(){
    //     store.like(idNamePair._id);
    //     store.loadIdNamePairs();
    // }
    // function handleDislike(){
    //     store.dislike(idNamePair._id);
    //     store.loadIdNamePairs();
    // }

    // function handleToggleEdit(event) {
    //     event.stopPropagation();
    //     setText(idNamePair.name);
    //     toggleEdit();
    // }

    // function toggleEdit() {
    //     let newActive = !editActive;
    //     if (newActive) {
    //         store.setIsListNameEditActive();
    //     }
    //     setEditActive(newActive);
    // }

    // async function handleDeleteList(event, id) {
    //     event.stopPropagation();
    //     store.markListForDeletion(id);
    // }

    // function handleKeyPress(event) {
    //     if (event.code === "Enter") {
    //         let id = event.target.id.substring("list-".length);
    //         store.changeListName(id, text);
    //         toggleEdit();
    //     }
    // }
    // function handleUpdateText(event) {
    //     setText(event.target.value);
    // }
    // function handleOpen(id){
    //     if(!isOpen){
    //         setAnchorEl(!isOpen);
    //         let card=document.getElementById(idNamePair._id);
    //         store.setCurrentList(id);
    //         console.log(store.currentList);
    //     }
    // }
    // function handleClose(){
    //     setAnchorEl(!isOpen);
    //     let card=document.getElementById(idNamePair._id);
    //     card.classList.remove(".expand");
    //     store.closeCurrentList();
    // }
    // let open="";
    // let color="unpublished-list-card"
    // let publish= <Button sx={{color:"red" }} onClick={(event) => {
    //                 handleLoadList(event, idNamePair._id)
    //             }}>
    //                 Edit
    //             </Button>;
    // if (idNamePair.published.published){
    //     color="published-list-card";
    //     publish="Published:"+idNamePair.published.time;
    //     open=
    //     <IconButton onClick={(event) => {handleOpen(idNamePair._id)}}>
    //         <Open style={{fontSize: '18pt'}}/>
    //     </IconButton>  
    // }
    // let list="";
    // if(isOpen){
    //     list=<Work></Work>;
    //     open=
    //     <IconButton onClick={(event) => {handleClose(idNamePair._id)}}>
    //         <Close style={{fontSize: '18pt'}}/>
    //     </IconButton>
    // }
    // let deletebutton=
    // <IconButton  onClick={(event) => {
    //     handleDeleteList(event, idNamePair._id)
    //     }} aria-label='delete' disabled={store.isListNameEditActive}>
    //     <Delete style={{fontSize:'36pt'}} />
    // </IconButton>;
    // if(auth.user===null){
    //     deletebutton="";
    // }
    // else if(auth.user.email!==idNamePair.email){
    //     deletebutton="";
    // }
    let cardElement='';
    if(props.isyou){
     cardElement=
        <ListItem
            // id={idNamePair._id}
            // key={idNamePair._id}
            // sx={{ marginTop: '15px', display: 'flex', p: 1, height:'50%' }}
            // disabled={store.isListNameEditActive}
            // class={color}
        >
                 <Box id="messageCard"  bgcolor='#93C9C9'  sx={{position:'relative',marginTop:'2%',width:'100%',borderRadius:'0.5cm'}}>
                        <Box id="messageCard_wrapper"  display='flex'   sx={{position:'relative', height:60,width:'100%'}}>
                            <img src='data:image/jpeg;base64,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' 
                            alt=""
                            style={{border:'1px solid #ddd', borderRadius:'50%',position:'relative',height:'100%'}} />
                            <Box id='messageCard_Detail'  sx={{height:'100%',width:'80%',paddingLeft:'5%'}}>
                                <Box id='messageCard_senderName' sx={{width:'100%',height:'30%'}}>
                                    <Typography variant="h6">
                                    author name
                                    </Typography> 
                                </Box>
                                <Box id='messageCard_message' sx={{width:'100%',height:'70%',paddingTop:'1%'}}>
                                    <Typography variant="h5">
                                    I love it 
                                    </Typography> 
                                </Box>
                            </Box>
                        </Box>
                     
                    </Box>           
        </ListItem>}
    else {
        cardElement=
        <ListItem
            // id={idNamePair._id}
            // key={idNamePair._id}
            // sx={{ marginTop: '15px', display: 'flex', p: 1, height:'50%' }}
            // disabled={store.isListNameEditActive}
            // class={color}
        >
                 <Box id="messageCard"  bgcolor='#93C9C9' sx={{position:'relative',marginTop:'2%',width:'100%',borderRadius:'0.5cm'}}>
                        <Box id="messageCard_wrapper"  display='flex'  alignContent='end' sx={{position:'relative', height:60,width:'100%'}}>
                            
                            <Box id='messageCard_Detail'   textAlign='end' sx={{height:'100%',width:'80%',paddingRight:'5%'}}>
                                <Box id='messageCard_senderName' sx={{width:'100%',height:'30%'}}>
                                    <Typography variant="h6">
                                    author name
                                    </Typography> 
                                </Box>
                                <Box id='messageCard_message' sx={{width:'100%',height:'70%',paddingTop:'1%'}}>
                                    <Typography variant="h5">
                                    I love it 
                                    </Typography> 
                                </Box>
                            </Box>
                            <img src='data:image/jpeg;base64,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' 
                            alt=""
                            style={{border:'1px solid #ddd', borderRadius:'50%',position:'relative',height:'100%'}} />
                        </Box>
                     
                    </Box>           
        </ListItem>
    }

    

    return (
        cardElement
    );
}

export default MessageCard;