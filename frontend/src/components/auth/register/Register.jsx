import React, { useState } from 'react'
import './Register.css'
import PersonalInfo from './PersonalInfo.jsx'
import AddressInfo from './AddressInfo.jsx'
import { GrPrevious, GrNext } from 'react-icons/gr'

const Register = () => {
  const [page, setPage] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    password: '',
  })
  const FormTitle = ['Sign Up', 'Personal Info']
  const pageDisplay = () => {
    if (page === 0) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />
    } else {
      return <AddressInfo formData={formData} setFormData={setFormData} />
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formDiv">
        <div className="formHeading">
          <h1>{FormTitle[page]}</h1>
        </div>
        <div className="formBody">{pageDisplay()}</div>
        <div className="navigatePage">
          <button
            className="btn"
            disabled={page == 0}
            onClick={() => setPage(page - 1)}
          >
            <div>
              <GrPrevious />
              Prev
            </div>
          </button>
          {page == 1 ? (
            <button className="btn subBtn" type="submit">
              <div>Submit</div>
            </button>
          ) : (
            <button
              className="btn"
              disabled={page == 1}
              onClick={() => setPage(page + 1)}
            >
              <div>
                Next
                <GrNext />
              </div>
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default Register
