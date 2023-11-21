import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
 
  return (
    <div ref={setNodeRef} style={{border:"1px solid black" , width:'100%' , padding:'1em' , minHeight:'300px' , display:"flex" , flexDirection:"column" , gap:"10px"}} >
      {props.children}
      <div style={{ display: "flex", justifyContent:'center', height: "40px" , width:'100%' }}><i className="fa-solid fa-plus" style={{ color: "grey" }}></i></div>
    </div>
  );
}