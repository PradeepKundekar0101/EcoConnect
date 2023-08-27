import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import './Register.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const [data,setData] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        cpassword:""
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
    const [profile,setProfile] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        if(data.password!==data.cpassword)
        {
            notify("Incorrect Password","error");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("firstname",data.firstname);
            formData.append("lastname",data.lastname);
            formData.append("email",data.email);
            formData.append("password",data.password);
            formData.append("profile",profile);

            const response = await fetch("http://localhost:8001/user/register",{
                method:"POST",
                body:formData
            });
            const json = await response.json();
            console.log(json)
            if(json.success) 
            {
                notify("User Created","success");
                setTimeout(() => {
                    navigate("/login/user");
                  }, 2000);
            }
            else 
            {
                notify("User Registration Failed","error");
            }
               
        }catch(err)
        {
            notify(err.message,"error");
        }   
    }
  return (
    <div className="register-user-body">
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
        <h1>REGISTER USER</h1>
         <div className="login-container">
        <div className="form">

            <input
                type="text"
                required
                placeholder='First Name' 
                value={data.firstname}
                onChange={(e)=>{setData({...data,firstname:e.target.value})}}
                />
            <input
                type="text"
                required
                placeholder='Last Name' 
                value={data.lastname}
                onChange={(e)=>{setData({...data,lastname:e.target.value})}}
            />

            <input
                type="email"
                required
                placeholder='Email' 
                value={data.email}
                onChange={(e)=>{setData({...data,email:e.target.value})}}
                />
            <input
                type="password"
                required
                placeholder='Password' 
                value={data.password}
                onChange={(e)=>{setData({...data,password:e.target.value})}}
                />
            <input
                type="password"
                required
                placeholder='Confirm Password' 
                value={data.cpassword}
                onChange={(e)=>{setData({...data,cpassword:e.target.value})}}
                />  
             <input
                type="file"
                onChange={(e)=>{setProfile(e.target.files[0])}}
                />  
            <input
            onClick={()=>{handleSubmit()}}
                type="submit"
                value='Register' 
                />       
        <Link to="/login/user" style={{alignSelf:"flex-start",padding:"0px 7.4vw"}} >Already have a user Account?</Link> <br/>
        <Link to="/register/ngo" style={{alignSelf:"flex-start",padding:"0px 7.4vw"}}>Register NGO</Link>
                
        </div>
        
    </div>
    </div>
  )
}

export default Register