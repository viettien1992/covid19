import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Covid19 from './component/Covid19';
import Table19 from './component/TableCovid19'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Covid19} />
        <Route exact path="/1" component={Table19} />
      </Router>
    );
  }
}
export default App;