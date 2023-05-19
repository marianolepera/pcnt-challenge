import { Box,Button,TextField,Typography } from "@mui/material"
import {  direction, directionButton,styledButton,textFieldText,textTodo, textWhatToDo } from "./styles"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createItem, reset } from "../../features/todolistSlice";
import Loader from "../Loader/Loader";
import Toaster from "../toast/Toaster";


const EmptyList =() =>{
    const [itemValue,setItemValue]= useState("")
    const dispatch = useAppDispatch();
    const { success,error,message,loading} = useAppSelector((state) => state.items);
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenError = () => {
        setOpenError(true);
    };


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    
   

    useEffect(() => {
        if (error) {
            handleClickOpenError()
        }
        if (success) {
            // dispatch(getAllItems())
            handleClickOpen()
        }

        dispatch(reset())
    }, [])


    if(loading){
        return (<Loader size={100}/>)
    }

    const onSubmit= async(e: React.ChangeEvent<any>) =>{
        e.preventDefault();
        const formItem = {
            title: itemValue,
            message: itemValue,
          };
        dispatch(createItem(formItem))
    }
    return(
            <Box >
                <Typography sx={textTodo}> To do list</Typography>    
                <Typography sx={textWhatToDo}> ¿Qué cosas tenés que terminar hoy?</Typography>
                {message !="" &&
                    <>        
                        <Toaster severity="success" open={open} message={message} handleClose={handleClose}/>
                        <Toaster severity="error" open={openError} message="Hubo un error al intentar agregar el item a la lista!" handleClose={handleClose}/>
                    </>
                }

                <form onSubmit={onSubmit}>
                    <Box sx={direction}>
                        <TextField 
                            InputProps={textFieldText} 
                            placeholder="Escribí un item" 
                            variant="standard"
                            value={itemValue}
                            onChange={e => setItemValue(e.target.value)}
                            />
                        <Box sx={directionButton}>
                            <Button type="submit" disabled={!itemValue} sx={styledButton} variant="contained">
                                Agregar
                            </Button>
                        </Box>
                        
                    </Box>
                </form>
            </Box>
        )
}

export default EmptyList