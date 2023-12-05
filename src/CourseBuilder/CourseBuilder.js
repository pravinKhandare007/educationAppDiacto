import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import CourseCreator from "../CourseCreator/CourseCreator";
import './CourseBuilder.css'
import Preview from "../Preview_Component/CourseCreatorPreview";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SideBarPreview from "../Preview_Component/SideBarPreview";
import CourseCreatorPreview from "../Preview_Component/CourseCreatorPreview";

const CourseBuilder = ({name="Trigonometry course" , subject = "Maths" , discription = "This course will teach about the fundamentals of trigonometry"}) => {
    console.log("rendering parent");
    

    const [selectedSemId, setSelectedSemId] = useState(null);
    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const [selectedQuizId , setSelectedQuizId] = useState(null);
    const [mainCourseData, setMainCourseData] = useState({ semesters: [] });
    const [showPreview, setShowPreview] = useState(false);

    console.log("maincd" , mainCourseData);
    
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
                                        slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Heading', data: 'section 1 slide 1' }] },
                                        { id: uuidv4(), content: [{ id: uuidv4(), type: 'Text', data: 'section 1 slide 2' }] },
                                        ]
                                    }
                                }
                            ],
                            quiz: []
                        },


                    ],
                    quiz: []
                },
                {
                    id: uuidv4(),
                    name: 'sem 2',
                    content:null,
                    chapters: [

                        {
                            id: uuidv4(),
                            name: 'chapter 1',
                            sections: [
                                {
                                    id: uuidv4(),
                                    name: 'section 1',

                                    content: null
                                }
                            ],
                            quiz: [
                                {
                                    id: uuidv4(),
                                    name: 'bioQuiz',
                                    content: null
                                }
                            ]
                        }

                    ],
                    quiz: []
                }
            ]
        });
    }, []);


    const handleSelectedSemester = (semesterId) => {
        setSelectedSemId(semesterId);
        setSelectedChapterId(null);
        setSelectedSectionId(null);
        setSelectedQuizId(null);
    }

    const handleSelectedChapter = (semesterId, chapId) => {
        setSelectedSemId(semesterId);
        setSelectedChapterId(chapId);
        setSelectedSectionId(null)
        setSelectedQuizId(null);
    }

    const resetSelectedIds = ()=>{
        setSelectedSemId(null);
        setSelectedChapterId(null);
        setSelectedSectionId(null);
        setSelectedQuizId(null);
    }

    const handleSelectedQuiz= (semId,chapId,quizId)=>{
        setSelectedSemId(semId);
        setSelectedChapterId(chapId);
        setSelectedQuizId(quizId);
        setSelectedSectionId(null);
    }

    const handleSelectedSection = (semesterId, chpId, secId) => {
        setSelectedChapterId(chpId)
        setSelectedSectionId(secId)
        setSelectedSemId(semesterId)
    }

    function saveCourseData() {
        axios.post("/api/courses", mainCourseData);
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
                    <button className="btn btn-primary" style={{marginRight:"5px"}}>Save Course</button>
                    <button onClick={() => { setShowPreview((showPreview) => !showPreview) }} className='btn btn-primary'>Preview</button>
                </div>
            </div>
            <div className="course_builder_container">
                {
                    showPreview ? (
                        <>
                            <div className="sidebar_container">
                                <SideBarPreview handleSelectedSection={handleSelectedSection}
                                    mainCourseData={mainCourseData} />
                            </div>

                            {
                                selectedSectionId ? (
                                    <CourseCreatorPreview
                                        mainCourseData={mainCourseData}
                                        selectedChapterId={selectedChapterId} selectedSectionId={selectedSectionId}
                                        selectedSemId={selectedSemId}
                                        setShowPreview={setShowPreview}
                                    />
                                ) : <div></div>
                            }
                        </>
                    ) : (
                        <>
                            <div className="sidebar_container">
                                {
                                    mainCourseData.semesters.length > 0 && <SideBar handleSelectedSection={handleSelectedSection}
                                        mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}
                                        handleSelectedSemester={handleSelectedSemester}
                                        handleSelectedChapter={handleSelectedChapter} 
                                        resetSelectedIds={resetSelectedIds} 
                                        handleSelectedQuiz={handleSelectedQuiz}   
                                    />
                                        
                                }
                            </div>

                            {
                                selectedSectionId || selectedSemId || selectedChapterId || selectedQuizId ? (
                                    <CourseCreator
                                        mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}
                                        selectedChapterId={selectedChapterId} selectedSectionId={selectedSectionId}
                                        selectedSemId={selectedSemId}
                                        setShowPreview={setShowPreview}
                                        resetSelectedIds={resetSelectedIds}
                                        selectedQuizId={selectedQuizId}
                                        
                                    />
                                ) : <div></div>
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



