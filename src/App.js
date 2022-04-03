import './App.css';
import React,{useState,useEffect,createContext} from 'react'
import Login from './components/Login';
import Home from './components/Admin/Home'
import {BrowserRouter as Router,Routes,Route,Navigate  } from 'react-router-dom'
import { ReactSession } from 'react-client-session'
import jwt_decode from "jwt-decode"

function App() {
  ReactSession.setStoreType("localStorage");
  const AuthorizationContext  = createContext();
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
      setUser({name,rol,token})
    }
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={user.token ? <Navigate  to='/' /> : <Login login={setLoginParams}/> }/>
        <Route exact path="/" element={user.token ? <Home user={user} /> : <Navigate  to='/login' />}/>
      </Routes>
    </Router>
  );
}

export default App;
