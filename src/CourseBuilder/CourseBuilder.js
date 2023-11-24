import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import CourseCreator from "../CourseCreator/CourseCreator";
import './CourseBuilder.css'
import Preview from "../Preview_Component/Preview";
import axios from "axios";

const CourseBuilder = () => {

    const [courseTree , setCourseTree ] = useState([])
    const [selectedSemId , setSelectedSemId] = useState(null);
    const [selectedChapterId , setSelectedChapterId] = useState(null);
    const [selectedSectionId , setSelectedSectionId] = useState(null);
    const [mainCourseData , setMainCourseData ] = useState([]);
    const [showPreview , setShowPreview ] = useState(false);
    const [parentsCopyOfSlidesData , setParentsCopyOfSlidesData] = useState(null);

    const handleSelectedSection = (semesterId,chpId,secId ) => {
        setSelectedChapterId(chpId)
        setSelectedSectionId(secId)
        setSelectedSemId(semesterId)
    }

    const response = {
        semesters: [
            {   
                id: "s1",
                name: 'sem 1',
                chapters: [

                    {
                        id: "c1",
                        name: 'chapter 1',
                        sections: [
                            {
                                id: "sec1",
                                name: 'section 1',
                                content: [{
                                    slides: [{ id: 1223, content: [ 
                                        {id: '35dbb921-c0a7-4eee-8fe2-2933c0d38b33', type: 'Heading', data: 'heading'}] },]
                                }]
                            }
                        ],
                        quiz: []
                    }

                ]
            },
            {
                id: "s2",
                name: 'sem 2',
                chapters: [

                    {
                        id: "c1",
                        name: 'chapter 1',
                        sections: [
                            {
                                id: "sec1",
                                name: 'section 1',

                                content: [ { slides:[]}]
                            }
                        ],
                        quiz: [
                            {
                                id: "quiz1",
                                name: 'bioQuiz',
                                content: []
                            }
                        ]
                    }

                ]
            }
        ]
    }
    
    useEffect(()=>{
        axios.get("api/courses/:courseId")
        .then(res =>{
            setMainCourseData(res);
        }).catch(err => {
            console.log(err)
        })
    },[])

    function saveCourseData(){
        axios.post("/api/courses" , mainCourseData);
    }
    return ( <>
        <div className="title">Course Builder</div>
        <div className="course_builder_container">
            <div className="sidebar_container">
                <SideBar  handleSelectedSection={handleSelectedSection}
                 courseTree={courseTree} setCourseTree={setCourseTree} 
                mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}/>
            </div>
            {/* below component will change with routing */}
            
            {
                showPreview ? (<Preview setShowPreview={setShowPreview} parentsCopyOfSlidesData={parentsCopyOfSlidesData}/>) : (  <CourseCreator courseTree={courseTree} setCourseTree={setCourseTree}
                    selectedChapterId={selectedChapterId} selectedSectionId={selectedSectionId} selectedSemId={selectedSemId}
                    setSelectedChapterId={setSelectedChapterId} setSelectedSectionId={setSelectedSectionId} 
                    setSelectedSemId={setSelectedSemId} setShowPreview={setShowPreview} setParentsCopyOfSlidesData={setParentsCopyOfSlidesData} parentsCopyOfSlidesData={parentsCopyOfSlidesData}
                    />
        )
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