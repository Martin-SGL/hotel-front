import './Admin.css'
import React,{useState,useRef,useEffect} from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SideBar from './SideBar';
import AdminRoutes from './AdminRoutes';
import { Link } from 'react-router-dom' 

import HomeIcon from '@material-ui/icons/Home';



const Admin = ({user}) => {
    const [menu, setMenu] = useState(true)

    const sesionClose = (e)=>{
        localStorage.removeItem('token');
        window.location.reload()
    }
    

    return (
        <div  className='container'>
            <nav className='sidemenu'>
                <SideBar role={user.rol}/>
            </nav>
            <div className='main-body' >
                <div className='top-header'>
                    <div className='info-user'>
                        <Link to={'/'} style={{color:'black',textDecoration:'none'}}>
                            <HomeIcon  style={{marginRight:'10px',cursor:'pointer'}}/> 
                        </Link>
                        <span> Welcome: <b>{user.name.split(' ')[0].toUpperCase()} ({user.rol.toUpperCase()}) </b> </span>
                    </div>
                    <div className='user-icon-box'>
                        <AccountCircleIcon title="sign out" style={{cursor:'pointer'}} onClick={sesionClose}/>
                    </div>
                </div>
                <div className='main-section'>
                    
                    <AdminRoutes/>
                </div>
                {/* <footer>
                    Posada Real Hotel
                </footer> */}
            </div>
            
        </div>
    )
}

export default Admin