import "./reservation.css";
import React,{useState,useEffect} from 'react'
// import Input from '@material-ui/core/Input'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

//validate
import validationsForm from "./validationSchema"
import { useFormik } from "formik"
import * as yup from "yup"

//axios
import axios from "axios";

//url base
import url_base from "../../../config/env";
//Loader
import Loader from "../../../assets/loader/Loader";

//alerts toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import formatDate from '../../../helpers/formatDate'

const Reservation = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #cecece',
    borderRadius: 10,
    boxShadow: '10px 5px 5px',
    p: 4,
}

let initialForm = {
  init_date: '',
  final_date:'',
  number_guests:'',
  name:'',
  lastname:'',
  email:'',
  phone:'',
  card_number:'',
  ccv:'',
  exp_date:'',
  total:'',
  simple:0,
  junior:0,
  suite:0,
}

const [open, setOpen] = useState(false)
const [error, setError] = useState(null)
const [data, setData] = useState(initialForm)
const [categories, setCategories] = useState()
const [loader, setLoader] = useState()
const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)


//alert
const notify = (message) => toast.success(message)
const notifyE = (message) => toast.error(message)

useEffect(() => {
  const getData = async () => {
    try {
      setLoader("flex");
      let cat = await axios.get(`${url_base}categories`);
      setCategories(cat.data.data);
      setLoader("none");
    } catch (error) {
      console.log(error.response);
      setLoader("none");
    }
  };
  getData();
}, [])

const saveData = async (reset) => {
  try{
    setLoader('flex')
    let reservationC = await axios.post(`${url_base}reservations`,data)
    toast.success('Reservation created, please check you email')
    setLoader("none")
    handleClose()
    setData(initialForm) 
    reset()
    
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
    setLoader("none");
  }
}

const validationSchema = yup.object(validationsForm)

