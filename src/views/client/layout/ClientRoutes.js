import React,{useState,useEffect,createContext} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from '../home/Home'
import Room from '../rooms/Room'
import About from '../about/About'
import Reservation from '../reservation/Reservation'
import Invoicing from '../invoicing/Invoicing'

function AdminRoutes() {
  return (
    <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/rooms" element={<Room/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/reservation" element={<Reservation/>}/>
        <Route exact path="/invoicing" element={<Invoicing/>}/>
    </Routes>
  )
}

export default AdminRoutes;