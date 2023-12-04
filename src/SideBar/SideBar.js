import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from "uuid";
import Modal from './Modal';
import { createPortal } from 'react-dom';

const SideBar = ({ handleSelectedSection, mainCourseData, setMainCourseData, handleSelectedSemester, handleSelectedChapter, resetSelectedIds }) => {
    console.log("maincourseData : ", mainCourseData);
    const [semesterName, setSemesterName] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [semesterDropdown, setSemesterDropdown] = useState('');
    const [chapterDropdown, setChapterDropdown] = useState('');
    const [semesters, setSemesters] = useState([]);
    const [isHovering, setIsHovering] = useState("");
    const [error, setError] = useState(false);
    const [edit, setEdit] = useState("");
    const [currentSection, setCurrentSection] = useState("");
    const [showModal, setShowModal] = useState("");

    //state variable to store the users input then on click of update button we change the semesters state
    //same state variable will be used to update sem name , chap name , section name.
    const [newName, setNewName] = useState("");



    useEffect(() => {
        setSemesters([...mainCourseData.semesters]);
    }, [])


    useEffect(() => {
        if (semesters.length) {
            setMainCourseData({ semesters: semesters });
        }

    }, [semesters])


    //make a word document for the component also start styling this also domo knowledge required.

    const addSemester = () => {
        if (semesterName === "") {
            setError(true);
            return
        }
        setError(false)
        const newSemesterObj = {
            id: uuidv4(),
            name: semesterName,
            chapters: []
        }
        const newSemesters = [...semesters];
        newSemesters.push(newSemesterObj);
        setSemesters(newSemesters);
        // setMainCourseData({semesters:newSemesters});
        setSemesterName("");
        // setMainCourseData((mainCourseData) => {
        //     const newMainCourseData = { ...mainCourseData, semesters: newSemesters }; //i got the problem i am setting here to previous state 
        //     return newMainCourseData;
        // })
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
            content: null
        }

        const newSemesters = [...semesters];
        newSemesters[semIndex].chapters[chapIndex].sections.push(newSection);
        setSemesters(newSemesters);
        setSectionName("");
    }

    function addQuiz(semIndex, chapIndex) {
        const newQuiz = {
            id: uuidv4(),
            name: sectionName,
            content: []
        }

        const newSemesters = [...semesters];
        newSemesters[semIndex].chapters[chapIndex].quiz.push(newQuiz);
        setSemesters(newSemesters);
    }

    function addQuizBelowChapters() {

    }
    //this is pravin branch 
    const handleSemesterDropdownClick = (semId) => {
        setSemesterDropdown(semesterDropdown === semId ? null : semId);
    };

    const handleChapterDropdownClick = (chapId) => {
        setChapterDropdown(chapterDropdown === chapId ? null : chapId);
    };

    function deleteSemester(semId) {
        setSemesters(semesters.filter((semester => semester.id !== semId)));
        resetSelectedIds();
    }

    function editSemesterName(semId) {
        setSemesters(semesters.map((semester => {
            if (semester.id === semId) {
                return {
                    ...semester, name: newName
                }
            } else {
                return {
                    ...semester
                }
            }
        })))
    }

    function deleteChapter(semId, chapId) {
        setSemesters([...semesters.map((semester) => {
            if (semester.id === semId) {
                return {
                    ...semester, chapters: [...semester.chapters.filter((chapter) => chapter.id !== chapId)]
                }
            } else {
                return {
                    ...semester
                }
            }
        })]);
        resetSelectedIds();
    }

    function deleteSection(semId, chapId, sectionId) {
        setSemesters(semesters.map((semester) => {
            if (semester.id === semId) {
                return {
                    ...semester, chapters: semester.chapters.map((chapter) => {
                        if (chapter.id === chapId) {
                            return {
                                ...chapter, sections: chapter.sections.filter(section => section.id !== sectionId)
                            }
                        } else {
                            return {
                                ...chapter
                            }
                        }
                    })
                }
            } else {
                return {
                    ...semester
                }
            }
        }));
        resetSelectedIds();
    }

    function editChapterName(e, semId, chapId) {
        setSemesters([...semesters.map((semester) => {
            if (semester.id === semId) {
                return {
                    ...semester, chapters: [...semester.chapters.map((chapter) => {
                        if (chapter.id === chapId) {
                            return {
                                ...chapter, name: e.target.value
                            }
                        } else {
                            return {
                                ...chapter
                            }
                        }
                    })]
                }
            } else {
                return {
                    ...semester
                }
            }
        })])
    }

    function editSectionName(e, semId, chapId, sectionId) {
        setSemesters(semesters.map((semester) => {
            if (semester.id === semId) {
                return {
                    ...semester, chapters: semester.chapters.map((chapter) => {
                        if (chapter.id === chapId) {
                            return {
                                ...chapter, sections: chapter.sections.map((section) => {
                                    if (section.id === sectionId) {
                                        return {
                                            ...section, name: e.target.value
                                        }
                                    } else {
                                        return {
                                            ...section
                                        }
                                    }
                                })
                            }
                        } else {
                            return {
                                ...chapter
                            }
                        }
                    })
                }
            } else {
                return {
                    ...semester
                }
            }
        }))
    }
    return (
        <>
            {/* <div><button>show modal</button></div>
            {createPortal(<Modal>

            </Modal>, document.querySelector(".myPortalModalDiv"))} */}
            <div>
                {
                    semesters.map((semester, semIndex) => {
                        return (
                            <div key={semIndex} style={{ marginBottom: '10px' }}>
                                {/* below is the title div */}
                                <div
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        display: "flex",
                                        justifyContent: "space-between",
                                        backgroundColor: semester.id === semesterDropdown ? '#f0f0f0' : 'white',
                                    }}
                                    onMouseEnter={() => { setIsHovering(semester.id) }}
                                    onMouseLeave={() => { setIsHovering(null) }}
                                >
                                    <div>
                                        {
                                            <label onClick={() => {/*here update selectedSemester */ handleSelectedSemester(semester.id) }}>{semester.name}</label>
                                        }
                                    </div>
                                    <span>
                                        {isHovering === semester.id && <i class="fa-solid fa-pen" onClick={() => setShowModal(semester.id)} style={{ cursor: 'pointer', marginRight: "3px", backgroundColor: edit === semester.id ? 'red' : 'white' }}></i>}
                                        {showModal === semester.id && createPortal(
                                            <Modal>
                                                <div>Do you want to change the name of semester {semester.name}</div>
                                                <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                <button onClick={() => { editSemesterName(semester.id); setShowModal(null); setNewName("") }}>Update</button><button onClick={() => setShowModal(null)}>cancel</button>
                                                {/* close the above modal as well as update the name in state */}
                                            </Modal>, document.querySelector('.myPortalModalDiv'))}
                                        {isHovering === semester.id && <i className="fa-regular fa-circle-xmark" onClick={() => { deleteSemester(semester.id) }} style={{ cursor: 'pointer', marginRight: "3px" }}></i>}
                                        <i onClick={() => handleSemesterDropdownClick(semester.id)} class="fa-solid fa-caret-down" style={{ cursor: 'pointer', marginRight: "3px" }}></i>
                                    </span>
                                </div>
                                {/* below we are rendering the body of the accordian item */}
                                {semesterDropdown === semester.id && (
                                    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                        {
                                            semester.chapters.map((chapter, chapIndex) => {
                                                return (
                                                    <div key={chapIndex} style={{ marginBottom: '10px' }}>
                                                        <div
                                                            style={{
                                                                border: '1px solid #ccc',
                                                                padding: '10px',
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignContent: "center",
                                                                backgroundColor: chapterDropdown === chapter.id ? '#f0f0f0' : 'white',
                                                            }}
                                                            onMouseEnter={() => { setIsHovering(chapter.id) }}
                                                            onMouseLeave={() => { setIsHovering(null) }}
                                                        >
                                                            <div>
                                                                {
                                                                    edit === chapter.id ? (<input style={{ width: "50%" }} value={chapter.name} onChange={(e) => editChapterName(e, semester.id, chapter.id)}></input>) : (<label onClick={() => { handleSelectedChapter(semester.id, chapter.id) }}>{chapter.name}</label>)
                                                                }
                                                            </div>
                                                            <span>
                                                                {isHovering === chapter.id && <i class="fa-solid fa-pen" onClick={() => setEdit(edit === chapter.id ? null : chapter.id)} style={{ cursor: 'pointer', marginRight: "3px", backgroundColor: edit === chapter.id ? 'red' : 'white' }}></i>}
                                                                {isHovering === chapter.id && <i className="fa-regular fa-circle-xmark" onClick={() => { deleteChapter(semester.id, chapter.id) }} style={{ cursor: 'pointer', marginRight: "3px" }}></i>}

                                                                <i onClick={() => handleChapterDropdownClick(chapter.id)} class="fa-solid fa-caret-down" style={{ cursor: 'pointer' }}></i>
                                                            </span>
                                                        </div>
                                                        {chapterDropdown === chapter.id && (
                                                            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                                                                {
                                                                    chapter.sections.map((section) => (
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                                alignContent: "center",
                                                                                backgroundColor: currentSection === section.id ? '#f0f0f0' : 'white',
                                                                            }}
                                                                            onMouseEnter={() => { setIsHovering(section.id) }}
                                                                            onMouseLeave={() => { setIsHovering(null) }}
                                                                        >
                                                                            <div>
                                                                                {
                                                                                    edit === section.id ? (<input style={{ width: "50%" }} value={section.name} onChange={(e) => editSectionName(e, semester.id, chapter.id, section.id)}></input>) : (<label onClick={() => { handleSelectedSection(semester.id, chapter.id, section.id); setCurrentSection(section.id) }}>{section.name}</label>)
                                                                                }
                                                                            </div>
                                                                            <span>{isHovering === section.id && <i class="fa-solid fa-pen" onClick={() => setEdit(edit === section.id ? null : section.id)} style={{ cursor: 'pointer', marginRight: "3px", backgroundColor: edit === section.id ? 'red' : 'white' }}></i>}
                                                                                {isHovering === section.id && <i className="fa-regular fa-circle-xmark" onClick={() => { deleteSection(semester.id, chapter.id, section.id) }} style={{ cursor: 'pointer', marginRight: "3px" }}></i>}</span>
                                                                        </div>
                                                                    ))
                                                                }
                                                                {
                                                                    chapter.quiz.map((q) => (
                                                                        <div>{q.name}</div>
                                                                    ))
                                                                }
                                                                <div >
                                                                    <input style={{ width: '100%' }} value={sectionName} onChange={(event) => setSectionName(event.target.value)}></input>
                                                                    <button onClick={() => addSection(semIndex, chapIndex)}>add section</button>
                                                                    <button onClick={() => addQuiz(semIndex, chapIndex)}>add quiz</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )

                                            })
                                        }
                                        <div>
                                            <input style={{ width: '100%' }} value={chapterName} onChange={(event) => setChapterName(event.target.value)}></input>
                                            <button onClick={() => addChapter(semIndex)}>add chapter</button>
                                            <button onClick={() => addQuizBelowChapters(semIndex)}>add quiz</button>
                                        </div>
                                    </div>

                                )}
                            </div>
                        )
                    })
                }
                <div>
                    <input style={{ width: '100%' }} value={semesterName} onChange={(e) => setSemesterName(e.target.value)}></input>
                    {error && <span>enter name for semester</span>}
                    <button className='btn btn-secondary' onClick={addSemester}>add sem</button>
                </div>
            </div>


        </>);
}

