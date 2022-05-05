import React,{useState,useEffect,createContext} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Reservation from '../reservations/Reservation'
import Invoices from '../invoices/Invoices'
import Services from '../services/Services'
import Changes from '../changes/Changes'
import Charges from '../charges/Charges'
import Service from '../service/Service'
import Employee from '../employee/Employee'
import Room from '../room/Room'
import Amenitie from '../amenitie/Amenitie'


export const UserContext = React.createContext();

function AdminRoutes() {
    const [routes, setRoutes] = useState()
  return (
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/reservation" element={<Reservation/>}/>
          <Route exact path="/invoicing" element={<Invoices/>}/>
          <Route exact path="/services" element={<Reservation/>}/>
          <Route exact path="/changes" element={<Services/>}/>
          <Route exact path="/charges" element={<Changes/>}/>
          <Route exact path="/anomalies" element={<Charges/>}/>
          {/* rutas para catalogos */}
          <Route exact path="/employees-c" element={<Employee/>}/>
          <Route exact path="/rooms-c" element={<Room/>}/>
          <Route exact path="/services-c" element={<Service/>}/>
          <Route exact path="/amenities-c" element={<Amenitie/>}/>
      </Routes>
  )
}

export default AdminRoutes;
