import CircularProgress from '@mui/material/CircularProgress';
import {Box}from "@mui/material"; 
import { FC } from 'react';


interface LoaderInterface {
  size: number,
}
const  Loader:FC<LoaderInterface>=({size}:LoaderInterface) => {
  return (
    <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center"}}>
      <CircularProgress size={size} color="primary"/>
    </Box>
  );
}

export default Loader