import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ThumbsUp from '@mui/icons-material/ThumbUpOutlined';
import ThumbsDown from '@mui/icons-material/ThumbDownOutlined';
import Delete from '@mui/icons-material/DeleteOutlined';
import Open from '@mui/icons-material/KeyboardArrowDownOutlined';
import Close from '@mui/icons-material/KeyboardArrowUpOutlined';
import { Typography } from '@mui/material';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    @author McKilla Gorilla
*/
function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const {comment} = props;
    const [anchorEl, setAnchorEl] = useState(false);
    const isOpen = Boolean(anchorEl);
    const { auth } = useContext(AuthContext);


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

    let cardElement =
        <ListItem
            // id={idNamePair._id}
            // key={idNamePair._id}
            // sx={{ marginTop: '15px', display: 'flex', p: 1, height:'50%' }}
            // disabled={store.isListNameEditActive}
            // class={color}
        >
                 <Box id="readPage_commentCard"  sx={{position:'relative',marginTop:'1%', minHeight:50,width:'100%',borderBottom:'1px solid'}}>
                        <Box id="readPage_commentCard_commenter"  display='flex'   sx={{position:'relative', height:100,width:'100%'}}>
                            <img src='data:image/jpeg;base64,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' 
                            style={{border:'1px solid #ddd', borderRadius:'50%',position:'relative',height:'50%'}} />
                            <Box id='readPage_commentCard_commenterDetail'  sx={{height:'100%',width:'80%',paddingLeft:'5%'}}>
                                <Box id='commentCard_commenterDetail_authorName' sx={{width:'100%',height:'30%'}}>
                                    <Typography variant="h6">
                                    {comment.userName}
                                    </Typography> 
                                </Box>
                                <Box id='commentCard_commenterDetail_comment' sx={{width:'100%',height:'35%'}}>
                                    <Typography variant="h5">
                                    {comment.content}
                                    </Typography> 
                                </Box>
                                {/* <IconButton id='commentCard_replyButton' sx={{width:'5%',height:'25%'}}>
                                    <Typography  variant="button" color='red'>
                                    reply 
                                    </Typography> 
                                </IconButton> */}

                            </Box>
                        </Box>
                        {/* <Box id="readPage_commentsCard_responser"  display='flex'   sx={{position:'relative', left:'10%',height:100,width:'90%'}}>
                            <img src='data:image/jpeg;base64,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' 
                            style={{border:'1px solid #ddd', borderRadius:'50%',position:'relative',height:'50%'}} />
                            <Box id='readPage_commentCard_responserDetail'  sx={{height:'100%',width:'80%',paddingLeft:'5%'}}>
                                <Box id='commentCard_responserDetail_authorName' sx={{width:'100%',height:'30%'}}>
                                    <Typography variant="h6">
                                    Groot
                                    </Typography> 
                                </Box>
                                <Box id='commentCard_responserDetail_comment' sx={{width:'100%',height:'35%'}}>
                                    <Typography variant="h5">
                                    I am Grooot
                                    </Typography> 
                                </Box>
                                <IconButton id='commentCard_replyButton' sx={{width:'5%',height:'25%'}}>
                                    <Typography  variant="button" color='red'>
                                    reply 
                                    </Typography> 
                                </IconButton>

                            </Box>
                        </Box> */}
                    </Box>           
        </ListItem>
    return (
        cardElement
    );
}

export default CommentCard;