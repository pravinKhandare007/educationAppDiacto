import { useEffect, useInsertionEffect, useState } from 'react';
import './Preview.css'
import Pagination from '../Pagination/Pagination';
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from 'uuid';

const CourseCreatorPreview = ({mainCourseData ,selectedChapterId,selectedSectionId,selectedSemId,setShowPreview }) => {

    console.log("rendering course creater");
    const initialId = uuidv4();
    const [currentSlideId, setCurrentSlideId] = useState(initialId); // will contain the id of the current slide
    //rename slidesData
    //api we need to send sectionID and body -- sildesData.
    //sample api endpoint = /api/section/:sectionId 
    //api body = slidesData
    let initialSlidesData = { slides: [{ id: initialId, content: [] }] }
    const [slidesData, setSlidesData] = useState(initialSlidesData);

    useEffect(() => {
        const selectedSemIndex = mainCourseData.semesters.findIndex((semester) => semester.id === selectedSemId);
        const selectedChapterIndex = mainCourseData.semesters[selectedSemIndex].chapters.findIndex((chapter) => chapter.id === selectedChapterId);
        const selectedSectionIndex = mainCourseData.semesters[selectedSemIndex].chapters[selectedChapterIndex].sections.findIndex((section) => section.id === selectedSectionId);


        const sectionsSlidesData = mainCourseData.semesters[selectedSemIndex].chapters[selectedChapterIndex].sections[selectedSectionIndex].content;
        if (sectionsSlidesData) {
            console.log("sectttionsSlidesdata : ", sectionsSlidesData);
            console.log("current slide setting to : ", sectionsSlidesData.slides[0].id);
            setSlidesData(()=>{ 
                return {...sectionsSlidesData}
            });
            setCurrentSlideId(sectionsSlidesData.slides[0].id);     

        }
    }, [selectedSectionId])

      

    // const [slidesData] = useState(mainCourseData.semesters[selectedSemIndex].chapters[selectedChapterIndex].sections[selectedSectionIndex].content);
    // const [currentSlideId, setCurrentSlideId] = useState(sectionsSlidesData.slides[0].id);


    function paginate(currentSlideId) {
        setCurrentSlideId(currentSlideId);
    }



    return (<>
        <div style={{ padding: "1em", width: "85%"}}>
            <button onClick={() => setShowPreview((showPreview) => !showPreview)} className='btn btn-primary' style={{marginBottom:"10px"}}> Go back</button>
            <div style={{width:"100%" , height:"550px" , overflow:"scroll"}}>
            <div className="single_slide" style={{ border: "1px solid black", width: '100%', padding: '1em', minHeight: '300px', display: "flex", flexDirection: "column", gap: "10px" }}>
                <span>slide No: {slidesData.slides.findIndex((slide) => slide.id === currentSlideId) + 1}</span>
                {
                    slidesData.slides.filter(slide => slide.id === currentSlideId)[0].content.map((contentObj) => {
                        if (contentObj.type === "Heading") {
                            return (
                                <div className='ql-editor'>
                                    <span className="heading_from_top">{contentObj.data}</span>
                                </div>
                            )
                        }
                        if (contentObj.type === "Text") {
                            return (
                                <div dangerouslySetInnerHTML={{ __html: contentObj.data }} className='ql-editor'>
                                </div>
                            )
                        }
                        if (contentObj.type === "Quiz") {
                            return (
                                <div>
                                    {
                                        contentObj.data.map((q, index) => {
                                            return (
                                                <div>
                                                    <span>{`Q${index + 1}`}</span>
                                                    <div>{q.question}</div>
                                                    <div>
                                                        {
                                                            q.options.map((option, optIndex) => {
                                                                return (
                                                                    <div style={{ padding: "0.2em" }}>
                                                                        <input type='radio' value={option} id={`option${optIndex}`} name={`question${index}`}></input><label for={`option${optIndex}`}>{option}</label>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )

                                        })
                                    }
                                </div>

                            )
                        }
                        if (contentObj.type === "Image") {
                            return (
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                                    <div className="box">
                                        <img id={"imgId"} src={URL.createObjectURL(contentObj.data)} ></img>
                                    </div>

                                </div>
                            )
                        }
                    })
                }
            </div>
            </div>
            <div>
                <Pagination slides={slidesData.slides} paginate={paginate} currentSlideId={currentSlideId} setCurrentSlideId={setCurrentSlideId}></Pagination>
            </div>
        </div>


    </>);
}

export default CourseCreatorPreview;

/*


<h2>Heading 2 of text editor</h2><p><br></p><p>This is the second slide </p><p><span class=\"ql-font-monospace\">with content center as well as different font-styles</span></p><p><br></p><ol><li class=\"ql-align-center\">first </li><li class=\"ql-align-center\">second</li><li class=\"ql-align-center\">third </li></ol>"
id
: 
"9f3b9faf-ca7b-486c-b6a9-2bf1b2822a78"*/

/*
content
: 
Array(2)
0
: 
{id: '52427614-8a44-4d94-99b7-225d9ec8b1b0', type: 'Text', data: '<h1>Biology</h1><p><br></p><p>In this section we w…ti-cellular</li><li>power house of cell</li></ol>'}
1
: 
{id: 'bf424c42-15a4-4cd8-b051-48399c68cc9b', type: 'Heading', data: 'Normal Heading'}
length
: 
2



*/ 