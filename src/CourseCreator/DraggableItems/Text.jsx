import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"

export default function Text(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'Text',
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    // <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
    //   Text Field
    // </button>
    <div ref={setNodeRef} data-tooltip-id="my-tooltip" data-tooltip-content="Drag to add text editor" data-tooltip-place="top" style={style} {...listeners} {...attributes} className="draggable">
      <i  className="fa-regular fa-pen-to-square" ></i>
      <p>Text</p>
      <Tooltip id="my-tooltip" />
    </div>
    
    // <AiOutlineFileText  ref={setNodeRef} style={style} {...listeners} {...attributes} className='text'></AiOutlineFileText>
  );
}