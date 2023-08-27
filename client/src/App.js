import React from 'react'
import {Routes,Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Home } from './components/Home/Home';
import RegisterNgo from './components/RegisterNgo/RegisterNgo';
import LoginNgo from './components/LoginNgo/LoginNgo';
import Events from './components/Events/Events'
import EventId from './components/EventId/EventId';
import CreateEvent from './components/CreateEvent/CreateEvent';
import NgoProfile from './components/NgoProfile/NgoProfile';
import Admin from './components/Admin/Admin';
import UserProfile from './components/UserProfile/UserProfile';
import Ngo from './components/Ngo/Ngo';
import './App.css'
import Participants from './components/Participants/Participants';
const App = () => {
  const navigate = useNavigate();
  const isAuth = Boolean( useSelector((state)=>{return state.token}));
  let isVerified = false;
  const user = useSelector((state)=>{return state.user});
  if(user!==null && user.verified) isVerified=true;

  return (
    <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/login/user' element={ !isAuth?<Login/>:<Home/>}/>
        <Route path='/register/user' element={!isAuth?<Register/>:<Home/>}/>

        <Route path='/register/ngo' element={!isAuth?<RegisterNgo/>:<Home/>}/>
        <Route path='/login/ngo' element={!isAuth?<LoginNgo/>:<Home/>}/>

        <Route path='/ngo/:id' element={<NgoProfile/>}/>

        <Route path='/events' element={<Events/>}/>
        <Route path='/event/:id' element={<EventId/>}/>
        <Route path='/event/create' element={ isVerified? <CreateEvent/>: <div className='alert'>
          <h1>Your Account is not yet Verified Yet    </h1><button onClick={()=>{
            navigate("/")
          }}>Go Back</button>
        </div>}/>
       
        

        <Route path='/admin' element={<Admin/>}/>
        <Route path='/ngo' element={<Ngo/>}/>

        <Route path="/event/participants/:id" element={<Participants/>}/>
        <Route path='/userprofile' element={isAuth?<UserProfile/>:<Login/>}/>


    </Routes> 
  )
}
export default App