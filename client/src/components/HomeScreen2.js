//author kai

import React, { useContext, useEffect } from 'react'
import {useState } from 'react';
import { GlobalStoreContext } from '../store'
import AuthContext from  '../auth'
import WorkCard from './WorkCard';
// import AppBanner2 from './AppBanner2';
import AppBanner from './AppBanner';
import Copyright2 from './Copyright';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

const HomeScreen2 = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [input,setInput] = useState("");

    function handleOpen(id){
        store.setCurrentWork(id);
        console.log(store.currentList);
    }

    function LeftArrow() {
        const { isFirstItemVisible, scrollPrev } =
          React.useContext(VisibilityContext);
        return (
            <IconButton disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
                <ArrowLeftIcon></ArrowLeftIcon>
            </IconButton>
        );
    }
      
    function RightArrow() {
        const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
        return (
            <IconButton disabled={isLastItemVisible} onClick={() => scrollNext()}>
                <ArrowRightIcon></ArrowRightIcon>
            </IconButton>
        );
    }

    let n = 15;

    let recommend = "";
    let follow = "";
    let latest = "";
    let topView = "";
    let topLike = "";

    function swap(arr, xp, yp){
        var temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }

    if (store) {
        let list = store.workList;
        console.log(list);
        let i, j;
        for (i = 0; i < list.length-1; i++) {
            for (j = 0; j < list.length-i-1; j++) {
                if (list[j].published.date > list[j+1].published.data){
                    swap(list,j,j+1);
                }
            }
        }
        latest = 
                list.slice(0, n).map((work) => (
                    <WorkCard
                        work={work}
                    />
                ))
        for (i = 0; i < list.length-1; i++) {
            for (j = 0; j < list.length-i-1; j++) {
                if (list[j].view < list[j+1].view){
                    swap(list,j,j+1);
                }
            }
        }
        topView = 
                list.slice(0, n).map((work) => (
                    <WorkCard
                        work={work}
                    />
                ))
        for (i = 0; i < list.length-1; i++) {
            for (j = 0; j < list.length-i-1; j++) {
                if (list[j].likes < list[j+1].likes){
                    swap(list,j,j+1);
                }
            }
        }
        topLike = 
                list.slice(0, n).map((work) => (
                    <WorkCard
                        work={work}
                    />
                ))
        recommend = 
                list.slice(0, 5).map((work) => (
                    <div id={work.id} onClick={handleOpen}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvVjITwe377mswrgJw8klsFzO3KT8dmbaeg&usqp=CAU"/>
                    </div>
                ))
        console.log(topLike);
    }

    // return null;
    return (
        <div id="homepage">
            <div id="homepage_carousel">
                <Carousel showArrows={true}>
                    {recommend}
                </Carousel>
            </div>
            <div id="latest_list">
                <Typography>latest</Typography>
                <Typography>View More</Typography>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                    {latest}
                </ScrollMenu>
            </div>
            <div id="topview_list">
                <Typography>Top View</Typography>
                <Typography>View More</Typography>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                    {topView}
                </ScrollMenu>
            </div>
            <div id="toplike_list">
                <Typography>Top Like</Typography>
                <Typography>View More</Typography>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                    {topLike}
                </ScrollMenu>
            </div>
            <div>
                <Copyright2/>
            </div>
        </div>)
}

export default HomeScreen2;