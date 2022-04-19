import React, { useContext, useEffect } from 'react'
import {useState } from 'react';
import { GlobalStoreContext } from '../store'
import WorkCard from './WorkCard.js'
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Home from '@mui/icons-material/HomeOutlined';
import Group from '@mui/icons-material/GroupsOutlined';
import Person from '@mui/icons-material/PersonOutline';
import Sigma from '@mui/icons-material/FunctionsOutlined';
import Sort from '@mui/icons-material/Sort';
import Create from './CreateScreen';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [input,setInput] = useState("");
    // useEffect(() => {
    //     store.loadIdNamePairs();
    // }, []);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    function handleUpdateText(event) {
        setInput(event.target.value);
    }
    function handleKeyPress(event) {
        if(event.code === "Enter") {
            store.searchLists(input.toLowerCase());
        }
    }
    async function handleClick(event,button) {
        event.stopPropagation();
        store.setMode(button);
    }
    function handleSort(criteria){
        store.sortBy(criteria);
    }
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
            <MenuItem onClick={(event) => {handleSort(2)}}>Published Date (Newest)</MenuItem>
            <MenuItem onClick={(event) => {handleSort(1)}}>Published Date (Oldest)</MenuItem>
            <MenuItem onClick={(event) => {handleSort(3)}}>Views</MenuItem>
            <MenuItem onClick={(event) => {handleSort(4)}}>Likes</MenuItem>
            <MenuItem onClick={(event) => {handleSort(5)}}>Dislikes</MenuItem>
        </Menu>
    );
    let WorkCard = "";
    if (store) {
        WorkCard = 
                store.idNamePairs.map((pair) => (
                    <WorkCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        sx={{padding:'5px'}}
                    />
                ))
    }
    if (store.editActive){
        WorkCard=
            <Create></Create>
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <AppBar position="static">
                <Toolbar sx={{bgcolor:"#c4c4c4", justifyContent:'space-between' }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex'},width:1000 }}>
                        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"home")}}>
                            <Home></Home>
                        </IconButton>
                        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"all")}}>
                            <Group></Group>
                        </IconButton>
                        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"user")}}>
                            <Person></Person>
                        </IconButton>
                        <IconButton disabled={store.addingList} onClick={(event) => {handleClick(event,"community")}}>
                            <Sigma></Sigma>
                        </IconButton>
                        <TextField fullWidth sx={{bgcolor: '#FFFFFF'}}  label='search' disbaled={store.addingList}
                            onChange={(event) => {handleUpdateText(event)}}
                            onKeyPress={(event) => {handleKeyPress(event)}}
                            defaultValue={store.text}
                        />
                    </Box>
                    <Box sx={{ display: {md:'flex',color:'black',fontSize:20},alignItems:'center'}}>
                        SORT BY
                        <IconButton
                            onClick={handleProfileMenuOpen}
                            disabled={store.addingList}
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
                    WorkCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default HomeScreen;