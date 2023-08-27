import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './EventId.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../NavBar/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EventId = () => {
    const {id} = useParams();
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
      const [event, setEvent] = useState(null);
      const [ngo, setNgo] = useState(null);
      const [startDate,setStartDate] = useState("");
      const [endDate,setEndDate] = useState("");
    const user = useSelector((state)=>{return state.user});
    const fetchEvent = async()=>{
      if(event!==null) return;
      const response = await fetch(`http://localhost:8001/event/${id}`);
      const json = await response.json();
      setEvent(json.data);

      const rawDateStart = new Date(json.data.startDate); 
      const rawDateEnd = new Date(json.data.endDate); 
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };

      const formattedDateS = rawDateStart.toLocaleDateString('en-US', options);
      const formattedDateE = rawDateEnd.toLocaleDateString('en-US', options);
      setStartDate(formattedDateS)
      setEndDate(formattedDateE)
  }
  const participate=async(eventId,userId)=>{
    
    const response = await fetch(`http://localhost:8001/event/participate`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({userId,eventId})
    });
    const json = await response.json();
    if(json.success){
      notify("Participated Successfully","success");
      setTimeout(() => {
          window.location.reload();
      }, 1000);
    }
    else notify("Fail","error");

  }
  const fetchNgo = async()=>{
    if(event!==null)
    {
      const response = await fetch(`http://localhost:8001/ngo/${event.organiser}`);
      const json = await response.json();
      setNgo(json.data);
    }
}
  useEffect(() => {
    fetchEvent();
    fetchNgo();
  }, [event])
  
 


  return (
    <div>
      <Navbar/>
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
      {
        event &&   <div>  
          <img src= {`http://localhost:8001/assets/${event.image}`} 
          alt="" 
          id="eventImg" 
          className="eventImg" />
        <div className="eventInfo">
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>Start date: <span id="startDate">{startDate}</span></p>
          <p>End date: <span id="endDate">{endDate}</span></p>
        
          <p>No. of participants: <span id="noOfParticipants">{event.participants.length} </span></p>
          {user && !user.estb ? !event.participants.includes(user._id) ? <button onClick={()=>{participate(event._id,user._id)}}>Participate</button> :<button disabled id="registered">Already Participated</button>  : ""} 
          
          <Link to={`/event/participants/${event._id}`}>View Participants</Link>

        </div>
        </div>
      }
      { ngo && <>   <div className="organiser">
        <h2>About Organiser</h2>
        <div className="aboutOrganiser">
          <div className="organImg">
            <img src={`http://localhost:8001/assets/${ngo.profile}`} alt="" id="organImg" />
            <Link to={`/ngo/${ngo._id}`}>View profile</Link>
          </div>
          <div className="organAbt">
            <h3>NGO Name: {ngo.name}</h3>
            <span style={{margin:"40px 0px"}}>Year of Establishment {ngo.estb}</span>
            <br />
            <span style={{margin:"40px 0px"}}>Registration Number {ngo.regno}</span>
            {/* <span>0 Followers</span> */}
          </div>
        </div>
      </div>
      </> }
   
    </div>

  )
}


export default EventId;
