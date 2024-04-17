

import './App.css'
import{Route,Routes} from "react-router-dom"
import Home from './pages/home'
import SignUp from './pages/signup'
import Login from './pages/login'
import NavBar from './components/common/NavBar'
function App() {
  

  return (
    <>
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter '>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        
      </Routes>

    </div>
    </>
  )
}

export default App
