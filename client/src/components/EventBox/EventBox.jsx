import React from 'react'
import './EventBox.css';
import { Link } from 'react-router-dom';
const EventBox = ({img,title,description,location,_id,participants}) => {
    console.log(img)
  return (
    <div className='eventBox'>
    <div className="top"><img src={img} height="150" width="200" alt="" /></div>
    <div className="bottom">
        <h3>{title}</h3>
        <p>{description.slice(0,45)+"...."}</p>
        <p className='participate'><b>{participants.length} </b>participating</p>
        <p>Location: <b>{location}</b></p>
        <Link to={`/event/${_id}`}>Check Out</Link>
    </div>
</div>
  )
}

export default EventBox