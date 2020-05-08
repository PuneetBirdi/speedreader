import React from 'react';
import {Link} from 'react-router-dom';
 
const NavBar = ({title}) => {
   return (
       <nav className = "navbar">
           <h1>
               {title}
           </h1>
           <ul>
               <li>
                <Link to="/">Home</Link>
               </li>
               <li>
                   <Link>Login</Link>
               </li>
               <li>
                   <Link>Sign Up</Link>
               </li>
           </ul>
       </nav>
   )
}

NavBar.defaultProps = {
   title: 'Speed Reader'
}

export default NavBar