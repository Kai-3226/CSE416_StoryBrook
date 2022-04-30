import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationModal from './NotificationModal';
import FriendModal from './FriendModal';
import { useHistory, useLocation } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import { TextField } from '@mui/material';
import DeleteModal from './DeleteModal';
import CreatePageBanner from './CreatePageBanner';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

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

    const handleSplashScreen = () => {
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
            setTargetPage("mypage")
        }
        else {
            handleMenuClose();
            history.push('/mypage')
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

    const handleCreate = () => {
        if(store.status == 0 || store.status == 1)
        {  
            editToolbar= <CreatePageBanner/>
            console.log(store.status)
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
        } else if (targetPage === 'myPage') {
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
            console.log(store.currentWork)
            if (store.currentWork && store.currentWork.published.publish == false && targetPage == "Creating"){
                editToolbar = <CreatePageBanner/>
            } else {
                editToolbar=
                <Button size = "small" color ="primary" variant="contained" onClick={handleCreate}>Create</Button>
            }
    }
    
    function getAccountMenu(loggedIn) {
        if(loggedIn){
            let lastname=auth.user.lastName.substring(0,1).toUpperCase();
            let firstname=auth.user.firstName.substring(0,1).toUpperCase();
            return(
                <Button sx={{color:"e0e0e0"}}
                variant="outlined">
                    {firstname+lastname}
                </Button>
            );
        }
        return <AccountCircle />;
    }
   
    let banner="";

   if(store)
    banner= <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar sx={{bgcolor:"#e0e0e0"}}>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}      
                        onClick={()=>{handleSplashScreen()}}                  
                    >
                        <b style={{ textDecoration: 'none', color: '#d4b038' }}>StoryBrook</b>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            { getAccountMenu(auth.loggedIn) }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
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