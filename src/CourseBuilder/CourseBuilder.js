import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import CourseCreator from "../CourseCreator/CourseCreator";
import './CourseBuilder.css'



const CourseBuilder = () => {

    
    return ( <>
        <div className="title">Course Builder</div>
        <div className="course_builder_container">
            <div className="sidebar_container">
                <SideBar/>
            </div>
            {/* below component will change with routing */}
            <CourseCreator/>
            
        </div>
    </> 
    );
}
 
export default CourseBuilder;