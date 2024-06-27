import { Link } from 'react-router-dom'
import './Home.css'
import kid from '../../assets/Kids.png'
import men from '../../assets/Mens.png'
import women from '../../assets/Womens.png'

const Home = () => {
  return (
    <>
      <section id="home">
        <div id="homeContainer">
          <h1>
            “Stay Stylish and Keep Sprinting Towards Your Fashion Goals With
            StreetStyleSprint!”
          </h1>
          <button type="button" className="btn">
            Buy Now
          </button>
        </div>
      </section>
      <section id="category">
        <div className="categoryCard">
          <img src={kid} alt="Kids Section" />
        </div>
        <div className="categoryCard">
          <img src={men} alt="Men Section" />
        </div>
        <div className="categoryCard">
          <img src={women} alt="Women Section" />
        </div>
      </section>
    </>
  )
}

export default Home
