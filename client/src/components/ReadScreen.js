import { useContext, useState} from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import ThumbsUp from '@mui/icons-material/ThumbUpOutlined';
import ThumbsDown from '@mui/icons-material/ThumbDownOutlined';
// import Share from '@mui/icons-material/Share';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import CommentCard from './CommentsCard';
import AuthContext from '../auth';
import {useParams} from 'react-router-dom';
import { Pagination } from '@mui/material';
import Avatar from '@mui/material/Avatar';


const ReadScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [comment,setComment]=useState("Any Comment?");
    const {id}=useParams();
    const [page, setPage] = useState(1);
  

    
    let work=null;
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
    if(auth.loggedIn &&work&& work.likes.includes(auth.user._id)) {likeButtonColor="success";}
    if(auth.loggedIn &&work&& work.dislikes.includes(auth.user._id)) {dislikeButtonColor="success";} 

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
        console.log(auth.loggedIn);
        event.preventDefault();
        event.stopPropagation();
        if(user._id===work.authorId) {alert("you cant follow youself")};
        if(auth.loggedIn&&!user.following.includes(work.authorId) &&user._id!==work.authorId) //haven't followed yet so follow it
           {console.log("follow");
            followOption="unfollow";
            followButtonColor="success";
            auth.followAuthor(work.authorId);
            
        }
        else if (auth.loggedIn&&user.following.includes(work.authorId)&&user._id!==work.authorId)//have followed yet so unfollow it
        {   console.log("unfollow");
            followOption="follow";
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
        if(auth.loggedIn) 
        {
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
    
   function nextPage(){
    let index=page;
    if(index<work.content.length){setPage(index+1);}


   }
   const handleChange = (event, value) => {
    event.preventDefault();
    event.stopPropagation();
    setPage(value);
        };
    //let add=
        // store.currentList.items.map((item)=>
        //     <Box sx={{justifyContent:'space-evenly',flexDirection:'row', bgcolor:'#d4af36',margin:2, fontSize:36, flexWrap:'wrap',justifyContent:'center'}}>
        //         <Typography variant="h3" sx={{flexDirection:'row', width:0.1}}>{(i++)+"."}</Typography>
        //         <Box><TextField sx={{width:0.9, flexDirection:'row'}} id={"item"+i} class='list-card' name={"item"+i} defaultValue={item}></TextField></Box>
        //     </Box>
        // )

    let icon = "";
    if (auth.targetUser && auth.targetUser.profile.icon === "") {
        let lastname=auth.targetUser.lastName.substring(0,1).toUpperCase();
        let firstname=auth.targetUser.firstName.substring(0,1).toUpperCase();
        icon = 
            <Avatar position='relative' alignContent='center' sx={{height:'40px',width:'40px',bgcolor:"darkgrey",border:"1px solid",borderRadius:"0.8cm",paddingTop:'10%'}}>
                {firstname+lastname}
            </Avatar>
        ;
    } else if (auth.targetUser){
        icon = 
            <Avatar alt={auth.targetUser._id} src={auth.targetUser.profile.icon} />
        ;
    }

    if(store&&store.currentWork&&store.currentWork.content&&auth.targetUser){
    return (
       <Box id="readPage_screen" sx={{bgcolor:'white'} } component="form" > 
                <Box id="readPage_wordInfo" sx={{position:'relative',height:'20%',display:'flex'}}>
                    <Box id="readPage_workTitle" sx={{textAlign:'center',position:'relative',paddingTop:'2%',width:'60%'}}>
                        <Typography component="h1" variant="h3" >
                        {work.name}
                        </Typography> 
                    </Box>
                    <Box id='readPage_author' display='flex' sx={{position:'relative',paddingLeft:'5%',height:'100%',width:'40%'}}> 
                    {icon}
                    {/* <Box style={{  width:"30%",height:"auto" , borderRadius:"50%" ,backgroundImage: `url(${auth.targetUser.profile['icon']})`, backgroundPosition: 'center', backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat', marginLeft:"1rem"}}>
                    </Box> */}
                   {/*  <img src={auth.targetUser.profile['icon']}
                        alt=""
                        style={{border:'1px solid #ddd', borderRadius:'50%'}}/> */}
                        
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

            
                <Box id='readpage_wrapper' bgcolor='white' sx={{position:'relative', width:'100%',height:'150%',borderTop:'1px solid black'}}>
                    <Pagination count={work.content.length} page={page} onChange={handleChange} />
                    <Box id="readPage_diaplayPlace"  sx={{position:'relative',left:'5%',height:'95%',width:'90%',border:'1px solid black'}}>     
                        {/* <Box id="readPage_sideBar" sx={{position:'relative',width: '15%',height:'100%',overflowY: 'auto',bgcolor:'#2FC6E7'}}>
                            <Box id="readPage_sideBar_banner"/>                                        
                        </Box>  */}
                        <Box id="readPage_content"sx={{textAlign:'center',paddingLeft:'2%',position:'relative',width: '100%',height:'100%',borderRight:'solid',borderWidth:'1px', overflowY: 'auto',}}>
                            <img src={work.content[page-1]} onClick={nextPage} height='90%' alt=""></img>                        
                        </Box>  
                      
                        {/* <img 
                    src={work.content[0]}
                    alt="new"
                    /> */}
                        {/* <Workspace store={workstore} pageControlsEnabled={false}/>
                        <ZoomButtons store={workstore} /> */}
                        {/* <ComicViewer pages={["../Images/Logo.png"]}>fiadfkadlg</ComicViewer> */}

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
       
    );}
    else return <Box fontSize="50px">Loading</Box>;
}

export default ReadScreen;