import { useContext, useState} from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import ThumbsUp from '@mui/icons-material/ThumbUpOutlined';
import ThumbsDown from '@mui/icons-material/ThumbDownOutlined';
// import Share from '@mui/icons-material/Share';
import CommentCard from './CommentsCard';
import { Markup } from 'interweave';
import AuthContext from '../auth';
import TextField from '@mui/material/TextField';
import {useParams} from 'react-router-dom';


const ReadStory = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [comment,setComment]=useState("Any Comment?");
    const {id}=useParams();

    let work="";
    if(store&&store.currentWork&&auth.targetUser){
        work=store.currentWork;
       
    }
    else if(store){
        store.readWork(id);
    }

    let user="";
    if(auth&&auth.loggedIn){
        user=auth.user;
      
    }

   
    let buttonDisable=true;
    if(auth.loggedIn) {buttonDisable=false};

    let likeButtonColor="default";
    let dislikeButtonColor="default";
    if(auth.loggedIn && work&&work.likes.includes(auth.user._id)) {likeButtonColor="success";}
    if(auth.loggedIn && work&&work.dislikes.includes(auth.user._id)) {dislikeButtonColor="success";} 

    let followOption="follow";
    let followButtonColor="primary";
    if(auth.loggedIn&&work&&user.following.includes(work.authorId)) 
        {followOption="unfollow";followButtonColor="success";}



    const handleLikes = (event) => {
        event.preventDefault();
        event.stopPropagation(); 

        if(auth.loggedIn&&work&&!work.likes.includes(auth.user._id)) //haven't like yet
            {
            work.likes.push(auth.user._id);
            likeButtonColor="success"; 
            store.interactWork(work); 
            user.like.push(work._id);
            auth.interact(user);
            }
        else if(auth.loggedIn&&work&&work.likes.includes(auth.user._id)) //like yet so unlike it
            {
               
            for (let i = 0; i < work.likes.length; i++) {
                    if(work.likes[i]===auth.user._id) {
                        work.likes.splice(i,1);
                        likeButtonColor="default";
                        store.interactWork(work); 
                        for (let s = 0; s < user.like.length; s++) {
                            if(user.like[s]===work._id) {
                                user.like.splice(s,1);
                                auth.interact(user);
                            }
                        }
                        

                   } 
                }            
            }    
       
    };
    const handleDislikes = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(auth.loggedIn&&work&&!work.dislikes.includes(auth.user._id)) //haven't dislike yet so like it
            {work.dislikes.push(auth.user._id);
            dislikeButtonColor="success";
            store.interactWork(work); 
            user.dislike.push(work._id);
            auth.interact(user);
            }
        else if(auth.loggedIn&&work&&work.dislikes.includes(auth.user._id)) //dislike yet so undislike it
            {
            for (let i = 0; i < work.dislikes.length; i++) {
                   if(work.dislikes[i]===auth.user._id) {
                        //remove the element from like array
                        work.dislikes.splice(i,1);
                        dislikeButtonColor="default";
                        store.interactWork(work); 
                        for (let s = 0; s < user.dislike.length; s++) {
                            if(user.dislike[s]===work._id) {
                                user.dislike.splice(s,1);
                                auth.interact(user);
                            }
                        }
                   } 
                }            
            }

    };
    const handleFollow = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(user._id===work.authorId) {alert("you cant follow youself")};
        if(auth.loggedIn&&!user.following.includes(work.authorId)&&user._id!==work.authorId) //haven't followed yet so follow it
           {followOption="unfollow";
            followButtonColor="success";
            auth.followAuthor(work.authorId);    
        }
        else if (auth.loggedIn&&user.following.includes(work.authorId)&&user._id!==work.authorId)//have followed yet so unfollow it
        {   followOption="follow";
            followButtonColor="primary";
            auth.unfollowAuthor(work.authorId);
           
        }
    };

    // const handleShare = (event) => {
    //     event.preventDefault();

    // };
    const handleComment = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(auth.loggedIn){
        let newComment={"userId" : user._id, 
                        "userName": user.profile.userName,
                        "content": comment,                                                     
                        "response": null}
        work.comments.push(newComment);
        store.interactWork(work);
    }
        setComment("Any Comment?");

    };
    // const handleReply= (event) => {
    //     event.preventDefault();

    // };
    let comments = "";
    if(store.currentWork&&work){   
        if(work.comments.length>0){  
            comments= work.comments.map((element) => (   
                      <CommentCard comment={element}/>
                ));
            }
        
    }

    if(store&&store.currentWork&&store.currentWork.content&&auth.targetUser)
    return (   
       <Box id="readPage_screen" sx={{bgcolor:'white'} } component="form" > 
                <Box id="readPage_wordInfo" sx={{position:'relative',height:'20%',display:'flex'}}>
                    <Box id="readPage_workTitle" sx={{textAlign:'center',position:'relative',paddingTop:'2%',width:'60%'}}>
                        <Typography component="h1" variant="h3" >
                        {work.name}
                        </Typography> 
                    </Box>
                    <Box id='readPage_author' display='flex' sx={{position:'relative',paddingLeft:'5%',height:'100%',width:'40%'}}> 

                    
                    <Box style={{  width:"30%",height:"auto" , borderRadius:"50%" ,backgroundImage: `url(${auth.targetUser.profile.icon})`, backgroundPosition: 'center', backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat', marginLeft:"1rem"}}>
                    </Box>
                        
                        <Box id='readPage_author_text' sx={{position:'relative',height:'100%',width:'100%'}}>    
                            <Box id='readPage_author_name' sx={{position:'relative',textAlign:'center',width:'100%',height:'50%'}}>
                                <Typography component="h1" variant="h5" >
                                {auth.targetUser.profile["userName"]}
                                </Typography> 
                            </Box>
                            <Button color={followButtonColor} disabled={buttonDisable} onClick={handleFollow} variant="outlined" id='readPage_author_follow' sx={{position:'relative',marginLeft:'20%',width:'60%'}}>{followOption}</Button>
                        </Box>
                    </Box>
                </Box>

            
                <Box id='readpage_wrapper' bgcolor='white' sx={{position:'relative', width:'100%',height:'80%'}}>
                <Box id="readPage_diaplayPlace"  sx={{display:'flex',position:'relative',left:'5%',height:'100%',width:'90%',border:'1px solid black'}}>    
                     <Markup content={work.content} />

                 </Box>
                 </Box>

                 <Box id="readPage_community" display="flex"  bgcolor='white' sx={{height:'10%',width:'100%',paddingTop:'1%'}}>    
                    <Box id="ViewCount"  sx={{postion:'relative',height:'100%',width:'50%',paddingLeft:'5%'}}>
                        <Typography component="h1" variant="h4" >View:  {work.view}</Typography> 
                    </Box>
                    <Box id="readPage_Toolbar"  display='flex' sx={{postion:'relative',height:'100%',width:'50%',paddingLeft:'20%'}}>
                    <IconButton disabled={buttonDisable} color={likeButtonColor} onClick={handleLikes}><ThumbsUp style={{ fontSize:'25pt'}} />{work.likes.length}</IconButton>
                        <IconButton disabled={buttonDisable} color={dislikeButtonColor} onClick={handleDislikes}><ThumbsDown style={{fontSize:'25pt'}} />{work.dislikes.length}</IconButton>
                        {/* <IconButton disable={buttonDisable} onClick={handleShare}><Share style={{fontSize:'25pt'}} />Share</IconButton> */}
                    </Box> 
                </Box>
                <Box id="readPage_comments_wrapper"  bgcolor='white' sx={{paddingTop:'1%',paddingLeft:'5%',minHeight:'40%',width:'95%'}}>
                    <Box id="comment_banner" bgcolor='primary' display='flex'> 
                        <Typography component="h1" variant="h4" marginTop='1%' color='red'>Comments</Typography> 
                        
                        <TextField sx={{width:'60%',height:'0%',bgcolor:'lightgrey',marginTop:'1%'}} label="Comment" autoComplete="off" value={comment} onChange={(e)=>setComment(e.target.value)} ></TextField>
                        <Button disabled={buttonDisable} onClick={handleComment} variant="outlined" id='readPage_author_follow' sx={{position:'relative',margin:'1%',}}>submit</Button>
                    
                    </Box>
                        
                {comments}
                </Box>   
        </Box>
       
    );
    else return <Box>no work found</Box>;
}

export default ReadStory;