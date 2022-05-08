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
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

//axios
import axios from 'axios'

//url base
import url_base from '../../../config/env'

//Modal
import ModalService from './ModalService';
import Alert_Dialog from '../../../components/Alert_Dialog'

let initialForm = {
  name:'',
  description:'',
  price:'',
  id:null
}

//informacion de urls
const url_1 = `${url_base}services/`
let config = {}

const Service = () => {
  //states
  const [form,setForm] = useState(initialForm)
  const [services,setServices] = useState([])

  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [serviceD, setServiceD] = useState(initialForm)
  const handleOpenD = () => setOpenD(true)
  const handleCloseD = () => setOpenD(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //loading state
  const [loader, setLoader] = useState('none')
  //action state
  const [action, setAction] = useState('Create')

  //alert
  const notify = (message) => toast.success(message)
  const notifyE = (message) => toast.error(message)

  const handleForm = async (e)=>{
    console.log(e.target.name)
    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }

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
        let data = await axios.get(url_1,config)
        if(data.status==='rejected'){
          if(data.reason.response.status===450){
              localStorage.removeItem('token');
              window.location.reload()
          }
        }

        setServices(data.data.data)  
        //esconder el loader
        setLoader('none')
      }catch(error){
        setLoader('none')
      }
    }

    getData()

  }, [])
  
  const getData = async () =>{
    let servicesF = await axios.get(url_1,config)
    setServices(servicesF.data.data)
  }


  const saveData = async (info) => {
    try{
      setLoader('flex')
      
      let data = null
      if(form.id===null){
        data = await axios.post(url_1,info,config)
        toast.success('Service created')
      }else{
        data = await axios.put(`${url_1}${form.id}`,info,config)
        toast.success('Service updated')
      }
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
    let [service] = services.filter(el => el.id === id)
    setForm(service)
  }

  //borrar registro
  const setDataToDelete = (id) =>{
    handleOpenD()
    let [service] = services.filter(el => el.id === id)
    setServiceD(service)

  }
  
  const deleteData = async (id) => {
    try{
      setLoader('flex')
      let data = await axios.delete(`${url_1}${serviceD.id}`,config)
      toast.success('Service deleted')
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

  return (
    <>
      {/* header */}
      <ToastContainer autoClose={2000}/>
      <Loader display={loader}/>
      <div style={{padding:'5px'}}>
        <span style={{fontSize:'20px'}}>Services</span>
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
              <TableCell>Service</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((s, index) => (
              <TableRow
                key={s.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                 {s.name}
                </TableCell>
                
                <TableCell>{s.price}</TableCell>
                <TableCell>{s.description}</TableCell>
                <TableCell style={{ margin: '5px' }}>
                  <IconButton aria-label="edit" size="small" onClick={(e) => editData(s.id)}>
                    <EditIcon size="small" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={(e) => setDataToDelete(s.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* modal */}
      <ModalService
        action={action}
        handleForm={handleForm}
        handleClose={handleClose}
        setLoader={setLoader}
        saveData={saveData}
        open={open}
        initialForm={form}
      />

       <Alert_Dialog
        openD={openD}
        handleCloseD={handleCloseD}
        name={`${serviceD.name}`}
        deleteData={deleteData}
        description={'¿Are you sure you want to delete the service '}
      />
    </>
  )
}

export default Service