//author kai

import React, { useContext, useEffect } from 'react'
import {useState } from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from  '../auth';
import WorkCard from './WorkCard';
import Copyright2 from './Copyright';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InfiniteScroll from 'react-infinite-scroller';
import Box from '@mui/material/Box';

const ViewScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [input,setInput] = useState("");

    useEffect(() => {
        store.loadWorkList();
        // store.view(1);
        //console.log("abc");
    }, []);

    

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleSort(criteria){
        store.view(criteria);
        list = store.view;
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
            <MenuItem onClick={(event) => {handleSort(0)}}>Follow</MenuItem>
            <MenuItem onClick={(event) => {handleSort(1)}}>Latest</MenuItem>
            <MenuItem onClick={(event) => {handleSort(2)}}>Most View</MenuItem>
            <MenuItem onClick={(event) => {handleSort(3)}}>Most Like</MenuItem>
        </Menu>
    );
        
    
    let list = [];
    let work = "";

    if (store && store.workList) {
        list = store.workList;
        console.log(list);
        list = list.filter(item => item.published["publish"] === true);
        const rows = list.reduce(function (rows, key, index) {
            return (index % 4 == 0 ? rows.push([key]) 
            : rows[rows.length-1].push(key)) && rows;
        }, []);
        console.log(rows);

        work = 
        rows.map((row) => (
            <Box sx = {{display:'flex',position:'relative'}}>
                {row.map((item) =>(<WorkCard work={item}/>))}
            </Box>
        ));
    }
        
    
    return (
        <div id="viewpage">
            <div id="viewpage_banner">
            </div >
            
            <div style={{height:'700px',overflow:'auto'}}>
                {/* <InfiniteScroll
                    //pageStart={0}
                    // loadMore={loadFunc}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                    //getScrollParent={() => this.scrollParentRef}
                > */}
                {work}
                {/* </InfiniteScroll> */}
            </div>
                <Copyright2/>     
        </div>)
}

export default ViewScreen;

