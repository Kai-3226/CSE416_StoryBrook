import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author McKilla Gorilla
*/

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function DeleteModal() {

    let open=false;
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.workMarkedForDeletion) {
        name = store.currentWork.name;
        open=true;
    }
    function handleDeleteList(event) {
      //console.log(store.currentWork)
      event.stopPropagation();
        store.deleteWork(store.currentWork._id);
        handleClose();
    }
    function handleClose(event){
      //event.stopPropagation();
        store.unmarkWorkForDeletion();
        open=false;
    }
    
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deletion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Delete the {name}?
          </Typography>
          <Button
            id="dialog-yes-button"
            onClick={handleDeleteList}>Confirm</Button>
          <Button
            id="dialog-no-button"
            onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteModal;