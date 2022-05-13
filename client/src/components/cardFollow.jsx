import React from "react";
import { GlobalStoreContext } from '../store'
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function Card({ title, like, view,workType, itemId }) {
  const { store } = React.useContext(GlobalStoreContext);
  const visibility = React.useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  var url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvVjITwe377mswrgJw8klsFzO3KT8dmbaeg&usqp=CAU";
  var bookUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf9kvIzoVAbJmLgv5k6kHQj6czGK0V0Qew1w&usqp=CAU";

  let response=url;
  if(workType==0) {response=bookUrl};

  function handleOpen(event, id){
    event.stopPropagation();
    console.log(id);
    store.setCurrentWork(id);
  }
  
  return (
    <div
      role="button"
      style={{
        border: "1px solid",
        display: "inline-block",
        margin: "0 10px",
        width: "160px",
        userSelect: "none"
      }}
      tabIndex={0}
      className="card"
      onClick={(event) => {handleOpen(event, itemId)}}
    >
      <div>
        <div>{title}</div>
        <div>Like: {like}  View: {view}</div>
      </div>
      <div
        style={{
            backgroundImage: `url(${response})`,
          height: "200px"
        }}
      />
    </div>
  );
}
