import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import CourseCreator from "../CourseCreator/CourseCreator";
import './CourseBuilder.css'
import Preview from "../Preview_Component/CourseCreatorPreview";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SideBarPreview from "../Preview_Component/SideBarPreview";
import CourseCreatorPreview from "../Preview_Component/CourseCreatorPreview";
import McqComponent from "../CourseCreator/MCQ_Component/McqComponent";

const CourseBuilder = ({ name = "Trigonometry course", subject = "Maths", discription = "This course will teach about the fundamentals of trigonometry" }) => {
    console.log("rendering parent");

    //useParam 
    const [selectedSemId, setSelectedSemId] = useState(null);
    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [mainCourseData, setMainCourseData] = useState({ semesters: [] });
    const [showPreview, setShowPreview] = useState(false);
    const [type, setType] = useState('');

    //ids for preview components 
    const [selectedSemPreviewId, setSelectedSemPreviewId] = useState(null);
    const [selectedChapterPreviewId, setSelectedChapterPreviewId] = useState(null);
    const [selectedSectionPreviewId, setSelectedSectionPreviewId] = useState(null);
    const [selectedQuizPreviewId, setSelectedQuizPreviewId] = useState(null);
    const [previewType, setPreviewType] = useState("");

    //below state is to store the information about which slide the teacher is on so on app re-render we have the same slide 
    const [slideId, setSlideId] = useState('')

    //below state is to store information about the open dropdowns. which is passed to preview component 
    const [semesterDropdownInfo, setSemesterDropdownInfo] = useState('');
    const [chapterDropdownInfo, setChapterDropdownInfo] = useState('');

    //below state is used to execute the useEffect in course creator component which sets slidesData state when a semster is deleted.
    const [isDeleted , setIsDeleted] = useState(false);

    useEffect(() => {
        setMainCourseData({
            semesters: [
                {
                    id: uuidv4(),
                    name: 'Sem 1',
                    content: {
                        slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Heading', data: 'Sem 1 discription or content' }] }]
                    },
                    chapters: [

                        {
                            id: uuidv4(),
                            name: 'chapter 1',
                            content: {
                                slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Heading', data: 'Sem 1 chapter 1 content' }] }]
                            },
                            sections: [
                                {
                                    id: uuidv4(),
                                    name: 'section 1',
                                    content: {
                                        slides: [
                                            { id: uuidv4(), content: [{ id: uuidv4(), type: 'Heading', data: 'section 1 slide 1' }] },
                                            { id: uuidv4(), content: [{ id: uuidv4(), type: 'Text', data: 'section 1 slide 2' }] },
                                        ]
                                    }
                                }
                            ],
                            chapterTest: [{ id: uuidv4(), name: "Chapter Test", numberOfQuestions: 5, timeLimit: { hours: 4, minutes: 24 }, content: { slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Quiz', data: null }] }] } }]
                        },


                    ],
                    semesterTest: [{ id: uuidv4(), name: "Semester Test", numberOfQuestions: 7, timeLimit: { hours: 2, minutes: 20 }, content: { slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Quiz', data: null }] }] } }]
                },

            ]
        });
    }, []);

    useEffect(() => {
        console.log("last parent render : , ", mainCourseData);
    })

    const handleSlectedIds = (semId, chapId, secId, quizId, type) => {
        setType(type);
        setSelectedSemId(semId);
        setSelectedChapterId(chapId);
        setSelectedSectionId(secId);
        setSelectedQuizId(quizId);
    }

    const resetSelectedIds = () => {
        setSelectedSemId(null);
        setSelectedChapterId(null);
        setSelectedSectionId(null);
        setSelectedQuizId(null);
        setType(null);
        setSlideId(null); //if not setted to null then when user deletes a sem, chap, sec. adds a new sem chap or sec and clicks on that. currentSlideId is set to the deleted slides Id.
    }

    function saveCourseData() {
        axios.post("/api/courses", mainCourseData);
    }

    function setPreviewIds() {
        setSelectedSemPreviewId(selectedSemId);
        setSelectedChapterPreviewId(selectedChapterId);
        setSelectedSectionPreviewId(selectedSectionId);
        setSelectedQuizPreviewId(selectedQuizId);
        setPreviewType(type);
    }

    function handleSelectedPreviewSemester(semId) {
        setSelectedSemPreviewId(semId);
        setSelectedChapterPreviewId(null);
        setSelectedSectionPreviewId(null);
        setSelectedQuizPreviewId(null);
    }

    function handleSelectedPreviewChapter(semId, chapId) {
        setSelectedSemPreviewId(semId);
        setSelectedChapterPreviewId(chapId);
        setSelectedSectionPreviewId(null);
        setSelectedQuizPreviewId(null);
    }

    function handleSelectedPreviewSection(semId, chapId, sectionId) {
        setSelectedSemPreviewId(semId);
        setSelectedChapterPreviewId(chapId);
        setSelectedSectionPreviewId(sectionId);
        setSelectedQuizPreviewId(null);
    }

    function handleSelectedPreviewQuiz(semId, chapId, quizId) {
        setSelectedSemPreviewId(semId);
        setSelectedChapterPreviewId(chapId);
        setSelectedSectionPreviewId(null);
        setSelectedQuizPreviewId(quizId);
    }

    const handleSelectedPreviewQuizOnChapterLevel = (semId, quizId) => {
        setSelectedSemPreviewId(semId);
        setSelectedChapterPreviewId(null);
        setSelectedQuizPreviewId(quizId);
        setSelectedSectionPreviewId(null);
    }

    return (<>
        <div className="builder_container">
            <div className="title">

                <div>
                    <span><strong>Course Name:</strong> {name}</span><br></br>
                    <span><strong>Subject:</strong> {subject}</span><br></br>
                    <span><strong>Description:</strong> {discription}</span>
                </div>
                <div style={{ textAlign: "right", marginBottom: "10px" }}>
                    {
                        showPreview ? (<button className="btn btn-primary" onClick={() => { setShowPreview((showPreview) => !showPreview) }}>Go Back</button>) : (
                            <><button className="btn btn-primary" style={{ marginRight: "5px" }}>Save Course</button>
                                <button onClick={() => { setShowPreview((showPreview) => !showPreview); setPreviewIds() }} className='btn btn-primary'>Preview</button></>
                        )
                    }
                </div>
            </div>
            <div className="course_builder_container">
                {
                    showPreview ? (
                        <>
                            <div className="sidebar_container">
                                <SideBarPreview
                                    mainCourseData={mainCourseData}
                                    handleSelectedPreviewSemester={handleSelectedPreviewSemester}
                                    handleSelectedPreviewChapter={handleSelectedPreviewChapter}
                                    handleSelectedPreviewSection={handleSelectedPreviewSection}
                                    handleSelectedPreviewQuiz={handleSelectedPreviewQuiz}
                                    handleSelectedPreviewQuizOnChapterLevel={handleSelectedPreviewQuizOnChapterLevel}
                                    semesterDropdownInfo={semesterDropdownInfo}
                                    chapterDropdownInfo={chapterDropdownInfo}

                                />
                            </div>

                            {
                                selectedSectionPreviewId || selectedSemPreviewId || selectedChapterPreviewId || selectedQuizPreviewId ? (
                                    <CourseCreatorPreview
                                        mainCourseData={mainCourseData}
                                        selectedSemPreviewId={selectedSemPreviewId}
                                        selectedChapterPreviewId={selectedChapterPreviewId}
                                        selectedSectionPreviewId={selectedSectionPreviewId}
                                        selectedQuizPreviewId={selectedQuizPreviewId}
                                        slideId={slideId}
                                        previewType={previewType}
                                    />
                                ) : <div></div>
                            }
                        </>
                    ) : (
                        <>
                            <div className="sidebar_container">
                                {
                                    <SideBar
                                        mainCourseData={mainCourseData}
                                        setMainCourseData={setMainCourseData}
                                        resetSelectedIds={resetSelectedIds}
                                        semesterDropdownInfo={semesterDropdownInfo}
                                        chapterDropdownInfo={chapterDropdownInfo}
                                        setSemesterDropdownInfo={setSemesterDropdownInfo}
                                        setChapterDropdownInfo={setChapterDropdownInfo}
                                        handleSlectedIds={handleSlectedIds}
                                        setIsDeleted={setIsDeleted}
                                    />
                                }
                            </div>
                            {
                                <CourseCreator
                                    mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}
                                    selectedChapterId={selectedChapterId}
                                    selectedSectionId={selectedSectionId}
                                    selectedSemId={selectedSemId}
                                    resetSelectedIds={resetSelectedIds}
                                    selectedQuizId={selectedQuizId}
                                    setSlideId={setSlideId}
                                    slideId={slideId}
                                    type={type}
                                    isDeleted={isDeleted}
                                />
                            }
                        </>
                    )
                }
            </div>
        </div>
    </>
    );
}

export default CourseBuilder;

{
    // {
    //     id: uuidv4(),
    //     name: 'sem 2',
    //     content:null,
    //     chapters: [

    //         {
    //             id: uuidv4(),
    //             name: 'chapter 1',
    //             content:null,
    //             sections: [
    //                 {
    //                     id: uuidv4(),
    //                     name: 'section 1',

    //                     content: {slides:[{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Heading', data: 'section data' }] }]}
    //                 }
    //             ],
    //             quiz: [
    //                 {
    //                     id: uuidv4(),
    //                     name: 'bioQuiz',
    //                     content: {slides:[{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Heading', data: 'bio quiz data' }] }]}
    //                 }
    //             ]
    //         }

    //     ],
    //     quiz: []
    // }
}

