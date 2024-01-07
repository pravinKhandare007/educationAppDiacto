import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
 
  return (
    <div ref={setNodeRef} style={{border:"1px solid #b6ccd8" , position:'relative',width:'100%' , padding:'1em' , minHeight:'100%' , display:"flex" , flexDirection:"column" , gap:"10px" , backgroundColor:"#ffffff" , borderRadius:'12px' }} className='animate_slide' >
      {props.children}
      {
        props.selectedQuizId ? null : (<div style={{ display: "flex", justifyContent:'center',alignItems:"center",height: "490px" , width:'100%' , flexDirection:"column"  }}><i className="fa-solid fa-plus" style={{ color: "grey" }}></i><div style={{color: "grey"}}>drop here</div></div>)
      }
    </div>
  );
}