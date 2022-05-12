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
import validationsForm from "./validationCheckOutChema"
import { useFormik } from "formik"
import * as yup from "yup"

//alerts toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//axios
import axios from 'axios'
//url base
import url_base from '../../../config/env'

const url_1 = `${url_base}reservations/`


let initialForm = {
    card_number:'',
    exp_date:'',
    ccv:'',
}

const ModalCheckOut = ({handleClose, open, checkOut,config,setLoader,handleReset,reservations}) => {

    const [reservation, setReservation] = useState(null)
    const [total, setTotal] = useState(0)

    //alert
    const notify = (message) => toast.success(message)
    const notifyE = (message) => toast.error(message)

    const saveData = async (values)=>{
        try{
            let form = {...values,reservationS:checkOut}
            //mostar lodaer
            setLoader('flex')
            let res = await axios.post(`${url_1}checkout/${checkOut}`,form,config)
            if(res.status==='rejected'){
              if(res.reason.response.status===450){
                  localStorage.removeItem('token');
                  window.location.reload()
              }
            }
            toast.success('Check out done')
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

            if(new Date(values.exp_date) < new Date()) {
                return toast.error('Invalid expiration date')
              }else{
                  saveData(values)
                  resetForm()
              }
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
            let data = await axios.get(`${url_1}${checkOut}`,config)
            if(!!data.data.data){
                setReservation(data.data.data)
                let total = 0
                data.data.data.Services.forEach((ser) => {
                    total = total + ser.ReservationServices.amount * ser.price
                })
                data.data.data.Charges.forEach((ser) => {
                    total = total + ser.price
                })
                setTotal(total)
            }
            //esconder el loader
            setLoader('none')
          }catch(error){
            setLoader('none')
          }
        }
    
        getData()
      }, [checkOut,reservations])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
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
                Check out
            </Typography>
            <Box style={{maxHeight:'450px',overflow:'auto',padding:'10px'}}>
                <form style={{marginTop:'20px'}}>
                    {!!reservation &&
                    <>
                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
                            <div>
                                <h4 style={{marginBottom:'10px'}}>Reservation</h4>
                                <li>Initial date: <b>{reservation.init_date.split('T')[0]}</b></li>
                                <li>Final date: <b>{reservation.final_date.split('T')[0]}</b></li>
                                <li>Number of guest: <b>{reservation.number_guests}</b></li>
                            </div>
                            <div>
                                <h4 style={{marginBottom:'10px'}}>Payments</h4>
                                <li>Card number: <b>{reservation.Payments[0].card_number}</b></li>
                                <li>Reference: <b>{reservation.Payments[0].reference}</b></li>
                                <li>Concept: <b>{reservation.Payments[0].Paymentdetails[0].concept}</b></li>
                                <li>Cateogry room: <b>{reservation.Payments[0].Paymentdetails[0].detail}</b></li>
                                <li>Amount: <b>{reservation.Payments[0].Paymentdetails[0].amount}</b></li>
                                <li>Total: <b>&nbsp;{reservation.Payments[0].total}</b></li>
                            </div>
                        </div>
                        <hr style={{marginTop:'10px'}}/>
                        <h4 style={{marginBottom:'10px',marginTop:'10px'}}>Pending to pay</h4>
                        <div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{backgroundColor:'#cecece'}} colSpan={5}>Services</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>name</TableCell>
                                            <TableCell>price</TableCell>
                                            <TableCell>amount</TableCell>
                                            <TableCell>total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {reservation.Services.map((ser,index)=>(
                                            <TableRow key={ser.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{index +1 }</TableCell>
                                                <TableCell>{ser.name}</TableCell>
                                                <TableCell>{ser.price}</TableCell>
                                                <TableCell>{ser.ReservationServices.amount}</TableCell>
                                                <TableCell>$ {ser.ReservationServices.amount * ser.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TableContainer component={Paper} style={{marginTop:'10px'}}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{backgroundColor:'#cecece'}} colSpan={3}>Charges</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>description</TableCell>
                                            <TableCell>price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {reservation.Charges.map((char,index)=>(
                                            <TableRow key={char.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{index +1 }</TableCell>
                                                <TableCell>{char.description}</TableCell>
                                                <TableCell style={{width:'125px'}}>$ {char.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div style={{padding:'40px',float:'right'}}>Total: $<b>{total}</b></div>                         
                        </div>
                    </>
                    }
                    <Grid container spacing={1} >
                        <Grid item md={6} sm={12} xs={12}>
                            <TextField
                                fullWidth
                                id="card_number" 
                                name='card_number' 
                                label="Card Number"
                                aria-label="minimum height"
                                margin="dense"
                                variant="outlined" 
                                autoComplete='off' 
                                value={formik.values.card_number} 
                                onChange={formik.handleChange} 
                                error={formik.touched.card_number && Boolean(formik.errors.card_number)}
                                helperText={formik.touched.card_number && formik.errors.card_number}
                                onBlur = {formik.handleBlur}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={6}>
                            <TextField
                                fullWidth
                                type='month'
                                id="exp_date" 
                                name='exp_date' 
                                label="Exp date"
                                aria-label="minimum height"
                                margin="dense"
                                variant="outlined" 
                                autoComplete='off' 
                                value={formik.values.exp_date} 
                                onChange={formik.handleChange} 
                                error={formik.touched.exp_date && Boolean(formik.errors.exp_date)}
                                helperText={formik.touched.exp_date && formik.errors.exp_date}
                                onBlur = {formik.handleBlur}
                            />
                        </Grid>
                        <Grid item md={3} sm={6} xs={6}>
                            <TextField
                                fullWidth
                                type="password"
                                id="ccv" 
                                name='ccv' 
                                label="CCV"
                                aria-label="minimum height"
                                margin="dense"
                                variant="outlined" 
                                autoComplete='off' 
                                value={formik.values.ccv} 
                                onChange={formik.handleChange} 
                                error={formik.touched.ccv && Boolean(formik.errors.ccv)}
                                helperText={formik.touched.ccv && formik.errors.ccv}
                                onBlur = {formik.handleBlur}
                            />
                        </Grid>
                    </Grid>                       
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

export default ModalCheckOut