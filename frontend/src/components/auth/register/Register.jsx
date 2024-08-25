import React, { useEffect, useState } from 'react'
import './Register.css'
import PersonalInfo from './PersonalInfo.jsx'
import AddressInfo from './AddressInfo.jsx'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { setCredentials } from '../../../redux/features/auth/authSlice.js'
import Loader from '../../common/Loader/Loader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../../redux/api/usersApiSlice.js'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, navigate, userInfo])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await register(formData).unwrap()
      console.log(res)
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
      toast.success('User successfully registered.')
    } catch (error) {
      console.log(error.data.message)
      toast.error(error.data.message)
    }
  }

  const handleNext = (e) => {
    e.preventDefault()
    setPage(page + 1)
  }

  const handlePrev = (e) => {
    e.preventDefault()
    setPage(page - 1)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formDiv">
        <div className="formHeading">
          <h1>{FormTitle[page]}</h1>
        </div>
        <div className="formBody">{pageDisplay()}</div>
        <div className="navigatePage">
          {page == 0 ? (
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              <button className="btn subBtn" type="button">
                <GrPrevious />
                Log in
              </button>
            </Link>
          ) : (
            <button
              className="btn"
              disabled={page == 0}
              type="button"
              onClick={handlePrev}
            >
              <GrPrevious />
              Prev
            </button>
          )}
          {page == 1 ? (
            <button className="btn subBtn" type="submit">
              {isLoading ? <>Signing Up...</> : <>Sign Up</>}
            </button>
          ) : (
            <button
              className="btn"
              type="button"
              disabled={page == 1}
              onClick={handleNext}
            >
              Next
              <GrNext />
            </button>
          )}
        </div>
      </div>
      {isLoading && <Loader />}
    </form>
  )
}

export default Register
