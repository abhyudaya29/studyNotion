

import './App.css'
import{Route,Routes} from "react-router-dom"
import Home from './pages/home'
import SignUp from './pages/signup'
import Login from './pages/login'
import NavBar from './components/common/NavBar'
import VerifyEmail from './components/core/Auth/VerifyEmail'
import ForgotPassword from './pages/forgotPassword'
import AboutUs from './pages/aboutUs'
import MyProfile from './components/core/Dashboard/MyProfile'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/core/Auth/ProvateRoute'
import Enrolled from './components/core/Dashboard/Enrolled'
import Cart from './components/core/Dashboard/Cart'
import { ACCOUNT_TYPE } from './utils/constants'
import AddCourses from './components/core/Dashboard/AddCourses'
import { useSelector } from 'react-redux'


function App() {
  const{user}=useSelector((state)=>state.profile)
  

  return (
    <>
    <div className='lg:w-screen min-h-screen  bg-richblack-900 flex flex-col font-inter '>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route 
        element={
          <PrivateRoute>
             <Dashboard/>
        </PrivateRoute>
        }
        >
          <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
          <Route path='dashboard/enrolled-courses' element={<Enrolled/>}/>
          <Route path='dashboard/cart' element={<Cart/>}/>
          {/* {
            user?.ACCOUNT_TYPE
          } */}
          {/* <Route path='dashboard/enrolled-courses' element={</>}/> */}
          {
            user?.accountType===ACCOUNT_TYPE.INSTRUCTOR&&(
              <>
              <Route path='/dashboard/add-course' element={<AddCourses/>}/>

              </>
            )
          }
          </Route>

        
      </Routes>

    </div>
    </>
  )
}

export default App
