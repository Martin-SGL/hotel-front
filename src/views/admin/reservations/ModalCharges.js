import React,{useState,useEffect} from 'react'
// import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

//validate
import validationsForm from "./validationSchema"
import { useFormik } from "formik"
import * as yup from "yup"

//axios
import axios from 'axios'

//url base
import url_base from '../../../config/env'

//alerts toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//alert
const notify = (message) => toast.success(message)
const notifyE = (message) => toast.error(message)

const url_1 = `${url_base}reservations/`


let initialFormCharge = {
    description:'',
    price:'',
    ReservationId:null
  }


  const ModalCharges = ({ handleClose,open,chargesToReservation,setLoader,config,handleReset}) => {
      const style = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          border: '2px solid #cecece',
          borderRadius: 10,
          boxShadow: '10px 5px 5px',
          p: 4,
        }
    
    // const [formCharges,setFormCharges] = useState(initialFormCharge)

    

    const saveData = async (chargesToReservation,values) =>{
        console.log(chargesToReservation)
        try{
          //mostar lodaer
          setLoader('flex')
          let res = await axios.post(`${url_1}charges/${chargesToReservation}`,values,config)
          if(res.status==='rejected'){
            if(res.reason.response.status===450){
                localStorage.removeItem('token');
                window.location.reload()
            }
          }
          toast.success('Charge registered')
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

    const validationSchema = yup.object(validationsForm)  

    const formik = useFormik({
        initialValues : initialFormCharge,
        enableReinitialize:true,
        onSubmit: (values,{resetForm}) =>{
            saveData(chargesToReservation,values)
            console.log(values)
            resetForm()
        },
        validationSchema: validationSchema
    })

    return (
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Charges
            </Typography>
            
            <form>
                <TextField 
                    id="description" 
                    name='description' 
                    label="Description" 
                    fullWidth  
                    margin="dense" 
                    variant="outlined" 
                    autoComplete='off' 
                    value={formik.values.description} 
                    onChange={formik.handleChange} 
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    onBlur = {formik.handleBlur}
                />
                 <TextField 
                    id="price" 
                    name='price' 
                    label="price" 
                    fullWidth  
                    margin="dense" 
                    variant="outlined" 
                    autoComplete='off' 
                    value={formik.values.price} 
                    onChange={formik.handleChange} 
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    onBlur = {formik.handleBlur}
                />
                <Grid>
                    <Fab onClick={formik.handleSubmit} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                        <SaveIcon />
                    </Fab>
                    <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                        <CancelIcon />
                    </Fab>
                </Grid>
            </form>

        </Box>
        </Modal>
    )
}

export default ModalCharges