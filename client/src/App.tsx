
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  return(
  <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/registrarse' element={<RegisterPage/>}/>
      <Route path='/iniciar-sesion' element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App
