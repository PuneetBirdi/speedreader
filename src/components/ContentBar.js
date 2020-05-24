import React, { Component } from 'react';
import Modal from '../components/Modal';
import axios from 'axios';

export default class ContentBar extends Component {
   constructor(){
      super();
      this.state = {
         showModal: false,
         contentTitle: "",
         rawContent: "",
         isLoading: false
      }
   }

   componentDidMount(){
      this.splitByWord(this.props.defaultContent)
   }

   splitByWord = (array, contentTitle) =>{
      const wordArray = [];
        array.map((p)=>{
          const word = p.split(` `);
          wordArray.push(word);
        });
      this.setState({
          renderArray: wordArray
      }, () =>{
         this.props.setContent(this.state.renderArray, this.state.contentTitle)
      })
   }
   
   getRandomText = () =>{
      this.setState({
        isLoading: true
      })
        axios({
          url: `https://litipsum.com/api/json`,
          method: 'GET'
        }).then((response)=>{
          this.setState({
            paragraphArray: response.data.text,
            contentTitle: response.data.title,
          })
          this.splitByWord(this.state.paragraphArray);
          this.setState({
            isLoading: false
          })
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

   //this function will grab the input from the state and split it up into an array of separate paragraphs
   splitByParagraph = (rawContent, contentTitle) =>{
      const paragraphs = rawContent.split("\n")
      const paragraphArray = [];
      //this block will ensure that no empty arrays are pushed into the state in the even that the user uses double spaces between lines
      paragraphs.map((p) =>{
         if(p != "") paragraphArray.push(p);
      });
      //after ensuring there are no empties, the array can be loaded into the state
      this.setState({
         userContentArray: paragraphArray,
         contentTitle: contentTitle
      }, ()=>{
         this.splitByWord(this.state.userContentArray)
      })
   }

   render() {
      return (
         <div className="contentBar wrapper half-width flex center vert">
            <div className="flex center full-width">
               <button className='contentBtn'
               onClick={this.showModal}
               >Add Text</button>
               <button className='contentBtn'
               onClick={this.getRandomText}
               >Randomize Text</button>
            </div>
            <Modal
               showModal = {this.state.showModal}
               closeModal = {this.closeModal}
               processContentFunc = {this.splitByParagraph}
            />
         </div>
      )
   }
}
