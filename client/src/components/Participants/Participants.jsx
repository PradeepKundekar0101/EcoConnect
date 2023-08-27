import React from 'react'
import { useEffect,useState} from 'react';
import { useParams } from 'react-router-dom'
const Participants = () => {
    const eventId = useParams();
    const [event, setEvent] = useState(null);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchEvent();
        fetchUsers();
    }, [event])
     const fetchEvent = async()=>{
        try {
            const response = await fetch(`http://localhost:8001/event/${eventId}`);
            const json = await response.json();
            setEvent(json.data);
        } catch (error) { 
        }
     }
     const fetchUsers = async()=>{
        try {  
            if(event!==null)
            {
                event.participants.map(async(e)=>{
                    console.log(e)
                    const response = await fetch(`http://localhost:8001/user/${e}`);
                    const json = await response.json();
                    users.push(json.data);
                })
                setUsers(users);
            }
        } catch (error) {
            
        }
     }
  return (
    <div>{console.log(users)}</div>
  )
}

export default Participants