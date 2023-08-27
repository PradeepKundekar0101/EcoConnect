import React,{useEffect, useState} from 'react'
import './Admin.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserVerified } from '../../store/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state =>{return state.user});
    const [ngos,setngos] = useState(null);
    const fectchAllNgos =async()=>{
        const response = await fetch("http://localhost:8001/ngo/");
        const json = await response.json();
        setngos(json.data);  
    }
    const notify=(message,type)=>{
      if(type==="success")
      {
          toast.success(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
      }
      else{
          toast.error(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
      }  
  }
    useEffect(() => {
      fectchAllNgos();
    }, []);

    const verify = async(id)=>{
        const response = await fetch(`http://localhost:8001/ngo/${id}/verify`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const json = await response.json();
          if(json.success)
          {
            notify("Verified Succesfully","success");
            setTimeout(()=>{
              const updatedUser = { ...user, verified: true }; // Update the verification status
              dispatch(setUserVerified({ verified: true }));
              window.location.reload();
            },1500)
            
          }else{
            notify("Verified Failed","error");
          }
    }
    const unverify = async(id)=>{
        const response = await fetch(`http://localhost:8001/ngo/${id}/unverify`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const json = await response.json();
          if(json.success)
          {
            notify("Unverified Succesfully","success");
            setTimeout(()=>{
              const updatedUser = { ...user, verified: false }; // Update the verification status
              dispatch(setUserVerified({ verified: false }));
              window.location.reload();
            },1500)
            
          }else{
            notify("Verified Failed","error");
          }

        
    }
    
  return (
    <div className='admin'>
         <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        <ToastContainer />
        <h1>Unverified NGOs</h1>
        {ngos && ngos.map((e,id)=>{return !e.verified?  <div key={id} className="ngo-box">
            <div className="left">
            <img src={`http://localhost:8001/assets/${e.profile}`} alt="" />
            </div>
            <div className="right">
            <h3>Name:{e.name} </h3>
            <h3>Establishment Year:{e.estb} </h3>
            <button style={{background:"rgb(0, 97, 216)",marginRight:"10px"}} onClick={()=>{navigate(`/ngo/${e._id}`)}}>View Profile</button>
            <button onClick={()=>{verify(e._id)}} >Verify</button>
            </div>

        </div>:""})}
    <hr />
        <h1>Verified NGOs</h1>
        {ngos && ngos.map((e,id)=>{return e.verified?  <div key={id} className="ngo-box">
            <div className="left">
            <img src={`http://localhost:8001/assets/${e.profile}`} alt="" />
            </div>
            <div className="right">
            <h3>Name:{e.name} </h3>
            <h3>Establishment Year:{e.estb} </h3>
            <button className='view' style={{background:"rgb(0, 97, 216)",marginRight:"10px"}}  onClick={()=>{navigate(`/ngo/${e._id}`)}}>View Profile</button>
            <button onClick={()=>{unverify(e._id)}} style={{background:"rgb(222, 89, 89)"}} >Unverify</button>
            </div>

        </div>:""})}
    </div>
  )
}

export default Admin