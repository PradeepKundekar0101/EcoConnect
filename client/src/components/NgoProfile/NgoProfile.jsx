import React from 'react'
import {useState,useEffect} from 'react'
import { useParams,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import "./NgoProfile.css";
import EventBox from '../EventBox/EventBox';
import Navbar from '../NavBar/Navbar';
const NgoProfile = () => {
    const user=  useSelector((state)=>{return state.user});
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();
    const [ngo,setNgo] = useState(null);
    const [events,setEvents] = useState([]);
    const {id} = useParams();
    useEffect(() => {
     fetchNgo();
     fetchAllEvents();
    }, [])
    const fetchNgo = async()=>{
        const response = await fetch(`http://localhost:8001/ngo/${id}`);
        const json = await response.json();
        setNgo(json.data);
    }
    const fetchAllEvents = async()=>{
        const response = await fetch(`http://localhost:8001/event/`);
        const json = await response.json();
        setEvents(json.data);
        
    }
    const handleFollow = async (userId,ngoId) => {
        try {
          const response = await fetch('http://localhost:8001/ngo/follow', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, ngoId }),
          });
        //   const json = await response.json();
          if (response.ok) {
            setIsFollowing(true);
          } else {
            console.error('Follow request failed');
          }
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className='ngo-body'>
        <Navbar/>
        {
            ngo &&  <div className="ngoprofileTop">
            <div className="profileImg">
            <img src={`http://localhost:8001/assets/${ngo.profile}`} alt="" />
            </div>
            <div className="userInfo">
              <h1>{ngo.name} </h1>
              <span>{ngo.email}</span><br />
              <span>Establised Year -{ngo.estb}</span>
              <br />
              { <span>Registration Number - <span> {ngo.regno}</span></span> }
              {user!==null && ngo._id===user._id?<h3><span>Followers:</span>{ngo.followers.length}</h3>:<h3><span>Followers:</span>{ngo.followers.length}</h3>}<br></br>
              
             

              {user!==null && user.estb==null ? <button id='followBtn' style={{margin:"10px 0px"}} onClick={()=>{handleFollow(user._id,ngo._id)}} >{isFollowing ? 'Following' : 'Follow'}</button>:"" } 
              {user!==null && ngo._id===user._id?<button className='logout' onClick={()=>{
                localStorage.clear();
                navigate("/");
        
              }}>Log out</button>:"" } 
              
            {user!==null && ngo._id===user._id?  <button id='createEventbtn' onClick={()=>{navigate("/event/create")}}>Create Event</button>:""}

            </div>
            </div>
        }
      
    {
        ngo && <div className="ngo-events">
                <h1> Events</h1>
                <ul>
                {
                    events.length ===0 ? <h1> No Events organised :|</h1>:
                    events.reverse().map((e)=>{
                        if(e.organiser===ngo._id) return <EventBox 
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
  )
}

export default NgoProfile