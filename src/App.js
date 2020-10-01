import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Settings from './components/Setting'
import WorldMap from './components/WorldMap';
import Messages from './components/Messages';

function App() {

  useEffect(() => {
    fetch('/countrydata').then(console.log('success'));
  })

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Route exact path='/' component={WorldMap}/>
      <Route path='/settings' component={Settings}/>
      </BrowserRouter>
      <Messages/>
    </div>
  );
}

export default App;
