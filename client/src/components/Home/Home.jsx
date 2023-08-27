import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

import './Home.css'
import EventBox from '../EventBox/EventBox'
import Navbar from '../NavBar/Navbar'
export const Home = () => {

  const [events, setEvents] = useState([]);
  const fetchEvents = async ()=>{
      const response = await fetch("http://localhost:8001/event/");
      const json = await response.json();
      setEvents(json.data);  
  }
  useEffect(() => {
      fetchEvents();
  }, [])

  return (
    <div>
      <Navbar/>
         <div className="slider">
          <h1>EcoConnect</h1>
          <p>Local Roots, Global Impact</p>
          </div>
          <section className='events-section'>
            <h1> Events</h1>
            <ul>

           
            {
              events.reverse().map((e,id)=>{ if(id>=3)return
                return <li> <EventBox 
                title={e.title} 
                description={e.description} 
                location={e.location} 
                img={`http://localhost:8001/assets/${e.image}`} 
                _id={e._id}
                participants={e.participants}/>
                </li>
            })
            }
             </ul>
       <div className="link">

       <Link to="/events" className='viewMore'>View more...</Link>
       </div>
    </section>
    <section class="contactSection">
        <div class="left">
            <h1>EcoConnect</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet sint dolores doloremque quae. Sint ullam consectetur illo vel quo reiciendis dicta laboriosam facilis vero sapiente, blanditiis hic numquam autem adipisci ipsam rem cumque illum eius enim inventore, eum veritatis nobis. Perspiciatis accusantium numquam sapiente dolor omnis itaque eius soluta nulla?</p>
            <div>
                <span>Email: ecoconnect@gmail.com</span><br/>
                <span>Instagram: @ecoconnect.app</span>
            </div>
        </div>
        <div class="right">
            <img src="LogoTrans.png" alt=""/>
        </div>
    </section>

         <section className="aboutsection">
        <div className="contactInfo">
          <h1>Contact</h1>
          <span>Email : eco.connect@gmail.com</span>
          <span>Phone : 123-456-789</span>
          <span>Instagram : @eco.connect</span>
        </div>
        <div className="contactLogo" />
      </section>

   

    </div>
  );
}




      {/* Add image slider using React */}
   
      {/* Events show honge yaha */}
      {/* <section className="eventSection">
        <h1>Events</h1>
        <div className="eventContainer">
          <div className="eventCard">
            <h2>Plantation Drive</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In pariatur optio vero temporibus. Odit ipsam sequi tenetur, sint, a sunt exercitationem dignissimos unde voluptatum corporis eaque deserunt assumenda saepe fugit.</p>
            <span>22/01/2003 - 03:05 AM</span>
            <button>Participate</button>
          </div>
          <div className="eventCard">
            <h2>Donation Drive</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In pariatur optio vero temporibus. Odit ipsam sequi tenetur, sint, a sunt exercitationem dignissimos unde voluptatum corporis eaque deserunt assumenda saepe fugit.</p>
            <span>22/01/2003 - 03:05 AM</span>
            <button>Participate</button>
          </div>
          <div className="eventCard">
            <h2>Fund Raiser Drive</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In pariatur optio vero temporibus. Odit ipsam sequi tenetur, sint, a sunt exercitationem dignissimos unde voluptatum corporis eaque deserunt assumenda saepe fugit.</p>
            <span>22/01/2003 - 03:05 AM</span>
            <button>Participate</button>
          </div>
          <span>Load more events...</span>
        </div>
      </section> */}
      {/* Yahape jobs show honge  */}
      {/* <section className="jobSection">
        <h1>Jobs</h1>
        <div className="jobContainer">
          <div className="jobCard">
            <span>Username is looking for</span>
            <h2>Technician</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In pariatur optio vero temporibus. Odit ipsam sequi tenetur, sint, a sunt exercitationem dignissimos unde voluptatum corporis eaque deserunt assumenda saepe fugit.</p>
            <button>Apply</button>
          </div>
          <div className="jobCard">
            <span>Username is looking for</span>
            <h2>Carpenter</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In pariatur optio vero temporibus. Odit ipsam sequi tenetur, sint, a sunt exercitationem dignissimos unde voluptatum corporis eaque deserunt assumenda saepe fugit.</p>
            <button>Apply</button>
          </div>
          <div className="jobCard">
            <span>Username is looking for</span>
            <h2>Cloth Tailor</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In pariatur optio vero temporibus. Odit ipsam sequi tenetur, sint, a sunt exercitationem dignissimos unde voluptatum corporis eaque deserunt assumenda saepe fugit.</p>
            <button>Apply</button>
          </div>
          <span>Load more jobs...</span> */}
        {/* </div>
      </section> */}

     

export default Home;
