import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const SideBar = () => {

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

                                content: []
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
    const [semesters, setSemesters] = useState(testSideBar.semesters);

    const addSemester = () => {

        const newSemesterObj = {
            id: "xyz",
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
            id: `c${semesters[semIndex].chapters.length + 1}`,
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
            id: `sec${semesters[semIndex].chapters[chapIndex].sections.length + 1}`,
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

    console.log("semesters: ", semesters);
    return (
        <>
            
                <Accordion >
                    {
                        semesters.map((semester, semIndex) => (
                            <Accordion.Item eventKey={semIndex + 1}>
                                <Accordion.Header>{semester.name}</Accordion.Header>
                                <Accordion.Body style={{ padding: "0", backgroundColor: "black" }}>
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
                                                                            <li>{section.name}</li>
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
                                                                <input onChange={(event) => setSectionName(event.target.value)}></input>
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
                                            <input onChange={(event)=>setChapterName(event.target.value)}></input>
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
                        <input id={"semName"} value={semesterName} onChange={(event) => setSemesterName(event.target.value)}></input>
                        <Button variant="primary" onClick={addSemester}>
                            Add Semester
                        </Button>
                    </Accordion.Item>


                </Accordion>
            
        </>);
}

export default SideBar;