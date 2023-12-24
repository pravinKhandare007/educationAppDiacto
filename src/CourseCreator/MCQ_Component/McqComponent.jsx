import { useEffect, useState } from "react";

const McqComponent = ({ setSlidesData, slideId, contentId, slidesData, data ,isSorted}) => {
    //isSorted is toggled when there is a sort opration, isSorted is required because McqComponent was not setting the data from the parent after the sort happend 
    console.log("rendering mcq component")
    const [mcq, setMcq] = useState(null);
    const [isChecked, setIsChecked] = useState({})

    useEffect(() => {
        if (data) {
            console.log("1 st mcq useEffect : data: ", data);
            setMcq(data);
        } else {
            console.log("1 st useEffect :setting initial");
            setMcq({
                question: '',
                options: [''],
                correctAnswer: [],
                type: 'single'
            });
        }
    }, [slideId , isSorted])

    useEffect(() => {
        console.log("mcq useEffect 2 setting parent data to ", mcq)
        setSlidesData((slidesData) => {
            const newSlidesData = { ...slidesData };
            newSlidesData.slides = slidesData.slides.map((slide) => {
                if (slide.id === slideId) {
                    return {
                        ...slide, content: slide.content.map((contentObj) => {
                            if (contentId === contentObj.id) {
                                return {
                                    ...contentObj, data: mcq
                                }
                            } else {
                                return {
                                    ...contentObj
                                }
                            }
                        })
                    }
                } else {
                    return {
                        ...slide
                    }
                }
            })

            return newSlidesData;

        })
    }, [mcq])

    function updateQuestion(e) {
        setMcq({ ...mcq, question: e.target.value })
    }

    function saveCorrectAnswer(e, optionIndex) {

        if (mcq.type === 'single') {
            setMcq({ ...mcq, correctAnswer: [e.target.value] })
        }
        if (mcq.type === "multiple") {
            if (e.target.checked) {
                const newCorrectAnswer = [...mcq.correctAnswer];
                newCorrectAnswer.push(e.target.value);
                setMcq({ ...mcq, correctAnswer: newCorrectAnswer });
                const checked = { ...isChecked };
                checked[e.target.id] = true;
                setIsChecked(checked)
            } else {
                setMcq({ ...mcq, correctAnswer: mcq.correctAnswer.filter(answer => answer !== e.target.value) })
                const checked = { ...isChecked };
                checked[e.target.id] = false;
                setIsChecked(checked)
            }
            console.log("checked $$" , isChecked);
        }
    }

    function saveOption(e, optionIndex) {
        //
        console.log("checked %%%%%%% , ", isChecked);
        const newMcq = { ...mcq };
        newMcq.options[optionIndex] = e.target.value;
        setMcq(newMcq);
        if (!e.target.value) {
            const checked = { ...isChecked };
            checked[`checkbox${optionIndex}`] = false;
            setIsChecked(checked)
        }
    }


    function addOption() {
        const newMcq = { ...mcq };
        newMcq.options.push('');
        setMcq(newMcq);
    }

    function deleteOption(optIndex) {
        setMcq({ ...mcq, options: mcq.options.filter((option, index) => index !== optIndex) })
    }

    function handleSingleOrMultiple(e) {
        setMcq({ ...mcq, type: e.target.value })
    }
    return (
        <>
            {
                mcq && <div>
                    <div style={{display:'flex' , alignItems:'flex-start'}}>
                        <span>Q{')'}</span>
                        <textarea rows={3} type="text" placeholder="Question" value={mcq.question} onChange={(e) => { updateQuestion(e) }} style={{ width: '90%', marginBottom: '10px',resize:'none' }}></textarea>
                        <select onChange={handleSingleOrMultiple} value={mcq.type}>
                            <option value={"single"} >Single correct</option>
                            <option value={"multiple"}>Multiple correct</option>
                        </select>
                    </div>
                    {
                        mcq.type === "single" ? (mcq.options.map((option, optionIndex) => {
                            return (
                                <div key={optionIndex}>
                                    <input type="radio" value={option} name="radio" onChange={(e) => { saveCorrectAnswer(e) }} />
                                    <input type="text" placeholder={`option ${optionIndex + 1}`} value={option} onChange={(e) => { saveOption(e, optionIndex) }} style={{ width: '90%', border: 'none', marginBottom: '10px', outline: "none" }} />
                                    <i onClick={() => { deleteOption(optionIndex) }} style={{ cursor: "pointer" }} className="fa-regular fa-circle-xmark"></i>
                                </div>
                            )
                        })) : (
                            mcq.options.map((option, optionIndex) => {
                                return (
                                    <div key={optionIndex}>
                                        <input type="checkbox" id={`checkbox${optionIndex}`} value={option} checked={isChecked[`checkbox${optionIndex}`]} disabled={!option}  name="radio" onChange={(e) => { saveCorrectAnswer(e, optionIndex) }} />
                                        <input type="text" placeholder={`option ${optionIndex + 1}`} value={option} onChange={(e) => { saveOption(e, optionIndex) }} style={{ width: '90%', border: 'none', marginBottom: '10px', outline: "none" }} />
                                        <i onClick={() => { deleteOption(optionIndex) }} style={{ cursor: "pointer" }} className="fa-regular fa-circle-xmark"></i>
                                    </div>
                                )
                            }
                            ))
                    }
                    <button onClick={addOption}>Add Option</button>
                </div>

            }
        </>
    );
}

export default McqComponent;