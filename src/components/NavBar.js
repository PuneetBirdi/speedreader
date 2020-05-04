import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
 
const NavBar = ({icon, title}) => {
   return (
       <nav className = "navbar">
           <h1>
               {title}
           </h1>
           <ul>
               <li>
                <Link to="/">Home</Link>
               </li>
           </ul>
       </nav>
   )
}

NavBar.defaultProps = {
   title: 'Speed Reader'
}

export default NavBar