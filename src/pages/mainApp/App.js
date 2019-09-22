import React from 'react';
//import logo from './logo.svg';
import './App.scss';
//import HomePage from '../home/homepage'
import MainRouter from '../../routers'


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="TodoListApp">
          <MainRouter></MainRouter>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
