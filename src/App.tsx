import './App.css'
import Home from './pages/Home'
import theme from './theme/themes'
import { ThemeProvider } from "@mui/material/styles";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Home></Home>
      </ThemeProvider>
    </>
  )
}

export default App
