import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from "uuid";
import Modal from './Modal';
import { createPortal } from 'react-dom';

const SideBar = ({ handleSelectedSection, mainCourseData, setMainCourseData, handleSelectedSemester, handleSelectedChapter, resetSelectedIds ,handleSelectedQuiz }) => {
    console.log("rendering child sidebar");
    const [semesterName, setSemesterName] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [semesterDropdown, setSemesterDropdown] = useState('');
    const [chapterDropdown, setChapterDropdown] = useState('');
    // const [semesters, setSemesters] = useState([]);
    const [isHovering, setIsHovering] = useState("");
    const [error, setError] = useState(false);
    const [edit, setEdit] = useState("");
    const [currentSection, setCurrentSection] = useState("");
    const [showModal, setShowModal] = useState({
        id: '',
        edit: false,
        delete: false
    });

    //state variable to store the users input then on click of update button we change the semesters state
    //same state variable will be used to update sem name , chap name , section name.
    const [newName, setNewName] = useState("");
    
    // console.log("sidebar data :" , semesters);


    // useEffect(() => {
    //     console.log("inital data setting for sidebar only once: ")
    //     setSemesters([...mainCourseData.semesters]);
    // }, []);

    //for setting the changes to mcd that course creator did to side bar 
    // useEffect(()=>{
    //     setSemesters([...mainCourseData.semesters]);
    // },[mainCourseData.semesters])


    // useEffect(() => {
    //     if (semesters.length) {
    //         console.log("setting the sidebar changes to mainCourseData : data that is being set: " , semesters);
    //         setMainCourseData({ semesters: semesters });
    //     }

    // }, [semesters])

    useEffect(()=>{
        console.log("finished rendering sidebar")
    })


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
            content:null,
            chapters: []
        }
        const newSemesters = [...mainCourseData.semesters];
        newSemesters.push(newSemesterObj);
        setMainCourseData({semesters: newSemesters})
        setSemesterName("");
    };

    function addChapter(semIndex) {
        console.log("semIndex: ", semIndex);
        const newChapter = {
            id: uuidv4(),
            name: chapterName,
            content:null,
            sections: [],
            quiz: []
        }

        const newSemesters = [...mainCourseData.semesters];
        newSemesters[semIndex].chapters.push(newChapter)
        setMainCourseData({semesters: newSemesters})
        setChapterName("");
    }

    function addSection(semIndex, chapIndex) {
        const newSection = {
            id: uuidv4(),
            name: sectionName,
            content: null
        }

        const newSemesters = [...mainCourseData.semesters];
        newSemesters[semIndex].chapters[chapIndex].sections.push(newSection);
        setMainCourseData({semesters: newSemesters})
        setSectionName("");
    }

    function addQuiz(semIndex, chapIndex) {
        const newQuiz = {
            id: uuidv4(),
            name: sectionName,
            content: []
        }

        const newSemesters = [...mainCourseData.semesters];
        newSemesters[semIndex].chapters[chapIndex].quiz.push(newQuiz);
        setMainCourseData({semesters: newSemesters})
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

        const newSemesters = [...mainCourseData.semesters];
        
        setMainCourseData({semesters:newSemesters.filter((semester => semester.id !== semId)) })
       
        resetSelectedIds();
    }

    function editSemesterName(semId) {
        setMainCourseData({semesters : mainCourseData.semesters.map((semester => {
            if (semester.id === semId) {
                return {
                    ...semester, name: newName
                }
            } else {
                return {
                    ...semester
                }
            }
        }))})
    }

    function deleteChapter(semId, chapId) {
        setMainCourseData({semesters: mainCourseData.semesters.map((semester) => {
            if (semester.id === semId) {
                return {
                    ...semester, chapters: [...semester.chapters.filter((chapter) => chapter.id !== chapId)]
                }
            } else {
                return {
                    ...semester
                }
            }
        })});
        resetSelectedIds();
    }

    function deleteSection(semId, chapId, sectionId) {
        setMainCourseData({semesters : mainCourseData.semesters.map((semester) => {
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
        })});
        resetSelectedIds();
    }

    function editChapterName(semId, chapId) {
        setMainCourseData({semesters: mainCourseData.semesters.map((semester) => {
            if (semester.id === semId) {
                return {
                    ...semester, chapters: [...semester.chapters.map((chapter) => {
                        if (chapter.id === chapId) {
                            return {
                                ...chapter, name: newName
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
        })})
    }

    function editSectionName( semId, chapId, sectionId) {
        setMainCourseData({semesters : mainCourseData.semesters.map((semester) => {
            if (semester.id === semId) {
                return {
                    ...semester, chapters: semester.chapters.map((chapter) => {
                        if (chapter.id === chapId) {
                            return {
                                ...chapter, sections: chapter.sections.map((section) => {
                                    if (section.id === sectionId) {
                                        return {
                                            ...section, name: newName
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
        })})
    }

    //sub branch
    return (
        <>
            <div>
                {
                    mainCourseData.semesters.map((semester, semIndex) => {
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
                                        {isHovering === semester.id && <i className="fa-solid fa-pen" onClick={() => setShowModal((showModal) => { return { ...showModal, id: semester.id, edit: true, delete: false } })} style={{ cursor: 'pointer', marginRight: "3px", backgroundColor: edit === semester.id ? 'red' : 'white' }}></i>}
                                        {showModal.id === semester.id && createPortal(
                                            <Modal>
                                                {
                                                    showModal.edit ? (<>
                                                        <div>Do you want to change the name of semester {semester.name}</div>
                                                        <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                        <button className='btn btn-primary' onClick={() => { editSemesterName(semester.id); setShowModal((showModal) => { return { ...showModal, id: null } }); setNewName("") }}>Update</button><button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button>
                                                        {/* close the above modal as well as update the name in state */}
                                                    </>) : null
                                                }
                                                {
                                                    showModal.delete ? (<>
                                                        <div>Do you want to delete {semester.name}</div>
                                                        <div><button className='btn btn-primary' onClick={() => { deleteSemester(semester.id) }}>Yes</button><button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button></div>

                                                    </>) : null
                                                }
                                            </Modal>, document.querySelector('.myPortalModalDiv'))}
                                        {isHovering === semester.id && <i className="fa-regular fa-circle-xmark" onClick={() => setShowModal((showModal) => { return { ...showModal, id: semester.id, edit: false, delete: true } })} style={{ cursor: 'pointer', marginRight: "3px" }}></i>}
                                        <i onClick={() => handleSemesterDropdownClick(semester.id)} className="fa-solid fa-caret-down" style={{ cursor: 'pointer', marginRight: "3px" }}></i>
                                    </span>
                                </div>
                                {/* below we are rendering the body of the accordian item */}
                                {semesterDropdown === semester.id && (
                                    <div style={{ border: '1px solid #ccc', padding: '10px', transition: 'all 3s ease-in-out' }}>
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
                                                                    <label onClick={() => { handleSelectedChapter(semester.id, chapter.id) }}>{chapter.name}</label>
                                                                }
                                                            </div>
                                                            <span>
                                                                {isHovering === chapter.id && <i className="fa-solid fa-pen" onClick={() => setShowModal((showModal) => { return { ...showModal, id: chapter.id, edit: true, delete: false } })} style={{ cursor: 'pointer', marginRight: "3px", backgroundColor: edit === chapter.id ? 'red' : 'white' }}></i>}
                                                                {isHovering === chapter.id && <i className="fa-regular fa-circle-xmark" onClick={() => setShowModal((showModal) => { return { ...showModal, id: chapter.id, edit: false, delete: true } })} style={{ cursor: 'pointer', marginRight: "3px" }}></i>}

                                                                <i onClick={() => handleChapterDropdownClick(chapter.id)} className="fa-solid fa-caret-down" style={{ cursor: 'pointer' }}></i>

                                                                {showModal.id === chapter.id && createPortal(
                                                                    <Modal>
                                                                        {
                                                                            showModal.edit ? (<>
                                                                                <div>Do you want to change the name of chapter {chapter.name}</div>
                                                                                <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                                                <button className='btn btn-primary' onClick={() => { editChapterName(semester.id, chapter.id); setShowModal((showModal) => { return { ...showModal, id: null } }); setNewName("") }}>Update</button><button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button>
                                                                                {/* close the above modal as well as update the name in state */}
                                                                            </>) : null
                                                                        }
                                                                        {
                                                                            showModal.delete ? (<>
                                                                                <div>Do you want to delete {chapter.name}</div>
                                                                                <div><button className='btn btn-primary' onClick={() => { deleteChapter(semester.id, chapter.id) }}>Yes</button><button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button></div>

                                                                            </>) : null
                                                                        }
                                                                    </Modal>, document.querySelector('.myPortalModalDiv'))}

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
                                                                                    <label onClick={() => { handleSelectedSection(semester.id, chapter.id, section.id); setCurrentSection(section.id) }}>{section.name}</label>
                                                                                }
                                                                            </div>
                                                                            <span>{isHovering === section.id && <i className="fa-solid fa-pen" onClick={() => setShowModal((showModal) => { return { ...showModal, id: section.id, edit: true, delete: false } })} style={{ cursor: 'pointer', marginRight: "3px", backgroundColor: edit === section.id ? 'red' : 'white' }}></i>}
                                                                                {isHovering === section.id && <i className="fa-regular fa-circle-xmark" onClick={() => setShowModal((showModal) => { return { ...showModal, id: section.id, edit: false, delete: true } })} style={{ cursor: 'pointer', marginRight: "3px" }}></i>}
                                                                            </span>
                                                                            {showModal.id === section.id && createPortal(
                                                                                <Modal>
                                                                                    {
                                                                                        showModal.edit ? (<>
                                                                                            <div>Do you want to change the name of section {section.name}</div>
                                                                                            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                                                            <button className='btn btn-primary' onClick={() => { editSectionName(semester.id, chapter.id , section.id); setShowModal((showModal) => { return { ...showModal, id: null } }); setNewName("") }}>Update</button><button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button>
                                                                                            {/* close the above modal as well as update the name in state */}
                                                                                        </>) : null
                                                                                    }
                                                                                    {
                                                                                        showModal.delete ? (<>
                                                                                            <div>Do you want to delete {section.name}</div>
                                                                                            <div><button className='btn btn-primary' onClick={() => { deleteSection(semester.id, chapter.id , section.id) }}>Yes</button><button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button></div>

                                                                                        </>) : null
                                                                                    }
                                                                                </Modal>, document.querySelector('.myPortalModalDiv'))}
                                                                        </div>
                                                                    ))
                                                                }
                                                                {
                                                                    chapter.quiz.map((q) => (
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                justifyContent: "space-between",
                                                                                alignContent: "center",
                                                                                backgroundColor: currentSection === q.id ? '#f0f0f0' : 'white',
                                                                            }}
                                                                            onMouseEnter={() => { setIsHovering(q.id) }}
                                                                            onMouseLeave={() => { setIsHovering(null) }}
                                                                        >
                                                                            <div>
                                                                                {
                                                                                    <label onClick={() => { handleSelectedQuiz(semester.id, chapter.id, q.id); setCurrentSection(q.id) }}>{q.name}</label>
                                                                                }
                                                                            </div>
                                                                            <span>{isHovering === q.id && <i className="fa-solid fa-pen" onClick={() => setShowModal((showModal) => { return { ...showModal, id: q.id, edit: true, delete: false } })} style={{ cursor: 'pointer', marginRight: "3px", backgroundColor: edit === q.id ? 'red' : 'white' }}></i>}
                                                                                {isHovering === q.id && <i className="fa-regular fa-circle-xmark" onClick={() => setShowModal((showModal) => { return { ...showModal, id: q.id, edit: false, delete: true } })} style={{ cursor: 'pointer', marginRight: "3px" }}></i>}
                                                                            </span>
                                                                            {showModal.id === q.id && createPortal(
                                                                                <Modal>
                                                                                    {
                                                                                        showModal.edit ? (<>
                                                                                            <div>Do you want to change the name of section {q.name}</div>
                                                                                            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                                                            <button className='btn btn-primary' onClick={() => { editSectionName(semester.id, chapter.id , q.id); setShowModal((showModal) => { return { ...showModal, id: null } }); setNewName("") }}>Update</button><button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button>
                                                                                            {/* close the above modal as well as update the name in state */}
                                                                                        </>) : null
                                                                                    }
                                                                                    {
                                                                                        showModal.delete ? (<>
                                                                                            <div>Do you want to delete {q.name}</div>
                                                                                            <div><button className='btn btn-primary' onClick={() => { deleteSection(semester.id, chapter.id , q.id) }}>Yes</button><button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button></div>

                                                                                        </>) : null
                                                                                    }
                                                                                </Modal>, document.querySelector('.myPortalModalDiv'))}
                                                                        </div>
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

                                            <span>Add Chapter</span><i style={{ marginLeft: "7px", fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, id: 'addChapter' }) }} className="fa-solid fa-square-plus"></i>
                                            {
                                                showModal.id === 'addChapter' && createPortal(<Modal>
                                                    <label>Chapter Name: </label><input style={{ width: '100%' }} value={chapterName} onChange={(e) => setChapterName(e.target.value)}></input>
                                                    {error && <span>enter name for Chapter</span>}
                                                    <button className='btn btn-primary' onClick={() => { addChapter(semIndex); setShowModal((showModal) => { return { ...showModal, id: null } }) }}>add chapter</button>
                                                    <button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, id: null } }); setSemesterName('') }}>cancel</button>
                                                </Modal>, document.querySelector('.myPortalModalDiv'))
                                            }

                                            {/* <input style={{ width: '100%' }} value={chapterName} onChange={(event) => setChapterName(event.target.value)}></input>
                                            <button onClick={() => addChapter(semIndex)}>add chapter</button>
                                            <button onClick={() => addQuizBelowChapters(semIndex)}>add quiz</button> */}
                                        </div>
                                    </div>

                                )}
                            </div>
                        )
                    })
                }
                <div>

                    <span>Add Semester</span><i style={{ marginLeft: "7px", fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, id: 'addSem' }) }} className="fa-solid fa-square-plus"></i>

                    {
                        showModal.id === 'addSem' && createPortal(<Modal>
                            <label>Semester Name: </label><input style={{ width: '100%' }} value={semesterName} onChange={(e) => setSemesterName(e.target.value)}></input>
                            {error && <span>enter name for semester</span>}
                            <button className='btn btn-primary' onClick={() => { addSemester(); setShowModal((showModal) => { return { ...showModal, id: null } }) }}>add sem</button><button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, id: null } }); setSemesterName('') }}>cancel</button>
                        </Modal>, document.querySelector('.myPortalModalDiv'))
                    }
                </div>
            </div>


        </>);
}

export default SideBar;
