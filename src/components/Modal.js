import React, { Component } from 'react'

export default class Modal extends Component {
   constructor(){
      super();
      this.state={
         contentTitle:"",
         userInput: "",
         userContentArray: []
      }
   }

   //this function will grab the content title and load itinot the component state.
   handleTitleInput = (event) =>{
      event.preventDefault();
      this.setState({
         contentTitle: event.target.value
      })
   }

   //this function will grab the users inputted content and load it into the component state.
   handleContentInput = (event) =>{
      event.preventDefault();
      this.setState({
        userInput: event.target.value
      })
      this.splitByParagraph();
    }
   
    //this function will grab the input from the state and split it up into an array of separate paragraphs
   splitByParagraph = () =>{
      const paragraphs = this.state.userInput.split("\n")
      const paragraphArray = [];
      //this block will ensure that no empty arrays are pushed into the state in the even that the user uses double spaces between lines
      paragraphs.map((p) =>{
         if(p != "") paragraphArray.push(p);
      });
      //after ensuring there are no empties, the array can be loaded into the state
      this.setState({
         userContentArray: paragraphArray
      })
   }

   submitContent = (e)  =>{
      e.preventDefault();
      this.props.closeModal(e);
   }

    render(){
       if(!this.props.showModal){
          return null;
       }
       return(
          <div className="modal">
             <form onSubmit={this.submitContent} className="flex center vert full-height">
                <label htmlFor="contentTitle">Title</label>
                <input type="text" 
                name="contentTitle" 
                id="contentTitle" 
                onChange={this.handleTitleInput} 
                required/>
                <label htmlFor="content">Content</label>
                <textarea required name="content" id="content" value={this.state.userInput} onChange={this.handleContentInput} required></textarea>
                <input className="submitBtn" type="submit" value="Submit" />
                <button className="cancelBtn" onClick={(e) =>{this.props.closeModal(e)}}>Cancel</button>
             </form>
          </div>
       )
    }
  }
