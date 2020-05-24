import React, { Component } from 'react'

export default class Modal extends Component {
   constructor(){
      super();
      this.state={
         contentTitle:"",
         userInput: "",
      }
   }

   //this function will grab the content title and load into the component state.
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
    }

   submitContent = (e)  =>{
      e.preventDefault();
      this.props.processContentFunc(this.state.userInput, this.state.contentTitle)
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
                value={this.state.contentTitle}
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
