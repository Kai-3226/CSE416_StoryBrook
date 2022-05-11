import React, { useContext, useEffect } from "react";
import { GlobalStoreContext } from '../store'
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "./arrows";
import usePreventBodyScroll from "./usePreventBodyScroll";
import Box from '@mui/material/Box';
import WorkCard from './WorkCard';
import "../App.css";
    
    
function onWheel(apiObj, ev) {
      const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    
      if (isThouchpad) {
        ev.stopPropagation();
        return;
      }
    
      if (ev.deltaY < 0) {
        apiObj.scrollNext();
      } else if (ev.deltaY > 0) {
        apiObj.scrollPrev();
      }
}
    
function HomeScreenFollow() {
    const { store } = useContext(GlobalStoreContext);
      const { disableScroll, enableScroll } = usePreventBodyScroll();
    
    //   useEffect(() => {
    //     store.loadWorkList();
    //   }, []);

      let list = [];
      let work = "";

    if (store && store.workList) {
        list = store.workList;
        list = list.filter(item => item.published["publish"] === true&&item.workType===store.status);
        // const rows = list.reduce(function (rows, key, index) {
        //     return (index % 4 == 0 ? rows.push([key]) 
        //     : rows[rows.length-1].push(key)) && rows;
        // }, []);
        
        work = 
            <Box bgcolor="lightblue" sx = {{display:'flex',width:'100%'}}>
                {list.map((item) =>(<WorkCard work={item}/>))}
            </Box>
    }

    return (
    <div>
        <div className="example" style={{height: "300px" }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
            <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
            >
            {work}
            </ScrollMenu>
        </div>
        </div>
    </div>
    );
}
export default HomeScreenFollow;