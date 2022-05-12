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

let initialForm = {
  name:'',
  description:'',
  price:'',
  id:null
}

//informacion de urls
const url_1 = `${url_base}invoices/`
let config = {}

const Invoices = () => {
  //states
  const [invoices,setInvoices] = useState([])

  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  //loading state
  const [loader, setLoader] = useState('none')

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
        setInvoices(data.value.data.data)  
        //esconder el loader
        setLoader('none')
      }catch(error){
        setLoader('none')
      }
    }

    getData()

  }, [])
 
  return (
    <>
      {/* header */}
      <ToastContainer autoClose={2000}/>
      <Loader display={loader}/>
      <div style={{padding:'5px'}}>
        <span style={{fontSize:'20px'}}>Invoices</span>
      </div>

      {/* table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>No Reservation</TableCell>
              <TableCell>Client</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!invoices && invoices.map((i, index) => (
              <TableRow
                key={i.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                 {i.date.split('T')[0]}
                </TableCell>
                
                <TableCell>{i.Reservation.no_res}</TableCell>
                <TableCell>{`${i.Reservation.Client.name} ${i.Reservation.Client.lastname}`}</TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  )
}

export default Invoices