import React from 'react'
import './style/Home.css';

const Home = (props) => {
  const sesionClose = (e)=>{
    localStorage.removeItem('__react_session__');
    window.location.reload()
  }
  return (
    <div className='home-container'>
      <div className='home-card'>
        <h2>Bienvenido </h2>
        <div>Usuario: </div><b>{props.user.name}</b>
        <div>Puesto:</div> <b>{props.user.rol}</b>
        <button onClick={sesionClose}>Cerrar Sesion</button>
      </div>
    </div>
  )
}

export default Home
