import './Modal.css';

const Modal = ({children}) => {
    return ( <>
        <div className="modal_wrapper"></div>
        <div className="modal_container">
            {children}
        </div>
    
    </> );
}
 
export default Modal;