
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import Dashboards from './pages/Dasboard'
import PropertyDetail from './pages/DetallePropiedad'
import Footer from './components/Footer'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return(
  <div>
    <BrowserRouter>
    <Header/>

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/registrarse' element={<RegisterPage/>}/>
      <Route path='/iniciar-sesion' element={<LoginPage/>}/>
      <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboards />
              </ProtectedRoute>
            }
          />
      <Route path='propiedad-detalle/:id' element={<PropertyDetail/>}/>


    </Routes>
    <Footer/>
    </BrowserRouter>
  </div>
  );
}

export default App
