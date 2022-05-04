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

//Modal
// import ModalCuts from './ModalCuts';
// import Alert_Dialog from '../../components/alert_dialog/Alert_Dialog'

const initialForm = {
  name:'',
  lastname:'',
  userid:'',
  user:'',
  pass:'',
  RoleId:'',
  id:null
}


const Employee = () => {
   //loading state
     //info form
  const [form,setForm] = useState(initialForm)

  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [cutD, setCutD] = useState(initialForm)
  const handleOpenD = () => setOpenD(true)
  const handleCloseD = () => setOpenD(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  //loading state
  const [loader, setLoader] = useState('none')
  //action state
  const [action, setAction] = useState('Create')


  return (
    <>
      {/* header */}
      <ToastContainer autoClose={2000}/>
      <Loader display={loader}/>
      <div style={{padding:'5px'}}>
        <span style={{fontSize:'20px'}}>Ejecutivos</span>
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
              <TableCell>User</TableCell>
              {/* <TableCell>Position</TableCell> */}
              <TableCell>Area</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {state.executives.map((ex, index) => (
              <TableRow
                key={ex.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {`${ex.name} ${ex.lastname}`}
                </TableCell>
                
                <TableCell>{ex.Area.name}</TableCell>
                <TableCell style={{ margin: '5px' }}>
                  <IconButton aria-label="edit" size="small" onClick={(e) => editData(ex.id)}>
                    <EditIcon size="small" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={(e) => setDataToDelete(ex.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* modal */}
            



    </>
  )
}

export default Employee