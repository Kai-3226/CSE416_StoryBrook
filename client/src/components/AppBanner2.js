//author kai
import React, { useContext, useEffect } from 'react'
import {useState } from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from  '../auth'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';

function AppBanner2(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [input,setInput] = useState("");

    function handleUpdateText(event) {
        setInput(event.target.value);
    }

    function handleKeyPress(event) {
        if(event.code === "Enter") {
            store.searchWork(input.toLowerCase());
        }
    }

    //back buttom
    let back_buttom=
    <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"back")}}>
        <ArrowBackIosIcon></ArrowBackIosIcon>
    </IconButton>

    if(store.siteState===NULL){
        back_buttom = "";
    }

    //site name
    let site_icon=
    <Button disabled={store.addingList}>storybrook</Button>;

    let comic_icon=
    <Button disabled={store.addingList} onClick={(event) => {handleClick(event,"home")}}>StoryBrookComic</Button>;

    let tale_icon=
    <Button disabled={store.addingList} onClick={(event) => {handleClick(event,"home")}}>StoryBrookTale</Button>;

    if(store.siteState==="comic"){
        site_icon = comic_icon;
    } else if (store.siteState==="tale"){
        site_icon = tale_icon;
    }

    //search field
    let search_field = 
    <TextField fullWidth sx={{bgcolor: '#FFFFFF'}}  label='search' disbaled={store.addingList}
        onChange={(event) => {handleUpdateText(event)}}
        onKeyPress={(event) => {handleKeyPress(event)}}
        defaultValue={store.text}
    />;

    if(store.screenState!=="home" && store.screenState!=="view"){
        search_field = "";
    }

    //function button for user based on auth status
    let user_function="";

    let login_user_function=
    <div>
        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"message")}}>
            <MessageIcon></ MessageIcon>
        </IconButton>
        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"notification")}}>
            <NotificationsActiveIcon></NotificationsActiveIcon>
        </IconButton>
        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"user")}}>
            <Avatar alt={auth.userid} src={auth.userAvatar} />
        </IconButton>
    </div>;

    let visiterfunction=
    <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"login")}}>
        <LoginIcon></LoginIcon>
    </IconButton>;

    if(auth.user===null){
        user_function = visiterfunction;
    } else{
        user_function = login_user_function;
    }

    let AppBanner2 =
    <AppBar position="static">
        <Toolbar sx={{bgcolor:"#c4c4c4", justifyContent:'space-between' }}>
            {back_buttom}
            {site_icon}
            {search_field}
            <Box sx={{ display: { xs: 'none', md: 'flex'},width:1000 }}>
                {user_function}
            </Box>
        </Toolbar>
    </AppBar>
    return (
        AppBanner2
    );
}

export default AppBanner2;