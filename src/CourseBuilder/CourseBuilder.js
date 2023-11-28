import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import CourseCreator from "../CourseCreator/CourseCreator";
import './CourseBuilder.css'
import Preview from "../Preview_Component/CourseCreatorPreview";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SideBarPreview from "../Preview_Component/SideBarPreview";
import CourseCreatorPreview from "../Preview_Component/CourseCreatorPreview";

const CourseBuilder = () => {
    console.log("rendering parent")

    const [selectedSemId, setSelectedSemId] = useState(null);
    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const [mainCourseData, setMainCourseData] = useState({semesters:[]});
    const [showPreview, setShowPreview] = useState(false);
   
    useEffect(()=>{
        console.log("mainCourseData: " , mainCourseData);
    })
    useEffect(() => {

        setMainCourseData({
            semesters: [
                {
                    id: uuidv4(),
                    name: 'Sem 1',
                    discription: {
                        slides: []
                    },
                    chapters: [

                        {
                            id: uuidv4(),
                            name: 'chapter 1',
                            discription: {
                                slides: []
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

                                    content: null
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
    },[]);



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
                            <SideBar handleSelectedSection={handleSelectedSection}
                                mainCourseData={mainCourseData} setMainCourseData={setMainCourseData} />
                        </div>

                        {
                            selectedSectionId ? (
                                <CourseCreator
                                    mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}
                                    selectedChapterId={selectedChapterId} selectedSectionId={selectedSectionId}
                                     selectedSemId={selectedSemId}
                                    setShowPreview={setShowPreview} 
                                />
                            ) : <div></div>
                        }
                    </>
                )
            }
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