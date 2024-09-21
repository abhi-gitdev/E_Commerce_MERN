import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={onClose} className="close-button">
              <RxCross2 className="icon" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
