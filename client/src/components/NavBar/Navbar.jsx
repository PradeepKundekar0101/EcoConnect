import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './NavBar.css';
const NavWrapper = styled.nav`
  background-color: #333;
  color: white;
  padding: 1.2rem;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 1rem;
  cursor: pointer;
  font-size: 20px;
`;


const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state)=>{return state.user});
  const viewProfile=()=>{
    user.estb? navigate(`/ngo/${user._id}`): navigate("/userprofile");
  }
    const token = useSelector((state)=>{ return state.token});
  return (
    <NavWrapper>
        {/* <Link style={{color:"#fff",textDecoration:"none"}} to="/">EcoConnect</Link> */}
      <NavList>
        <NavItem> <Link to="/" style={{color:"#fff",textDecoration:"none"}}>Home</Link> </NavItem>
        <NavItem> <Link to="/events" style={{color:"#fff",textDecoration:"none"}}>Events</Link></NavItem>
        <NavItem> <Link to="/ngo" style={{color:"#fff",textDecoration:"none"}}>NGOs</Link></NavItem>
      
        <NavItem> <Link to="/#contact" style={{color:"#fff",textDecoration:"none"}}>Contact</Link> </NavItem>
        {token!==null ? <> <button onClick={()=>{viewProfile()}} className='profileBtn'>Profile</button></>:<NavItem><Link style={{color:"#fff",textDecoration:"none"}} to="/login/user">Login/Signup</Link></NavItem>}  
      </NavList>
    </NavWrapper>
  );
};

export default Navbar;
