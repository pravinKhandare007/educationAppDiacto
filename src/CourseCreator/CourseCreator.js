import React, { useEffect, useState } from 'react';
import './CourseCreator.css'
import Heading from './DraggableItems/Heading';
import Text from './DraggableItems/Text';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Droppable } from './Droppable';
import Pagination from './Pagination';
import Image from './DraggableItems/Image';
import Video from './DraggableItems/Video';

const CourseCreator = () => {

    const [activeId, setActiveId] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [finalCourseData, setFinalCourseData] = useState({
        slides: [{ id: 1, content: [{ contentId: 1, type: "Heading", data: "" }, { contentId: 2, type: "Text", data: '' }] },
        { id: 2, content: [] },
        { id: 3, content: [{ contentId: 1, type: "Heading", data: "" }] },
        { id: 4, content: [] }]
    })

    useEffect(() => {
        console.log("useEffect finalCourseData", finalCourseData);
    })

    // function handleDragEnd(event) {
    //     setActiveId(null);
    //     const { active, over } = event;
    //     if (over === null) return; // condition to check if a draggable is not dropped on a droppable element

    //     console.log("drag end or dropped: ", event);

    //     // active.id === 'Heading' or 'Image' or 'Video' or 'Text'
    //     if (active.id === "Heading") {
    //         if (active.id !== over.id) {
    //             //over.id is same as  slide id
    //             setFinalCourseData((finalCourseData) => {
    //                 const newFinalCourseData = {
    //                     ...finalCourseData
    //                 }
    //                 const newSlides = newFinalCourseData.slides.map((slide) => {
    //                     if (slide.id === over.id) {
    //                         return {
    //                             ...slide, content: [...slide.content, { contentId: 4, type: "Heading", data: "" }]
    //                         }
    //                     } else {
    //                         return { ...slide }
    //                     }
    //                 })

    //                 newFinalCourseData.slides = newSlides;
    //                 return newFinalCourseData;
    //             })
    //         }
    //         return
    //     }



    //     if (active.id !== over.id) {
    //         const newFinalCourseData = { ...finalCourseData };

    //         const oldIndex = newFinalCourseData.slides.findIndex(slide => slide.id === active.id);
    //         const newIndex = newFinalCourseData.slides.findIndex(slide => slide.id === over.id);

    //         const newSlides = arrayMove(newFinalCourseData.slides, oldIndex, newIndex);
    //         newFinalCourseData.slides = newSlides;
    //         setFinalCourseData(newFinalCourseData);
    //     }

    // }

    function handleDradStart(event) {
        console.log("drag started:", event);
        const { active } = event;

        setActiveId(active.id);
    }

    function handleDragStart() {

    }

    function sortEnd() {

    }

    function paginate(id) {
        setCurrentSlide(id);
    }
    return (<>
        <div className='course_creator_container'>
            <DndContext>
                <div className='slides_container'>
                    <div className='slide'>
                        {
                            <Droppable id={currentSlide}>
                                <DndContext onDragStart={handleDragStart} onDragEnd={sortEnd}>
                                    <SortableContext items={finalCourseData.slides.filter(slide => slide.id === currentSlide)[0].content} strategy={verticalListSortingStrategy}>
                                        {
                                            finalCourseData.slides.filter(slide => slide.id === currentSlide)[0].content.map((element, index) => {
                                                if (element.type === 'Text') {
                                                    return 'text';
                                                }
                                                if (element.type === 'Heading') {
                                                    return "Heading";
                                                }
                                            })
                                        }
                                    </SortableContext>
                                </DndContext>
                            </Droppable>
                        }
                    </div>
                    <div>
                        <div className='pagination_container'>
                            <Pagination slides={finalCourseData.slides} paginate={paginate} currentSlideId={currentSlide}></Pagination>
                        </div>
                        <div>add button</div>
                    </div>
                </div>
                <div className='draggables_container'>
                    <div className='widgets'>WIDGETS</div>
                    <div className='draggables'>
                        <Heading />
                        <Text />
                        <Image />
                        <Video />
                    </div>
                </div>
            </DndContext>
        </div>

    </>);
}

export default CourseCreator;