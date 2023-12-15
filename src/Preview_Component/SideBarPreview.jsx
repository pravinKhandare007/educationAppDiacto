import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from "uuid";

const SideBar = ({ mainCourseData , handleSelectedPreviewSemester ,handleSelectedPreviewChapter,
    handleSelectedPreviewSection,handleSelectedPreviewQuiz,handleSelectedPreviewQuizOnChapterLevel,
    semesterDropdownInfo,chapterDropdownInfo

}) => {
    console.log("maincourseData : ", mainCourseData);
    
    const [currentSection , setCurrentSection] = useState("");
    const [semesterDropdown, setSemesterDropdown] = useState('');
    const [chapterDropdown, setChapterDropdown] = useState('');

    useEffect(()=>{
        setSemesterDropdown(semesterDropdownInfo);
        setChapterDropdown(chapterDropdownInfo);
    },[])


    const handleSemesterDropdownClick = (semId) => {
        setSemesterDropdown(semesterDropdown === semId ? null : semId);
    };

    const handleChapterDropdownClick = (chapId) => {
        setChapterDropdown(chapterDropdown === chapId ? null : chapId);
    };

    
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
                                    
                                >
                                    <div>
                                        {
                                            <label onClick={() => {/*here update selectedSemester */ handleSelectedPreviewSemester(semester.id) }}>{semester.name}</label>
                                        }
                                    </div>
                                    <span>
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
                                                            
                                                        >
                                                            <div>
                                                                {
                                                                    <label onClick={() => { handleSelectedPreviewChapter(semester.id, chapter.id) }}>{chapter.name}</label>
                                                                }
                                                            </div>
                                                            <span>
                                                                

                                                                <i onClick={() => handleChapterDropdownClick(chapter.id)} className="fa-solid fa-caret-down"
                                                                    style={{ cursor: 'pointer' }}></i>

                                                                

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
                                                                           
                                                                        >
                                                                            <div>
                                                                                {
                                                                                    <label onClick={() => { handleSelectedPreviewSection(semester.id, chapter.id, section.id); setCurrentSection(section.id) }}>{section.name}</label>
                                                                                }
                                                                            </div>
                                                                            
                                                                            
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
                                                                            
                                                                        >
                                                                            <div>
                                                                                {
                                                                                    <label onClick={() => { handleSelectedPreviewQuiz(semester.id, chapter.id, q.id); setCurrentSection(q.id) }}>{q.name}</label>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                                <div >

                                                                    
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
                                                       

                                                    >

                                                        <div>
                                                            {
                                                                <label onClick={() => { handleSelectedPreviewQuizOnChapterLevel(semester.id, q.id) }}>{q.name}</label>
                                                            }
                                                        </div>
                                                        <span>
                                                            

                                                        </span>
                                                    </div>

                                                )
                                            })
                                        }
                                        <div>

                                            
                                        </div>
                                    </div>

                                )}
                            </div>
                        )
                    })
                }
                
            </div>

        </>);
}

export default SideBar;






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