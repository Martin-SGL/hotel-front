import './App.css';
import React,{useState,useEffect} from 'react'
import Login from './views/Login'
import {BrowserRouter as Router,Routes,Route,Navigate  } from 'react-router-dom'
import jwt_decode from "jwt-decode"
import Client from './views/client/layout/Client';
import Admin from './views/admin/layout/Admin';
import ErrorURL from './views/ErrorURL'

function App() {
  const [user, setUser] = useState({name:undefined,rol:undefined,token:undefined})

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const infoSesion  = jwt_decode(localStorage.getItem('token'));
      const {name,rol} = infoSesion.session;
      setUser({name,rol,token})
    }
  }, [])

  const setLoginParams = (e)=>{
    const token = localStorage.getItem('token')
    if(token){
      const infoSesion  = jwt_decode(localStorage.getItem('token'));
      const {name,rol} = infoSesion.session;
      setUser({name,rol,token})
    }
  }

  return (
    <Router>
      <Routes>
        <Route path='*' element={<ErrorURL/>} />
        <Route exact path="/login" element={user.token ? <Navigate  to='/admin/dashboard' /> : <Login login={setLoginParams}/> }/>
        {/* admin routes */}
        <Route exact path="/admin/*" element={user.token ? <Admin user={user} /> : <Navigate  to='/login' />}/>
        {/* client routes */}
        <Route exact path="/" element={<Navigate  to='/hotel/home' />} />
        <Route exact path="/hotel/*" element={ <Client/> }/>
      </Routes>
    </Router>
  ) 
}

export default App;
