import React,{useState,useEffect} from 'react'
import Navbar from '../NavBar/Navbar'
import { useSelector } from 'react-redux'
import './UserProfile.css'
import { useNavigate } from 'react-router-dom'
import EventBox from '../EventBox/EventBox'
const UserProfile = () => {

    const navigate = useNavigate();
    const user=  useSelector((state)=>{return state.user});
    const [events,setEvents] = useState([]);

    useEffect(() => {
     fetchAllEvents();
    }, [])

   
    const fetchAllEvents = async()=>{
        const response = await fetch(`http://localhost:8001/event/`);
        const json = await response.json();
        setEvents(json.data);
    }
  return (
    <div className="user-profile-body">
        <Navbar/>
    <div className="profileTop">
    <div className="profileImg">
    <img src={`http://localhost:8001/assets/${user.profile}`} alt="" />
    </div>
    <div className="userInfo">
      <h1>{user.firstname} {user.lastname}</h1>
      <span>{user.email}</span>
      <br />
      <button className='logout' onClick={()=>{
        localStorage.clear();
        window.location.reload();
        navigate("/");

      }}>Log out</button>
    </div>
    </div>

      <div className='events'>
        {

            events && <div className="ngo-events">
            <h1 className='profile-user-event'> Events Participated</h1>
            <ul>
            {
                events.length ===0 ? <h1> No Events Participated :|</h1>:
                events.reverse().map((e)=>{
                    if(e.participants.includes(user._id)) return <EventBox 
                    title={e.title} 
                    description={e.description} 
                    location={e.location} 
                    img={`http://localhost:8001/assets/${e.image}`} 
                    _id={e._id}
                    participants={e.participants}/>
                })
            }
            </ul>
            </div>
                
    }
      </div>

    </div>
  )
}

export default UserProfile