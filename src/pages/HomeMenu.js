import React, { Component } from 'react';
import paragraphGif from '../assets/paragraph.gif'
import oneWordGif from '../assets/oneWord.gif'
import {Link} from 'react-router-dom';

class HomeMenu extends Component {
   render() {
      return (
         <div>
            <div className="flex center">
               <Link to="/" className="highlighterBox box flex vert center half-width">
                  <div className = "flex vert center ">
                  <h2>Eye Trainer</h2>
                  <div className="img-wrapper">
                     <img src={paragraphGif} alt=""/>
                  </div>
                  <p>UNDER CONSTRUCTION</p>
                  </div>
               </Link>
               <Link to="singleword" className="box flex vert center half-width">
                  <div className="flex vert center">
                     <h2>Single-Word</h2>
                     <div className="img-wrapper">
                        <img src={oneWordGif} alt=""/>
                     </div>
                     <p>Devour content, one word at a time.</p>
                  </div>
               </Link>
            </div>
         </div>
      );
   }
}

export default HomeMenu;