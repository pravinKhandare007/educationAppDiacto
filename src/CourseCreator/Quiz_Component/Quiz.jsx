// import React, { useEffect, useState } from 'react';

// const Quiz = ({setFinalCourseData , slideId , contentId}) => {
//   const [questions, setQuestions] = useState([
//     {
//       question: '',
//       options: ['', '', ''],
//       correctAnswer: '',
//     },
//   ]);

//   useEffect(()=>{
//     setFinalCourseData((finalCourseData)=>{
//         const newFinalCourseData = {
//             ...finalCourseData, slides: [...finalCourseData.slides.map((slide) => {
//                 if (slide.id === slideId) {
//                     console.log("slide.slideId: ", slide.id);
//                     return {
//                         id: slide.id,
//                         content: [...slide.content.map((contentObject) => {
//                             if (contentObject.id === contentId) {
//                                 return {
//                                     id: contentObject.id,
//                                     type: contentObject.type,
//                                     data: questions
//                                 }
//                             }
//                             return {
//                                 ...contentObject
//                             }
//                         })]
//                     }
//                 } else {
//                     return { ...slide }
//                 }
//             })]
//         }
//         return newFinalCourseData;
//     })
//   } , [questions])

//   const handleOptionChange = (questionIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options.push(value);
//     setQuestions(updatedQuestions);
//   };

//   const handleAddOption = (questionIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options.push('');
//     setQuestions(updatedQuestions);
//   };

//   const handleRemoveOption = (questionIndex, optionIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options.splice(optionIndex, 1);
//     setQuestions(updatedQuestions);
//   };

//   const handleQuestionChange = (index, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].question = value;
//     setQuestions(updatedQuestions);
//   };

//   return (
//     <div>
//       {questions.map((q, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             placeholder={`Question ${index + 1}`}
//             value={q.question}
//             onChange={(e) => handleQuestionChange(index, e.target.value)}
//             style={{ width: '100%', border: 'none', marginBottom: '10px' }}
//           />
//           {q.options.map((option, optIndex) => (
//             <div key={optIndex}>
//               <input
//                 type="radio"
//                 name={`question-${index}`}
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder={`Option ${optIndex + 1}`}
//                 value={option}
//                 onChange={(e) => {
//                   const updatedQuestions = [...questions];
//                   updatedQuestions[index].options[optIndex] = e.target.value;
//                   setQuestions(updatedQuestions);
//                 }}
//                 style={{
//                   width: '100%',
//                   border: 'none',
//                   marginBottom: '5px',
//                 }}
//               />
//               {q.options.length > 2 && (
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveOption(index, optIndex)}
//                 >
//                   Remove Option
//                 </button>
//               )}
//             </div>
//           ))}
//           <button type="button" onClick={() => handleAddOption(index)}>
//             Add Option
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Quiz;


import React, { useState } from 'react';

const Quiz = () => {
  const initialQuestion = {
    question: '',
    type: 'multiple_choice', // default type is multiple choice
    options: ['', '', ''],
    correctAnswer: '', // applicable for multiple choice questions
  };

  const [questions, setQuestions] = useState([initialQuestion]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...initialQuestion }]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // ... (previous code)

const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };
  
  // ... (rest of the component)
  

  const renderQuestion = (q, index) => {
    switch (q.type) {
      case 'text':
        return (
          <div key={index}>
            <input
              type="text"
              placeholder="Short Answer"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              style={{ width: '100%', border: 'none', marginBottom: '10px' }}
            />
            <button type="button" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </button>
          </div>
        );
      case 'checkbox':
        return (
          <div key={index}>
            <input
              type="text"
              placeholder="Checkbox Question"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              style={{ width: '100%', border: 'none', marginBottom: '10px' }}
            />
            {q.options.map((option, optIndex) => (
              <div key={optIndex}>
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleQuestionChange(index, 'options', e.target.value)}
                />
                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={option}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].options[optIndex] = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                  style={{
                    width: '90%',
                    border: 'none',
                    marginBottom: '5px',
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </button>
            <button type="button" onClick={() => handleAddOption(index)}>
              Add Option
            </button>
          </div>
        );
      default: // multiple_choice is default or fallback type
        return (
          <div key={index}>
            <input
              type="text"
              placeholder="Multiple Choice Question"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              style={{ width: '100%', border: 'none', marginBottom: '10px' }}
            />
            {q.options.map((option, optIndex) => (
              <div key={optIndex}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                />
                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={option}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].options[optIndex] = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                  style={{
                    width: '90%',
                    border: 'none',
                    marginBottom: '5px',
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </button>
            <button type="button" onClick={() => handleAddOption(index)}>
              Add Option
            </button>
          </div>
        );
    }
  };

  return (
    <div>
      {questions.map((q, index) => renderQuestion(q, index))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
    </div>
  );
};

export default Quiz;
