import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterNgo.css';
const RegisterNgo = () => {
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
    const renderYearOptions = () => {
        const startYear = 1950;
        const endYear = 2023;
        const yearOptions = [];
    
        for (let year = startYear; year <= endYear; year++) {
          yearOptions.push(<option key={year} value={year}>{year}</option>);
        }
    
        return yearOptions;
      };
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
        regNo:"",
        estb:"",
    });
    const [profile,setProfile] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        
       
        if(data.name==="" ||data.email==="",data.password==="" || data.regNo==="" || data.estb==="" ){
            notify("Please fill all the fields","error");
            return;
        }
        if(data.password!==data.cpassword){
            notify("Incorrect Password","error");
            return;
        }
        if(profile==="")
        {
            notify("Please Upload a Profile Image","error");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("name",data.name);
            formData.append("email",data.email);
            formData.append("password",data.password);
            formData.append("profile",profile);
            formData.append("regno",data.regNo);
            formData.append("estb",data.estb);
    
            const response = await fetch("http://localhost:8001/ngo/register",{
                method:"POST",
                body:formData
            });
            const json = await response.json();
            console.log(json)
            if(json.success) 
            {
                alert("Created");
                navigate("/login/ngo");
            }
            else 
                alert("failed");
        }catch(err)
        {
            alert(err.message);
        }   
    }
  return (
    <div className='register-ngo-body'>
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
        <h1>REGISTER NGO</h1>
         <div className="login-container">
        <div className="form">

            <input
                type="text"
                placeholder='NGO Name' 
                value={data.name}
                onChange={(e)=>{setData({...data,name:e.target.value})}}
                />
            
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
                type="password"
                placeholder='Confirm Password' 
                value={data.cpassword}
                onChange={(e)=>{setData({...data,cpassword:e.target.value})}}
                />  
            
            <input
                type="number"
                placeholder='Registration Number' 
                value={data.regNo}
                onChange={(e)=>{setData({...data,regNo:e.target.value})}}
            />  
            <label>Select Establishment Year:</label>
            <select value="" 
            onChange={(e)=>{setData({...data,estb:e.target.value})}}>
                <option value={data.estb}>Select</option>
                {renderYearOptions()}
            </select>
             <input
                type="file"
                onChange={(e)=>{setProfile(e.target.files[0])}}
                />  
            <input
            onClick={()=>{handleSubmit()}}
                type="submit"
                value='Register' 
                />       
            <Link to="/login/ngo" style={{alignSelf:"flex-start",padding:"0px 7.4vw"}} >Already have a NGO Account?</Link> <br/>
        </div>

    </div>
    </div>
  )
}

export default RegisterNgo