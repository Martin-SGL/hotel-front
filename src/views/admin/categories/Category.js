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
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

//axios
import axios from 'axios'

//url base
import url_base from '../../../config/env'
import { getDefaultNormalizer } from '@testing-library/react'

//Modal
import ModalCategory from './ModalCategory'
import ModalImage from './ModalImage'
import Alert_Dialog from '../../../components/Alert_Dialog'

let initialForm = {
  name:'',
  price:'',
  max:'',
  id:null
}

//informacion de urls
const url_1 = `${url_base}categories/`
const url_2 = `${url_base}images/`

let config = {}

const Category = () => {
  //states
  const [form,setForm] = useState(initialForm)
  const [categories,setCategories] = useState([])

  //modal state vars
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [openI, setOpenI] = useState(false)
  const [categoryD, setCategoryD] = useState(initialForm)
  const handleOpenD = () => setOpenD(true)
  const handleCloseD = () => setOpenD(false)
  const handleOpenI = () => setOpenI(true)
  const handleCloseI = () => setOpenI(false)
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
        let [data] = await Promise.allSettled([axios.get(url_1,config)])
        if(data.status==='rejected'){
          if(data.reason.response.status===450){
              localStorage.removeItem('token');
              window.location.reload()
          }
        }
        setCategories(data.value.data.data)  
        //esconder el loader
        setLoader('none')
      }catch(error){
        setLoader('none')
      }
    }

    getData()

  }, [])
  
  const getData = async () =>{
    let categoriesF = await axios.get(url_1,config)
    setCategories(categoriesF.data.data)
  }

  const saveData = async (info) => {
    try{
      setLoader('flex')
      let data = null
      if(form.id===null){
        data = await axios.post(url_1,info,config)
        toast.success('Category created')
      }else{
        data = await axios.put(`${url_1}${form.id}`,info,config)
        toast.success('Category updated')
      }
      handleReset()
    }catch(error){
      if(error.response.status!==200){
        if(error.response.status===400){
          if(error.response.data.message.includes('SequelizeUniqueConstraintError')){
            toast.error('invalid Category name')
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

  //abrir el modal 
  const editData = (id) =>{
    setAction('Update')
    handleOpen()
    let [category] = categories.filter(el => el.id === id)
    setForm(category)
  }

  //borrar registro
  const setDataToDelete = (id) =>{
    handleOpenD()
    let [category] = categories.filter(el => el.id === id)
    setCategoryD(category)

  }
  
  const deleteData = async (id) => {
    try{
      setLoader('flex')
      let data = await axios.delete(`${url_1}${categoryD.id}`,config)
      toast.success('Room deleted')
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

  const [idCategory, setIdCategory] = useState(1)

  const editImage = (id) =>{
    setIdCategory(id)
    handleOpenI()
  }

  return (
    <>
      {/* header */}
      <ToastContainer autoClose={2000}/>
      <Loader display={loader}/>
      <div style={{padding:'5px'}}>
        <span style={{fontSize:'20px'}}>Categories</span>
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
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Max people</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cg, index) => (
              <TableRow
                key={cg.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {cg.name}
                </TableCell>
                
                <TableCell>{cg.price}</TableCell>
                <TableCell>{cg.max}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" size="small" onClick={(e) => editData(cg.id)}>
                    <EditIcon size="small" />
                  </IconButton>
                  <IconButton aria-label="images" size="small" onClick={(e) => editImage(cg.id)}>
                    <ImageSearchIcon size="small" />
                  </IconButton>
                  {/* <IconButton aria-label="delete" size="small" onClick={(e) => setDataToDelete(cg.id)}>
                    <DeleteIcon />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* modal */}
      <ModalCategory
        action={action}
        handleForm={handleForm}
        handleClose={handleClose}
        setLoader={setLoader}
        saveData={saveData}
        open={open}
        categories={categories}
        initialForm={form}
      />

      <ModalImage
        handleClose={handleCloseI}
        open={openI}
        idCategory={idCategory}
        url_2={url_2}
        config={config}
        setLoader={setLoader}
      />

       {/* <Alert_Dialog
        openD={openD}
        handleCloseD={handleCloseD}
        name={`${categoryD.name}`}
        deleteData={deleteData}
        description={'¿Are you sure you want to delete '}
      /> */}
    </>

  )
}

export default Category