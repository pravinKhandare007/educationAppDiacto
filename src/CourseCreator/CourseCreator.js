import React, { useEffect, useState } from 'react';
import './CourseCreator.css'
import Heading from './DraggableItems/Heading';
import Text from './DraggableItems/Text';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Droppable } from './Droppable';
import Pagination from '../Pagination/Pagination';
import Image from './DraggableItems/Image';
import Video from './DraggableItems/Video';
import { SortableItem } from './SortableItem/SortableItem';
import { Item } from './SortableItem/Item';
import Editor from './Editor_Component/Editor';
import YouTubeVideo from './Video_Component/Video';
import Quiz from './Quiz_Component/Quiz';
import QuizDraggable from './DraggableItems/QuizDraggable';


let contentId = 4;
let slideId = 5;
const CourseCreator = ({ courseTree, setCourseTree, selectedSectionId, selectedChapterId, selectedSemId }) => {

    const [activeId, setActiveId] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(1); // will contain the id of the current slide
    //rename slidesData
    //api we need to send sectionID and body -- sildesData.
    //sample api endpoint = /api/section/:sectionId 
    //api body = slidesData
    const [finalCourseData, setFinalCourseData] = useState({
        slides: [{ id: 1, content: [{ id: 1, type: "Text", data: "" }] },
        { id: 2, content: [] },
        { id: 3, content: [] },
        { id: 4, content: [] },
        { id: 5, content: [] },
        { id: 6, content: [] },
        { id: 7, content: [] },
        { id: 8, content: [] },
        { id: 9, content: [] },
        { id: 10, content: [] },
        { id: 11, content: [] },
        { id: 12, content: [] }]
    })

    console.log(selectedSemId, selectedChapterId, selectedSectionId)

    useEffect(() => {
        console.log("useEffect finalCourseData", finalCourseData);
        console.log("currentSlide: ", currentSlide);
        
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



    function handleDragStart(event) {
        console.log("drag start", event)
    }

    function handleSortEnd(event , currentSlide) {
        console.log("sort start", event);
        if(event.over === null ) return ;
        const {active , over } = event;
        setFinalCourseData((finalCourseData)=>{
            const newFinalCourseData = {...finalCourseData};

           // const oldIndex = finalCourseData.slides.filter(slide => slide.id === currentSlide)[0].content.findIndex(contentObject => contentObject.id === active.id);
            //const newIndex = finalCourseData.slides.filter(slide => slide.id === currentSlide)[0].content.findIndex(contentObject => contentObject.id === over.id);

            // const newContent = arrayMove(finalCourseData.slides)
            return newFinalCourseData;
        })
        setActiveId(null);
    }

    function handleDragEnd(event) {
        console.log("drag end", event)
        if (event.over === null) return;

        if (event.over && event.over.id !== null) {
            const newSlides = finalCourseData.slides.map((slide) => {
                console.log("event.over.id: ", event.over.id);
                console.log("slide.id: ", slide.id);
                if (event.over.id === slide.id) {
                    //update the content of that slide 
                    return {
                        id: slide.id,
                        content: [...slide.content, { id: contentId++, type: event.active.id, data: "" }]
                    }
                } else {
                    return slide;
                }
            })

            setFinalCourseData((finalCourseData) => {
                const newFinalCourseData = { ...finalCourseData, slides: newSlides };
                console.log(newFinalCourseData);
                return newFinalCourseData;
            });

            console.log("dropped on ", event.over.id);
        }
    }

    function addSlide(slideId) {
        setFinalCourseData((finalCourseData) => {
            const newFinalCourseData = { ...finalCourseData, slides: [...finalCourseData.slides, { id: slideId++, content: [] }] }
            return newFinalCourseData;
        })
        console.log("add slide finalCourseData, ", finalCourseData);
        //setCurrentSlide(slideId);
    }


    function handleSortStart(event) {
        const { active } = event;

        setActiveId(active.id)
        console.log("sort end", event)
    }

    function paginate(id) {
        setCurrentSlide(id);
    }
    //takes slide id and content id ,adds e.target.value to the data property
    function handleOnChange(e, contentId, id) {
        console.log("handleOnChange called , its for heading");
        setFinalCourseData((finalCourseData) => {
            const newFinalCourseData = {
                ...finalCourseData, slides: [...finalCourseData.slides.map((slide) => {
                    if (slide.id === id) {
                        console.log("slide.slideId: ", slide.id);
                        return {
                            id: slide.id,
                            content: [...slide.content.map((contentObject) => {
                                if (contentObject.id === contentId) {
                                    return {
                                        id: contentObject.id,
                                        type: contentObject.type,
                                        data: e.target.value
                                    }
                                }
                                return {
                                    ...contentObject
                                }
                            })]
                        }
                    } else {
                        return { ...slide }
                    }
                })]
            }
            return newFinalCourseData;
        })
    }

    function handleImageChange(event , slideId , contentId){
        const image = event.target.files[0];
        setFinalCourseData((finalCourseData)=>{
            const newFinalCourseData = {
                ...finalCourseData, slides: [...finalCourseData.slides.map((slide) => {
                    if (slide.id === slideId) {
                        console.log("slide.slideId: ", slide.id);
                        return {
                            id: slide.id,
                            content: [...slide.content.map((contentObject) => {
                                if (contentObject.id === contentId) {
                                    return {
                                        id: contentObject.id,
                                        type: contentObject.type,
                                        data: image
                                    }
                                }
                                return {
                                    ...contentObject
                                }
                            })]
                        }
                    } else {
                        return { ...slide }
                    }
                })]
            }
            return newFinalCourseData;
        })
    }

    return (<>
        <div className='course_creator_container'>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className='slides_container'>
                    <div className='slide'>
                        {
                            <Droppable id={currentSlide}>
                                <span>{currentSlide}</span>
                                <DndContext onDragStart={handleSortStart} onDragEnd={(event)=>handleSortEnd(event ,currentSlide)}>
                                    <SortableContext items={finalCourseData.slides.filter(slide => slide.id === currentSlide)[0].content} strategy={verticalListSortingStrategy}>
                                        {
                                            finalCourseData.slides.filter(slide => slide.id === currentSlide)[0].content.map((element, index) => {
                                                if (element.type === 'Heading') {
                                                    return <SortableItem id={element.id} key={index}>
                                                        <div className='heading_form_top'>
                                                            <input type='text' value={element.data} onChange={(e) => { handleOnChange(e, element.id, currentSlide) }} placeholder='Heading...' className='heading_form_top_name'></input>
                                                        </div>
                                                    </SortableItem>;
                                                }
                                                if (element.type === 'Text') {
                                                    return <SortableItem id={element.id} key={index}>
                                                        <Editor finalCourseData={finalCourseData} setFinalCourseData={setFinalCourseData} content={element.data} slideId={currentSlide} contentId={element.id} />
                                                    </SortableItem>;
                                                }
                                                if (element.type === 'Image') {
                                                    return <SortableItem id={element.id} key={index}>
                                                        {element.data ? (
                                                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                                               
                                                                    <div className="box">
                                                                        <img id={"imgId"}  src={URL.createObjectURL(element.data)} ></img>
                                                                    </div>
                                                               
                                                            </div>
                                                        ) : null}
                                                        {element.data ? null : <div><label htmlFor={`${element.id}`} style={{ width: "100%", height: "50px", textAlign: "center", display: "block", border: "1px dotted grey" }}>upload image</label></div>}
                                                        <input type='file' accept='image/*' id={`${element.id}`} onChange={(event) => handleImageChange(event, currentSlide , element.id)} style={{ display: "none" }}></input>
                                                    </SortableItem>;
                                                }
                                                if(element.type === 'Video'){
                                                    return (
                                                        <SortableItem id={element.id} key={index}>
                                                            <YouTubeVideo/>
                                                        </SortableItem>
                                                    )
                                                }
                                                if(element.type === 'Quiz'){
                                                    return (
                                                        <SortableItem id={element.id} key={index}>
                                                            <Quiz setFinalCourseData={setFinalCourseData} slideId={currentSlide} contentId={element.id}/>
                                                        </SortableItem>
                                                    )
                                                }
                                            })
                                        }
                                    </SortableContext>
                                    <DragOverlay>
                                        {activeId ? <Item id={activeId}><i className="fa-solid fa-sort" style={{ fontSize: "30px" }}></i></Item> : null}
                                    </DragOverlay>
                                </DndContext>
                            </Droppable>
                        }
                    </div>
                    <div>
                        <div className='pagination_container'>
                            <Pagination slides={finalCourseData.slides} paginate={paginate} currentSlideId={currentSlide}></Pagination>
                        </div>
                        <div><button className='btn btn-primary' onClick={() => addSlide(slideId)}>Add Slide</button></div>
                    </div>
                </div>
                <div className='draggables_container'>
                    <div className='widgets'>WIDGETS</div>
                    <div className='draggables'>
                        <Heading />
                        <Text />
                        <Image />
                        <Video />
                        <QuizDraggable />
                    </div>
                </div>
            </DndContext>
        </div>

    </>);
}

export default CourseCreator;