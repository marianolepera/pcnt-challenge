import CircularProgress from '@mui/material/CircularProgress';
import {Box}from "@mui/material"; 
import { FC } from 'react';
import { modalStyles } from './styles';


interface LoaderInterface {
  size: number,
}
const  Loader:FC<LoaderInterface>=({size}:LoaderInterface) => {
  return (
    <Box sx={modalStyles}>
      <CircularProgress size={size} color="primary"/>
    </Box>
  );
}

export default Loader