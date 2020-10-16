import React from 'react';
import './App.css';
import PersonList from './components/PersonList'
import SpeechList from './components/SpeechList'
import SpeechTest from './components/SpeechTest'
import ALStats from './components/ALStats'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">

        <nav style={{ width: '100%', direction: 'rtl', float: 'right' }}>
          <ul className="mainmenu">
            <li>
              <Link to="/">صفحه اصلی</Link>
            </li>
            <li>
              <Link to="/speechtest/">تست</Link>
            </li>
            <li>
              <Link to="/personlist/">اشخاص</Link>
            </li>
            <li>
              <Link to="/speechlist/">سخنرانی ها</Link>
            </li>
            <li>
              <Link to="/alstats/">نتایج</Link>
            </li>
          </ul>
        </nav>
        <div className="clear"></div>
        <div className="p-2">
          <Route path="/personlist/" component={PersonList} />
          <Route path="/speechlist/" component={SpeechList} />
          <Route path="/speechtest/" component={SpeechTest} />
          <Route path="/alstats/" component={ALStats} />
        </div>

      </div>
    </Router>
  );
}

export default App;
