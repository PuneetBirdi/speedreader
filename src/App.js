import React, {Component} from 'react';
import NavBar from './components/NavBar';
import HomeMenu from './pages/HomeMenu';
import Highlighter from './pages/Highlighter';
import SingleWord from './pages/SingleWord';
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


  //this function will show the input modal when the user decides to input their own content

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
        </div>
      </Router>
    );
  }
}

export default App;
