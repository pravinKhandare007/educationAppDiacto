import { useDraggable } from "@dnd-kit/core";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"

export default function Image(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'Image',
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        //styling for this component is same as all other draggable components all have class draggable
        <div ref={setNodeRef} className="draggable" data-tooltip-id="my-tooltip" data-tooltip-content="Drag to add info-graphic image"
        data-tooltip-place="top" style={style} {...listeners} {...attributes}>
            <i className="fa-regular fa-image image"></i>
            <p>Info-Graphic</p>
            <Tooltip id="my-tooltip" />
        </div>



    )
}