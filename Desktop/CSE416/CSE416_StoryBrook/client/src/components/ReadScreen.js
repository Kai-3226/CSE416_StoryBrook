import { useContext, useState,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import ThumbsUp from '@mui/icons-material/ThumbUpOutlined';
import ThumbsDown from '@mui/icons-material/ThumbDownOutlined';
import Share from '@mui/icons-material/Share';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CommentCard from './CommentsCard';
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import AuthContext from '../auth';

const ReadScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [comment,setComment]=useState("Any Comment?");
    const workstore = createStore({ key: 'nFA5H9elEytDyPyvKL7T' }); 
    workstore.loadJSON(store.currentWork.content);
    
    let work="";
    if(store&&store.currentWork){
        work=store.currentWork;
      
    }
    let user="";
    if(auth&&auth.loggedIn){
        user=auth.user;
      
    }
    useEffect(() => {
        if(store&&store.currentWork){
        work.view++;
        store.interactWork(work);  
        }
    }, []);

   
    let buttonDisable=true;
    if(auth.loggedIn) {buttonDisable=false};

    let likeButtonColor="default";
    let dislikeButtonColor="default";
    if(auth.loggedIn && work.likes.includes(auth.user._id)) {likeButtonColor="success";}
    if(auth.loggedIn && work.dislikes.includes(auth.user._id)) {dislikeButtonColor="success";} 

    let followOption="follow";
    let followButtonColor="primary";
    if(auth.loggedIn&&user.following.includes(work.authorId)) 
        {followOption="unfollow";followButtonColor="success";}



    const handleLikes = (event) => {
        event.preventDefault();
        event.stopPropagation(); 

        if(!work.likes.includes(auth.user._id)) //haven't like yet
            {
            work.likes.push(auth.user._id);
            likeButtonColor="success"; 
            store.interactWork(work); 
         
            user.like.push(work._id);
            auth.interact(user);
            }
        else if(work.likes.includes(auth.user._id)) //like yet so unlike it
            {
               
            for (let i = 0; i < work.likes.length; i++) {
                    if(work.likes[i]==auth.user._id) {
                        work.likes.splice(i,1);
                        likeButtonColor="default";
                        store.interactWork(work); 
                   
                        for (let s = 0; s < user.like.length; s++) {
                            if(user.like[s]==work._id) {
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
        if(!work.dislikes.includes(auth.user._id)) //haven't dislike yet so like it
            {work.dislikes.push(auth.user._id);
            dislikeButtonColor="success";
            store.interactWork(work); 
     
            user.dislike.push(work._id);
            auth.interact(user);
            }
        else if(work.dislikes.includes(auth.user._id)) //dislike yet so undislike it
            {
            for (let i = 0; i < work.dislikes.length; i++) {
                   if(work.dislikes[i]===auth.user._id) {
                        //remove the element from like array
                        work.dislikes.splice(i,1);
                        dislikeButtonColor="default";
                        store.interactWork(work); 
                       
                        for (let s = 0; s < user.dislike.length; s++) {
                            if(user.dislike[s]==work._id) {
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
        if(!user.following.includes(work.authorId) &&user._id!==work.authorId) //haven't followed yet so follow it
           {followOption="unfollow";
            followButtonColor="success";
            auth.followAuthor(work.authorId);
            
        }
        else if (user.following.includes(work.authorId)&&user._id!==work.authorId)//have followed yet so unfollow it
        {   followOption="follow";
            followButtonColor="primary";
            auth.unfollowAuthor(work.authorId);
           
        }
    };
    const handleShare = (event) => {
        event.preventDefault();

    };
    const handleComment = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let newComment={"userId" : user._id, 
                        "userName": user.profile.userName,
                        "content": comment,                                                     
                        "response": null}
        work.comments.push(newComment);
        store.interactWork(work);
        setComment("Any Comment?");
    };
    const handleReply= (event) => {
        event.preventDefault();

    };
   
    let comments = "";
    if(store.currentWork){
        console.log(work)      
        if(work.comments.length>0){  
            comments= work.comments.map((element) => (   
                      <CommentCard comment={element}/>
                ));
            }
        
    }
            
    //let add=
        // store.currentList.items.map((item)=>
        //     <Box sx={{justifyContent:'space-evenly',flexDirection:'row', bgcolor:'#d4af36',margin:2, fontSize:36, flexWrap:'wrap',justifyContent:'center'}}>
        //         <Typography variant="h3" sx={{flexDirection:'row', width:0.1}}>{(i++)+"."}</Typography>
        //         <Box><TextField sx={{width:0.9, flexDirection:'row'}} id={"item"+i} class='list-card' name={"item"+i} defaultValue={item}></TextField></Box>
        //     </Box>
        // )
    return (
       
       <Box id="readPage_screen" sx={{bgcolor:'white'} } component="form" > 
                <Box id="readPage_wordInfo" sx={{position:'relative',height:'20%',display:'flex'}}>
                    <Box id="readPage_workTitle" sx={{textAlign:'center',position:'relative',paddingTop:'2%',width:'60%'}}>
                        <Typography component="h1" variant="h3" >
                        {work.name}
                        </Typography> 
                    </Box>
                    <Box id='readPage_author' display='flex' sx={{position:'relative',paddingLeft:'5%',height:'100%',width:'40%'}}> 

                    <img src='data:image/jpeg;base64,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' 
                        style={{border:'1px solid #ddd', borderRadius:'50%'}}/>
                        
                        <Box id='readPage_author_text' sx={{position:'relative',height:'100%',width:'100%'}}>    
                            <Box id='readPage_author_name' sx={{position:'relative',textAlign:'center',width:'100%',height:'50%'}}>
                                <Typography component="h1" variant="h5" >
                                {work.authorName}
                                </Typography> 
                            </Box>
                            <Button color={followButtonColor} disable={buttonDisable} onClick={handleFollow} variant="outlined" id='readPage_author_follow' sx={{position:'relative',marginLeft:'20%',width:'60%'}}>{followOption}</Button>
                        </Box>
                    </Box>
                </Box>

            
                <Box id='readpage_wrapper' bgcolor='white' sx={{position:'relative', width:'100%',height:'80%'}}>
                <Box id="readPage_diaplayPlace"  sx={{display:'flex',position:'relative',left:'5%',height:'100%',width:'90%',border:'1px solid black'}}>    
                    
                    {/* <Box id="readPage_sideBar" sx={{position:'relative',width: '15%',height:'100%',overflowY: 'auto',bgcolor:'#2FC6E7'}}>
                        <Box id="readPage_sideBar_banner"/>                 
                                          
                    </Box> 
                    <Box id="readPage_content" sx={{marginLeft:'10%',position:'relative',width: '85%',height:'100%',borderRight:'solid',borderWidth:'1px'}}>
                           <img src='data:image/jpeg;base64,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' 
                         width='80%'></img>         
                                          
                    </Box>  */}
                     {/* <ComicViewer pages={['../Images/Comics.png', '../Images/Comics.png']} /> */}
                     <Workspace store={workstore} pageControlsEnabled={false}/>
                     <ZoomButtons store={workstore} />

                 </Box>
                 </Box>

                 <Box id="readPage_community" display="flex"  bgcolor='white' sx={{height:'10%',width:'100%',paddingTop:'1%'}}>    
                    <Box id="ViewCount"  sx={{postion:'relative',height:'100%',width:'50%',paddingLeft:'5%'}}>
                        <Typography component="h1" variant="h4" >View:  {work.view}</Typography> 
                    </Box>
                    <Box id="readPage_Toolbar"  display='flex' sx={{postion:'relative',height:'100%',width:'50%',paddingLeft:'20%'}}>
                        <IconButton disable={buttonDisable} color={likeButtonColor} onClick={handleLikes}><ThumbsUp style={{ fontSize:'25pt'}} />{work.likes.length}</IconButton>
                        <IconButton disable={buttonDisable} color={dislikeButtonColor} onClick={handleDislikes}><ThumbsDown style={{fontSize:'25pt'}} />{work.dislikes.length}</IconButton>
                        {/* <IconButton disable={buttonDisable} onClick={handleShare}><Share style={{fontSize:'25pt'}} />Share</IconButton> */}
                    </Box> 
                </Box>
                <Box id="readPage_comments_wrapper"  bgcolor='white' sx={{paddingTop:'1%',paddingLeft:'5%',minHeight:'40%',width:'95%'}}>
                <Box id="comment_banner" bgcolor='primary' display='flex'> 
                    <Typography component="h1" variant="h4" marginTop='1%' color='red'>Comments</Typography> 
                    
                    <TextField sx={{width:'60%',height:'0%',bgcolor:'lightgrey',marginTop:'1%'}} defaultValue={comment} autocomplete="off" value={comment} onChange={(e)=>setComment(e.target.value)} ></TextField>
                    <Button disable={buttonDisable} onClick={handleComment} variant="outlined" id='readPage_author_follow' sx={{position:'relative',margin:'1%',}}>submit</Button>
                
                </Box>
                    
               {comments}
                </Box>   
        </Box>
       
    );
}

export default ReadScreen;