import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Covid19 from './component/Covid19';
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Covid19} />
      </Router>
    );
  }
}
export default App;