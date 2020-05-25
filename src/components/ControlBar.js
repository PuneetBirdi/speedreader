import React, { Component } from 'react';

class ControlBar extends Component {
   constructor(){
      super();
      this.state = {
         wpm: 0,
         interval: 0,
      }
   }
   //Display the user WPM input as the slider is moved, and calculate interval in seconds
   calcInterval = (e) => {
      const wpm = e.target.value
      const changeSpan = document.getElementById("change");
      changeSpan.innerHTML = wpm;
      //calculate interval between words in seconds
      const interval = (60 / wpm) * 1000;
      this.setState({
         wpm: wpm,
         interval : interval
      })
      //this line will pass the interval value back to App.js
      this.props.updateIntervalFunc(interval);
   };

   // resetBtn = () =>{
   //    return
   //    <button className="startBtn" 
   //    id="startBtn"
   //    onClick={(e) => this.props.startReadingFunc(this.state.interval)}>
   //          Reset
   //    </button>
   // }

   startOrReset = () =>{
      if (!this.props.isReading){
         return(
            <button className="startBtn" 
            id="startBtn"
            onClick={(e) => this.props.startReadingFunc(this.state.interval)}
            disabled = {this.props.isReading}
            >
                  Start
            </button>
         )
      }else if(this.props.isPaused || this.props.isReading){
         return(
            <button className="startBtn" 
            id="startBtn"
            onClick={(e) => this.props.resetFunc(e)}>
                  Reset
            </button>
         )
      }
   }

   render() {
      return (
         <div className="controlBar wrapper half-width flex center vert">
            <div className="flex center full-width">
               <this.startOrReset/>
               <button className="stopBtn"
               id="stopBtn"
               onClick={(e)=> this.props.pauseReadingFunc(e)}
               disabled = {!this.props.isReading && !this.props.isPaused}
               >
                  Pause
               </button>
               <button className="stopBtn"
               id="stopBtn"
               onClick={(e)=> this.props.resumeReadingFunc(e)}
               disabled = {!this.props.isPaused}
               >
                  Resume
               </button>
            </div>
            <div className="flex center full-width vert">
               <label htmlFor="wpmController"><strong id="change">100</strong> Words Per Minute</label>
               <input type="range" 
               name="wpmController" 
               id="wpmController" 
               min="100" max="750" 
               step="1"
               onChange={this.calcInterval}
               value={this.state.wpm}
               />
            </div>
         </div>
      );
   }
}

export default ControlBar;