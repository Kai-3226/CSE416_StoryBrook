import React, { useContext} from "react";
import { GlobalStoreContext } from '../store'
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Card } from "./cardFollow";

import { LeftArrow, RightArrow } from "./arrows";
import usePreventBodyScroll from "./usePreventBodyScroll";
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

function swap(arr, xp, yp){
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}
    
function HomeScreenFollow(props) {
    const { store } = useContext(GlobalStoreContext);
    const { criteria } = props;

      const { disableScroll, enableScroll } = usePreventBodyScroll();
    

      let list = [];
      let work = "";
    if (store && store.workList) {
        let i, j;
        list = store.workList;
        for (i = 0; i < list.length-1; i++) {
          for (j = 0; j < list.length-i-1; j++) {
              if(criteria===1){
                  if (list[j].published.date > list[j+1].published.data){
                      swap(list,j,j+1);
                  }
              }
              else if(criteria===2){
                  if (list[j].view < list[j+1].view){
                      swap(list,j,j+1);
                  }
              }
              else if(criteria===3){
                  if (list[j].likes < list[j+1].likes){
                      swap(list,j,j+1);
                  }
              }
          }
        }
        list = list.filter(item => item.published["publish"] === true&&item.workType===store.status).slice(0,20);
        
        work = list.map((item) => 
        // console.log(item))
        (
          <Card key={item.authorId} work={item}
            itemId={item._id}
        />
        ))
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