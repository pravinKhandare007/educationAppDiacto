import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {v4 as uuidv4} from "uuid";

const SideBar = ({courseTree , setCourseTree ,handleSelectedSection , mainCourseData , setMainCourseData }) => {
    console.log("maincourseData : " , mainCourseData);
    const [semesterName, setSemesterName] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [sectionName, setSectionName] = useState('');

    let testSideBar = {
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
                                content: []
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

    console.log("maincourseData that is passed to sidebar : " ,mainCourseData); 
    const [semesters, setSemesters] = useState(mainCourseData.semesters);
    
    useEffect(()=>{
        setSemesters(mainCourseData.semesters);
    })


    const addSemester = () => {
        const newSemesterObj = {
            id: uuidv4(),
            name: semesterName,
            chapters: []
        }
        const newSemesters = [...semesters];
        newSemesters.push(newSemesterObj);
        setSemesters(newSemesters);
        setSemesterName("");
    };
    
    function addChapter(semIndex) {
        console.log("semIndex: ", semIndex);
        const newChapter = {
            id: uuidv4(),
            name: chapterName,
            sections: [],
            quiz: []
        }

        const newSemesters = [...semesters];
        newSemesters[semIndex].chapters.push(newChapter)
        setSemesters(newSemesters);
        setChapterName("");
    }

    function addSection(semIndex, chapIndex) {
        const newSection = {
            id: uuidv4(),
            name: sectionName,
            content: []
        }

        const newSemesters = [...semesters];
        newSemesters[semIndex].chapters[chapIndex].sections.push(newSection);
        setSemesters(newSemesters);
        setSectionName("");
    }

    function addQuiz(semIndex, chapIndex) {
        const newQuiz = {
            id: `qq`,   
            name: sectionName,
            content: []
        }

        const newSemesters = [...semesters];
        newSemesters[semIndex].chapters[chapIndex].quiz.push(newQuiz);
        setSemesters(newSemesters);
    }

    console.log("semesters: ", semesters , "mainCourseData.semesters: " , mainCourseData.semesters);
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
                                                            <Accordion.Item eventKey={0}>
                                                                <input style={{marginBottom:'5px' , marginTop:"5px"}} value={sectionName} onChange={(event) => setSectionName(event.target.value)}></input>
                                                                <Button variant="primary" onClick={() => addSection(semIndex, chapIndex)}>
                                                                    Add section
                                                                </Button>
                                                                <Button variant="primary" onClick={() => addQuiz(semIndex, chapIndex)}>
                                                                    Add  Quiz
                                                                </Button>
                                                            </Accordion.Item> 
                                                        </Accordion>
                                                    </Accordion.Body>
                                                </Accordion.Item>


                                            )

                                            )
                                        }
                                        <Accordion.Item eventKey={0}>
                                            <input style={{marginBottom:'5px' , marginTop:"5px"}} value={chapterName} onChange={(event)=>setChapterName(event.target.value)}></input>
                                            <Button variant="primary" onClick={()=>addChapter(semIndex)}>
                                                Add Chapter
                                            </Button>
                                            
                                            
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))

                    }
                    <Accordion.Item eventKey={0}>
                        <input id={"semName"} style={{marginBottom:'5px' , marginTop:"5px"}} value={semesterName} onChange={(event) => setSemesterName(event.target.value)}></input>
                        <Button variant="primary" onClick={addSemester}> 
                            Add Semester
                        </Button>
                    </Accordion.Item>


                </Accordion>
            
        </>);
}

export default SideBar;