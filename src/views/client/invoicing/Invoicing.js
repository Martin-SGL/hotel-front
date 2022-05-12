import React,{useEffect,useState} from 'react'
import TextField from '@material-ui/core/TextField'

//axios
import axios from "axios";

//url base
import url_base from "../../../config/env";
//Loader
import Loader from "../../../assets/loader/Loader";

//alerts toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Icons
import Fab from '@material-ui/core/Fab'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import "./invoicing.css";

const Invoicing = () => {
  const [no_acc, setNo_acc] = useState('')
  const [loader, setLoader] = useState()

  //alert
  const notify = (message) => toast.success(message)
  const notifyE = (message) => toast.error(message)

  const saveData = async (info) => {
    try{
      if(no_acc===null || no_acc===''){
        toast.error('please write a number')
        return false
      }
      setLoader('flex')
      let data = await axios.get(`${url_base}invoices/${no_acc}`)
      if(data.data.data==='ok'){
        toast.success('Invoice created, please check you email')
        setLoader('none')
        setNo_acc('')
      }else{
        toast.error('reservation not found')
        setLoader('none')
      }
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
      
    }
  }

  return (
    <div className='invoicing-container'>
      <ToastContainer autoClose={2000}/>
      <Loader display={loader} />
      <div className='invoicing-body'>
        <h3 style={{textAling:'center'}}>Invoincing</h3>
        <h5>Please put your reservation number, then click on button and invoice will be sended by email</h5>
        <div className='invoicing-form'>
          <TextField
            fullWidth
            id="no_acc" 
            name='no_acc' 
            label="No Reservation"
            aria-label="minimum height"
            margin="dense"
            variant="outlined" 
            autoComplete='off'
            onChange={e=>setNo_acc(e.target.value)}
            value={no_acc}
          />
        
            <Fab onClick={e=>{saveData()}} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'10px',marginLeft:'10px'}}>
              <CheckCircleIcon  />
            </Fab>
        </div>
        

      </div>
      
    </div>
  )
}

export default Invoicing