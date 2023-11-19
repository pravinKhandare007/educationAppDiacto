import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import CourseCreator from "../CourseCreator/CourseCreator";
import './CourseBuilder.css'



const CourseBuilder = () => {

    const [courseTree , setCourseTree ] = useState([])
    const [selectedSemId , setSelectedSemId] = useState(null);
    const [selectedChapterId , setSelectedChapterId] = useState(null);
    const [selectedSectionId , setSelectedSectionId] = useState(null);
    const [mainCourseData , setMainCourseData ] = useState([])

    const handleSelectedSection = (semesterId,chpId,secId ) => {
        setSelectedChapterId(chpId)
        setSelectedSectionId(secId)
        setSelectedSemId(semesterId)
    }


    return ( <>
        <div className="title">Course Builder</div>
        <div className="course_builder_container">
            <div className="sidebar_container">
                <SideBar  handleSelectedSection={handleSelectedSection}
                setSelectedChapterId={setSelectedChapterId} setSelectedSectionId={setSelectedSectionId} 
                setSelectedSemId={setSelectedSemId} courseTree={courseTree} setCourseTree={setCourseTree} 
                mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}/>
            </div>
            {/* below component will change with routing */}
            <CourseCreator courseTree={courseTree} setCourseTree={setCourseTree}
            selectedChapterId={selectedChapterId} selectedSectionId={selectedSectionId} selectedSemId={selectedSemId}
            setSelectedChapterId={setSelectedChapterId} setSelectedSectionId={setSelectedSectionId} setSelectedSemId={setSelectedSemId}
            />
            
        </div>
    </> 
    );
}
 
export default CourseBuilder;