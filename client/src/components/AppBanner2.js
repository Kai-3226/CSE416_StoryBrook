import React, { useContext, useEffect } from 'react'
import {useState } from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from  '../auth'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Typography from '@mui/material/Typography';
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

    let user_function= "";
    let login_user_function=
    <Box sx={{ display: { xs: 'none', md: 'flex'},width:1000 }}>
        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"message")}}>
            <MessageIcon></ MessageIcon>
        </IconButton>
        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"notification")}}>
            <NotificationsActiveIcon></NotificationsActiveIcon>
        </IconButton>
        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"user")}}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
    </Box>;

    let visiterfunction=
    <Box sx={{ display: { xs: 'none', md: 'flex'},width:1000 }}>
        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"login")}}>
            <LoginIcon></LoginIcon>
        </IconButton>
    </Box>;



    if(auth.user===null){
        user_function = visiterfunction;
    } else{
        user_function = login_user_function;
    }



    let AppBanner2 =
        <Card id={work.id} hoverable sx={{ maxWidth: 345 }} onClick={handleOpen}>
            {deletebutton}
            <CardMedia
                component="img"
                height="140"
                image= {work.frontpage}
                alt="green iguana"
            />
            <CardContent>
                <Typography>
                    {work.name}
                </Typography>
                <RemoveRedEyeIcon></RemoveRedEyeIcon>
                <Typography>
                    {work.view}
                </Typography>
                <ThumbUpIcon></ThumbUpIcon>
                <Typography>
                    {work.like}
                </Typography>
                <Avatar alt={work.author} src={work.avatar} />
            </CardContent>
        </Card>
    return (
        AppBanner2
    );
}

export default AppBanner2;