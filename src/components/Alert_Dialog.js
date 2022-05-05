import React from 'react'
import Fab from '@material-ui/core/Fab'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

//Icons
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Alert_Dialog = ({openD,handleCloseD,name,deleteData,title,description}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #cecece',
        borderRadius:10,
        boxShadow: '10px 5px 5px',
        p: 4,
      };

    return (
    <Modal
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
          </Typography>
              {description} <b>{`${name}`}</b> ?
          <Grid>
            <Fab onClick={deleteData} color="primary" aria-label="add" size="small" style={{float:'right',marginTop:'50px',marginRight:'10px'}}>
              <CheckCircleIcon />
            </Fab>
            <Fab onClick={handleCloseD} color="secondary" aria-label="add" size="small" style={{float:'right',marginTop:'50px',marginRight:'10px'}}>
              <CancelIcon />
            </Fab>
          </Grid>
          
        </Box>
      </Modal>
  )
}

export default Alert_Dialog