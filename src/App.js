import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  state={
    progress:0
  }
  setprogress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={5}
        color='#f11946'
        progress={this.state.progress}
      />
          <Routes>
            <Route exact path="/" element={<News setprogress={this.setprogress} Key="general" pageSize={6} country="us" category="general" />} />
            <Route exact path="/business" element={<News setprogress={this.setprogress} key="business" pageSize={6} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News setprogress={this.setprogress} key="entertainment" pageSize={6} country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News setprogress={this.setprogress} key="health" pageSize={6} country="us" category="health" />} />
            <Route exact path="/science" element={<News setprogress={this.setprogress} key="science" pageSize={6} country="us" category="science" />} />
            <Route exact path="/sports" element={<News setprogress={this.setprogress} key="sports" pageSize={6} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News setprogress={this.setprogress} key="technology" pageSize={6} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