const formik = useFormik({
    initialValues : initialForm,
    enableReinitialize:true,
    onSubmit: (values,{resetForm}) =>{
        // saveData(values)
        let valuesForm = values
        let init = formatDate(values.init_date)
        let final = formatDate(values.final_date)

        let days = (final - init)/(1000*60*60*24)

        let price_simple = categories[0].price
        let price_junior = categories[1].price
        let price_suite = categories[2].price

        let max_simple = categories[0].max
        let max_junior = categories[1].max
        let max_suite = categories[2].max

        let exp_date = new Date(values.exp_date)

        if(init < new Date()) {
          setError('Invalid initial date')
          return toast.error(error)
        }
        if(final < new Date()){
          setError('Invalid final date')
          return toast.error(error)
        }
        if(init.getDate() > final.getDate()) {
          setError('Initial date must be first')
          return toast.error(error)
        } 

        if(init.getDate() === final.getDate()) {
          setError('Initial date and final date must be different')
          return toast.error(error)
        } 
        if(exp_date < new Date()) {
          setError('Invalid expiration date')
          return toast.error(error)
        }
        if(values.simple===0 && values.junior===0 && values.suite===0){
          setError('At least it has to be one room')
          return toast.error(error)
          
        } 
        if(values.number_guests > (values.simple*max_simple + values.junior*max_junior + values.suite * max_suite)){
          setError('Invalid number of guests')
          return toast.error(error)
        } 

        let total = (values.simple * price_simple + values.junior * price_junior + values.suite* price_suite) * days

        let structureReservation = {
          init_date: values.init_date,
          final_date: values.final_date,
          number_guests: values.number_guests,
          name: values.name,
          lastname: values.lastname,
          email:values.email,
          phone:values.phone,
          card_number:values.card_number,
          total,
          simple:values.simple,
          junior:values.junior,
          suite:values.suite,
          categories:{
            "1": parseInt(values.simple),
            "2": parseInt(values.junior),
            "3": parseInt(values.suite)
          }
        }

        setData(structureReservation)
        handleOpen()
        
    },
    validationSchema: validationSchema
})


  return (
    <div className='container-reservation'>
      <ToastContainer autoClose={2000}/>
      <Loader display={loader} />
      <div className="title-reservation">Choose your Stay</div>
      <div className="body-reservation">
        <form>
        <Grid container spacing={1} >
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              type="date"
              id="init_date"
              name="init_date"
              label="Initial date"
              InputLabelProps={{ shrink: true, required: true }}
              value={formik.values.init_date} 
              onChange={formik.handleChange} 
              error={formik.touched.init_date && Boolean(formik.errors.init_date)}
              helperText={formik.touched.init_date && formik.errors.init_date}
              onBlur = {formik.handleBlur}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              type="date"
              id="final_date"
              name="final_date"
              label="Final date"
              InputLabelProps={{ shrink: true, required: true }}
              value={formik.values.final_date} 
              onChange={formik.handleChange} 
              error={formik.touched.final_date && Boolean(formik.errors.final_date)}
              helperText={formik.touched.final_date && formik.errors.final_date}
              onBlur = {formik.handleBlur}
            />
          </Grid>
          <Grid item md={12} style={{marginTop:'10px',marginBottom:'10px'}}>
            Choose number of room per category
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
                  fullWidth
                  type="number"
                  id="simple" 
                  name='simple' 
                  label="Simple"
                  aria-label="minimum height"
                  margin="dense" 
                  variant="outlined" 
                  autoComplete='off' 
                  value={formik.values.simple} 
                  onChange={formik.handleChange} 
                  error={formik.touched.simple && Boolean(formik.errors.simple)}
                  helperText={formik.touched.simple && formik.errors.simple}
                  onBlur = {formik.handleBlur}
              />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
                  fullWidth
                  type="number"
                  id="junior" 
                  name='junior' 
                  label="Junior"
                  aria-label="minimum height"
                  margin="dense" 
                  variant="outlined" 
                  autoComplete='off' 
                  value={formik.values.junior} 
                  onChange={formik.handleChange} 
                  error={formik.touched.junior && Boolean(formik.errors.junior)}
                  helperText={formik.touched.junior && formik.errors.junior}
                  onBlur = {formik.handleBlur}
                  onInput = {formik.calculateData}
              />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
                  fullWidth
                  type="number"
                  id="suite" 
                  name='suite' 
                  label="Suite"
                  aria-label="minimum height"
                  margin="dense" 
                  variant="outlined" 
                  autoComplete='off' 
                  value={formik.values.suite} 
                  onChange={formik.handleChange} 
                  error={formik.touched.suite && Boolean(formik.errors.suite)}
                  helperText={formik.touched.suite && formik.errors.suite}
                  onBlur = {formik.handleBlur}
                  onInput = {formik.calculateData}
              />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
                  fullWidth
                  type="number"
                  id="number_guests" 
                  name='number_guests' 
                  label="Total of guest"
                  aria-label="minimum height"
                  margin="dense" 
                  variant="outlined" 
                  autoComplete='off' 
                  value={formik.values.number_guests} 
                  onChange={formik.handleChange} 
                  error={formik.touched.number_guests && Boolean(formik.errors.number_guests)}
                  helperText={formik.touched.number_guests && formik.errors.number_guests}
                  onBlur = {formik.handleBlur}
              />
          </Grid>
          <Grid item md={12} sm={12} xs={12} style={{marginTop:'10px',marginBottom:'10px'}}>
            Client Information
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              id="name" 
              name='name' 
              label="name" 
              margin="dense"
              variant="outlined" 
              autoComplete='off' 
              value={formik.values.name} 
              onChange={formik.handleChange} 
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBlur = {formik.handleBlur}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth 
              id="lastname" 
              name='lastname' 
              label="lastname" 
              margin="dense" 
              variant="outlined"
              autoComplete='off' 
              value={formik.values.lastname} 
              onChange={formik.handleChange} 
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
              onBlur = {formik.handleBlur}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
                fullWidth
                id="email" 
                name='email' 
                label="email"
                aria-label="minimum height"
                margin="dense"
                variant="outlined" 
                autoComplete='off' 
                value={formik.values.email} 
                onChange={formik.handleChange} 
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onBlur = {formik.handleBlur}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
                fullWidth
                id="phone" 
                name='phone' 
                label="Cell phone"
                aria-label="minimum height"
                margin="dense"
                variant="outlined" 
                autoComplete='off' 
                value={formik.values.phone} 
                onChange={formik.handleChange} 
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                onBlur = {formik.handleBlur}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12} style={{marginTop:'10px',marginBottom:'10px'}}>
            Card Information
          </Grid>
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
            <Grid>
                <Fab onClick={formik.handleSubmit} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                    <SaveIcon />
                </Fab>
            </Grid>
        </form>
      </div>



        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Reservation information
          </Typography>
            <div className="modal-body">
              <ul>
                <li>Initial date: <b>{data.init_date}</b></li>
                <li>Final date: <b>{data.final_date}</b></li>
                <li>simple: <b>{data.simple}</b></li>
                <li>junior: <b>{data.junior}</b></li>
                <li>suite: <b>{data.suite}</b></li>
                <li>name: <b>{data.name}</b></li>
                <li>lastname: <b>{data.lastname}</b></li>
                <li>email: <b>{data.email}</b></li>
                <li>phone: <b>{data.phone}</b></li>
                <li>card number: <b>{data.card_number}</b></li>
                <li>total: $&nbsp;<b>{data.total}</b></li>
              </ul>
            </div>
          <Grid>
            <Fab onClick={e=>{saveData(formik.resetForm)}} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'50px',marginRight:'10px'}}>
              <CheckCircleIcon  />
            </Fab>
            <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'50px',marginRight:'10px'}}>
              <CancelIcon />
            </Fab>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default Reservation