export default SideBar;
//different branch





// {
//     semesters?.map((semester, semIndex) => (
//         <Accordion.Item eventKey={semIndex + 1}>
//             <Accordion.Header onClick={() => console.log("clicked")}>{semester.name} </Accordion.Header>
//             <Accordion.Body style={{ padding: "0" }}>
//                 <Accordion style={{ opacity: "0.9" }} >
//                     {
//                         semester.chapters?.map((chapter, chapIndex) => (
//                             <Accordion.Item eventKey={chapIndex + 1}>
//                                 <Accordion.Header >{chapter.name}</Accordion.Header>
//                                 <Accordion.Body style={{ padding: "0" }}>
//                                     <Accordion >

//                                         {
//                                             chapter.sections?.map((section, secIndex) => (
//                                                 <Accordion >

//                                                     {
//                                                         <li onClick={() => handleSelectedSection(semester.id, chapter.id, section.id)}>{section.name}</li>
//                                                     }
//                                                 </Accordion>


//                                             )

//                                             )
//                                         }
//                                         {
//                                             chapter.quiz?.map((q, secIndex) => (
//                                                 <Accordion >

//                                                     {
//                                                         <li>{q.name}</li>
//                                                     }
//                                                 </Accordion>


//                                             )

//                                             )
//                                         }
//                                         <Accordion.Item eventKey={0}>
//                                             <input style={{ marginBottom: '5px', marginTop: "5px" }} value={sectionName} onChange={(event) => setSectionName(event.target.value)}></input>
//                                             <Button variant="primary" onClick={() => addSection(semIndex, chapIndex)}>
//                                                 Add section
//                                             </Button>
//                                             <Button variant="primary" onClick={() => addQuiz(semIndex, chapIndex)}>
//                                                 Add  Quiz
//                                             </Button>
//                                         </Accordion.Item>
//                                     </Accordion>
//                                 </Accordion.Body>
//                             </Accordion.Item>


//                         )

//                         )
//                     }
//                     <Accordion.Item eventKey={0}>
//                         <input style={{ marginBottom: '5px', marginTop: "5px" }} value={chapterName} onChange={(event) => setChapterName(event.target.value)}></input>
//                         <Button variant="primary" onClick={() => addChapter(semIndex)}>
//                             Add Chapter
//                         </Button>


//                     </Accordion.Item>
//                 </Accordion>
//             </Accordion.Body>
//         </Accordion.Item>
//     ))

// }