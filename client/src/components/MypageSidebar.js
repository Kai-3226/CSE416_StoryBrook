import React from "react";
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';

export default function Sidebar () {
    const {store}=useContext(GlobalStoreContext);
    function handleClick(event,input){
        event.stopPropagation();
        store.setMode(input);
        console.log(store.mode);
    }
    
    let friend ="unselected-menu";
    let follow ="unselected-menu";
    let work ="unselected-menu";
    let library ="unselected-menu";
    let like ="unselected-menu";
    if(store.mode=="friends"){
        friend="selected-menu"
    }
    if(store.mode=="followings"){
        follow="selected-menu"
    }
    if(store.mode=="works"){
      
        store.loadWorkList();
        work="selected-menu"
    }
    if(store.mode=="library"){
        library="selected-menu"
    }
    if(store.mode=="likes"){
        like="selected-menu"
    }

        return (
            
            <div id="sidebar">
                <div id="sidebar-menu">
                <Box className={friend} onClick={(event) => {handleClick(event,"friends")}}>Friends</Box>
                <Box className={follow} onClick={(event) => {handleClick(event,"followings")}}>Followings</Box>
                <Box className={work} onClick={(event) => {handleClick(event,"works")}}>Works</Box>
                <Box className={library} onClick={(event) => {handleClick(event,"library")}}>Library</Box>
                <Box className={like} onClick={(event) => {handleClick(event,"likes")}}>Your Likes</Box>
                </div>
            </div>
        );
    
}