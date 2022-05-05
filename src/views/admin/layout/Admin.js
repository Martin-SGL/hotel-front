import './Admin.css'
import React,{useState,useRef,useEffect} from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SideBar from './SideBar';
import AdminRoutes from './AdminRoutes';



const Admin = ({user}) => {
    const refContainer = useRef()
    const refMenu = useRef()
    const refMain = useRef()
    const [menu, setMenu] = useState(true)

    const sesionClose = (e)=>{
        localStorage.removeItem('token');
        window.location.reload()
    }
    

    const handleResize = () => {
        if(window.innerWidth<900){
            refMain.current.style.width = '100vw'
            refMain.current.style.transform = 'translate(-300px)'
            refMenu.current.style.transform = 'translate(-300px)'
        }else{
            refMain.current.style.transform = 'translate(0px)'
            refMenu.current.style.transform = 'translate(0px)'
            setTimeout(e=>{refMain.current.style.width = 'calc(100vw - 300px)'},1000)
        }
    }

    window.addEventListener('resize', handleResize)

    const handleMenu = () =>{
        if(menu===true){
            refMain.current.style.width = '100vw'
            refMenu.current.style.transform = 'translate(-300px)'
            refMain.current.style.transform = 'translate(-300px)'
        }else{
            refMenu.current.style.transform = 'translate(0px)'
            refMain.current.style.transform = 'translate(0px)'
            setTimeout(e=>{refMain.current.style.width = 'calc(100vw - 300px)'},1000)            
        }
        setMenu(!menu)
    }

    return (
        <div ref={refContainer} className='container'>
            <nav ref={refMenu} className='sidemenu'>
                <SideBar role={user.rol}/>
            </nav>
            <div className='main-body' ref={refMain} >
                <div className='top-header'>
                    <div className='info-user'>
                        <MenuIcon onClick={handleMenu} style={{marginRight:'10px',cursor:'pointer'}}/> <span> Welcome: <b>{user.name.split(' ')[0].toUpperCase()} ({user.rol.toUpperCase()}) </b> </span>
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