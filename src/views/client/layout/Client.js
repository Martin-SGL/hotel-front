import React,{useEffect, useState} from 'react'
import './Client.css';
import {Link } from 'react-router-dom'
import ClientRoutes from './ClientRoutes'


const Client = (props) => {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    setPath(window.location.pathname)
  }, [path])
  
  
  return (
    <div className='container-client'>
      <header>
        <div className='title-header'>
         <img width={'45px'} height={'50px'} src={require('../../../assets/img/hotel.png')}/>
        <div style={{marginLeft:'10px',marginTop:'2px'}}>Posada Real Hotel</div>
        </div>
        <div className='link-header'>
          <Link to={`/login`} >
            <i className="fa-solid fa-user"></i> &nbsp; Log in
          </Link>
        </div>
      </header>
      <nav>
          <li>
          {path==='/hotel/home' 
            ?
            <Link to={`/hotel/home`} style={{backgroundColor:'#cecece',color:'white'}}>  
              <div><i className='fa-solid fa-house'/></div>
              <div>&nbsp;home</div>
            </Link>
            :
            <Link to={`/hotel/home`} onClick={e=>{setPath(window.location.pathname)}}>  
              <div><i className='fa-solid fa-house'/></div>
              <div>&nbsp;home</div>
            </Link>
          }
          </li>
          <li>
          {path==='/hotel/rooms'
            ?
            <Link to={`/hotel/rooms`} style={{backgroundColor:'#cecece',color:'white'}}>  
              <div><i className="fa-solid fa-bed"></i></div>
              <div>&nbsp;Rooms</div>
            </Link>
            :
            <Link to={`/hotel/rooms`} onClick={e=>{setPath(window.location.pathname)}}>  
              <div><i className="fa-solid fa-bed"></i></div>
              <div>&nbsp;Rooms</div>
            </Link>
          }
          </li>
          <li>
          {path==='/hotel/about'
            ?
            <Link to={`/hotel/about`} style={{backgroundColor:'#cecece',color:'white'}}>  
                <div><i className="fa-solid fa-circle-info"></i></div>
                <span>&nbsp;About</span>
            </Link>
            :
            <Link to={`/hotel/about`} onClick={e=>{setPath(window.location.pathname)}}>  
                <div><i className="fa-solid fa-circle-info"></i></div>
                <span>&nbsp;About</span>
            </Link>
          }
          </li>
          <li>
          {path==='/hotel/reservation'
            ?
            <Link to={`/hotel/reservation`} style={{backgroundColor:'#cecece',color:'white'}}>
              <div><i className="fa-solid fa-book-open"></i></div>
              <span>&nbsp;Reservation</span>
            </Link>
            :
            <Link to={`/hotel/reservation`} onClick={e=>{setPath(window.location.pathname)}}>
              <div><i className="fa-solid fa-book-open"></i></div>
              <span>&nbsp;Reservation</span>
            </Link>
          }
          </li>
          <li>
          {path==='/hotel/invoicing'
            ?
            <Link to={`/hotel/invoicing`} style={{backgroundColor:'#cecece',color:'white'}}>  
              <div><i className="fa-solid fa-receipt"></i></div>
              <span>&nbsp;invoicing</span>
            </Link>
            :
            <Link to={`/hotel/invoicing`} onClick={e=>{setPath(window.location.pathname)}}>  
              <div><i className="fa-solid fa-receipt"></i></div>
              <span>&nbsp;invoicing</span>
            </Link>
          }
          </li>
      </nav>
      <main>
          <ClientRoutes/>
      </main>
      {/* <footer>
        Direction:<b>&nbsp;Avenue Basilio Vadillo #59</b>
      </footer> */}
    </div>
  )
}

export default Client
