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
import { getDefaultNormalizer } from '@testing-library/react'

//Modal
import ModalEmployee from './ModalEmployee'
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
const url_1 = `${url_base}employees/`
const url_2 = `${url_base}roles/`

let config = {}

const Employee = () => {
  //states
  const [form,setForm] = useState(initialForm)
  const [employees,setEmployees] = useState([])
  const [roles,setRoles] = useState([])

  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [employeeD, setEmployeeD] = useState(initialForm)
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
        let [data,dataRoles] = await Promise.allSettled([axios.get(url_1,config),axios.get(url_2,config)])
        if(data.status==='rejected'){
          if(data.reason.response.status===450){
              localStorage.removeItem('token');
              window.location.reload()
          }
        }

        setEmployees(data.value.data.data)  
        setRoles(dataRoles.value.data.data)
        //esconder el loader
        setLoader('none')
      }catch(error){
        setLoader('none')
      }
    }

    getData()

  }, [])
  
  const getData = async () =>{
    let employeesF = await axios.get(url_1,config)
    setEmployees(employeesF.data.data)
  }


  const saveData = async (info) => {
    try{
      setLoader('flex')
      let data = null
      if(form.id===null){
        data = await axios.post(url_1,info,config)
        toast.success('Employee created')
      }else{
        data = await axios.put(`${url_1}${form.id}`,info,config)
        toast.success('Employee updated')
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
    let [employee] = employees.filter(el => el.id === id)
    setForm(employee)
  }

  //borrar registro
  const setDataToDelete = (id) =>{
    handleOpenD()
    let [employee] = employees.filter(el => el.id === id)
    setEmployeeD(employee)

  }
  
  const deleteData = async (id) => {
    try{
      setLoader('flex')
      let data = await axios.delete(`${url_1}${employeeD.id}`,config)
      toast.success('Employee deleted')
      handleReset()
    }catch(error){
      if(error.response.status!==200){
        if(error.response.status===400){
          if(error.response.data.message.includes('SequelizeUniqueConstraintError')){
            toast.error('invalid email')
          }else{
            toast.error('Server error')
          }
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
        <span style={{fontSize:'20px'}}>Employees</span>
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
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((em, index) => (
              <TableRow
                key={em.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {`${em.name} ${em.lastname}`}
                </TableCell>
                
                <TableCell>{em.email}</TableCell>
                <TableCell style={{ margin: '5px' }}>
                  <IconButton aria-label="edit" size="small" onClick={(e) => editData(em.id)}>
                    <EditIcon size="small" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={(e) => setDataToDelete(em.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* modal */}
      <ModalEmployee
        action={action}
        handleForm={handleForm}
        handleClose={handleClose}
        setLoader={setLoader}
        saveData={saveData}
        open={open}
        roles={roles}
        initialForm={form}
      />

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

export default Employee