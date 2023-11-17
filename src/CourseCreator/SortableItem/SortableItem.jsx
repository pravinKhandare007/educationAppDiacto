import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Item } from './Item';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <Item ref={setNodeRef} style={style} >
      <div className='drag_activator' {...attributes} {...listeners}><i class="fa-solid fa-grip-lines-vertical"></i></div>
      <div className='slide' style={{ width:"100%", height:"600px" , border:"2px solid black" , margin:"4px"}}>{props.id}{props.children}</div>
    </Item>
  );
}