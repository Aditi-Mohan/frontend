import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Settings from './components/Setting'
import Home from './components/Home';

function App() {

  useEffect(() => {
    fetch('/countrydata').then(console.log('success'));
  })

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Route exact path='/' component={Home}/>
      <Route path='/settings' component={Settings}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
