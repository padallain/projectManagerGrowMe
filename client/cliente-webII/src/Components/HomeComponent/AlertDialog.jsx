import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '@mui/material/Button';

export default function AlertDialog({ projectId, memberId, profileId, onDelete }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.stopPropagation(); // Detener la propagación del evento
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation(); // Detener la propagación del evento
    setOpen(false);
  };

  const handleDelete = async (event) => {
    event.stopPropagation(); // Detener la propagación del evento
    await onDelete(projectId, memberId, profileId);
    handleClose(event);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <CancelOutlinedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={(event) => event.stopPropagation()} // Detener la propagación del evento
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure that you want to delete this project?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remember that if you delete the project you have to ask the leader to add you again in the project.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, my bad</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes, sir
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
   