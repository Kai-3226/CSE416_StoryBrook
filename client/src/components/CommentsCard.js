
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';
import { useContext} from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Avatar from '@mui/material/Avatar';


function CommentCard(props) {
    const {comment} = props;
    const { auth } = useContext(AuthContext);

    let icon = "";
    for (let i = 0; i < auth.userList.length; i++){
        if (comment.authorId === auth.userList[i]._id){
            if (auth.userList[i].profile.icon === "") {
                let lastname=auth.userList[i].lastName.substring(0,1).toUpperCase();
                let firstname=auth.userList[i].firstName.substring(0,1).toUpperCase();
                icon = 
                    <Avatar position='relative' alignContent='center' sx={{height:'40px',width:'40px',bgcolor:"darkgrey",border:"1px solid",borderRadius:"0.8cm",paddingTop:'10%'}}>
                        {firstname+lastname}
                    </Avatar>
                ;
            } else {
                icon = 
                    <Avatar alt={comment.userName} src={auth.userList[i].profile.icon} />
                ;
            }
        }
    }
    
    let cardElement =
        <ListItem
        >
                 <Box id="readPage_commentCard"  sx={{position:'relative',marginTop:'1%', minHeight:50,width:'100%',borderBottom:'1px solid'}}>
                        <Box id="readPage_commentCard_commenter"  display='flex'   sx={{position:'relative', height:100,width:'100%'}}>
                            {icon}
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
                              

                            </Box>
                        </Box>
                    </Box>           
        </ListItem>
    return (
        cardElement
    );
}

export default CommentCard;