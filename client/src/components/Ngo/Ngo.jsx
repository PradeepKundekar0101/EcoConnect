import React,{useEffect, useState} from 'react'
// import './Admin.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../NavBar/Navbar';

const Ngo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state =>{return state.user});
    const [ngos,setngos] = useState(null);
    const fectchAllNgos =async()=>{
        const response = await fetch("http://localhost:8001/ngo/");
        const json = await response.json();
        setngos(json.data);  
    }
    
    useEffect(() => {
      fectchAllNgos();
    }, []);

    
   
  return (
    <div className='admin'>
         <Navbar/>
       
        <h1> Non Government Organizations</h1>
        {ngos && ngos.map((e,id)=>{return <div key={id} className="ngo-box">
            <div className="left">
            <img src={`http://localhost:8001/assets/${e.profile}`} alt="" />
            </div>
            <div className="right">
            <h3>Name:{e.name} </h3>
            <h3>Establishment Year:{e.estb} </h3>
            <button style={{background:"rgb(0, 97, 216)",marginRight:"10px"}} onClick={()=>{navigate(`/ngo/${e._id}`)}}>View Profile</button>
            
            </div>

        </div>})}
    <hr />
        
    </div>
  )
}

export default Ngo