import './App.css';
import React,{useState,useEffect,createContext} from 'react'
import Login from './views/Login'
import {BrowserRouter as Router,Routes,Route,Navigate  } from 'react-router-dom'
import { ReactSession } from 'react-client-session'
import jwt_decode from "jwt-decode"
import Home from './views/home/Home';
import Admin from './views/admin/layout/Admin';
import ErrorURL from './views/ErrorURL'

function App() {
  ReactSession.setStoreType("localStorage");
  const [user, setUser] = useState({name:undefined,rol:undefined,token:undefined})

  useEffect(() => {
    const token = ReactSession.get('token')
    if(token){
      const infoSesion  = jwt_decode(ReactSession.get('token'));
      const {name,rol} = infoSesion.session;
      setUser({name,rol,token})
    }
  }, [])

  const setLoginParams = (e)=>{
    const token = ReactSession.get('token')
    if(token){
      const infoSesion  = jwt_decode(ReactSession.get('token'));
      const {name,rol} = infoSesion.session;
      console.log(token)
      setUser({name,rol,token})
    }
  }

  return (
    <Router>
      <Routes>
        <Route path='*' element={<ErrorURL/>} />
        <Route exact path="/" element={ <Home/> }/>
        <Route exact path="/login" element={user.token ? <Navigate  to='/admin/dashboard' /> : <Login login={setLoginParams}/> }/>
        {/* Reservation routes */}
        <Route exact path="/admin/*" element={user.token ? <Admin user={user} /> : <Navigate  to='/login' />}/>
      </Routes>
    </Router>
  ) 
}

export default App;
