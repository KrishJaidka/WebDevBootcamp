import React from 'react'
import Blah from '../components/Blah'

const Home = () => {
  return (
    <>
    <div className='main'>
        <div className="hero">
          <h1 className='hero-heading'>The Generic Website!</h1>
          <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, debitis! Fugit necessitatibus ab iste accusantium voluptate <br />praesentium perspiciatis cumque repellat.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consequuntur nemo possimus.</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="grey" fillOpacity="1" d="M0,64L48,106.7C96,149,192,235,288,277.3C384,320,480,320,576,309.3C672,299,768,277,864,250.7C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
        <section className='middle'>
        <Blah/>
        </section>
        <br /><br />
        <Blah/>
        <br /><br />
        <Blah/>
    </div>
    </>
  )
}

export default Home