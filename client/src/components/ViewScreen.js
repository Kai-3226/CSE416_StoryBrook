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


const ViewScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [input,setInput] = useState("");

    useEffect(() => {
        // store.loadRecommend(auth.userid);
        // store.loadFollow();
        // store.loadLatest();
        // store.loadMostView();
        // store.loadMostLike();
    }, []);


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleUpdateText(event) {
        setInput(event.target.value);
    }

    function handleKeyPress(event) {
        if(event.code === "Enter") {
            store.searchWork(input.toLowerCase());
        }
    }
    async function handleClick(event,button) {
        event.stopPropagation();
        store.setMode(button);
    }
    
    let list = store.recommend;

    function handleSort(criteria){
        if (criteria === 1) list = store.recommend;
        else if (criteria === 2) list = store.latest;
        else if (criteria === 3) list = store.topView;
        else if (criteria === 4) list = store.topLike;
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
            <MenuItem onClick={(event) => {handleSort(1)}}>Follow</MenuItem>
            <MenuItem onClick={(event) => {handleSort(2)}}>Latest</MenuItem>
            <MenuItem onClick={(event) => {handleSort(3)}}>Most View</MenuItem>
            <MenuItem onClick={(event) => {handleSort(4)}}>Most Like</MenuItem>
        </Menu>
    );

    let work = "";
    if (store) {
        // work = 
        //     list.map((work) => (
        //         <WorkCard
        //             work={work}
        //         />
        //     ))
    }
    
    return (
        <div id="viewpage">
            <div id="viewpage_banner">
            </div >
            
            <div style={{height:'700px',overflow:'auto'}}>
                <InfiniteScroll
                    pageStart={0}
                    // loadMore={loadFunc}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                    //getScrollParent={() => this.scrollParentRef}
                >
                {work}
                </InfiniteScroll>
            </div>
            <div>
                <Copyright2/>
            </div>
        </div>)
}

export default ViewScreen;

