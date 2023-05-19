import { FC, useEffect, useState } from "react"
import { Box, Button, Checkbox, FormControlLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { boxBackGround, checkBoxStyled, direction, directionItemsList, listDirectionColumn, menuPropsSelectStyled, selectStyled, separateItems, styledTypo, todoListText } from "./styles"
import { directionButton, styledButton, textFieldText } from "../empylist/styles"
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { EditItem, Item } from "../../interfaces/interfaces";
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createItem, deleteItem, getAllItems, getItemsCompletedOrNot, reset, resetMessage, updateItem } from "../../features/todolistSlice";
import Loader from "../Loader/Loader";
import Toaster from "../toast/Toaster";
import Modal from "../modal/Modal";


interface ListInterface {
    items:Item
}
const List:FC<ListInterface> = ({items}:ListInterface) =>{
    const [itemValue,setItemValue]= useState("")
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState('ALL');
    const { success,error,message,loadingCreateItem} = useAppSelector((state) => state.items);
    const [shownComments, setShownComments] = useState({});
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleMouseOver = (id:any) => {
        setShownComments(prevShownComments => ({
            ...prevShownComments,
            [id]: !prevShownComments[id]
          }));
    };

    const handleMouseOut = (id:any) => {
        setShownComments(prevShownComments => ({
            ...prevShownComments,
            [id]: !prevShownComments[id]
          }));
    };

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

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

    const getItemsFilteredByCategory= async() =>{
       
        if(category == "COMPLETED"){
            dispatch(getItemsCompletedOrNot(true))
            dispatch(resetMessage())
        }else if(category == "UNCOMPLETED"){
            dispatch(getItemsCompletedOrNot(false))
            dispatch(resetMessage())
        }
        else{
            dispatch(getAllItems())
            dispatch(resetMessage())
        }
    }

  

    useEffect(() => {
        if (error) {
            handleClickOpenError()
        }

        if (success) {
            handleClickOpen()
        }
        
        dispatch(reset())
        
    }, [success,error,dispatch,items])

    useEffect(() => {
        getItemsFilteredByCategory()
        dispatch(reset())
        
    }, [category,dispatch,success,error])

    if(loadingCreateItem){
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

    const handleDelete =async (e: React.ChangeEvent<any>,id:string) =>{
        e.preventDefault();
        dispatch(deleteItem(id))
    }

    const updateItemState= async(e: React.ChangeEvent<any>,item:Item) =>{
        e.preventDefault()
        const body:EditItem={
            completed:!item.completed,
            todoId:item?.id
        }
        dispatch(updateItem(body))
    }
    return(
        <Box>
            <form onSubmit={onSubmit}>
                <TextField 
                    InputProps={textFieldText} 
                    placeholder="Escribí un item" 
                    variant="standard"
                    value={itemValue}
                    onChange={e => setItemValue(e.target.value)}
                    />
                <Box sx={boxBackGround}>
                    {message !="" && 
                        <>
                           <Toaster severity="success" open={open} message={message} handleClose={handleClose}/>
                           <Toaster severity="error" open={openError} message="Hubo un error al intentar agregar el item a la lista!" handleClose={handleClose}/>
                        </>
                    }
                
                    <Box sx={separateItems}>
                        <Box sx={direction}>
                            <Typography sx={todoListText}>To do list</Typography>
                            <Modal></Modal>
                        </Box>
                        <Select 
                            sx={selectStyled} 
                            value={category} 
                            onChange={handleChange} 
                            variant="standard" 
                            disableUnderline
                            IconComponent = {UnfoldMoreIcon}
                            MenuProps={menuPropsSelectStyled}
                            >
                            <MenuItem value="ALL">Todos</MenuItem>
                            <MenuItem value="COMPLETED">Realizados</MenuItem>
                            <MenuItem value="UNCOMPLETED">No Realizados</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={listDirectionColumn}>
                    {items.map((item:Item,index:any) =>(
                            <div
                                style={directionItemsList}
                                key={index}
                                onMouseOver={() => handleMouseOver(index)}
                                onMouseOut={() => handleMouseOut(index)}
                            >
                                <FormControlLabel 
                                    sx={checkBoxStyled} 
                                    control={
                                        <Checkbox
                                            onChange={(e)=>updateItemState(e,item)}
                                            checked={item?.completed} 
                                            icon={<CircleUnchecked />}
                                            checkedIcon={<CircleCheckedFilled />} 
                                        />
                                    } 
                                    label={item?.title}/>
                                {shownComments[index] && (
                                    <Typography sx={styledTypo} onClick={(e) =>handleDelete(e,item?.id)}>Delete</Typography>
                                )}
                            </div>
                        ))}
                    </Box>
                </Box>
                <Box sx={directionButton}>
                    <Button type="submit" disabled={!itemValue} sx={styledButton} variant="contained"> Agregar</Button>
                </Box>
            </form>
        </Box>
        
    )
}

export default List