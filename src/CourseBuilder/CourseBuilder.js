import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import CourseCreator from "../CourseCreator/CourseCreator";
import './CourseBuilder.css'
import Preview from "../Preview_Component/Preview";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CourseBuilder = () => {


    const [selectedSemId, setSelectedSemId] = useState(null);
    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const [mainCourseData, setMainCourseData] = useState({ semesters: [] });
    const [showPreview, setShowPreview] = useState(false);
    const [parentsCopyOfSlidesData, setParentsCopyOfSlidesData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setMainCourseData({
                semesters: [
                    {
                        id: uuidv4(),
                        name: 'Sem 1',
                        chapters: [

                            {
                                id: uuidv4(),
                                name: 'chapter 1',
                                sections: [
                                    {
                                        id: uuidv4(),
                                        name: 'section 1',
                                        content: [{
                                            slides: [{ id: uuidv4, content: [] },]
                                        }]
                                    }
                                ],
                                quiz: []
                            }

                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'sem 2',
                        chapters: [

                            {
                                id: uuidv4(),
                                name: 'chapter 1',
                                sections: [
                                    {
                                        id: uuidv4(),
                                        name: 'section 1',

                                        content: [{ slides: [] }]
                                    }
                                ],
                                quiz: [
                                    {
                                        id: uuidv4(),
                                        name: 'bioQuiz',
                                        content: []
                                    }
                                ]
                            }

                        ]
                    }
                ]
            });
        }, 1000);

    }, [])

    const handleSelectedSection = (semesterId, chpId, secId) => {
        setSelectedChapterId(chpId)
        setSelectedSectionId(secId)
        setSelectedSemId(semesterId)
    }

    function saveCourseData() {
        axios.post("/api/courses", mainCourseData);
    }
    return (<>
        <div className="title">Course Builder</div>
        <div className="course_builder_container">
            <div className="sidebar_container">
                <SideBar handleSelectedSection={handleSelectedSection}

                    mainCourseData={mainCourseData} setMainCourseData={setMainCourseData} />
            </div>
            {/* below component will change with routing */}

            {
                selectedSectionId ? showPreview ? (<Preview setShowPreview={setShowPreview} parentsCopyOfSlidesData={parentsCopyOfSlidesData} />) : (<CourseCreator
                    mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}
                    selectedChapterId={selectedChapterId} selectedSectionId={selectedSectionId} selectedSemId={selectedSemId}
                    setSelectedChapterId={setSelectedChapterId} setSelectedSectionId={setSelectedSectionId}
                    setSelectedSemId={setSelectedSemId} setShowPreview={setShowPreview} setParentsCopyOfSlidesData={setParentsCopyOfSlidesData}
                    parentsCopyOfSlidesData={parentsCopyOfSlidesData}
                />
                ) : <div> create component layout</div>
            }

            {/* preview component here 
                showPreview = true ; 
                course creator 
                
                */}


        </div>
    </>
    );
}

export default CourseBuilder;



{
    let testSideBar = {
        semesters: [
            {
                id: uuidv4(),
                name: 'Sem 1',
                chapters: [

                    {
                        id: uuidv4(),
                        name: 'chapter 1',
                        sections: [
                            {
                                id: uuidv4(),
                                name: 'section 1',
                                content: [{
                                    slides: [{ id: uuidv4, content: [] },]
                                }]
                            }
                        ],
                        quiz: []
                    }

                ]
            },
            {
                id: uuidv4(),
                name: 'sem 2',
                chapters: [

                    {
                        id: uuidv4(),
                        name: 'chapter 1',
                        sections: [
                            {
                                id: uuidv4(),
                                name: 'section 1',

                                content: [{ slides: [] }]
                            }
                        ],
                        quiz: [
                            {
                                id: uuidv4(),
                                name: 'bioQuiz',
                                content: []
                            }
                        ]
                    }

                ]
            }
        ]
    }
}