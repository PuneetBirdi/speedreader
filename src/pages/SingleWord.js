import React, { Component } from 'react';
import Spinner from '../components/Spinner';
import ControlBar from '../components/ControlBar';
import ContentBar from '../components/ContentBar';

let tempIndex = 0;
let timeout = null;
class SingleWord extends Component {
   constructor(){
      super();
      this.state = {
         defaultContent: [`Hello! You're currently using a "single-word" style speed reader. This style seems to be the fastest way to consume content. There is something about our brains that lets us process words much faster when we don't have to worry about moving our eyes, or ignoring other words. Go ahead and try to play around with the words per minute setting! I think you'll be surprised at how fast you can go when you learn to trust yourself. Although this may be quick it's not the most practical form of speed reading as you won't be very helpful outside of this app. It's also not the best for reading novels, or other forms of media where the author has used punctuation and spacing in order to control the pace. But if you need to quickly devour a Wikipedia article before you walk into your next exam, this might just be your best bet. Go ahead and try to add your own content, or get a random passage of text with the control bar below!`],
         renderArray: [],
         contentTitle: "Single Word Reading",
         currentIndex: 0,
         focusWord: "READY",
         isReading: false,
         isPaused: false,
         isLoading: false,
         interval: 600,
      }
   }

   start = () => {
      this.setState({
         isReading: true,
      })
      this.loop()
   }

   pause = () =>{
      this.setState({
         isPaused: true
      })
   }

   resume = () =>{
      this.setState({
         isPaused: false
      })
   }

   reset = () =>{
      tempIndex = 0;
      clearTimeout(timeout);
      this.setState({
         isReading: false,
         isPaused: false,
         currentIndex: 0,
      })
   }

   loop = () =>{
      if(this.state.isReading && !this.state.isPaused){
         tempIndex++
         this.setState({
            currentIndex: tempIndex
         })
      }
      timeout = window.setTimeout(this.loop, this.state.interval)
   }

   
   updateInterval = (interval) => {
      this.setState({
         interval : interval,
      })
   }

   setContent = (array, title) =>{
      const flatArray = array.flat();
      this.setState({
         renderArray: flatArray,
         contentTitle: title
      })
   }
         
   showModal = (e) =>{
      e.preventDefault();
      this.setState({
        showModal: true
      })
    }
  
    closeModal = (e) =>{
      e.preventDefault();
      this.setState({
        showModal: false
      })
    }
    

    getChildState = (isLoading) =>{
       this.setState({
          isLoading: isLoading
       })
    }

   render() {
      if(this.state.isLoading) return(
         <div className="flex center vert">
               <div className="wordContainer center wrapper half-width">
                  <span className="flex center mainWord" id="displayWord"><Spinner/></span>
               </div>
            </div>
      )
      return (
         <div>
            <div className="flex center vert">
               <h3>{this.state.contentTitle}</h3>
               <div className="wordContainer center wrapper half-width">
                  <span className="flex center mainWord" id="displayWord">
                     {this.state.renderArray[this.state.currentIndex]}
                  </span>
               </div>
            </div>
            <div className="flex vert center">
            <ControlBar
            startReadingFunc = {this.start}
            updateIntervalFunc = {this.updateInterval}
            pauseReadingFunc = {this.pause}
            resumeReadingFunc = {this.resume}
            resetFunc = {this.reset}
            isReading = {this.state.isReading}
            isPaused = {this.state.isPaused}
            />
            <ContentBar
               defaultContent = {this.state.defaultContent}
               contentTitle = {this.state.contentTitle}
               setContent = {this.setContent}
               closeModal = {this.closeModal}
               showModalFunc = {this.showModal}
               getState = {this.getChildState}
            />
            </div>
         </div>
      );
   }
}

export default SingleWord;