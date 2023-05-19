import { Box, Typography } from "@mui/material";
import { headerBox,direction,grayBox } from "./styles";

const Header = () =>{

    return (
        <>
            <Box sx={headerBox}>
                <Box sx={direction}>
                    <img src="/src/assets/iPhone-X.svg"  height={45}></img>
                    <Box sx={grayBox}>
                        <img src="/src/assets/padlock.svg" height={15} style={{marginTop:3,marginLeft:15,marginRight:15}} ></img>
                        <Typography>pcnt/todo-list</Typography>
                    </Box>
                    
                </Box>
                
            </Box>
        </>
    )

}
export default Header;