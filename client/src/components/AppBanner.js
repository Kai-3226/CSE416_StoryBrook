import { useContext, useState } from 'react';
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
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import CreatePageBanner from './CreatePageBanner';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const history = useHistory();
    const { store } = useContext(GlobalStoreContext);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }
    const handleCreate = () => {
        store.createWork([]);
    }
    const handleSave = () => {
        if(store.status!=null)
        store.updateWork(store.currentWork);
    }
    const handlePublish = () => {
        store.publish(store.currentWork._id);
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
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/profile'>Profile</Link></MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn){
        menu = loggedInMenu;
        editToolbar=
        <Button size = "small" color ="primary" variant="contained" onClick={handleCreate}>Create</Button>
    }
    if (store.editActive){
        editToolbar=
        <Box>
            <Button size = "small" color ="primary" variant="contained" onClick={handleSave}>Save</Button>
            <Button size = "small" color ="primary" variant="contained" onClick={handlePublish}>Publish</Button>
        </Box>
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
                    >
                        <Link style={{ textDecoration: 'none', color: '#d4b038' }} to='/'>StoryBrook</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {editToolbar}
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
            {
                menu
            }
            <NotificationModal/>
            <FriendModal/>

        </Box>


    return (banner);
}