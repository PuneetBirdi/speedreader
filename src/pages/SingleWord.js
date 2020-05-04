import React, { Component } from 'react';
import Spinner from '../components/Spinner';

class SingleWord extends Component {
   constructor(){
      super();
      this.state = {
         type: "singleWord",
         singleWordArray: [`Hello! You're currently using a "single-word" style speed reader. This style seems to be the fastest way to consume content. There is something about our brains that lets us process words much faster when we don't have to worry about moving our eyes, or ignoring other words. Go ahead and try to play around with the words per minute setting! I think you'll be surprised at how fast you can go when you learn to trust yourself. Although this may be quick it's not the most practical form of speed reading as you won't be very helpful outside of this app. It's also not the best for reading novels, or other forms of media where the author has used punctuation and spacing in order to control the pace. But if you need to quickly devour a Wikipedia article before you walk into your next exam, this might just be your best bet. Go ahead and try to add your own content, or get a random passage of text with the control bar below!`],
         contentTitle: "Single Word Reading"
      }
   }

   componentDidMount(){
      this.props.getReadingTypeFunc("singleWord", true, this.state.singleWordArray, this.state.contentTitle);
   }

   componentWillUnmount(){
      this.props.getReadingTypeFunc(null, false);
   }

   flattenArray = (array) =>{
      const flatArray = array.flat();
      this.setState({
         singleWordRenderArray : flatArray
      })
   }


   render() {
      if(this.props.isLoading) return(
         <div className="flex center vert">
               <div className="wordContainer center wrapper half-width">
                  <span className="flex center mainWord" id="displayWord"><Spinner/></span>
               </div>
            </div>
      )
      return (
         <div>
            <div className="flex center vert">
               <div className="wordContainer center wrapper half-width">
                  <span className="flex center mainWord" id="displayWord">-READY-</span>
               </div>
            </div>
         </div>
      );
   }
}

export default SingleWord;