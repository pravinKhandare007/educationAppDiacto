import React, {forwardRef} from 'react';

export const Item = forwardRef(({id, ...props}, ref) => {

    // let overlay = false;

    // if( id === "Heading") overlay = false;
    // if(id!== "Heading" && id) overlay=true;


  return (
    <div className='single_slide_container' {...props} ref={ref}>{id ? <i class="fa-solid fa-sort"></i> : null}{props.children}</div>
  )
});