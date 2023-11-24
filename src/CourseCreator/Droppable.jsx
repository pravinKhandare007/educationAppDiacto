import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
 
  return (
    <div ref={setNodeRef} style={{border:"1px solid grey" , width:'100%' , padding:'1em' , minHeight:'300px' , display:"flex" , flexDirection:"column" , gap:"10px" , backgroundColor:"#ffffff"}} >
      {props.children}
      <div style={{ display: "flex", justifyContent:'center',alignItems:"center",height: "300px" , width:'100%' , flexDirection:"column"  }}><i className="fa-solid fa-plus" style={{ color: "grey" }}></i><div style={{color: "grey"}}>drop here</div></div>
    </div>
  );
}