import React,{useState,useEffect,useContext} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'


//alerts toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Loader
import Loader from '../../../assets/loader/Loader'

//icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import RoomServiceIcon from '@material-ui/icons/RoomService';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import MenuBookIcon from '@material-ui/icons/MenuBook';

//axios
import axios from 'axios'

//url base
import url_base from '../../../config/env'

//Modal
import ModalReservation from './ModalReservation'
import ModalCharges from './ModalCharges'
import ModalCheckIn from './ModalCheckIn'
import ModalServices from './ModalServices'
import ModalChanges from './ModalChanges'
import ModalCheckOut from './ModalCheckOut'
import Alert_Dialog from '../../../components/Alert_Dialog'
import { ContactSupportOutlined } from '@material-ui/icons'

import formatDate from '../../../helpers/formatDate'

let initialForm = {
  name:'',
  lastname:'',
  email:'',
  pass:'',
  RoleId:'',
  id:null
}



//informacion de urls
const url_1 = `${url_base}reservations/`
const url_2 = `${url_base}services/`


let config = {}

const Reservation = () => {
  //states
  //form reservaion
  const [form,setForm] = useState(initialForm)
  const handleForm = async (e)=>{
    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }
  //form check in
  const [reservations,setReservations] = useState([])
  const [checkInReservation,setCheckInReservation] = useState([])
  const [formServices, setFormServices] = useState({})
  const [servicesToReservation, setServicesToReservation] = useState(null)
  const [totalServices, setTotalServices] = useState(0)
  const [chargesToReservation,setChargesToReservation] = useState(null)
  const [changesToRoom,setChangesToRoom] = useState({room:1,reservation:1})
  const [checkOut,setCheckOut] = useState(1)

  let totalC = 0
  let totalF = [] 

  const handleFormServices = (e) =>{
    let price = e.target.id.split('-')[0]
    let id ='price-'+e.target.id.split('-')[1]
    setFormServices(
      {...formServices,[e.target.name]:e.target.value,[id]:price}
      )
  }

  useEffect(() => {
    console.log(formServices)
    let amount = 0
    let price = 0
    let i = 0
    let total_get = 0
    for (const key in formServices) {
      if(i===0){
        price = formServices[key]
        i++
      }else{
        amount = formServices[key]
        total_get = total_get + (amount*price)
        i=0
      } 
    }
    setTotalServices(total_get)
  }, [formServices])

  //modal state vars
  //reservation
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //check in
  const [openCheckIn, setOpenCheckIn] = useState(false)
  const handleOpenCheckIn = () => setOpenCheckIn(true)
  const handleCloseCheckIn = () => setOpenCheckIn(false)
  //services
  const [openS, setOpenS] = useState(false)
  const handleOpenS = () => setOpenS(true)
  const handleCloseS = () => setOpenS(false)
  //charges
  const [openChar, setOpenChar] = useState(false)
  const handleOpenChar = () => setOpenChar(true)
  const handleCloseChar = () => setOpenChar(false)
  //changes
  const [openChag, setOpenChag] = useState(false)
  const handleOpenChag = () => setOpenChag(true)
  const handleCloseChag = () => setOpenChag(false)
  //changes
  const [openCheckOut, setOpenCheckOut] = useState(false)
  const handleOpenCheckOut = () => setOpenCheckOut(true)
  const handleCloseCheckOut = () => setOpenCheckOut(false)

  
  //loading state
  const [loader, setLoader] = useState('none')
  //action state
  const [action, setAction] = useState('Create')

  //alert
  const notify = (message) => toast.success(message)
  const notifyE = (message) => toast.error(message)

  //resetear parametros
  const handleReset = ()=>{
    handleClose()
    handleCloseCheckIn()
    handleCloseS()
    handleCloseChar()
    handleCloseChag()
    handleCloseCheckOut()
    setForm(initialForm) //formulario para modificar
    setFormServices({}) // formulario de services
    setTotalServices(0) //total de services a 0
    setChargesToReservation(null)
    setChangesToRoom(null)
    setCheckOut(1)
    setAction('Create')
    setLoader('none')
    getData()
  }
  
  useEffect(() => {
    const getData = async () =>{
      try{
        //pasar el token a config
        config.headers =  { Authorization: `Bearer ${localStorage.getItem('token')}` }
        //mostar lodaer
        setLoader('flex')
        let [data] = await Promise.allSettled([axios.get(url_1,config)])
        if(data.status==='rejected'){
          if(data.reason.response.status===450){
              localStorage.removeItem('token');
              window.location.reload()
          }
        }
        setReservations(data.value.data.data)
        //esconder el loader
        setLoader('none')
      }catch(error){
        setLoader('none')
      }
    }

    getData()

  }, [])
  
  const getData = async () =>{
    let reservationF = await axios.get(url_1,config)
    setReservations(reservationF.data.data)
  }


  const saveData = async (info) => {
    try{
      setLoader('flex')
      let data = await axios.post(url_1,info,config)
      toast.success('Reservation created')
      if(data.status==='rejected'){
        if(data.reason.response.status===450){
          localStorage.removeItem('token');
          window.location.reload()
        }
      }
      handleReset()
    }catch(error){
      if(error.response.status!==200){
        if(error.response.status===400){
          toast.error('Server error')
        }else if(error.response.status===403){
           toast.error('Validation error')
        }else if(error.response.status===404){
          toast.error('Not found register or url')
       }
      }
      handleReset()
    }
  }

  const setCheckIn = async (id,date) =>{
    let year = date.slice(0,4),
    month  = date.slice(5,7),
    day = date.slice(8,10);
    
    let formatDate_2 =  year+'/'+month+'/'+day
    let initial_date = new Date(formatDate_2)
    let today = new Date()

    if(initial_date > today){
      toast.error("Initial date is after today, you can't  check in")
    }else{
      setCheckInReservation(id)
      handleOpenCheckIn()
    }
  }

  const saveCheckIn = async () =>{
    try {
      setLoader('flex')
      let data = await axios.get(`${url_1}checkin/${checkInReservation}`,config)
      toast.success('Check in done')
      if(data.status==='rejected'){
        if(data.reason.response.status===450){
          localStorage.removeItem('token');
          window.location.reload()
        }
      }
      handleReset()
    } catch (error) {
      if(error.response.status!==200){
        if(error.response.status===400){
          toast.error('Server error')
        }else if(error.response.status===403){
           toast.error('Validation error')
        }else if(error.response.status===404){
          toast.error('Not found register or url')
       }
      }
      handleReset()
    }
  }

  const setServices = async (id) =>{
    setServicesToReservation(id)
    handleOpenS()
  }

  const saveDataServices = async () =>{
    try{
      //mostar lodaer
      setLoader('flex')
      let res = await axios.post(`${url_1}services/${servicesToReservation}`,formServices,config)
      if(res.status==='rejected'){
        if(res.reason.response.status===450){
            localStorage.removeItem('token');
            window.location.reload()
        }
      }
      toast.success('Services registered')
      //esconder el loader
      handleReset()
    }catch(error){
      if(error.response.status!==200){
        if(error.response.status===400){
          toast.error('Server error')
        }else if(error.response.status===403){
           toast.error('Validation error')
        }else if(error.response.status===404){
          toast.error('Not found register or url')
       }
      }
      handleReset()
    }
  }
  const setDataChar = async (id) =>{
    setChargesToReservation(id)
    handleOpenChar()
  }

  const setDataChang = async (room,reservation)=>{
    setChangesToRoom(
      {room,reservation}
    )
    handleOpenChag()
  }

  const setCheckOutToReservation = (id) =>{
    setCheckOut(id)
    handleOpenCheckOut()

  }

  return (
    <>
      {/* header */}
      <ToastContainer autoClose={2000}/>
      <Loader display={loader}/>
      <div style={{marginBottom:'10px'}}>
        <span style={{fontSize:'20px'}}>Reservations</span>
        {/* <Fab color="primary" aria-label="add" size="small" onClick={()=>{handleOpen();setAction('Create');setForm(initialForm)}} style={{float:'right',marginBottom:'20px'}}>
          <AddIcon /> 
        </Fab>*/}
      </div>

      {/* table */}
      <Box style={{width:'100%'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Reservation</TableCell>
                <TableCell>Rooms</TableCell>
                <TableCell style={{textAlign:"center"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations!==null && reservations.map((rs, index) => (
                <TableRow
                  key={rs.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    <li style={{textTransform:'capitalize'}}>{rs.Client.name} {rs.Client.lastname}</li>
                    <li>{rs.Client.email}</li>
                    <li>{rs.Client.phone}</li>
                  </TableCell>
                  <TableCell>
                    <li>No: <b>{rs.no_res}</b></li>
                    <li>Inital: <b>{rs.init_date.slice(0, 10)}</b></li>
                    <li>Final: <b>{rs.final_date.slice(0, 10)}</b></li>
                    {rs.Categories.map( cat => (
                      <li key={cat.id} style={{textTransform:'capitalize'}}>{cat.name}: <b>{cat.ReservationCategories.amount}</b></li>
                    ))}
                    <li>Total $: <b>{rs.Payments[0].total}</b></li>
                    <li>Status: <b>{rs.status}</b></li>
                  </TableCell>
                  <TableCell>
                    {rs.status !== 'reservated'
                        ?
                        rs.Rooms.map(r =>(
                          <li key={r.id}>
                            {r.name}
                              {rs.status === 'occupated'  
                              && <IconButton onClick={e=>{setDataChang(r.id,rs.id)}} title="changes" aria-label="edit" size="small" style={{color:'green'}}>
                                  <TrendingFlatIcon size="small" />
                                </IconButton>
                              } 
                          </li>
                        ))
                        :
                        "Check In First"
                    }
                  </TableCell>
                  <TableCell style={{ margin: '5px',textAlign:"center" }}>
                    {rs.status === 'reservated' 
                      && <IconButton onClick={(e)=>setCheckIn(rs.id,rs.init_date)} title="Check in" aria-label="edit" size="small" style={{color:'green'}}>
                          <CheckCircleIcon size="small" />
                        </IconButton>
                    }
                  {rs.status === 'occupated'  
                    &&<IconButton onClick={e=>{setServices(rs.id);setFormServices({})}} title="services" aria-label="edit" size="small" style={{color:'green'}}>
                        <RoomServiceIcon size="small" />
                      </IconButton>
                    }
                    {rs.status === 'occupated'  
                    && <IconButton onClick={e=>{setDataChar(rs.id)}} title="charges" aria-label="edit" size="small" style={{color:'green'}}>
                        <MoneyOffIcon size="small" />
                      </IconButton>
                    }
                    {rs.status === 'occupated'  
                    &&  <IconButton onClick={e=>{setCheckOutToReservation(rs.id)}}title="check out" aria-label="edit" size="small"  style={{color:'red'}}>
                          <CheckCircleIcon size="small" />
                        </IconButton>
                    }
                  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      
      {/* Modal check in*/}
      <ModalCheckIn
        handleClose={handleCloseCheckIn}
        saveCheckIn={saveCheckIn}
        open={openCheckIn}
      />
      {/* modal servies */}
      <ModalServices
        handleFormServices={handleFormServices}
        handleClose={handleCloseS}
        setLoader={setLoader}
        saveDataServices={saveDataServices}
        open={openS}
        totalServices={totalServices}
        url_1={url_1}
      />
      {/* Modal Charges */}
        <ModalCharges
        handleClose={handleCloseChar}
        open={openChar}
        chargesToReservation={chargesToReservation}
        config={config}
        setLoader={setLoader}
        handleReset={handleReset}
      />
      {/* Modal Changes */}
      <ModalChanges
        handleClose={handleCloseChag}
        open={openChag}
        changesToRoom={changesToRoom}
        config={config}
        setLoader={setLoader}
        handleReset={handleReset}
      />

      {/* Modal Checkout */}
      <ModalCheckOut
        handleClose={handleCloseCheckOut}
        open={openCheckOut}
        checkOut={checkOut}
        config={config}
        setLoader={setLoader}
        handleReset={handleReset}
        reservations={reservations}
      />


       {/* <Alert_Dialog
        openD={openD}
        handleCloseD={handleCloseD}
        name={`${employeeD.name} ${employeeD.lastname}`}
        description={'¿Are you sure you want to delete '}
      /> */}
    </>

  )
}

export default Reservation