import React from 'react'
import './Message.css'
const Message = ({ variant, children }) => {
  console.log(variant)

  return (
    <div className="msgCont">
      <div className={variant.status >= 400 ? 'error' : 'success'}>
        {children}
      </div>
    </div>
  )
}

export default Message
