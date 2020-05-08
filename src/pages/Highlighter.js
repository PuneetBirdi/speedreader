import React, { Component } from 'react';
import Spinner from '../components/Spinner';

class Highlighter extends Component{
   constructor(){
      super();
      this.state ={
         highlighterArray: [`Hello! You are currently using a "highlight" style speed reader. The main function of this style is to train your eyes to move smoothly and quickly across a page while you read. The key here is to avoid reading each word out into your brain. You should learn to trust that your brain will be able to comprehend what you're reading. Although this technique seems to be a little bit slower than the single-word style of speed reading applcation, it's definitely more practical because it can be applied to your life outside of this app in books, websites, etc... If you'd like to load in your own content to read, or get a random passage of text from a classic book, you can do so with the control bar below!`],
         contentTitle: "Highlighter Reading"
      }
   }

   componentDidMount(){
      this.props.getReadingTypeFunc("highlighter", true, this.state.highlighterArray,this.state.contentTitle);
   }

   componentWillUnmount(){
      this.props.getReadingTypeFunc(null, false);
   }


   render(){
      let wordKey = -1;
      if(this.props.isLoading) return(
         <div className="flex center vert">
            <div className="contentContainer center wrapper half-width">
                <Spinner/>
            </div>
         </div>
      ) 
      return (
         <div className="flex center vert">
            <div className="contentContainer center wrapper half-width">
                  {this.props.renderArray.map((paragraph, key) =>{
                  return(
                     <p key={key} id={"p" + key}>
                        {this.props.renderArray[key].map((word, key)=>{
                           wordKey++
                           return(
                              <span key = {key} id={wordKey}>{word + " "}</span>
                           )
                        })}
                     </p>
                  )})}
            </div>
         </div>
      );
   }
}


export default Highlighter;

