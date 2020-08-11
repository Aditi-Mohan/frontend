import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Settings from './components/Setting'
import WorldMap from './components/WorldMap';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Route exact path='/' component={WorldMap}/>
      <Route path='/settings' component={Settings}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
