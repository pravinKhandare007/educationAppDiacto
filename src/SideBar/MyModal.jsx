import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

const MyModal = ({ showModal, setShowModal,
  addSemester, editSemesterName, deleteSemester,
  addChapter, editChapterName, deleteChapter,
  addSection, editSectionName, deleteSection,
  addSectionLevelQuiz, editChapterLevelQuizName, deleteSectionLevelQuiz,
  addQuizBelowChapters, editQuizName, deleteChapterLevelQuiz,
  semesterName, setSemesterName,
  chapterName, setChapterName,
  sectionName, setSectionName,
  quizName, setQuizName,
  newName, setNewName,
  error, setError
}) => {


  const { semId, chapId, secId, chapTestId, semTestId, semIndex, chapIndex, title, type, action, show, name } = showModal;

  function contentToShowInModalBody() {
    if (type === 'semester') {
      if (action === 'add') {
        return (
          <>
            <label>Semester Name:</label><input style={{ width: '100%' }} value={semesterName} onChange={(e) => { setSemesterName(e.target.value); setError(false) }}></input>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>enter name for semester</span><br /></>}
            <button className='btn btn-primary' onClick={() => { addSemester(); }}>add sem</button><button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, semId: null, show: false } }); setSemesterName(''); setError(false) }}>cancel</button>
          </>
        )
      }
      if (action === "edit") {
        return (
          <>
            <div>Do you want to change the name of semester {name}</div>
            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>name required</span><br /></>}
            <button className='btn btn-primary'
              onClick={() => { editSemesterName(semId); }}>Update</button>
            <button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => { setShowModal((showModal) => { return { ...showModal, show: false } }); setError(false) }} >cancel</button>
            {/* close the above modal as well as update the name in state */}
          </>
        )
      }
      if (action === 'delete') {
        return (
          <>
            <div>Do you want to delete {name}</div>
            <div>
              <button className='btn btn-primary'
                onClick={() => { deleteSemester(semId) }}>Yes</button>
              <button style={{ marginLeft: "7px" }} className='btn btn-primary'
                onClick={() => setShowModal((showModal) => { return { ...showModal, show: false } })}>cancel</button></div>
          </>
        )
      }
    }
    if (type === 'chapter') {
      if (action === 'add') {
        return (
          <>
            <label>Chapter Name: </label><input style={{ width: '100%' }} value={chapterName} onChange={(e) => setChapterName(e.target.value)}></input>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>enter name for Chapter</span><br /></>}
            <button className='btn btn-primary' onClick={() => { addChapter(semIndex); }}>add chapter</button>
            <button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, show: false } }); setSemesterName(''); setError(false) }}>cancel</button>
          </>
        )
      }
      if (action === 'edit') {
        return (
          <>
            <div>Do you want to change the name of chapter {name}</div>
            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>name required</span><br /></>}
            <button className='btn btn-primary'
              onClick={() => { editChapterName(semId, chapId); }}>Update</button>
            <button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => { setShowModal((showModal) => { return { ...showModal, show: false } }); setError(false) }}>cancel</button>
            {/* close the above modal as well as update the name in state */}
          </>
        )
      }
      if (action === 'delete') {
        return (
          <>
            <div>Do you want to delete {name}</div>
            <div><button className='btn btn-primary' onClick={() => { deleteChapter(semId, chapId) }}>Yes</button>
            <button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, show: false } })}>cancel</button></div>
          </>
        )
      }
    }
    if (type === 'section') {
      if (action === 'add') {
        return (
          <>
            <label>Section Name: </label><input style={{ width: '100%' }} value={sectionName} onChange={(e) => setSectionName(e.target.value)}></input>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>enter name for Section</span><br /></>}
            <button className='btn btn-primary' onClick={() => { addSection(semIndex, chapIndex); }}>add section</button>
            <button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, show: false } }); setSemesterName(''); setError(false) }}>cancel</button>
          </>
        )
      }
      if (action === 'edit') {
        return (
          <>
            <div>Do you want to change the name of section {name}</div>
            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>name required</span><br /></>}
            <button className='btn btn-primary' onClick={() => { editSectionName(semId, chapId, secId); setNewName("") }}>Update</button>
            <button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => { setShowModal((showModal) => { return { ...showModal, show:false } }); setError(false) }}>cancel</button>
            {/* close the above modal as well as update the name in state */}
          </>
        )
      }
      if (action === 'delete') {
        return (
          <>
            <div>Do you want to delete {name}</div>
            <div><button className='btn btn-primary' onClick={() => { deleteSection(semId, chapId, secId) }}>Yes</button>
            <button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, show: false } })}>cancel</button></div>
          </>
        )
      }
    }
    if (type === 'chapTest') {
      if (action === 'add') {
        return (
          <>
            <label>Test Name: </label><input style={{ width: '100%' }} value={quizName} onChange={(e) => setQuizName(e.target.value)}></input>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>enter name for test</span><br /></>}
            <button className='btn btn-primary' onClick={() => { addSectionLevelQuiz(semIndex, chapIndex); }}>add test</button>
            <button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, show:false } }); setSemesterName(''); setError(false); }}>cancel</button>
          </>
        )
      }
      if (action === 'edit') {
        return (
          <>
            <div>Do you want to change the name of test {name}</div>
            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>name required</span><br /></>}
            <button className='btn btn-primary' onClick={() => { editQuizName(semId, chapId, chapTestId); }}>Update</button>
            <button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => { setShowModal((showModal) => { return { ...showModal, show:false } }); setError(false) }}>cancel</button>
            {/* close the above modal as well as update the name in state */}
          </>
        )
      }
      if (action === 'delete') {
        return (
          <>
            <div>Do you want to delete {name}</div>
            <div><button className='btn btn-primary' onClick={() => { deleteSectionLevelQuiz(semId, chapId, chapTestId) }}>Yes</button>
            <button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, show:false} })}>cancel</button></div>
          </>
        )
      }
    }
    if (type === 'semTest') {
      if (action === 'add') {
        return (
          <>
            <label>Test Name: </label><input style={{ width: '100%' }} value={quizName} onChange={(e) => setQuizName(e.target.value)}></input>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>enter name for test</span><br /></>}
            <button className='btn btn-primary' onClick={() => { addQuizBelowChapters(semIndex); }}>add test</button>
            <button style={{ marginLeft: "5px" }} className='btn btn-primary' onClick={() => { setShowModal((showModal) => { return { ...showModal, show:false } }); setSemesterName(''); setError(false) }}>cancel</button>
          </>
        )
      }
      if (action === 'edit') {
        return (
          <>
            <div>Do you want to change the name of test {name}</div>
            <div>New Name: <input value={newName} onChange={(e) => setNewName(e.target.value)}></input></div>
            {error && <><span style={{ color: "red", fontSize: "12px" }}>name required</span><br /></>}
            <button className='btn btn-primary'
              onClick={() => { editChapterLevelQuizName(semId, semTestId); }}>Update</button>
            <button className='btn btn-primary' style={{ marginLeft: "6px" }} onClick={() => { setShowModal((showModal) => { return { ...showModal, show: false } }); setError(false) }}>cancel</button>
          </>
        )
      }
      if (action === 'delete') {
        return (
          <>
            <div>Do you want to delete {name}</div>
            <div><button className='btn btn-primary' onClick={() => { deleteChapterLevelQuiz(semId, semTestId) }}>Yes</button>
            <button style={{ marginLeft: "7px" }} className='btn btn-primary' onClick={() => setShowModal((showModal) => { return { ...showModal, show:false } })}>cancel</button></div>
          </>
        )
      }
    }
  }



  return (
    <>
      <Modal
        show={show}
        // onHide={handleClose}
        backdrop="static"
        // keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {contentToShowInModalBody()}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyModal;