import React, { useEffect, useState } from 'react';
// import './PreviewCourseCreator.css'
import '../CourseCreator/CourseCreator.css';
//../CourseCreator/CourseCreator.css
import Pagination from '../Pagination/Pagination';

import { v4 as uuidv4 } from 'uuid';

const CourseCreatorPreview = ({ mainCourseData, selectedSemPreviewId, selectedChapterPreviewId, selectedSectionPreviewId, selectedQuizPreviewId, slideId }) => {

    console.log("rendering course creater");
    const initialId = uuidv4();
    const [currentSlideId, setCurrentSlideId] = useState(initialId); // will contain the id of the current slide
    //rename slidesData
    //api we need to send sectionID and body -- sildesData.
    //sample api endpoint = /api/section/:sectionId 
    //api body = slidesData
    let initialSlidesData = { slides: [{ id: initialId, content: [] }] }
    const [slidesData, setSlidesData] = useState(initialSlidesData);

    // function getDataFromParent(semId, chapId, secId, quizId) {

    //     const semester = mainCourseData.semesters ? mainCourseData['semesters'].find(semObj => semObj.id === semId) : null
    //     const chapter = semester ? semester['chapters'].find(chapObj => chapObj.id === chapId) : null
    //     const section = chapter ? chapter['sections'].find(sectionObj => sectionObj.id === secId) : null
    //     const chapterTest = chapter?.chapterTest ? chapter['chapterTest'].find(chapterTestObj => chapterTestObj.id === quizId) : null
    //     const semesterTest = semester?.semesterTest ? semester['semesterTest'].find(semesterTestObj => semesterTestObj.id === quizId) : null

    //     if (type === 'semesters') {
    //         if (semester) {
    //             setSlidesData(semester?.content ? semester.content : null);
    //             setCurrentSlideId(semester.content ? semester.content.slides[0].id :null);
    //         }
    //     }
    //     if (type === 'chapters') {
    //         if (chapter) {
    //             setSlidesData(chapter.content ? chapter.content : null);
    //             setCurrentSlideId(chapter.content ? chapter.content.slides[0].id : null);
    //         };
    //     }
    //     if (type === 'sections') {
    //         if (section) {
    //             setSlidesData(section.content ? section.content : null);
    //             setCurrentSlideId(section.content ? section.content.slides[0].id : null);
    //         }
    //     }
    //     if (type === 'chapterTest') {
    //         if (chapterTest) {
    //             setSlidesData(chapterTest.content ? chapterTest.content : null)
    //             setCurrentSlideId(chapterTest.content ? chapterTest.content.slides[0].id : null);

    //         }
    //     }
    //     if (type === 'semesterTest') {
    //         if (semesterTest) {
    //             setSlidesData(semesterTest.content ? semesterTest.content : null)
    //             setCurrentSlideId(semesterTest.content ? semesterTest.content.slides[0].id : null);

    //         }
    //     }
    // }

    useEffect(() => {
        console.log("setting slides data from mainCourseData");

        if (selectedSemPreviewId && !selectedChapterPreviewId && !selectedSectionPreviewId && !selectedQuizPreviewId) {
            console.log("selectedSemPreviewId && !selectedChapterPreviewId && !selectedSectionPreviewId && !selectedQuizPreviewId")
            const selectedSemIndex = mainCourseData.semesters.findIndex((semester) => semester.id === selectedSemPreviewId);
            const selectedSemesterContent = mainCourseData.semesters[selectedSemIndex].content;

            if (selectedSemesterContent) {
                setSlidesData(mainCourseData.semesters[selectedSemIndex].content);
                setCurrentSlideId(selectedSemesterContent.slides[0].id);
            } else {
                setSlidesData(null);
            }
        }

        if (selectedSemPreviewId && !selectedChapterPreviewId && !selectedSectionPreviewId && selectedQuizPreviewId) {
            console.log("selectedSemPreviewId && !selectedChapterPreviewId && !selectedSectionPreviewId && selectedQuizPreviewId");
            const selectedSemIndex = mainCourseData.semesters.findIndex((semester) => semester.id === selectedSemPreviewId);
            const selectedQuizIndex = mainCourseData.semesters[selectedSemIndex].semesterTest.findIndex((q) => q.id === selectedQuizPreviewId);

            const selectedQuizData = mainCourseData.semesters[selectedSemIndex].semesterTest[selectedQuizIndex].content;

            if (selectedQuizData) {
                setSlidesData(selectedQuizData);
                console.log("+++", selectedQuizData.slides[0].id);
                setCurrentSlideId(selectedQuizData.slides[0].id);
            } else {
                setSlidesData(null);
            }
        }

        if (selectedSemPreviewId && selectedChapterPreviewId && !selectedSectionPreviewId && !selectedQuizPreviewId) {
            console.log("selectedSemPreviewId && selectedChapterPreviewId && !selectedSectionPreviewId && !selectedQuizPreviewId")
            const selectedSemIndex = mainCourseData.semesters.findIndex((semester) => semester.id === selectedSemPreviewId);
            const selectedChapterIndex = mainCourseData.semesters[selectedSemIndex].chapters.findIndex((chapter) => chapter.id === selectedChapterPreviewId);

            const selectedChapterData = mainCourseData.semesters[selectedSemIndex].chapters[selectedChapterIndex].content;

            if (selectedChapterData) {
                setSlidesData(selectedChapterData);
                setCurrentSlideId(selectedChapterData.slides[0].id);
            } else {
                setSlidesData(null);
            }
        }

        if (selectedSemPreviewId && selectedChapterPreviewId && selectedSectionPreviewId && !selectedQuizPreviewId) {
            console.log("selectedSemPreviewId && selectedChapterPreviewId && selectedSectionPreviewId && !selectedQuizPreviewId")
            const selectedSemIndex = mainCourseData.semesters.findIndex((semester) => semester.id === selectedSemPreviewId);
            const selectedChapterIndex = mainCourseData.semesters[selectedSemIndex].chapters.findIndex((chapter) => chapter.id === selectedChapterPreviewId);
            const selectedSectionIndex = mainCourseData.semesters[selectedSemIndex].chapters[selectedChapterIndex].sections.findIndex((section) => section.id === selectedSectionPreviewId);

            const sectionsSlidesData = mainCourseData.semesters[selectedSemIndex].chapters[selectedChapterIndex].sections[selectedSectionIndex].content;
            if (sectionsSlidesData) {
                console.log("sectionsSlidesdata : ", sectionsSlidesData);
                console.log("current slide setting to : ", sectionsSlidesData.slides[0].id);
                setSlidesData(() => ({ ...sectionsSlidesData }));
                setCurrentSlideId(sectionsSlidesData.slides[0].id);
            } else {
                setSlidesData(null);
            }
        }

        if (selectedSemPreviewId && selectedChapterPreviewId && selectedQuizPreviewId && !selectedSectionPreviewId) {
            console.log("selectedSemPreviewId && selectedChapterPreviewId && selectedQuizPreviewId && !selectedSectionPreviewId");
            const selectedSemIndex = mainCourseData.semesters.findIndex((semester) => semester.id === selectedSemPreviewId);
            const selectedChapterIndex = mainCourseData.semesters[selectedSemIndex].chapters.findIndex((chapter) => chapter.id === selectedChapterPreviewId);
            const selectedQuizIndex = mainCourseData.semesters[selectedSemIndex].chapters[selectedChapterIndex].chapterTest.findIndex((q) => q.id === selectedQuizPreviewId);

            const quizSlidesData = mainCourseData.semesters[selectedSemIndex].chapters[selectedChapterIndex].chapterTest[selectedQuizIndex].content;
            if (quizSlidesData) {
                console.log("quizSlidesdata : ", quizSlidesData);
                console.log("current slide setting to : ", quizSlidesData.slides[0].id);
                setSlidesData(() => ({ ...quizSlidesData }));
                setCurrentSlideId(quizSlidesData.slides[0].id);
            } else {
                setSlidesData(null);
            }
        }

    }, [selectedSectionPreviewId, selectedSemPreviewId, selectedChapterPreviewId, selectedQuizPreviewId]);

    useEffect(() => {
        if (slideId) {
            setCurrentSlideId(slideId);
        }

    }, [])

    function paginate(currentSlideId) {
        setCurrentSlideId(currentSlideId);
    }

    //if the slides data is null you give a message to teacher that there is no data in the semester.
    return (<>
        {
            slidesData ? (
                <div className='course_creator_container'>
                    <div className='slides_container' style={{ width: "100%" , display:'flex' , flexDirection:'column' , height:'100%'}}>
                        <div className='slide' style={{
                           height:'100%',
                           overflow:'auto',
                           padding:'2em'
                        }} >
                            {
                                <div style={{ border: "1px solid #b6ccd8", position: 'relative', width: '100%', padding: '1em', minHeight: '100%', display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "#ffffff", borderRadius: '12px' }}>
                                    {
                                        slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content.map((contentObj) => {
                                            if (!contentObj.data) return;
                                            if (contentObj.type === "Heading") {
                                                return (
                                                    <div className='copy-ql-editor'>
                                                        <span className="heading_from_top" style={{ fontSize: "20px", fontWeight: '400', lineHeight: '145%', width: '100%', color: 'black' }}>{contentObj.data}</span>
                                                    </div>
                                                )
                                            }
                                            if (contentObj.type === "Text") {
                                                return (
                                                    <div className='ql-snow'>
                                                        <div dangerouslySetInnerHTML={{ __html: contentObj.data }} className='ql-editor'>

                                                        </div>
                                                    </div>
                                                )
                                            }
                                            if (contentObj.type === "Quiz") {
                                                return (
                                                    <div className=''>
                                                        <div>
                                                            <span>{`Q) `}</span>
                                                            <span>{contentObj.data.question}</span>
                                                            <div>
                                                                {
                                                                    contentObj.data.type === 'single' ? (
                                                                        contentObj.data.options.map((option, optIndex) => {
                                                                            return (
                                                                                <div style={{ paddingTop: "0.2em" }}>
                                                                                    <input type='radio' style={{ marginRight: "3px" }} value={option} id={`option${optIndex}`} name={`reord`}></input><label for={`option${optIndex}`}>{option}</label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    ) : (
                                                                        contentObj.data.options.map((option, optIndex) => {
                                                                            return (
                                                                                <div style={{ paddingTop: "0.2em" }}>
                                                                                    <input type='checkbox' style={{ marginRight: "3px" }} value={option} id={`option${optIndex}`} name={`reord`}></input><label for={`option${optIndex}`}>{option}</label>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            if (contentObj.type === "Image") {
                                                return (
                                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                                        {contentObj.data.imgData && (
                                                            <div style={{ width: contentObj.data.width ? contentObj.data.width : 'auto', height: contentObj.data.height ? contentObj.data.height : 'auto' }}>
                                                                <img id={"imgId"} src={URL.createObjectURL(contentObj.data.imgData)} style={{ height: "100%", width: "100%" }}></img>
                                                            </div>
                                                        )}

                                                    </div>
                                                )
                                            }
                                            if (contentObj.type === "Video") {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        {contentObj.data.ytData.videoId &&
                                                            <iframe
                                                                width="560"
                                                                height="315"
                                                                src={`https://www.youtube.com/embed/${contentObj.data.ytData.videoId}`}
                                                                title="YouTube Video"
                                                                frameBorder="0"
                                                                allowFullScreen
                                                            ></iframe>
                                                        }
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    <div style={{ height: '50px' }}>

                                    </div>
                                </div>
                            }
                        </div>
                        <div>
                            <div className='pagination_container'>
                                <Pagination slides={slidesData.slides} paginate={paginate} currentSlideId={currentSlideId} setCurrentSlideId={setCurrentSlideId}></Pagination>
                            </div>
                        </div>
                    </div>
                </div>) : <div></div>
        }
    </>);
}

export default CourseCreatorPreview;