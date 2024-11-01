import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <App />
          <ToastContainer />
        </ChakraProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
