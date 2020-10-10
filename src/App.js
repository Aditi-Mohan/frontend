import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Settings from './components/Setting'
import Home from './components/Home';
import News  from './components/News';
import DetailNews from './components/DetailNews';
import Footer from './components/Footer';
import Messages from './components/Messages';

function App() {

  useEffect(() => {
    fetch('/countrydata').then(console.log('success'));
  });

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/settings' component={Settings}/>
          <Route path='/messages' component={Messages} />
          <Route exact path='/news' component={News}/>
          <Route path='/news/india/:id' component={() => <DetailNews india={true} />}></Route>
          <Route path='/news/:id' component={()=><DetailNews />}></Route>
        </Switch>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
