import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from "uuid";
import Modal from './Modal';
import { createPortal } from 'react-dom';

const SideBar = ({ handleSelectedSection, mainCourseData, setMainCourseData, handleSelectedSemester,
    handleSelectedChapter, resetSelectedIds, handleSelectedQuiz, handleSelectedQuizOnChapterLevel,
    semesterDropdownInfo, chapterDropdownInfo, setSemesterDropdownInfo, setChapterDropdownInfo
}) => {
    //console.log("rendering child sidebar");

    //below state is used to store semester name input from user and the adding semester takes that name
    const [semesterName, setSemesterName] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [quizName, setQuizName] = useState('');

    //below states store the semester or chapter id then match those to open or close the dropdowns
    const [semesterDropdown, setSemesterDropdown] = useState('');
    const [chapterDropdown, setChapterDropdown] = useState('');

    //below state is used to store the id of either one of sem, chap, sec , test then based on id we show edit or delete icons
    const [isHovering, setIsHovering] = useState("");
    
    //below state is used to show user appropriate errors 
    const [error, setError] = useState(false);
    //below state stored the sectionId and matches that id to change background color of selected section. Also used for changing bg-color of selected chapterTest 
    const [currentSection, setCurrentSection] = useState("");
    
    const [showModal, setShowModal] = useState({
        id: '',
        edit: false,
        delete: false
    });

    //state variable to store the users input then on click of update button we change the semesters state
    //same state variable will be used to update sem name , chap name , section name.
    const [newName, setNewName] = useState("");
    //const {semesterId , chapterId , sectionId } = useparams();


    useEffect(() => {
        //console.log("finished rendering sidebar")
    })

    //below useEffect sets parents variable that is passed to preview so the dropdowns should be open in preview as well
    useEffect(() => {
        setSemesterDropdownInfo(semesterDropdown);
    }, [semesterDropdown])

    useEffect(() => {
        setChapterDropdownInfo(chapterDropdown);
    }, [chapterDropdown])
    

    useEffect(() => {
        if (semesterDropdownInfo === '') {
            return
        } else {
            setSemesterDropdown(semesterDropdownInfo);
        }
    }, [])

    //below useEffect checks for dropdown info for chapter. 
    useEffect(() => {
        if (chapterDropdownInfo === '') {
            return
        } else {
            setChapterDropdown(chapterDropdownInfo);
        }
    }, [])


    //make a word document for the component also start styling this also domo knowledge required.

    const addSemester = () => {
        if (!semesterName) {
            setError(true);
            return
        }
        setError(false)
        const newSemesterObj = {
            id: uuidv4(),
            name: semesterName,
            content: null,
            chapters: [],
            semesterTest: []
        }
        const newSemesters = [...mainCourseData.semesters];
        newSemesters.push(newSemesterObj);
        setMainCourseData({ semesters: newSemesters })
        setSemesterName("");
        setShowModal((showModal) => { return { ...showModal, id: null } })
    };

    function addChapter(semIndex) {
        if(!chapterName){
            setError(true);
            return
        }
        const newChapter = {
            id: uuidv4(),
            name: chapterName,
            content: null,
            sections: [],
            chapterTest: []
        }

        const newSemesters = [...mainCourseData.semesters];
        newSemesters[semIndex].chapters.push(newChapter)
        setMainCourseData({ semesters: newSemesters })
        setChapterName("");
        setShowModal((showModal) => { return { ...showModal, id: null } })
        setError(false)
    }

    function addSection(semIndex, chapIndex) {
        if(!sectionName){
            setError(true);
            return
        }
        const newSection = {
            id: uuidv4(),
            name: sectionName,
            content: null
        }

        const newSemesters = [...mainCourseData.semesters];
        newSemesters[semIndex].chapters[chapIndex].sections.push(newSection);
        setMainCourseData({ semesters: newSemesters })
        setSectionName("");
        setShowModal((showModal) => { return { ...showModal, id: null } })
        setError(false);
    }

    function addSectionLevelQuiz(semIndex, chapIndex) {
        if(!quizName){
            setError(true);
            return;
        }
        const newQuiz = {
            id: uuidv4(),
            name: quizName,
            numberOfQuestions: null,
            timeLimit: null,
            content: { slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Quiz', data: null }] }] }
        }

        const newSemesters = [...mainCourseData.semesters];
        newSemesters[semIndex].chapters[chapIndex].chapterTest.push(newQuiz);
        setMainCourseData({ semesters: newSemesters });
        setQuizName("");
        setShowModal((showModal) => { return { ...showModal, id: null } });
        setError(false);
    }

    function addQuizBelowChapters(semIndex) {
        if(!quizName){
            setError(true);
            return
        }
        const quizObj = {
            id: uuidv4(),
            name: quizName,
            numberOfQuestions: null,
            timeLimit: null,
            content: {
                slides: [
                    {
                        id: uuidv4(),
                        content: [
                            { id: uuidv4(), type: 'Quiz', data: null }
                        ]
                    },
                ]
            }
        }
        const newSemesters = [...mainCourseData.semesters];
        newSemesters[semIndex].semesterTest.push(quizObj);
        setMainCourseData({ semesters: newSemesters });
        setQuizName("");
        setShowModal((showModal) => { return { ...showModal, id: null } });
        setError(false);
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
        setMainCourseData({ semesters: newSemesters.filter((semester => semester.id !== semId)) })
        resetSelectedIds();
    }

    function editSemesterName(semId) {
        if(!newName){
            setError(true);
            return;
        }
        setMainCourseData({
            semesters: mainCourseData.semesters.map((semester => {
                if (semester.id === semId) {
                    return {
                        ...semester, name: newName
                    }
                } else {
                    return {
                        ...semester
                    }
                }
            }))
        })
        setShowModal((showModal) => { return { ...showModal, id: null } });
        setError(false);
        setNewName(""); 
    }

    function deleteChapter(semId, chapId) {
        setMainCourseData({
            semesters: mainCourseData.semesters.map((semester) => {
                if (semester.id === semId) {
                    return {
                        ...semester, chapters: semester.chapters.filter((chapter) => chapter.id !== chapId)
                    }
                } else {
                    return {
                        ...semester
                    }
                }
            })
        });
        resetSelectedIds();
    }

    function deleteSection(semId, chapId, sectionId) {
        setMainCourseData({
            semesters: mainCourseData.semesters.map((semester) => {
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
            })
        });
        resetSelectedIds();
    }

    function editChapterName(semId, chapId) {
        if(!newName){
            setError(true);
            return;
        }
        setMainCourseData({
            semesters: mainCourseData.semesters.map((semester) => {
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
            })
        })
        setShowModal((showModal) => { return { ...showModal, id: null } });
        setNewName("");
        setError(false);
    }

    function editSectionName(semId, chapId, sectionId) {
        if(!newName){
            setError(true);
            return
        }
        setMainCourseData({
            semesters: mainCourseData.semesters.map((semester) => {
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
            })
        })
        setError(false);
        setShowModal((showModal) => { return { ...showModal, id: null } })
    }

    function editChapterLevelQuizName(semId, quizId) {
        if(!newName){
            setError(true);
            return;
        }
        setMainCourseData({
            semesters: mainCourseData.semesters.map((semester) => {
                if (semester.id === semId) {
                    return {
                        ...semester, semesterTest: semester.semesterTest.map((q) => {
                            if (q.id === quizId) {
                                return {
                                    ...q, name: newName
                                }
                            } else {
                                return {
                                    ...q
                                }
                            }
                        })
                    }
                } else {
                    return {
                        ...semester
                    }
                }
            })
        })
        setShowModal((showModal) => { return { ...showModal, id: null } }); 
        setNewName("");
        setError(false);
    }

    function editQuizName(semId, chapId, quizId) {
        if(!newName){
            setError(true);
            return;
        }
        setMainCourseData({
            semesters: mainCourseData.semesters.map((semester) => {
                if (semester.id === semId) {
                    return {
                        ...semester, chapters: semester.chapters.map((chapter) => {
                            if (chapter.id === chapId) {
                                return {
                                    ...chapter, chapterTest: chapter.chapterTest.map((q) => {
                                        if (q.id === quizId) {
                                            return {
                                                ...q, name: newName
                                            }
                                        } else {
                                            return {
                                                ...q
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
            })
        })
        setShowModal((showModal) => { return { ...showModal, id: null } }); 
        setNewName("");
        setError(false)
    }

    function deleteChapterLevelQuiz(semId, quizId) {
        setMainCourseData({
            semesters: mainCourseData.semesters.map((semester) => {
                if (semester.id === semId) {
                    return {
                        ...semester, semesterTest: semester.semesterTest.filter((q) => q.id !== quizId)
                    }
                } else {
                    return {
                        ...semester
                    }
                }
            })
        })
        resetSelectedIds()
    }

    function deleteSectionLevelQuiz(semId, chapId, quizId) {
        setMainCourseData({
            semesters: mainCourseData.semesters.map((semester) => {
                if (semester.id === semId) {
                    return {
                        ...semester, chapters: semester.chapters.map((chapter) => {
                            if (chapter.id === chapId) {
                                return {
                                    ...chapter, chapterTest: chapter.chapterTest.filter((q) => q.id !== quizId)
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
            })
        })

        resetSelectedIds();
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
                                            <label onClick={() => {/*here update selectedSemester */ handleSelectedSemester(semester.id, 'semesters') }}>{semester.name}</label>
                                        }
                                    </div>
                                    <span>
                                        {isHovering === semester.id && <i className="fa-solid fa-pen"
                                            onClick={() => setShowModal((showModal) => { return { ...showModal, id: semester.id, edit: true, delete: false } })}
                                            style={{ cursor: "pointer" }}
                                        ></i>}
                                        {showModal.id === semester.id && createPortal(
                                            <Modal>
                                                {
                                                    showModal.edit ? (<>
                                                        <div>Do you want to change the name of semester {semester.name}</div>
                                                        <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                        {error && <><span>name required</span><br/></>}
                                                        <button className='btn btn-primary'
                                                            onClick={() => { editSemesterName(semester.id);}}>Update</button>
                                                        <button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => {setShowModal((showModal) => { return { ...showModal, id: null } }); setError(false)}} >cancel</button>
                                                        {/* close the above modal as well as update the name in state */}
                                                    </>) : null
                                                }
                                                {
                                                    showModal.delete ? (<>
                                                        <div>Do you want to delete {semester.name}</div>
                                                        <div>
                                                            <button className='btn btn-primary'
                                                                onClick={() => { deleteSemester(semester.id) }}>Yes</button>
                                                            <button style={{ marginLeft: "7px" }} className='btn btn-primary'
                                                                onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button></div>

                                                    </>) : null
                                                }
                                            </Modal>, document.querySelector('.myPortalModalDiv'))}
                                        {isHovering === semester.id && <i className="fa-regular fa-circle-xmark"
                                            onClick={() => setShowModal((showModal) => { return { ...showModal, id: semester.id, edit: false, delete: true } })}
                                            style={{ cursor: 'pointer', marginRight: "3px" }}></i>}
                                        <i onClick={() => handleSemesterDropdownClick(semester.id)} className="fa-solid fa-caret-down"
                                            style={{ cursor: 'pointer', marginRight: "3px" }}></i>
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
                                                                    <label onClick={() => { handleSelectedChapter(semester.id, chapter.id, 'chapters') }}>{chapter.name}</label>
                                                                }
                                                            </div>
                                                            <span>
                                                                {isHovering === chapter.id && <i className="fa-solid fa-pen"
                                                                    onClick={() => setShowModal((showModal) => { return { ...showModal, id: chapter.id, edit: true, delete: false } })}
                                                                    style={{ cursor: 'pointer' }}></i>}
                                                                {isHovering === chapter.id && <i className="fa-regular fa-circle-xmark"
                                                                    onClick={() => setShowModal((showModal) => { return { ...showModal, id: chapter.id, edit: false, delete: true } })}
                                                                    style={{ cursor: 'pointer', marginRight: "3px" }}></i>}

                                                                <i onClick={() => handleChapterDropdownClick(chapter.id)} className="fa-solid fa-caret-down"
                                                                    style={{ cursor: 'pointer' }}></i>

                                                                {showModal.id === chapter.id && createPortal(
                                                                    <Modal>
                                                                        {
                                                                            showModal.edit ? (<>
                                                                                <div>Do you want to change the name of chapter {chapter.name}</div>
                                                                                <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                                                {error && <><span>name required</span><br/></>}
                                                                                <button className='btn btn-primary'
                                                                                    onClick={() => { editChapterName(semester.id, chapter.id);  }}>Update</button>
                                                                                <button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => {setShowModal((showModal) => { return { ...showModal, id: null } }); setError(false)}}>cancel</button>
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
                                                                                    <label onClick={() => { handleSelectedSection(semester.id, chapter.id, section.id, 'sections'); setCurrentSection(section.id) }}>{section.name}</label>
                                                                                }
                                                                            </div>
                                                                            <span>{isHovering === section.id && <i className="fa-solid fa-pen" onClick={() => setShowModal((showModal) => { return { ...showModal, id: section.id, edit: true, delete: false } })} style={{ cursor: 'pointer' }}></i>}
                                                                                {isHovering === section.id && <i className="fa-regular fa-circle-xmark" onClick={() => setShowModal((showModal) => { return { ...showModal, id: section.id, edit: false, delete: true } })} style={{ cursor: 'pointer', marginRight: "3px" }}></i>}
                                                                            </span>
                                                                            {showModal.id === section.id && createPortal(
                                                                                <Modal>
                                                                                    {
                                                                                        showModal.edit ? (<>
                                                                                            <div>Do you want to change the name of section {section.name}</div>
                                                                                            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                                                            {error && <><span>name required</span><br/></>}
                                                                                            <button className='btn btn-primary' onClick={() => { editSectionName(semester.id, chapter.id, section.id); setNewName("") }}>Update</button><button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => {setShowModal((showModal) => { return { ...showModal, id: null } });setError(false)}}>cancel</button>
                                                                                            {/* close the above modal as well as update the name in state */}
                                                                                        </>) : null
                                                                                    }
                                                                                    {
                                                                                        showModal.delete ? (<>
                                                                                            <div>Do you want to delete {section.name}</div>
                                                                                            <div><button className='btn btn-primary' onClick={() => { deleteSection(semester.id, chapter.id, section.id) }}>Yes</button><button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button></div>

                                                                                        </>) : null
                                                                                    }
                                                                                </Modal>, document.querySelector('.myPortalModalDiv'))}
                                                                        </div>
                                                                    ))
                                                                }
                                                                {
                                                                    chapter.chapterTest.map((q) => (
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
                                                                                    <label onClick={() => { handleSelectedQuiz(semester.id, chapter.id, q.id, 'chapterTest'); setCurrentSection(q.id) }}>{q.name}</label>
                                                                                }
                                                                            </div>
                                                                            <span>{isHovering === q.id && <i className="fa-solid fa-pen" onClick={() => setShowModal((showModal) => { return { ...showModal, id: q.id, edit: true, delete: false } })} style={{ cursor: 'pointer' }}></i>}
                                                                                {isHovering === q.id && <i className="fa-regular fa-circle-xmark" onClick={() => setShowModal((showModal) => { return { ...showModal, id: q.id, edit: false, delete: true } })} style={{ cursor: 'pointer', marginRight: "3px" }}></i>}
                                                                            </span>
                                                                            {showModal.id === q.id && createPortal(
                                                                                <Modal>
                                                                                    {
                                                                                        showModal.edit ? (<>
                                                                                            <div>Do you want to change the name of test {q.name}</div>
                                                                                            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                                                            {error && <><span>name required</span><br/></>}
                                                                                            <button className='btn btn-primary' onClick={() => { editQuizName(semester.id, chapter.id, q.id);  }}>Update</button>
                                                                                            <button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => {setShowModal((showModal) => { return { ...showModal, id: null } }); setError(false)}}>cancel</button>
                                                                                            {/* close the above modal as well as update the name in state */}
                                                                                        </>) : null
                                                                                    }
                                                                                    {
                                                                                        showModal.delete ? (<>
                                                                                            <div>Do you want to delete {q.name}</div>
                                                                                            <div><button className='btn btn-primary' onClick={() => { deleteSectionLevelQuiz(semester.id, chapter.id, q.id) }}>Yes</button><button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button></div>

                                                                                        </>) : null
                                                                                    }
                                                                                </Modal>, document.querySelector('.myPortalModalDiv'))}
                                                                        </div>
                                                                    ))
                                                                }
                                                                <div >

                                                                    <span>Add Section</span><i style={{ marginLeft: "7px", fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, id: 'addSection' }) }} className="fa-solid fa-square-plus"></i><br />
                                                                    <span>Add Test</span><i style={{ marginLeft: "7px", fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, id: 'addSectionTest' }) }} className="fa-solid fa-square-plus"></i>
                                                                    {
                                                                        showModal.id === 'addSection' && createPortal(<Modal>
                                                                            <label>Section Name: </label><input style={{ width: '100%' }} value={sectionName} onChange={(e) => setSectionName(e.target.value)}></input>
                                                                            {error && <span>enter name for Section</span>}
                                                                            <button className='btn btn-primary' onClick={() => { addSection(semIndex, chapIndex);  }}>add section</button>
                                                                            <button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, id: null } }); setSemesterName(''); setError(false)  }}>cancel</button>
                                                                        </Modal>, document.querySelector('.myPortalModalDiv'))
                                                                    }
                                                                    {
                                                                        showModal.id === 'addSectionTest' && createPortal(<Modal>
                                                                            <label>Test Name: </label><input style={{ width: '100%' }} value={quizName} onChange={(e) => setQuizName(e.target.value)}></input>
                                                                            {error && <span>enter name for test</span>}
                                                                            <button className='btn btn-primary' onClick={() => { addSectionLevelQuiz(semIndex, chapIndex);  }}>add test</button>
                                                                            <button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, id: null } }); setSemesterName('');setError(false); }}>cancel</button>
                                                                        </Modal>, document.querySelector('.myPortalModalDiv'))
                                                                    }
                                                                    {/* <input style={{ width: '100%' }} value={sectionName} onChange={(event) => setSectionName(event.target.value)}></input>
                                                                    <button onClick={() => addSection(semIndex, chapIndex)}>add section</button>
                                                                    <button onClick={() => addQuiz(semIndex, chapIndex)}>add quiz</button> */}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )

                                            })
                                        }
                                        {
                                            semester.semesterTest.map((q) => {
                                                return (
                                                    <div
                                                        style={{
                                                            border: '1px solid #ccc',
                                                            padding: '10px',
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignContent: "center",
                                                            backgroundColor: chapterDropdown === q.id ? '#f0f0f0' : 'white',
                                                        }}
                                                        onMouseEnter={() => { setIsHovering(q.id) }}
                                                        onMouseLeave={() => { setIsHovering(null) }}

                                                    >

                                                        <div>
                                                            {
                                                                <label onClick={() => { handleSelectedQuizOnChapterLevel(semester.id, q.id, 'semesterTest') }}>{q.name}</label>
                                                            }
                                                        </div>
                                                        <span>
                                                            {isHovering === q.id && <i className="fa-solid fa-pen"
                                                                onClick={() => setShowModal((showModal) => { return { ...showModal, id: q.id, edit: true, delete: false } })}
                                                                style={{ cursor: 'pointer' }}></i>}
                                                            {isHovering === q.id && <i className="fa-regular fa-circle-xmark"
                                                                onClick={() => setShowModal((showModal) => { return { ...showModal, id: q.id, edit: false, delete: true } })}
                                                                style={{ cursor: 'pointer', marginRight: "3px" }}></i>
                                                            }

                                                            {showModal.id === q.id && createPortal(
                                                                <Modal>
                                                                    {
                                                                        showModal.edit ? (<>
                                                                            <div>Do you want to change the name of test {q.name}</div>
                                                                            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
                                                                            {error && <><span>name required</span><br/></>}
                                                                            <button className='btn btn-primary'
                                                                                onClick={() => { editChapterLevelQuizName(semester.id, q.id);  }}>Update</button>
                                                                            <button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => {setShowModal((showModal) => { return { ...showModal, id: null } }); setError(false)}}>cancel</button>
                                                                            {/* close the above modal as well as update the name in state */}
                                                                        </>) : null
                                                                    }
                                                                    {
                                                                        showModal.delete ? (<>
                                                                            <div>Do you want to delete {q.name}</div>
                                                                            <div><button className='btn btn-primary' onClick={() => { deleteChapterLevelQuiz(semester.id, q.id) }}>Yes</button><button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, id: null } })}>cancel</button></div>

                                                                        </>) : null
                                                                    }
                                                                </Modal>, document.querySelector('.myPortalModalDiv'))}

                                                        </span>
                                                    </div>

                                                )
                                            })
                                        }
                                        <div>

                                            <span>Add Chapter</span><i style={{ marginLeft: "7px", fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, id: 'addChapter' }) }} className="fa-solid fa-square-plus"></i><br />
                                            <span>Add Test</span><i style={{ marginLeft: "7px", fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, id: 'addChapterLevelQuiz' }) }} className="fa-solid fa-square-plus"></i>
                                            {
                                                showModal.id === 'addChapter' && createPortal(<Modal>
                                                    <label>Chapter Name: </label><input style={{ width: '100%' }} value={chapterName} onChange={(e) => setChapterName(e.target.value)}></input>
                                                    {error && <><span style={{color:"red" , fontSize:"12px"}}>enter name for Chapter</span><br/></>}
                                                    <button className='btn btn-primary' onClick={() => { addChapter(semIndex);  }}>add chapter</button>
                                                    <button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, id: null } }); setSemesterName('');setError(false) }}>cancel</button>
                                                </Modal>, document.querySelector('.myPortalModalDiv'))
                                            }
                                            {
                                                showModal.id === 'addChapterLevelQuiz' && createPortal(<Modal>
                                                    <label>Test Name: </label><input style={{ width: '100%' }} value={quizName} onChange={(e) => setQuizName(e.target.value)}></input>
                                                    {error && <><span style={{color:"red" , fontSize:"12px"}}>enter name for test</span><br/></>}
                                                    <button className='btn btn-primary' onClick={() => { addQuizBelowChapters(semIndex);}}>add test</button>
                                                    <button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, id: null } }); setSemesterName(''); setError(false) }}>cancel</button>
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
                            <label>Semester Name: </label><input style={{ width: '100%' }} value={semesterName} onChange={(e) => {setSemesterName(e.target.value); setError(false)} }></input>
                            {error && <><span style={{color:"red" , fontSize:"12px"}}>enter name for semester</span><br/></>}
                            <button className='btn btn-primary' onClick={() => { addSemester();  }}>add sem</button><button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, id: null } }); setSemesterName('');setError(false) }}>cancel</button>
                        </Modal>, document.querySelector('.myPortalModalDiv'))
                    }
                </div>
            </div>


        </>);
}

export default SideBar;
