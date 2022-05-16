import { useContext, useState} from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory, useLocation } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import DeleteModal from './DeleteModal';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import logo_comic from '../Images/logo_comic.png';
import logo_tale from '../Images/logo_tale.png';
import logo from '../Images/Logo.png';
import comic_create from '../Images/comic_create.png';
import story_create from '../Images/story_create.png';
import NotificationModal from './NotificationModal';
import ringing from '../Images/ringing.png';
import not_ringing from '../Images/not_ringing.png';
import Avatar from '@mui/material/Avatar';


export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const history = useHistory();
    const location = useLocation();
    const { store } = useContext(GlobalStoreContext);
    const [popUp, setpopUp] = useState(false);
    const [targetPage, setTargetPage] = useState("Creating");

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSplashScreen = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(location.pathname.includes("create")){
            setpopUp(true);
            setTargetPage("splash");
        }
        else{
            history.push('/')
        }
    }

    const handleLogout = () => {
        if(location.pathname.includes("create")){
            setpopUp(true);
            setTargetPage("logout")
        }
        else {
            handleMenuClose();
            auth.logoutUser();
           

        }
            
    }

    const handleMyPage = () => {
        if(location.pathname.includes("create")){
            setpopUp(true);
            setTargetPage("myPage")
        }
        else {
            if(store.status===0||store.status===1)
            {handleMenuClose();
            history.push('/myPage')}
            else {
                alert("Pick one type story first ^0^.")
            }
        }
            
    }

    const handleProfile = () => {
        if(location.pathname.includes("create")){
            setpopUp(true);
            setTargetPage("profile")
        }
        else {
            handleMenuClose();
            history.push('/profile')
        }
            
    }

    const handleCreate = (event) => {
        event.stopPropagation();
        if(store.status === 0 || store.status === 1)
        {  
            //editToolbar= <CreatePageBanner/>
            store.createWork();
            setTargetPage("Creating");
        }
    }

    function handleCheckClose (event){
        event.stopPropagation();
        setpopUp(false);
        setTargetPage("Creating");
    };

    const direction = async(event)=>{
        event.preventDefault();
        setpopUp(false);
        if(targetPage === 'logout'){
            auth.logoutUser();
        }
        else if(targetPage === 'splash'){
            history.push('/')
        } 
        else if (targetPage === 'myPage') {
            history.push('/myPage')
        } 
        else if (targetPage === 'profile') {
            history.push('/profile')
        }
        else{console.log("can't create")}
    }
   
    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>

        </Menu>
    );

    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMyPage}>My Page</MenuItem>
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>            

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn){
            menu = loggedInMenu;

            // if (store.currentWork && store.currentWork.published.publish == false && targetPage == "Creating"){
            //     editToolbar = <CreatePageBanner/>
            // } else 
            if((store.status===0||store.status===1)){
                let createUrl="";
                if(store.status===0) {createUrl=story_create}
                else if(store.status===1) {createUrl=comic_create};
                editToolbar=
                <IconButton variant="outlined" onClick={(event)=>handleCreate(event)} sx={{top:'5px',height:'50px',width:'100px'}}>
                         <img src={createUrl}
                         alt=""
            height='32'
          ></img>
                        </IconButton> 
                
            }
    }
    
    function getAccountMenu(loggedIn) {
        if(loggedIn){
            if (auth.user.profile.icon === "") {
                let lastname=auth.user.lastName.substring(0,1).toUpperCase();
                let firstname=auth.user.firstName.substring(0,1).toUpperCase();
                return(
                    <Avatar position='relative' alignContent='center' sx={{height:'40px',width:'40px',bgcolor:"darkgrey",border:"1px solid",borderRadius:"0.8cm",paddingTop:'10%'}}>
                        {firstname+lastname}
                    </Avatar>
                );
            } else {
                return(
                    <Avatar alt={auth.user.userName} src={auth.user.profile.icon} />
                );
            }
            
        }
        return <AccountCircle />;
    }
   
    let banner="";

    let imageUrl=logo;
    if(store.status===0) {imageUrl=logo_tale}
    else if(store.status===1) {imageUrl=logo_comic};

    const [showNotification, setShowNotification] = useState(false)
    const handleNotification = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setShowNotification(!showNotification)}

    let notificationButton = "";
    let notificationSection = "";
    
    if (auth.loggedIn === true && (store.status===0||store.status===1)){
        if (auth.user.notification.length === 0){
            notificationButton = not_ringing;
        }else {
            notificationButton = ringing;
        }
        notificationSection = 
        <div>
            <IconButton onClick={(event) => {handleNotification(event)}} sx={{ width: "50px", height: "50px",  
            backgroundPosition: "center",backgroundSize: "contain", backgroundRepeat: "no-repeat", cursor: "pointer" }}>
                <img src={notificationButton} alt="" height='32' width='32'></img>
            </IconButton>
            { showNotification ? <NotificationModal/> : null }
        </div>
    }

   if(store)
    banner= <Box sx={{ flexGrow: 1,width:"100%",height:"10%"}} >
            <AppBar position="fixed">
                <Toolbar sx={{bgcolor:"#e0e0e0"}}>
                    {/* <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}      
                        onClick={()=>{handleSplashScreen()}}                  
                    > */}
                        <Box position="relative" sx={{ display:"flex", width:"10%",height:"100%",alignItems:"center", flexDirection:"column"}}>
                        <Button onClick={(event) => {handleSplashScreen(event)}} sx={{ width: "200px", height: "50px", backgroundImage:`url(${imageUrl})`, 
                        backgroundPosition: "center",backgroundSize: "contain", backgroundRepeat: "no-repeat", cursor: "pointer" }}>
                        </Button>
                        </Box>
    
                        
                    {/* </Typography> */}
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {editToolbar}
                        {notificationSection}
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            //colorSecondary
                            //color='red'
                        >
                            { getAccountMenu(auth.loggedIn) }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
           <DeleteModal/>
            <Dialog
                    id = "saveCheck"
                    maxWidth='sm'
                    open= {popUp}
                    onClose={(event)=>{handleCheckClose(event);}}
                >
                <DialogTitle>
                    Did you save your project?
                <DialogActions>
                        <Button onClick={(event)=>{direction(event);}}>Confirm</Button>
                        <Button onClick={(event)=>{handleCheckClose(event);}}>No</Button>
                    </DialogActions>
                </DialogTitle>
            </Dialog>
            {
                menu
            }
        </Box>
        
    return (banner);
}