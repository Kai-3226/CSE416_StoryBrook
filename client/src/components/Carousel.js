import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AuthContext from '../auth';

import "../App.css";

export const CarouselItem = ({ children, width,item }) => {
  const {auth} = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  function handleOpen(event){
    event.preventDefault();
    event.stopPropagation();
    
    console.log(item);
    store.readWork(item._id);
    auth.setTargetUser(item.authorId);
  }
  
  return (
    <div onClick={(event)=>handleOpen(event)} className="carousel-item" style={{ border:'1px solid black',width: width, backgroundImage: `url(${children})`,  backgroundPosition: "center",backgroundSize: "contain", backgroundRepeat: "no-repeat" } }>
      <div style={{position:"absolute",fontSize: "100px",width:"50%",height:"auto",color:"black",backgroundColor:"lightyellow",bottom:"80%"}}>{"Title: "+item.name}</div>
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <Button
        sx={{fontFamily: "Comic Sans MS"}}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </Button>
        {React.Children.map(children, (child, index) => {
          return (
            <Button
              className={`${index === activeIndex ? "active" : ""}`}
              sx={{fontFamily: "Comic Sans MS"}}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </Button>
          );
        })}
        <Button sx={{fontFamily: "Comic Sans MS"}}
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
