import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { colorButton } from '../list/styles';
import { useAppDispatch} from "../../app/hooks";
import { Box, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { buttonDialogStyledAcept, buttonDialogStyledCancel, directionRow, stylesBody, stylesTitle } from './styles';
import { resetList } from '../../features/todolistSlice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal =()=> {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetAll =async (e: React.ChangeEvent<any>) =>{
        e.preventDefault()
        dispatch(resetList())
        setOpen(false);
  }


  return (
    <div>
      <IconButton sx={colorButton} onClick={handleClickOpen} size="small">
        <AddCircleIcon ></AddCircleIcon>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={stylesTitle}>{"Empezar una nueva lista"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={stylesBody}>
             Cuando comenzás una nueva lista, tu lista existente se elimina.
            ¿Estás seguro que querés empezar una nueva lista?
          </DialogContentText>
        </DialogContent>
        <Box sx={directionRow}>
            <Button sx={buttonDialogStyledCancel} variant="outlined" onClick={handleClose}>Cancelar</Button>
            <Button sx={buttonDialogStyledAcept} variant="contained" onClick={resetAll}>Nueva lista</Button>
        </Box>
      </Dialog>
    </div>
  );
}

export default Modal