import { FC, useEffect, useRef } from "react";
import Header from "../components/header/Header"
import EmptyList from "../components/empylist/EmptyList"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllItems, getUser } from "../features/todolistSlice";
import { Box, Typography } from "@mui/material";
import List from "../components/list/List";

const Home:FC  = () =>{
    const dispatch = useAppDispatch();
    const { error,user,items,messageFiltered }:any = useAppSelector((state) => state.items);

    const effect=useRef(false)
    useEffect(() => {
        if(effect.current === false && user){
                dispatch(getAllItems())
                return ()=>{
                    effect.current = true
                }
        }  
    }, [user]);


    useEffect(() => {
        if(effect.current === false){
            if(user == null){
                dispatch(getUser())
                return ()=>{
                    effect.current = true
                }
            }
        }  
    }, []);


    

   const formBackground={
        backgroundColor:"#ECECEC",
        height:"100vh"
   }

   const bodyForm ={
        marginLeft:18,
        paddingTop:5
   }

    if(error){
        return <Box> <Typography variant="h1">HUBO UN ERROR AL CARGAR EL USUARIO</Typography></Box>
    }

    return (
        <>
            <Header></Header>
            <Box sx={formBackground}>
                <Box sx={bodyForm}>
                <img src="/src/assets/PCNT-logo.ico" width={50} height={50}/>
                    {items && items.length >=1 || messageFiltered=="no hay" ? 
                        <List items={items}></List>
                    :
                        <EmptyList ></EmptyList>
                    }
                </Box>
            </Box>
        </>
        )
}
export default Home