import React from "react";
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';

export default function Sidebar () {
    const {store}=useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    function handleClick(event,input){
        event.stopPropagation();
        console.log(input);  
        store.setMode(input);
        console.log(store.mode);    
        if(store.mode=="works")
        {store.loadWorkList();}
        if(input=="followings"){
            auth.getUserList();
            console.log(auth.users);
        }
        
    }  
    let friend ="unselected-menu";
    let follow ="unselected-menu";
    let work ="unselected-menu";
    let library ="unselected-menu";
    let like ="unselected-menu";

    if(store.mode=="followings"){
        follow="selected-menu";
        friend ="unselected-menu";
        work ="unselected-menu";
        library ="unselected-menu";
        like ="unselected-menu";
    }
    if(store.mode=="works"){
        
        work="selected-menu"
        friend ="unselected-menu";
        follow ="unselected-menu";
        library ="unselected-menu";
        like ="unselected-menu";
    }
    if(store.mode=="library"){
        library="selected-menu"
        friend ="unselected-menu";
        follow ="unselected-menu";
        work ="unselected-menu";
        like ="unselected-menu";
    }
    if(store.mode=="likes"){
        like="selected-menu"
        friend ="unselected-menu";
        follow ="unselected-menu";
        work ="unselected-menu";
        library ="unselected-menu";
    }

        return (
            
            <div id="sidebar">
                <div id="sidebar-menu">
                <Box className={follow} onClick={(event) => {handleClick(event,"followings")}}>Followings</Box>
                <Box className={work} onClick={(event) => {handleClick(event,"works")}}>Works</Box>
                <Box className={like} onClick={(event) => {handleClick(event,"likes")}}>Your Likes</Box>
                </div>
            </div>
        );
    
}