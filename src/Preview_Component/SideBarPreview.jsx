import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {v4 as uuidv4} from "uuid";

const SideBarPreview = ({handleSelectedSection , mainCourseData }) => {
    

    const [semesters, setSemesters] = useState(mainCourseData.semesters);
    
    return (
        <>
            
                <Accordion >
                    {
                        semesters.map((semester, semIndex) => (
                            <Accordion.Item eventKey={semIndex + 1}>
                                <Accordion.Header>{semester.name} </Accordion.Header>
                                <Accordion.Body style={{ padding: "0"}}>
                                    <Accordion style={{opacity:"0.9"}} >
                                        {
                                            semester.chapters.map((chapter, chapIndex) => (
                                                <Accordion.Item eventKey={chapIndex + 1}>
                                                    <Accordion.Header >{chapter.name}</Accordion.Header>
                                                    <Accordion.Body style={{ padding: "0" }}>
                                                        <Accordion >
                                                              
                                                            {
                                                                chapter.sections.map((section, secIndex) => (
                                                                    <Accordion >

                                                                        {
                                                                            <li onClick={() => handleSelectedSection(semester.id,chapter.id,section.id)}>{section.name}</li>
                                                                        }
                                                                    </Accordion>


                                                                )

                                                                )
                                                            }
                                                            {
                                                                chapter.quiz.map((q, secIndex) => (
                                                                    <Accordion >

                                                                        {
                                                                            <li>{q.name}</li>
                                                                        }
                                                                    </Accordion>


                                                                )

                                                                )
                                                            }
                                                        </Accordion>
                                                    </Accordion.Body>
                                                </Accordion.Item>


                                            )

                                            )
                                        }
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))

                    }

                </Accordion>
            
        </>);
}

export default SideBarPreview;