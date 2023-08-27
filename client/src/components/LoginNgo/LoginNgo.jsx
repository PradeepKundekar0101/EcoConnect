import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux'
import {setUser,setToken} from '../../store/slices/authSlice'
import { Link } from 'react-router-dom';
import './LoginNgo.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginNgo = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data,setData] = useState({
        email:"",
        password:""
    });
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
    const handleSubmit = async()=>{
    
        try
        {
            const response = await fetch("http://localhost:8001/ngo/login",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(data)
            });
            const json = await response.json();
            console.log(json)
            if(json.success) 
            {
                notify("Ngo Login Successful","success");
                setTimeout(()=>{
                    dispatch(setToken(json.data.token));
                    dispatch(setUser(json.data.ngoFound));
                    navigate(`/ngo/${json.data.ngoFound._id}`);
                },2000);
            }
            else 
            notify("Ngo Login Failed","error");
        } catch (err) {
            notify("Ngo Login Failed",err.message);
        }
    }
  return (
    <div className='login-ngo-body'>
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
        <h1>Login Non Government Organization</h1>
    <div className="login-container">
        <div className='form'>
            <input
                type="email"
                placeholder='Email' 
                value={data.email}
                onChange={(e)=>{setData({...data,email:e.target.value})}}
                />
            <input
                type="password"
                placeholder='Password' 
                value={data.password}
                onChange={(e)=>{setData({...data,password:e.target.value})}}
                />
                
            <input
            onClick={()=>{handleSubmit()}}
                type="submit"
                value='Login' 
                />
        <Link to="/register/ngo" style={{alignSelf:"flex-start",padding:"0px 7.4vw"}} >Create a new NGO Account</Link> <br/>
        </div>
    </div>
    </div>
  )
}

export default LoginNgo