import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#FF560B",
      contrastText: "white"
    },
    secondary: {
      main: "#ECECEC",
      contrastText: "white"
    },
  },
  typography: {
    fontFamily: [
      'Helvetica',
      'normal',
    ].join(','),
  }
});


export default theme;