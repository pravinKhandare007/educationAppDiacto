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
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Resizable } from 're-resizable';

const CourseCreator = ({ selectedSectionId, selectedChapterId, selectedSemId, mainCourseData, setMainCourseData, selectedQuizId, setSlideId, slideId, type ,isDeleted }) => {


    const [activeId, setActiveId] = useState(null);
    const [currentSlideId, setCurrentSlideId] = useState(null); // will contain the id of the current slide
    //rename slidesData
    //api we need to send sectionID and body -- sildesData.
    //sample api endpoint = /api/section/:sectionId 
    //api body = slidesData

    const [slidesData, setSlidesData] = useState(null);
    const [timeLimit, setTimeLimit] = useState(null);
    const [numberOfQuestionToShow, setNumberOfQuestionToShow] = useState(null);
    const [isDragging, setIsDragging] = useState("");
    const firstSlide = {
        id: uuidv4(), content: []
    }
    const [isSorted, setIsSorted] = useState(false);


    function getDataFromParent(semId, chapId, secId, quizId) {

        const semester = mainCourseData.semesters ? mainCourseData['semesters'].find(semObj => semObj.id === semId) : null
        const chapter = semester ? semester['chapters'].find(chapObj => chapObj.id === chapId) : null
        const section = chapter ? chapter['sections'].find(sectionObj => sectionObj.id === secId) : null
        const chapterTest = chapter?.chapterTest ? chapter['chapterTest'].find(chapterTestObj => chapterTestObj.id === quizId) : null
        const semesterTest = semester?.semesterTest ? semester['semesterTest'].find(semesterTestObj => semesterTestObj.id === quizId) : null
        if(!semester || !chapter || !section || !chapterTest || !semesterTest){
            setSlidesData(null);
            setCurrentSlideId(null);
        }
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
                setNumberOfQuestionToShow(chapterTest.numberOfQuestions ? chapterTest.numberOfQuestions : 0);
                setTimeLimit(chapterTest.timeLimit ? chapterTest.timeLimit : null);
            }
        }
        if (type === 'semesterTest') {
            if (semesterTest) {
                setSlidesData(semesterTest.content ? semesterTest.content : { slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: "Quiz", data: null }] }] })
                setCurrentSlideId(semesterTest.content ? semesterTest.content.slides[0].id : firstSlide.id);
                setNumberOfQuestionToShow(semesterTest.numberOfQuestions ? semesterTest.numberOfQuestions : 0);
                setTimeLimit(semesterTest.timeLimit ? semesterTest.timeLimit : null);
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
                                                    ...q, content: slidesData, timeLimit: timeLimit, numberOfQuestions: numberOfQuestionToShow
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
                                        ...q, content: slidesData, timeLimit: timeLimit, numberOfQuestions: numberOfQuestionToShow
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
    }, [selectedSectionId, selectedSemId, selectedChapterId, selectedQuizId , isDeleted])

    useEffect(() => {
        setDataToParent(selectedSemId, selectedChapterId, selectedSectionId, selectedQuizId);
    }, [slidesData, timeLimit, numberOfQuestionToShow])

    //below useEffect stores currentSlideId value into parent so when user goes into preview we can show that exact slide in preview aswell 
    useEffect(() => {
        setSlideId(currentSlideId);
    }, [currentSlideId])
    //below useEffect is used to set the currentSlideId to the id it was before going into preview
    useEffect(() => {
        if (slideId) {
            setCurrentSlideId(slideId);
        }
    }, [])

    function handleDragStart(event) {
        console.log("drag start", event);
        //based on this we render the required overlay
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
        setIsSorted(!isSorted);
    }

    function handleDragEnd(event) {
        console.log("drag end", event)
        setIsDragging(null);
        if (event.over === null) return;

        if (event.over && event.over.id !== null) {
            const newSlides = slidesData.slides.map((slide) => {
                if (event.over.id === slide.id) {
                    //update the content of that slide 
                    return {
                        id: slide.id,
                        content: [...slide.content, { id: uuidv4(), type: event.active.id, data: event.active.id === "Image" ? { imgData: '', width: '', height: '' } : "" }]
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
                                        data: { ...contentObject.data, imgData: image }
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

    function handleResize(e, d, ref, delta, element) {
        setSlidesData({
            ...slidesData, slides: slidesData.slides.map((slide) => {
                if (slide.id === currentSlideId) {
                    return {
                        ...slide, content: slide.content.map((obj) => {
                            if (obj.id === element.id) {
                                return {
                                    ...obj, data: {
                                        ...obj.data, width: ref.style.width,
                                        height: ref.style.height,
                                    }
                                }
                            } else {
                                return {
                                    ...obj
                                }
                            }
                        })
                    }
                } else {
                    return {
                        ...slide
                    }
                }
            })
        })
    }

    return (<>
        {
            slidesData && (
                <div className='course_creator_container'>
                    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
                        <div className='slides_container'>
                            {
                                selectedQuizId &&
                                (<div>
                                    <span>No. of question to display: <input type='number' value={numberOfQuestionToShow} onChange={(e) => { setNumberOfQuestionToShow(e.target.value) }}></input></span>
                                    <span>Time Limit: <input value={timeLimit ? timeLimit.hours : 0} type='number' onChange={(e) => { setTimeLimit((timeLimit) => { return { ...timeLimit, hours: e.target.value } }) }}></input>
                                        <span>Hr</span><input value={timeLimit ? timeLimit.minutes : 0} type='number' onChange={(e) => { setTimeLimit((timeLimit) => { return { ...timeLimit, minutes: e.target.value } }) }}></input><span>Minutes</span></span>
                                </div>)
                            }
                            <div className='slide'>
                                {
                                    <Droppable id={currentSlideId} selectedQuizId={selectedQuizId}>
                                        <span style={{ textAlign: "right" }}>slide No: {slidesData.slides.findIndex((slide) => slide.id === currentSlideId) + 1}</span>
                                        <DndContext onDragStart={handleSortStart} onDragEnd={(event) => handleSortEnd(event, currentSlideId)}>

                                            <SortableContext items={slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content} strategy={verticalListSortingStrategy}>
                                                {
                                                    slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content.map((element, index) => {
                                                        if (element.type === 'Heading') {
                                                            return <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId} setIsSorted={setIsSorted}>
                                                                <div className='heading_form_top'>
                                                                    <input type='text' value={element.data} onChange={(e) => { handleOnChange(e, element.id, currentSlideId) }} placeholder='Heading...' className='heading_form_top_name'></input>
                                                                </div>
                                                            </SortableItem>;
                                                        }
                                                        if (element.type === 'Text') {
                                                            return <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId} setIsSorted={setIsSorted}>
                                                                <Editor slidesData={slidesData} setSlidesData={setSlidesData} data={element.data} slideId={currentSlideId} contentId={element.id} isSorted={isSorted} />
                                                            </SortableItem>;
                                                        }
                                                        if (element.type === 'Image') {
                                                            return <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId} setIsSorted={setIsSorted}>
                                                                {element.data.imgData ? (
                                                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                                                        <Resizable
                                                                            size={{
                                                                                width: element.data.width,
                                                                                height: element.data.height
                                                                            }}
                                                                            maxWidth='100%'
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "center",
                                                                                alignItems: "center",
                                                                            }}
                                                                            lockAspectRatio={false}
                                                                            onResizeStop={(e, d, ref, delta) => handleResize(e, d, ref, delta, element)}
                                                                        >
                                                                            <img id={"imgId"} src={URL.createObjectURL(element.data.imgData)} style={{ height: "100%", width: "100%" }}></img>
                                                                        </Resizable>
                                                                    </div>
                                                                ) : null}
                                                                {element.data.imgData ? null : <div style={{ width: "100%", height: "100px", textAlign: "center", display: "flex", border: "1px solid grey", justifyContent: "center", alignContent: "center" }}>
                                                                    <label htmlFor={`${element.id}`} style={{ display: "flex", justifyContent: "center" }} ><span>upload image</span></label>
                                                                </div>}
                                                                <input type='file' accept='image/*' id={`${element.id}`} onChange={(event) => handleImageChange(event, currentSlideId, element.id)} style={{ display: "none" }}></input>
                                                            </SortableItem>;
                                                        }
                                                        if (element.type === 'Video') {
                                                            return (
                                                                <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId} setIsSorted={setIsSorted}>
                                                                    <VideoComponent slidesData={slidesData} setSlidesData={setSlidesData} slideId={currentSlideId} contentId={element.id} data={element.data} isSorted={isSorted} />
                                                                </SortableItem>
                                                            )
                                                        }
                                                        if (element.type === 'Quiz') {
                                                            return (
                                                                <SortableItem id={element.id} key={index} setSlidesData={setSlidesData} slideId={currentSlideId} selectedQuizId={selectedQuizId} setIsSorted={setIsSorted}>
                                                                    <McqComponent setSlidesData={setSlidesData} slideId={currentSlideId} contentId={element.id} slidesData={slidesData} data={element.data} isSorted={isSorted} />
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
                            <div className='pagination_addSlide_container'>
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
            )
        }
    </>);
}

export default CourseCreator;