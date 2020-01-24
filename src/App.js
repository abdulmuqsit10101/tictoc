import React from 'react';
import './App.css';
import TicTak from './containers/TicTak';
import { BrowserRouter as Hh, Switch as JKL, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Hh>
          <JKL>
              <Route exact path="/" component={TicTak} />
          </JKL>
      </Hh>
    </div>
  );
}

export default App;