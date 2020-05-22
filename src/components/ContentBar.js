import React, { Component } from 'react';
import axios from 'axios';

export default class ContentBar extends Component {
   constructor(){
      super();
      this.state = {

      }
   }

   componentDidMount(){
      this.splitByWord(this.props.defaultContent)
   }

   splitByWord = (array) =>{
      const wordArray = [];
        array.map((p)=>{
          const word = p.split(` `);
          wordArray.push(word);
        });
      this.setState({
          renderArray: wordArray
      }, () =>{
         this.props.setContent(this.state.renderArray)
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
       
   
   render() {
      return (
         <div className="contentBar wrapper half-width flex center vert">
            <div className="flex center full-width">
               <button className='contentBtn'
               onClick={(e)=> this.props.showModalFunc(e)}
               >Add Text</button>
               <button className='contentBtn'
               onClick={this.getRandomText}
               >Randomize Text</button>
            </div>
         </div>
      )
   }
}
