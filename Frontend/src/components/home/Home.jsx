import { Link } from 'react-router-dom'
import './Home.css'

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
        <div className="categoryCard">MEN</div>
        <div className="categoryCard">WOMEN</div>
        <div className="categoryCard">KID</div>
      </section>
    </>
  )
}

export default Home
