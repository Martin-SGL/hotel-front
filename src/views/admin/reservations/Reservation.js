import React,{useState,useEffect,useContext} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
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
import { getDefaultNormalizer } from '@testing-library/react'

//Modal
import ModalReservation from './ModalReservation'
import ModalCheckIn from './ModalCheckIn'
import Alert_Dialog from '../../../components/Alert_Dialog'

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
const url_2 = `${url_base}rooms/`
// const url_2 = `${url_base}roles/`

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
  const [formCheckIn,setFormCheckIn] = useState([])
  const handleFormCheckIn = async (e)=>{
    setForm([
      ...formCheckIn,e.target.value
    ])
  }

  const saveCheckIn = async () => {
    console.log(formCheckIn)
  } 
  const [reservations,setReservations] = useState([])
  const [rooms,setRooms] = useState([])
  // const [roles,setRoles] = useState([])

  //modal state vars
  //add reservation
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //check in
  const [openCheckIn, setOpenCheckIn] = useState(false)
  const handleOpenCheckIn = () => setOpenCheckIn(true)
  const handleCloseCheckIn = () => setOpenCheckIn(false)
  //deleted
  const [openD, setOpenD] = useState(false)
  const [employeeD, setEmployeeD] = useState(initialForm)
  const handleOpenD = () => setOpenD(true)
  const handleCloseD = () => setOpenD(false)
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
    handleCloseD()
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
        let [data,dataRoom] = await Promise.allSettled([axios.get(url_1,config), axios.get(url_2,config)])
        if(data.status==='rejected'){
          if(data.reason.response.status===450){
              localStorage.removeItem('token');
              window.location.reload()
          }
        }
        setReservations(data.value.data.data)
        setRooms(dataRoom.value.data.data)
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
      toast.success('Employee created')
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

  //abrir el modal 
  const editData = (id) =>{
    setAction('Update')
    handleOpen()
    let [reservation] = reservations.filter(el => el.id === id)
    setForm(reservation)
  }

  //borrar registro
  const setDataToDelete = (id) =>{
    handleOpenD()
    let [reservation] = reservations.filter(el => el.id === id)
    setEmployeeD(reservation)

  }
  
  const deleteData = async (id) => {
    // try{
    //   setLoader('flex')
    //   let reservationsF = await axios.delete(`${url_1}${employeeD.id}`,config)
    //   toast.success('Employee deleted')
    //   handleReset()
    // }catch(error){
    //   if(error.response.status!==200){
    //     if(error.response.status===400){
    //       toast.error('Server error')
    //     }else if(error.response.status===403){
    //        toast.error('Validation error')
    //     }else if(error.response.status===404){
    //       toast.error('Not found register or url')
    //    }
    // //   }
    //   handleReset()
    // }
  }

  return (
    <>
      {/* header */}
      <ToastContainer autoClose={2000}/>
      <Loader display={loader}/>
      <div style={{padding:'5px'}}>
        <span style={{fontSize:'20px'}}>Reservations</span>
        <Fab color="primary" aria-label="add" size="small" onClick={()=>{handleOpen();setAction('Create');setForm(initialForm)}} style={{float:'right',marginBottom:'20px'}}>
          <AddIcon />
        </Fab>
      </div>

      {/* table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Reservation</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!reservations && reservations.map((rs, index) => (
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
                  <li>No: {rs.no_res}</li>
                  <li>Inital: {rs.init_date.slice(0, 10)}</li>
                  <li>Final: {rs.final_date.slice(0, 10)}</li>
                  <li>Status: {rs.status}</li>
                </TableCell>
                <TableCell style={{ margin: '5px' }}>
                  <IconButton onClick={(e)=>saveCheckIn(rs.id)} title="Check in" aria-label="edit" size="small" >
                    <CheckCircleIcon size="small" />
                  </IconButton>
                  <IconButton title="services" aria-label="edit" size="small" onClick={(e) => editData(rs.id)}>
                    <RoomServiceIcon size="small" />
                  </IconButton>
                  <IconButton title="restaurant" aria-label="edit" size="small" onClick={(e) => editData(rs.id)}>
                    <MenuBookIcon size="small" />
                  </IconButton>
                  <IconButton title="charges" aria-label="edit" size="small" onClick={(e) => editData(rs.id)}>
                    <MoneyOffIcon size="small" />
                  </IconButton>
                  <IconButton title="changes" aria-label="edit" size="small" onClick={(e) => editData(rs.id)}>
                    <TrendingFlatIcon size="small" />
                  </IconButton>
                  <IconButton title="check out" aria-label="edit" size="small" onClick={(e) => editData(rs.id)}>
                    <CheckCircleIcon size="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* modal */}
      {/* <ModalReservation
        action={action}
        handleForm={handleForm}
        handleClose={handleClose}
        setLoader={setLoader}
        saveData={saveData}
        open={open}
        initialForm={form}
      /> */}
{/* 
      <ModalCheckIn
        handleForm={handleFormCheckIn}
        handleClose={handleCloseCheckIn}
        setLoader={setLoader}
        saveData={saveCheckIn}
        open={openCheckIn}
        initialForm={formCheckIn}
        rooms={rooms}
      /> */}

       <Alert_Dialog
        openD={openD}
        handleCloseD={handleCloseD}
        name={`${employeeD.name} ${employeeD.lastname}`}
        deleteData={deleteData}
        description={'¿Are you sure you want to delete '}
      />
    </>

  )
}

export default Reservation