import React,{useState,useEffect} from 'react'
// import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

//Icons
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

//validate
import validations from "./validationSchema"
import { useFormik } from "formik"
import * as yup from "yup"


const ModalRoom = ({ action, handleClose, setLoader, open ,categories,handleForm,saveData,initialForm}) => {
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

    let validationSchema = null

    if(action==='Update'){
        validationSchema = yup.object(validations.validationsFormUpdate)
    }else{
        validationSchema = yup.object(validations.validationsFormCreate)
    }

    const formik = useFormik({
        initialValues : initialForm,
        enableReinitialize:true,
        onSubmit: (values,{resetForm}) =>{
            saveData(values)
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
                {`${action} Category`}
            </Typography>
            
            <form>
                {
                    action!=='Update'
                    ?                
                    <TextField 
                        id="name" 
                        name='name' 
                        label="name" 
                        fullWidth  
                        margin="dense" 
                        variant="outlined"
                        autoComplete='off'  
                        value={formik.values.name} 
                        onChange={formik.handleChange} 
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        onBlur = {formik.handleBlur}
                    />
                    :''
                }
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
                <TextField 
                    id="max" 
                    name='max' 
                    label="Max people" 
                    fullWidth  
                    margin="dense" 
                    variant="outlined" 
                    value={formik.values.max} 
                    onChange={formik.handleChange} 
                    error={formik.touched.max && Boolean(formik.errors.max)}
                    helperText={formik.touched.max && formik.errors.max}
                    onBlur = {formik.handleBlur}
                />
                <TextField 
                    id="description" 
                    name='description' 
                    label="Description" 
                    fullWidth  
                    margin="dense" 
                    variant="outlined" 
                    value={formik.values.description} 
                    onChange={formik.handleChange} 
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
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

export default ModalRoom