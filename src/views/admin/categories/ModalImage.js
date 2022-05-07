import React,{useState,useEffect,useContext} from 'react'
import Fab from '@material-ui/core/Fab'
// import Input from '@material-ui/core/Input'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
//axios
import axios from 'axios'
import './style.css';

//Loader
import Loader from '../../../assets/loader/Loader'

//Icons
import CancelIcon from '@material-ui/icons/Cancel'

const ModalImage = ({open,handleClose,url_2,config, idCategory,setLoader}) => {

  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      bgcolor: 'background.paper',
      border: '2px solid #cecece',
      borderRadius: 10,
      boxShadow: '10px 5px 5px',
      maxHeight:'70vh',
      overflowY:'auto',
      p: 4,
      zIndex:'200 !important'
  }

    //loading state
    const [images,setImages] = useState([])

    useEffect(() => {
      const getDataImages = async (idCategory) =>{
        let imagesF = await axios.get(`${url_2}${idCategory}`,config)
        setImages(imagesF.data.data)
      }
      getDataImages(idCategory)
    
    }, [idCategory])

    const getDataImages = async (idCategory) =>{
      let imagesF = await axios.get(`${url_2}${idCategory}`,config)
      setImages(imagesF.data.data)
    }

    const updateFieldChanged =  async (id,url) =>{
      const data = await axios.put(`${url_2}${id}`,{url},config)
      setLoader('none')
      getDataImages(idCategory)
    }

    const handleImage = async (e,id) =>{
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "uwdodmlk");
      try{
        setLoader('flex')
        const res = await axios.post('https://api.cloudinary.com/v1_1/dfoyy1lxr/image/upload',data);
        updateFieldChanged(id,res.data.url);
        }
      catch(error){
          console.log(error.response)
      }
    
    }

    return (
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography style={{marginBottom:'10px',position:'sticky'}} id="modal-modal-title" variant="h6" component="h2">
                {`Edit Images`}
            </Typography>
            
          {/* table */}

          <div style={{display:'grid',gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))"}}>
            {images.map((im, index) => (
              <figure key={index}>
                <img
                  src={im.url}
                  alt={'imagen'}
                  width="200px"
                  height="100px"
                />
                <figcaption style={{display:'flex',flexDirection:'column'}}>
                  <label htmlFor={`files${im.id}`} className="btn">{'Select image'}</label>
                  <input onChange={(e) => handleImage(e,im.id)} id={`files${im.id}`} style={{visibility:"hidden"}} type="file" />
                </figcaption>
              </figure>
                
            ))}
          </div>
            
          
          <Box style={{display:"block",textAlign:"right",marginBottom:'20px'}}>
              <Fab onClick={handleClose} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'20px',marginRight:'10px'}}>
                  <CancelIcon />
              </Fab>
          </Box>
          <br/>
          <br/>
        </Box>
      </Modal>
    )
}

export default ModalImage