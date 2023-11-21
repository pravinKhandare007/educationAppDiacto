import { useDraggable } from "@dnd-kit/core";
// import {FaHeading} from 'react-icons/fa';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import './DraggableStyle.css'


export default function QuizDraggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'Quiz',
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
       
        <div ref={setNodeRef} data-tooltip-id="my-tooltip" data-tooltip-content="Drag to add quiz questions" data-tooltip-place="top"  className="draggable" style={style} {...listeners} {...attributes}>
            <i class="fa-solid fa-q"></i>
            <p>Quiz</p>
            <Tooltip id="my-tooltip" />
        </div>
        
    )
} 