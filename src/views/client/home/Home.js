import React from 'react'
import './Home.css';

const Home = () => {
  return (
    <div className='box'>
      <video id="background-video" autoPlay loop muted poster={require('../../../assets/img/home.jpg')}>
          <source src={require('../../../assets/video/home.mp4')} type="video/mp4" />
      </video>
    </div>
  )
}

export default Home