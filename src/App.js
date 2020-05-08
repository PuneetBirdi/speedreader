import React, {Component} from 'react';
import NavBar from './components/NavBar';
import HomeMenu from './pages/HomeMenu';
import Highlighter from './pages/Highlighter';
import SingleWord from './pages/SingleWord';
import ControlBar from './components/ControlBar';
import Modal from './components/Modal';
import axios from 'axios';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

class App extends Component{
  constructor() {
    super();
    this.state = {
       paragraphArray: [],
       renderArray: [],
       contentTitle: "",
       isReading: false,
       isLoading: false,
       isReady: false,
       typeSelected: false,
       readingType: null,
       showModal: false,
       interval: 600,
    }
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


  //this function will receive an array of paragraphs, map through them and output an array where each word is separated into its own string.
  //Then it will feed the result into renderArray, which is sent to Highlighter.js to be rendered onto the page.
  splitByWord = (array) =>{
    const wordArray = [];
      array.map((p)=>{
        const word = p.split(` `);
        wordArray.push(word);
      });
    this.setState({
        renderArray: wordArray
    })
  }
  
  //this will get the type of reading selected by the user and update the state accordingly
  getReadingType = (type, ready, array, contentTitle) =>{
    if (array) this.splitByWord(array);
    this.setState({
      readingType: type,
      typeSelected: true,
      isReady: ready,
      contentTitle: contentTitle
    })
  }

  getReadingContent = (contentTitle, array) =>{
    if (array) this.splitByWord(array);
    this.setState({
      contentTitle: contentTitle,
    })
  }
  //this function will grab the required information from "controlBar" and update the state here. This is done before starting the reading
  updateInterval = (interval) => {
    this.setState({
      interval : interval,
    })
  }

  //this function will check which form of reading the user has selected, and initiate the appropriate function
  startReading =  () =>{
    this.setState({
      isReading: true,
    })
    if(this.state.readingType === "highlighter"){
      this.highlight(this.state.interval);
    }else if(this.state.readingType === "singleWord"){
      this.loopWord(this.state.interval);
    }
  }

  //this function will loop through each word in the "renderArray" and display it one at a time in the displayWord box
  loopWord = (interval) =>{
    const wordArray = this.state.renderArray.flat();
      if (interval === 0){
        alert("Please set your desired words per minute.")
      }
        for (let index = 0; index <= wordArray.length; index++){
            setTimeout(()=>{
              if(this.state.isReading === true && index < wordArray.length){
                document.getElementById("displayWord").innerHTML = wordArray[index];
              }else if(index === wordArray.length){
                this.setState({
                  isReading: false
              })
              }
            },index * interval)
        }
  }

  //this function will loop through the displayed words and apply the focus styling to each one, while also removing it from the trailing word
    //this function will loop through the displayed words and apply the focus styling to each one, while also removing it from the trailing word
  highlight = (interval) =>{
    const length = this.state.renderArray.flat().length;
      this.setState({
        isReading: true,
      })
      for (let index = 1; index <= length; index++) {
        document.getElementById(0).className = "focus";
            setTimeout(() =>{
                if(this.state.isReading === true && index < length){
                  document.getElementById(index - 1).className = "";
                  document.getElementById(index).className = "focus";
              }else if(index === length){
                  document.getElementById(index - 1).className = "";
                  this.setState({
                    isReading: false
                  })
              }
            }, index * interval)
        }
    }
  
  //this function will force a reload of the page
  stopReset = (e) =>{
    window.location.reload();
  }

  //this function will show the input modal when the user decides to input their own content
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

render(){
    return (
      <Router>
            <div className="App">
        <NavBar stopStateFunc = {this.stopState}/>
        <Switch>
          <Route exact path = "/">
            <HomeMenu
              getReadingTypeFunc = {this.getReadingType}
            />
          </Route>
          <Route exact path = "/highlighter">
            <Highlighter 
              isLoading = {this.state.isLoading}
              getReadingTypeFunc = {this.getReadingType}
              renderArray={this.state.renderArray}
            />
          </Route>
          <Route exact path = "/singleword">
            <SingleWord 
              isLoading = {this.state.isLoading}
              getReadingTypeFunc = {this.getReadingType}
              renderArray={this.state.renderArray}
            />
          </Route>
        </Switch>
        <div className="flex center">
            <ControlBar
               isLoading = {this.state.isLoading}
               isReading = {this.state.isReading}
               isReady = {this.state.isReady}
               contentTitle = {this.state.contentTitle}
               updateIntervalFunc = {this.updateInterval}
               startReadingFunc = {this.startReading}
               stopReadingFunc = {this.stopReset}
               showModalFunc = {this.showModal}
               getRandomTextFunc = {this.getRandomText}
            />
            <Modal 
            showModal = {this.state.showModal}
            closeModal = {this.closeModal}
            getReadingTypeFunc = {this.getReadingContent}
            />
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
