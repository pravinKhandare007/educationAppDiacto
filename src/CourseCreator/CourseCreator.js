import React, { useEffect, useState } from 'react';
import './CourseCreator.css'
import Heading from './DraggableItems/Heading';
import Text from './DraggableItems/Text';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Droppable } from './Droppable';
import Pagination from '../Pagination/Pagination';
import Image from './DraggableItems/Image';
import Video from './DraggableItems/VideoDraggable';
import { SortableItem } from './SortableItem/SortableItem';
import { Item } from './SortableItem/Item';
import Editor from './Editor_Component/Editor';
import Quiz from './Quiz_Component/Quiz';
import QuizDraggable from './DraggableItems/QuizDraggable';
import Video_Component from './Video_Component/VideoComponent';
import { v4 as uuidv4 } from 'uuid';


const CourseCreator = ({ courseTree, setCourseTree, selectedSectionId, selectedChapterId, selectedSemId, setShowPreview, setParentsCopyOfSlidesData, parentsCopyOfSlidesData }) => {

    let initialId;
    let initialSlidesData;
    if (parentsCopyOfSlidesData) {
        console.log("setting initial using parents data: ")
        initialId = parentsCopyOfSlidesData.slides[0].id;
        initialSlidesData = parentsCopyOfSlidesData;
    } else {
        initialId = uuidv4();
        initialSlidesData = {
            slides: [{ id: initialId, content: [] },]
        }
    }



    const [activeId, setActiveId] = useState(null);
    const [currentSlideId, setCurrentSlideId] = useState(initialId); // will contain the id of the current slide
    //rename slidesData
    //api we need to send sectionID and body -- sildesData.
    //sample api endpoint = /api/section/:sectionId 
    //api body = slidesData
    const [slidesData, setSlidesData] = useState(initialSlidesData);

    console.log(selectedSemId, selectedChapterId, selectedSectionId);

    useEffect(() => {
        console.log("useEffect slidesData", slidesData);
        console.log("currentSlideId: ", currentSlideId);
        setParentsCopyOfSlidesData(slidesData);
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
    //             setSlidesData((slidesData) => {
    //                 const newFinalCourseData = {
    //                     ...slidesData
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
    //         const newFinalCourseData = { ...slidesData };

    //         const oldIndex = newFinalCourseData.slides.findIndex(slide => slide.id === active.id);
    //         const newIndex = newFinalCourseData.slides.findIndex(slide => slide.id === over.id);

    //         const newSlides = arrayMove(newFinalCourseData.slides, oldIndex, newIndex);
    //         newFinalCourseData.slides = newSlides;
    //         setSlidesData(newFinalCourseData);
    //     }

    // }



    function handleDragStart(event) {
        console.log("drag start", event)
    }

    function handleSortEnd(event, currentSlideId) {
        console.log("sort start", event);
        if (event.over === null) return;
        const { active, over } = event;
        setSlidesData((slidesData) => {
            const newFinalCourseData = { ...slidesData };

            // const oldIndex = slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content.findIndex(contentObject => contentObject.id === active.id);
            //const newIndex = slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content.findIndex(contentObject => contentObject.id === over.id);

            // const newContent = arrayMove(slidesData.slides)
            return newFinalCourseData;
        })
        setActiveId(null);
    }

    function handleDragEnd(event) {
        console.log("drag end", event)
        if (event.over === null) return;

        if (event.over && event.over.id !== null) {
            const newSlides = slidesData.slides.map((slide) => {
                console.log("event.over.id: ", event.over.id);
                console.log("slide.id: ", slide.id);
                if (event.over.id === slide.id) {
                    //update the content of that slide 
                    return {
                        id: slide.id,
                        content: [...slide.content, { id: uuidv4(), type: event.active.id, data: "" }]
                    }
                } else {
                    return slide;
                }
            })

            setSlidesData((slidesData) => {
                const newFinalCourseData = { ...slidesData, slides: newSlides };
                console.log(newFinalCourseData);
                return newFinalCourseData;
            });

            console.log("dropped on ", event.over.id);
        }
    }

    function addSlide() {
        
        const newSlideId = uuidv4();
        setSlidesData((slidesData) => {
            const newFinalCourseData = { ...slidesData, slides: [...slidesData.slides, { id: newSlideId, content: [] }] }
            return newFinalCourseData;
        })
        setCurrentSlideId(newSlideId);
        console.log("add slide slidesData, ", slidesData);
        //setCurrentSlideId(slideId);
    }


    function handleSortStart(event) {
        const { active } = event;

        setActiveId(active.id)
        console.log("sort end", event)
    }

    function paginate(id) {
        setCurrentSlideId(id);
    }
    //takes slide id and content id ,adds e.target.value to the data property
    function handleOnChange(e, contentId, id) {
        console.log("handleOnChange called , its for heading");
        setSlidesData((slidesData) => {
            const newFinalCourseData = {
                ...slidesData, slides: [...slidesData.slides.map((slide) => {
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

    function handleImageChange(event, slideId, contentId) {
        const image = event.target.files[0];
        setSlidesData((slidesData) => {
            const newFinalCourseData = {
                ...slidesData, slides: [...slidesData.slides.map((slide) => {
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
                    <div className='slide' >
                        <div style={{ textAlign: "right" , marginBottom:"10px" }}><button onClick={() => { setShowPreview((showPreview) => !showPreview) }} className='btn btn-primary'>Preview</button></div>
                        {
                            <Droppable id={currentSlideId}>
                                <span style={{textAlign:"right"}}>slide No: {slidesData.slides.findIndex((slide) => slide.id === currentSlideId) + 1}</span>
                                <DndContext onDragStart={handleSortStart} onDragEnd={(event) => handleSortEnd(event, currentSlideId)}>
                                    <SortableContext items={slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content} strategy={verticalListSortingStrategy}>
                                        {
                                            slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content.map((element, index) => {
                                                if (element.type === 'Heading') {
                                                    return <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId}>
                                                        <div className='heading_form_top'>
                                                            <input type='text' value={element.data} onChange={(e) => { handleOnChange(e, element.id, currentSlideId) }} placeholder='Heading...' className='heading_form_top_name'></input>
                                                        </div>
                                                    </SortableItem>;
                                                }
                                                if (element.type === 'Text') {
                                                    return <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId}>
                                                        <Editor slidesData={slidesData} setSlidesData={setSlidesData} content={element.data} slideId={currentSlideId} contentId={element.id} />
                                                    </SortableItem>;
                                                }
                                                if (element.type === 'Image') {
                                                    return <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId}>
                                                        {element.data ? (
                                                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                                                                <div className="box">
                                                                    <img id={"imgId"} src={URL.createObjectURL(element.data)} ></img>
                                                                </div>

                                                            </div>
                                                        ) : null}
                                                        {element.data ? null : <div style={{ width: "100%", height: "100px", textAlign: "center", display: "flex", border: "1px solid grey", justifyContent:"center" , alignContent:"center" }}><label htmlFor={`${element.id}`} style={{display:"flex" , justifyContent:"center"}} ><span>upload image</span></label></div>}
                                                        <input type='file' accept='image/*' id={`${element.id}`} onChange={(event) => handleImageChange(event, currentSlideId, element.id)} style={{ display: "none" }}></input>
                                                    </SortableItem>;
                                                }
                                                if (element.type === 'Video') {
                                                    return (
                                                        <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId}>
                                                            <Video_Component />
                                                        </SortableItem>
                                                    )
                                                }
                                                if (element.type === 'Quiz') {
                                                    return (
                                                        <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId}>
                                                            <Quiz setSlidesData={setSlidesData} slideId={currentSlideId} contentId={element.id} slidesData={slidesData}/>
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
                            <Pagination slides={slidesData.slides} paginate={paginate} currentSlideId={currentSlideId} setCurrentSlideId={setCurrentSlideId}></Pagination>
                        </div>
                        <div style={{textAlign:"right" , marginRight:"26px"}}><button className='btn btn-primary' onClick={() => addSlide()}>Add Slide</button></div>
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