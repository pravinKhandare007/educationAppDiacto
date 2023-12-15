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
import VideoComponent from './Video_Component/VideoComponent';
import { v4 as uuidv4 } from 'uuid';
import McqComponent from './MCQ_Component/McqComponent';
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
    restrictToParentElement,
    restrictToFirstScrollableAncestor
} from '@dnd-kit/modifiers'

const CourseCreator = ({ selectedSectionId, selectedChapterId, selectedSemId, mainCourseData, setMainCourseData, selectedQuizId, setSlideId, slideId, type }) => {
    
    const initialId = uuidv4();
    const [activeId, setActiveId] = useState(null);
    const [currentSlideId, setCurrentSlideId] = useState(initialId); // will contain the id of the current slide
    //rename slidesData
    //api we need to send sectionID and body -- sildesData.
    //sample api endpoint = /api/section/:sectionId 
    //api body = slidesData
    let initialSlidesData = { slides: [{ id: initialId, content: [] }] }
    const [slidesData, setSlidesData] = useState(initialSlidesData);
    const [timeLimit, setTimeLimit] = useState(null);
    const [numberOfQuestionToShow, setNumberOfQuestionToShow] = useState(null);
    const [isDragging, setIsDragging] = useState("");
    const firstSlide = {
        id: uuidv4(), content: []
    }

    

    function getDataFromParent(semId, chapId, secId, quizId) {
 
        const semester = mainCourseData.semesters ? mainCourseData['semesters'].find(semObj => semObj.id === semId) : null
        const chapter = semester ? semester['chapters'].find(chapObj => chapObj.id === chapId) : null
        const section = chapter ? chapter['sections'].find(sectionObj => sectionObj.id === secId) : null
        const chapterTest = chapter?.chapterTest ? chapter['chapterTest'].find(chapterTestObj => chapterTestObj.id === quizId) : null
        const semesterTest = semester?.semesterTest ? semester['semesterTest'].find(semesterTestObj => semesterTestObj.id === quizId) : null

        if (type === 'semesters') {
            if (semester) {
                setSlidesData(semester?.content ? semester.content : { slides: [firstSlide] });
                setCurrentSlideId(semester.content ? semester.content.slides[0].id : firstSlide.id);
            }
        }
        if (type === 'chapters') {
            if (chapter) {
                setSlidesData(chapter.content ? chapter.content : { slides: [firstSlide] });
                setCurrentSlideId(chapter.content ? chapter.content.slides[0].id : firstSlide.id);
            };
        }
        if (type === 'sections') {
            if (section) {
                setSlidesData(section.content ? section.content : { slides: [firstSlide] });
                setCurrentSlideId(section.content ? section.content.slides[0].id : firstSlide.id);
            }
        }
        if (type === 'chapterTest') {
            if (chapterTest) {
                setSlidesData(chapterTest.content ? chapterTest.content : { slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: "Quiz", data: null }] }] })
                setCurrentSlideId(chapterTest.content ? chapterTest.content.slides[0].id : firstSlide.id);
                setNumberOfQuestionToShow(chapterTest.numberOfQuestions ? chapterTest.numberOfQuestions: 0);
                setTimeLimit(chapterTest.timeLimit);
            }
        }
        if (type === 'semesterTest') {
            if (semesterTest) {
                setSlidesData(semesterTest.content ? semesterTest.content : { slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: "Quiz", data: null }] }] })
                setCurrentSlideId(semesterTest.content ? semesterTest.content.slides[0].id : firstSlide.id);
                setNumberOfQuestionToShow(semesterTest.numberOfQuestions ? semesterTest.numberOfQuestions: 0);
                setTimeLimit(semesterTest.timeLimit);
            }
        }
    }

    function setDataToParent(semId, chapId, secId, quizId) {
        if (type === 'semesters') {
            setMainCourseData((mainCourseData) => {
                const newMainCourseData = {
                    ...mainCourseData, semesters: mainCourseData.semesters.map((semester) => {
                        if (semester.id === semId) {
                            return {
                                ...semester, content: slidesData
                            }
                        } else {
                            return {
                                ...semester
                            }
                        }
                    })
                }
                return newMainCourseData;
            })
            
        }
        if (type === 'chapters') {
            setMainCourseData((mainCourseData) => {
                const newMainCourseData = {
                    ...mainCourseData, semesters: mainCourseData.semesters.map((semester) => {
                        if (semester.id === semId) {
                            return {
                                ...semester, chapters: semester.chapters.map((chapter) => {
                                    if (chapter.id === chapId) {
                                        return {
                                            ...chapter, content: slidesData
                                        }
                                    } else {
                                        return {
                                            ...chapter
                                        }
                                    }
                                })
                            }
                        } else {
                            return {
                                ...semester
                            }
                        }
                    })
                }
                return newMainCourseData;
            })
        }
        if (type === "sections") {
            setMainCourseData((mainCourseData) => {
                return {
                    ...mainCourseData, semesters: [...mainCourseData.semesters.map((semester) => {
                        if (semester.id === semId) {
                            return {
                                ...semester, chapters: [...semester.chapters.map((chapter) => {
                                    if (chapter.id === chapId) {
                                        return {
                                            ...chapter, sections: [...chapter.sections.map((section) => {
                                                if (section.id == secId) {
                                                    return {
                                                        ...section, content: slidesData
                                                    }
                                                } else {
                                                    return { ...section }
                                                }
                                            })]
                                        }
                                    } else {
                                        return { ...chapter }
                                    }
                                })]
                            }
                        } else {
                            return { ...semester }
                        }
                    })]
                }
            })
        }
        if (type === "chapterTest") {
            setMainCourseData({
                semesters: mainCourseData.semesters.map((semester) => {
                    if (semester.id === semId) {
                        return {
                            ...semester, chapters: semester.chapters.map((chapter) => {
                                if (chapter.id === chapId) {
                                    return {
                                        ...chapter, chapterTest: chapter.chapterTest.map((q) => {
                                            if (q.id === quizId) {
                                                return {
                                                    ...q, content: slidesData
                                                }
                                            } else {
                                                return {
                                                    ...q
                                                }
                                            }
                                        })
                                    }
                                } else {
                                    return {
                                        ...chapter
                                    }
                                }
                            })
                        }
                    } else {
                        return {
                            ...semester
                        }
                    }
                })
            })
        }
        if (type === "semesterTest") {
            setMainCourseData({
                semesters: mainCourseData.semesters.map((semester) => {
                    if (semester.id === semId) {
                        return {
                            ...semester, semesterTest: semester.semesterTest.map((q) => {
                                if (q.id === quizId) {
                                    return {
                                        ...q, content: slidesData
                                    }
                                } else {
                                    return {
                                        ...q
                                    }
                                }
                            })
                        }
                    } else {
                        return {
                            ...semester
                        }
                    }
                })
            })
        }
    }

    useEffect(() => {
        getDataFromParent(selectedSemId, selectedChapterId, selectedSectionId, selectedQuizId);
    }, [selectedSectionId, selectedSemId, selectedChapterId, selectedQuizId])

    useEffect(() => {
        setDataToParent(selectedSemId, selectedChapterId, selectedSectionId, selectedQuizId);
    }, [slidesData])

    //below useEffect run when teacher enters number of question to display and saves the entered data into parents data

    useEffect(() => {
        if (selectedSemId && selectedChapterId && selectedQuizId && !selectedSectionId) {
            setMainCourseData({
                semesters: mainCourseData.semesters.map((semester) => {
                    if (semester.id === selectedSemId) {
                        return {
                            ...semester, chapters: semester.chapters.map((chapter) => {
                                if (chapter.id === selectedChapterId) {
                                    return {
                                        ...chapter, chapterTest: chapter.chapterTest.map((t) => {
                                            if (t.id === selectedQuizId) {
                                                return {
                                                    ...t, numberOfQuestions: numberOfQuestionToShow
                                                }
                                            } else {
                                                return {
                                                    ...t
                                                }
                                            }
                                        })
                                    }
                                } else {
                                    return {
                                        ...chapter
                                    }
                                }
                            })
                        }
                    } else {
                        return {
                            ...semester
                        }
                    }
                })
            })
        }

        if (selectedSemId && !selectedChapterId && !selectedSectionId && selectedQuizId) {
            setMainCourseData({
                semesters: mainCourseData.semesters.map((semester) => {
                    if (semester.id === selectedSemId) {
                        return {
                            ...semester, semesterTest: semester.semesterTest.map((t) => {
                                if (t.id === selectedQuizId) {
                                    return {
                                        ...t, numberOfQuestions: numberOfQuestionToShow
                                    }
                                } else {
                                    return {
                                        ...t
                                    }
                                }
                            })
                        }
                    } else {
                        return {
                            ...semester
                        }
                    }
                })
            })
        }

    }, [numberOfQuestionToShow])

    useEffect(() => {
        setSlideId(currentSlideId);
    }, [currentSlideId])

    useEffect(() => {
        if (slideId === '') {
            return
        } else {
            if(slideId){
                setCurrentSlideId(slideId);
            }
        }
    }, [])

    function handleDragStart(event) {
        console.log("drag start", event)
        setIsDragging(event.active.id);
    }

    function handleSortEnd(event, currentSlideId) {
        console.log("sort start", event);
        if (event.over === null) return;
        const { active, over } = event;
        setSlidesData((slidesData) => {
            const newSlidesData = { ...slidesData };

            const oldIndex = slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content.findIndex(contentObject => contentObject.id === active.id);
            const newIndex = slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content.findIndex(contentObject => contentObject.id === over.id);

            const newContent = arrayMove(slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content, oldIndex, newIndex);

            newSlidesData.slides = newSlidesData.slides.map((slide) => {
                if (slide.id === currentSlideId) {
                    return {
                        id: slide.id,
                        content: newContent
                    }
                } else {
                    return { ...slide }
                }
            })
            console.log("after sort end: ", newSlidesData);
            return newSlidesData;
        })
        setActiveId(null);
    }

    function handleDragEnd(event) {
        console.log("drag end", event)
        setIsDragging(null);
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
                const newSlidesData = { ...slidesData, slides: newSlides };
                console.log(newSlidesData);
                return newSlidesData;
            });

            console.log("dropped on ", event.over.id);
        }
    }

    function addSlide() {

        const newSlideId = uuidv4();
        setSlidesData((slidesData) => {
            const newSlidesData = { ...slidesData, slides: [...slidesData.slides, { id: newSlideId, content: [] }] }
            return newSlidesData;
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
            const newSlidesData = {
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
            return newSlidesData;
        })
    }

    function handleImageChange(event, slideId, contentId) {
        const image = event.target.files[0];
        setSlidesData((slidesData) => {
            const newSlidesData = {
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
            return newSlidesData;
        })
    }

    function addQuestion() {
        const newSlideId = uuidv4();
        setSlidesData((slidesData) => {
            const newSlidesData = {
                ...slidesData, slides: [...slidesData.slides, {
                    id: newSlideId, content: [{
                        id: uuidv4(), type: "Quiz", data: {
                            question: '',
                            options: [''],
                            correctAnswer: '',
                            type: 'single'
                        }
                    }]
                }]
            }
            return newSlidesData;
        })
        setCurrentSlideId(newSlideId);
        console.log("add slide slidesData, ", slidesData);
    }

    return (<>
        <div className='course_creator_container'>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
                <div className='slides_container'>
                    {
                        selectedQuizId && (<div>
                            <span>No. of question to display: <input type='number' value={numberOfQuestionToShow} onChange={(e) => { setNumberOfQuestionToShow(e.target.value) }}></input></span>
                            <span>Time Limit: <input value={timeLimit ? timeLimit.hours: null} type='number'></input><span>Hr</span><input value={timeLimit ? timeLimit.minutes: null} type='number'></input><span>Minutes</span></span>
                        </div>)
                    }
                    <div className='slide' >
                        
                        {
                            <Droppable id={currentSlideId} selectedQuizId={selectedQuizId}>
                                <span style={{ textAlign: "right" }}>slide No: {slidesData.slides.findIndex((slide) => slide.id === currentSlideId) + 1}</span>
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
                                                    return <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId} >
                                                        {element.data ? (
                                                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                                                <div className="box">
                                                                    <img id={"imgId"} src={URL.createObjectURL(element.data)} ></img>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                        {element.data ? null : <div style={{ width: "100%", height: "100px", textAlign: "center", display: "flex", border: "1px solid grey", justifyContent: "center", alignContent: "center" }}><label htmlFor={`${element.id}`} style={{ display: "flex", justifyContent: "center" }} ><span>upload image</span></label></div>}
                                                        <input type='file' accept='image/*' id={`${element.id}`} onChange={(event) => handleImageChange(event, currentSlideId, element.id)} style={{ display: "none" }}></input>
                                                    </SortableItem>;
                                                }
                                                if (element.type === 'Video') {
                                                    return (
                                                        <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId}>
                                                            <VideoComponent slidesData={slidesData} setSlidesData={setSlidesData} slideId={currentSlideId} contentId={element.id} data={element.data} />
                                                        </SortableItem>
                                                    )
                                                }
                                                if (element.type === 'Quiz') {
                                                   
                                                    return (
                                                        <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId} selectedQuizId={selectedQuizId}>
                                                            <McqComponent setSlidesData={setSlidesData} slideId={currentSlideId} contentId={element.id} slidesData={slidesData} data={element.data} />
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
                        {
                            selectedQuizId ? (<div style={{ textAlign: "right", marginRight: "26px" }}><button className='btn btn-primary' onClick={() => addQuestion()}>Add Question</button></div>) : (<div style={{ textAlign: "right", marginRight: "26px" }}><button className='btn btn-primary' onClick={() => addSlide()}>Add Slide</button></div>)

                        }
                    </div>
                </div>
                <div className='draggables_container'>
                    <div className='widgets'>WIDGETS</div>
                    <div className='draggables'>
                        <>
                            <Heading disabled={selectedQuizId ? true : false} />
                            <Text disabled={selectedQuizId ? true : false} />
                            <Image disabled={selectedQuizId ? true : false} />
                            <Video disabled={selectedQuizId ? true : false} />
                            <QuizDraggable disabled={selectedQuizId ? true : false} />
                        </>
                    </div>
                </div>
                <DragOverlay>
                    {
                        isDragging === "Text" ? (
                            <div className="draggable">
                                <i className="fa-regular fa-pen-to-square" ></i>
                                <p>Text</p>
                            </div>
                        ) : null
                    }
                    {
                        isDragging === "Heading" ? (
                            <div className="draggable" >
                                <i className="fa-solid fa-heading"></i>
                                <p>Heading</p>
                            </div>
                        ) : null
                    }
                    {
                        isDragging === "Image" ? (
                            <div className="draggable">
                                <i className="fa-regular fa-image image"></i>
                                <p>Info-Graphic</p>
                            </div>
                        ) : null
                    }
                    {
                        isDragging === "Quiz" ? (
                            <div className="draggable">
                                <i class="fa-solid fa-q"></i>
                                <p>Quiz</p>
                            </div>
                        ) : null
                    }
                    {
                        isDragging === "Video" ? (
                            <div className="draggable">
                                <i className="fa-solid fa-video"></i>
                                <p>Video</p>
                                
                            </div>
                        ) : null
                    }
                </DragOverlay>
            </DndContext>
        </div>
    </>);
}

export default CourseCreator;