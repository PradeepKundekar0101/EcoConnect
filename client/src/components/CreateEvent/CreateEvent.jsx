import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CreateEvent.css';
const CreateEvent = () => {
    const user = useSelector((state)=>{return state.user});
    const [data,setData] = useState({
        name:"",
        startDate:"",
        endDate:"",
        location:"",
        description:""
    });
    const [profile,setProfile] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        try {
            const formData = new FormData();
            formData.append("title",data.name);
            formData.append("organiser",user._id);
            formData.append("startDate",data.startDate);
            formData.append("endDate",data.endDate);
            formData.append("location",data.location);
            formData.append("description",data.description);
            formData.append("image",profile);
           
            const response = await fetch("http://localhost:8001/event/create",{
                method:"POST",
                body:formData
            });
            const json = await response.json();
            console.log(json)
            if(json.success) 
            {
                alert("Created");
                navigate("/");
            }
            else 
                alert("failed");
        }catch(err)
        {
            alert(err.message);
        }   
    }
  return (
    <div className='create-event-body'>
        <h1>CREATE AN EVENT</h1>
         <div className="login-container">
        <div className="form">
            <input
                type="text"
                placeholder='Event Name' 
                value={data.name}
                onChange={(e)=>{setData({...data,name:e.target.value})}}
                />
            <input
                type="text"
                placeholder='Description' 
                value={data.description}
                onChange={(e)=>{setData({...data,description:e.target.value})}}
                />
             <label id="datelabel" htmlFor="datetime">Start Date and Time:</label>
                <input
                    type="datetime-local"
                    id="datetime"
                    value={data.startTime}
                    onChange={(e)=>{setData({...data,startDate:e.target.value})}}
                />
             <label id="datelabel" htmlFor="datetime">End Date and Time:</label>
                <input
                    type="datetime-local"
                    id="datetime"
                    value={data.endDate}
                    onChange={(e)=>{setData({...data,endDate:e.target.value})}}
                />
            <input
                type="text"
                placeholder='Location' 
                value={data.location}
                onChange={(e)=>{setData({...data,location:e.target.value})}}
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
        </div>

    </div>
    </div>
  )
}

export default CreateEvent