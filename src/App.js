import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Settings from './components/Setting'
import Home from './components/Home';
import News  from './components/News';
import DetailNews from './components/DetailNews';

function App() {
  var topNews = [];
  var indiaNews = [];

  useEffect(() => {
    fetch('/countrydata').then(console.log('success'));
  });

  const getNews = (top, india) =>{
    topNews = top;
    indiaNews = india;
  }

  const displayTopNews = (id) => {
    return topNews[id];
  }

  const displayIndiaNews = (id) => {
    console.log(indiaNews);
    return indiaNews[id];
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={()=><Home getNews={getNews} />}></Route>
          <Route path='/settings' component={Settings}/>
          <Route exact path='/news' component={News}/>
          <Route path='/news/:id' component={()=><DetailNews displayTopNews={displayTopNews}/>}></Route>
          <Route path='/news/india/:id' component={() => <DetailNews displayIndiaNews={displayIndiaNews}/>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
