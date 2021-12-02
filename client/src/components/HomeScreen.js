import React, { useContext, useEffect } from 'react'
import {useState } from 'react';
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Home from '@mui/icons-material/HomeOutlined';
import Group from '@mui/icons-material/GroupsOutlined';
import Person from '@mui/icons-material/PersonOutline';
import Sigma from '@mui/icons-material/FunctionsOutlined';
import Sort from '@mui/icons-material/Sort';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}>
            <MenuItem>Published Date (Newest)</MenuItem>
            <MenuItem>Published Date (Oldest)</MenuItem>
            <MenuItem>Views</MenuItem>
            <MenuItem>Likes</MenuItem>
            <MenuItem>Dislikes</MenuItem>
        </Menu>
    );

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <AppBar position="static">
                <Toolbar sx={{bgcolor:"#c4c4c4", justifyContent:'space-between' }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex'},width:1000 }}>
                        <IconButton>
                            <Home></Home>
                        </IconButton>
                        <IconButton>
                            <Group></Group>
                        </IconButton>
                        <IconButton>
                            <Person></Person>
                        </IconButton>
                        <IconButton>
                            <Sigma></Sigma>
                        </IconButton>
                        <TextField fullWidth sx={{bgcolor: '#FFFFFF'}}  label='search' ></TextField>
                    </Box>
                    <Box sx={{ display: {md:'flex',color:'black',fontSize:20},alignItems:'center'}}>
                        SORT BY
                        <IconButton
                            onClick={handleProfileMenuOpen}
                        >
                            <Sort></Sort>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {menu}
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default HomeScreen;