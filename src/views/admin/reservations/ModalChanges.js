import React,{useState,useEffect} from 'react'
// import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

//table components
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';

//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'
import InfoIcon from '@material-ui/icons/Info';

//validate
import validationsForm from "./validationChangeSchema"
import { useFormik } from "formik"
import * as yup from "yup"

//alerts toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//axios
import axios from 'axios'
//url base
import url_base from '../../../config/env'

const url_1 = `${url_base}rooms/`
const url_2 = `${url_base}reservations/`

let initialForm = {
    room:'',
    reason:''
}

const ModalChanges = ({handleClose, open, changesToRoom,config,setLoader,handleReset}) => {

    const [rooms, setRooms] = useState([])

    //alert
    const notify = (message) => toast.success(message)
    const notifyE = (message) => toast.error(message)

    const saveData = async (values)=>{
        try{
            let form = {...values,reservationS:changesToRoom.reservation}
            //mostar lodaer
            setLoader('flex')
            let res = await axios.post(`${url_2}changes/${changesToRoom.room}`,form,config)
            if(res.status==='rejected'){
              if(res.reason.response.status===450){
                  localStorage.removeItem('token');
                  window.location.reload()
              }
            }
            toast.success('Chage registered')
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
        initialValues : initialForm,
        enableReinitialize:true,
        onSubmit: (values,{resetForm}) =>{
            saveData(values)
            resetForm()
        },
        validationSchema: validationSchema
    })

    useEffect(() => {
        const getData = async () =>{
          try{
            //pasar el token a config
            config.headers =  { Authorization: `Bearer ${localStorage.getItem('token')}` }
            //mostar lodaer
            setLoader('flex')
            let data = await axios.get(`${url_1}avaliable/${changesToRoom.room}`,config)
            if(!!data.data.data){
                setRooms(data.data.data)
            }
            //esconder el loader
            setLoader('none')
          }catch(error){
            setLoader('none')
          }
        }
    
        getData()
      }, [changesToRoom])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #cecece',
        borderRadius: 10,
        boxShadow: '10px 5px 5px',
        p: 4,
    }

    return (
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style} style={{paddin:'10px'}} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Changes
            </Typography>
            <Box style={{maxHeight:'450px',overflow:'auto',padding:'10px'}}>
                <form style={{marginTop:'20px'}}>
                <TextField 
                    id="reason" 
                    name='reason' 
                    label="Reason" 
                    fullWidth  
                    margin="dense" 
                    variant="outlined" 
                    autoComplete='off' 
                    value={formik.values.reason} 
                    onChange={formik.handleChange} 
                    error={formik.touched.reason && Boolean(formik.errors.reason)}
                    helperText={formik.touched.reason && formik.errors.reason}
                    onBlur = {formik.handleBlur}
                />
                <TextField 
                    select id="room" 
                    name='room' 
                    label="Room" 
                    fullWidth  
                    margin="dense" 
                    variant="outlined" 
                    value={formik.values.room} 
                    onChange={formik.handleChange} 
                    error={formik.touched.room && Boolean(formik.errors.room)}
                    helperText={formik.touched.room && formik.errors.room}
                    onBlur = {formik.handleBlur}
                >
                    {!!rooms && rooms.map((rm,index) => (
                        <MenuItem key={index} value={rm.id}>
                            {rm.name}
                        </MenuItem>
                    ))}
                </TextField>
                                        
                        
                    <Grid style={{marginBottom:'10px'}}>
                        <Fab onClick={formik.handleSubmit} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                            <SaveIcon />
                        </Fab>
                        <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                            <CancelIcon />
                        </Fab>
                    </Grid>
                </form>
            </Box>
            

        </Box>
        </Modal>
    )
}

export default ModalChanges