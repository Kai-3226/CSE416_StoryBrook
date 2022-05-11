//author kai

import React, { useContext, useEffect } from 'react'
import {useState } from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from  '../auth';
import WorkCard from './WorkCard';
import Copyright from './Copyright';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InfiniteScroll from 'react-infinite-scroller';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleSort(criteria){
        handleMenuClose();
        store.viewlist(criteria);
        list = store.view;
    }

    const menuButton = (
        <Button
            id="sort-button"
            aria-controls={isMenuOpen ? 'sort-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
        >
            Options
      </Button>
    );

    
    const menu = (
        <Menu
        id="sort-menu"
        MenuListProps={{
          'aria-labelledby': 'sort-button',
        }}
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
            <MenuItem onClick={(event) => {handleSort(0)}}>Latest</MenuItem>
            <MenuItem onClick={(event) => {handleSort(1)}}>Most View</MenuItem>
            <MenuItem onClick={(event) => {handleSort(2)}}>Most Like</MenuItem>
        </Menu>
    );
        
    
    let list = [];
    let work = "";

    if (store && store.workList) {
        console.log(store.workList);
        list = store.workList;
        console.log(list);
        list = list.filter(item => item.published["publish"] === true);
        const rows = list.reduce(function (rows, key, index) {
            return (index % 4 == 0 ? rows.push([key]) 
            : rows[rows.length-1].push(key)) && rows;
        }, []);

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
                {menuButton}
                {menu}
            </div>
            <div style={{overflow:'auto'}}>
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
                <Copyright/>     
        </div>)
}

export default ViewScreen;

