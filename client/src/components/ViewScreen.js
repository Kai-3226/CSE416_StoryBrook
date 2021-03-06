//author kai

import React, { useContext } from 'react'
import {useState } from 'react';
import { GlobalStoreContext } from '../store'
import WorkCard from './WorkCard';
import Copyright from './Copyright';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';

const ViewScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [input,setInput] = useState("");

    function handleUpdateText(event) {
        setInput(event.target.value);
    }

    function handleKeyPress(event) {
        console.log(store.view);
        if(event.code === "Enter") {
            console.log(input);
            store.searchWork(input);
            console.log(store.view);
            list = store.view;
        }
    }

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

    let search_field = 

    <TextField  sx={{bgcolor: '#FFFFFF',width:"80%"}}  label='search' disbaled={store.addingList}
        onChange={(event) => {handleUpdateText(event)}}
        onKeyPress={(event) => {handleKeyPress(event)}}
        defaultValue={store.text}
    />;

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
        console.log(store.view);
        list = store.view;
        console.log(list);
        list = list.filter(item => item.published["publish"] === true&&item.workType===store.status);
        const rows = list.reduce(function (rows, key, index) {
            return (index % 3 === 0 ? rows.push([key]) 
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
        <div id="viewpage" style={{position:"relative" ,width:"100%",height:"80%"}}>
            <div id="viewpage_banner">
                {search_field}
                {menuButton}
                {menu}
            </div>
            <div style={{overflow:'auto',height:'100%',width:'100%'}} >
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

