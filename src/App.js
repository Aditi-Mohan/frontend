import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Settings from './components/Setting'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Route path='/settings' component={Settings}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
