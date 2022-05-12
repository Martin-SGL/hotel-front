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



//axios
import axios from 'axios'
//url base
import url_base from '../../../config/env'

const url_2 = `${url_base}services/`
let config = {}

const ModalServices = ({handleClose, open , handleFormServices, saveDataServices,setLoader,totalServices}) => {

    const [services, setServices] = useState([])
    const [initial, setInitial] = useState([])

    useEffect(() => {
        const getData = async () =>{
          try{
            //pasar el token a config
            config.headers =  { Authorization: `Bearer ${localStorage.getItem('token')}` }
            //mostar lodaer
            setLoader('flex')
            let data = await axios.get(url_2,config)
            setServices(data.data.data)
            setInitial(data.data.data)
            //esconder el loader
            setLoader('none')
          }catch(error){
            setLoader('none')
          }
        }
    
        getData()
    
      }, [])

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
    
    const filter = (e) =>{
        const filteredRows = initial.filter((row) => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase());
          });
          setServices(filteredRows);
    } 

    return (
        
        <Modal
        open={open}
        onClose={e=>{handleClose();setServices(initial)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style} style={{paddin:'10px'}} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Services - <b>Total:</b> ${totalServices}
            </Typography>
            <Box style={{maxHeight:'450px',overflow:'auto',padding:'10px'}}>
                <form style={{marginTop:'20px'}}>
                <TextField 
                    id={`search`} 
                    name={`search`} 
                    label={'Search by name'} 
                    fullWidth  
                    autoComplete='off'
                    onChange={filter}
                    style={{marginBottom:'10px'}} 
                />
                                    
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell style={{width:'200px'}}>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services!==null && services.map((s,index,array)=>(
                                <TableRow
                                key={s.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {s.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                    <Tooltip arrow title={<h2>{s.description}</h2>}>
                                        <IconButton>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        $ {s.price}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                    <TextField 
                                        type="number"
                                        InputProps={{
                                            inputProps: { 
                                                max: 100, min: 0 
                                            }
                                        }}
                                        id={`${s.price}-${s.id}-${array.length}`} 
                                        name={`service-${s.id}`} 
                                        label={s.name} 
                                        fullWidth  
                                        margin="dense" 
                                        variant="outlined" 
                                        autoComplete='off'
                                        onChange={handleFormServices} 
                                    />
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <Grid style={{marginBottom:'10px'}}>
                        <Fab onClick={saveDataServices} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                            <SaveIcon />
                        </Fab>
                        <Fab onClick={e=>{handleClose();setServices(initial)}} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                            <CancelIcon />
                        </Fab>
                    </Grid>
                </form>
            </Box>
            

        </Box>
        </Modal>
    )
}

export default ModalServices