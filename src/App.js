import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from "react-router-dom";
import HomePage from './HomePage.js'


export default class App extends Component {
 

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' render={(routerProps) => <HomePage 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps} />} 
              />
            {/* <Route 
            exact path='/detail' 
              render={(routerProps) => <DetailPage 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps}/>} 
              /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}