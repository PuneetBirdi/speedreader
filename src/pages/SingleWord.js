import React, { Component } from 'react';
// import Spinner from '../components/Spinner';
import ControlBar from '../components/ControlBar';
import ContentBar from '../components/ContentBar';


class SingleWord extends Component {
   constructor(){
      super();
      this.state = {
         type: "singleWord",
         defaultContent: [`Hello! You're currently using a "single-word" style speed reader. This style seems to be the fastest way to consume content. There is something about our brains that lets us process words much faster when we don't have to worry about moving our eyes, or ignoring other words. Go ahead and try to play around with the words per minute setting! I think you'll be surprised at how fast you can go when you learn to trust yourself. Although this may be quick it's not the most practical form of speed reading as you won't be very helpful outside of this app. It's also not the best for reading novels, or other forms of media where the author has used punctuation and spacing in order to control the pace. But if you need to quickly devour a Wikipedia article before you walk into your next exam, this might just be your best bet. Go ahead and try to add your own content, or get a random passage of text with the control bar below!`],
         renderArray: [],
         contentTitle: "Single Word Reading",
         currentIndex: 0,
         focusWord: "READY",
         isReading: false,
         interval: 600
      }
   }


   componentWillUnmount(){
      this.props.getReadingTypeFunc(null, false);
   }

   read = () => {
      this.setState({
         isReading: true,
      })
      let currentIndex = this.state.currentIndex
      for (let index = 0; index < this.state.renderArray.length; index++) {
         window.setTimeout(() =>{
            if(this.state.isReading){
               console.log(this.state.interval)
               this.setState({
                  focusWord: this.state.renderArray[currentIndex]
               })
               currentIndex++
            }
         }, index * this.state.interval)
      }
   }

   pause = () =>{
      this.setState({
         isReading: false
      })
   }

   resume = () =>{
      this.setState({
         isReading: true
      })
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

   render() {
      return (
         <div>
            <div className="flex center vert">
               <h3>{this.state.contentTitle}</h3>
               <div className="wordContainer center wrapper half-width">
                  <span className="flex center mainWord" id="displayWord">
                     {this.state.focusWord}
                  </span>
               </div>
            </div>
            <div className="flex vert center">
            <ControlBar
            startReadingFunc = {this.read}
            updateIntervalFunc = {this.updateInterval}
            pauseReadingFunc = {this.pause}
            resumeReadingFunc = {this.resume}
            isReading = {this.state.isReading}
            />
            <ContentBar
               defaultContent = {this.state.defaultContent}
               setContent = {this.setContent}
            />
            </div>
         </div>
      );
   }
}

export default SingleWord;