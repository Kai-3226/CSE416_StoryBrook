import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import "../App.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width, backgroundImage: `url(${children})`,  backgroundPosition: "center",backgroundSize: "contain", backgroundRepeat: "no-repeat" } }>
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
