import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Navigation from './components/Navigation';
import './App.css';
import HomeChanged from './pages/HomeChanged';
import SimpleSlider from './pages/Slider';
import Netflix from './pages/About';
import SimpleSlider2 from './pages/Slider2';

function App() {
  return (
    //Link를 쓰는 Navigation 컴포넌트는 Router 안에 포함시켜줘야 한다!
    <HashRouter>
      <Navigation />
      <Route path="/" exact component={Home} />
      <Route path="/changed" exact component={HomeChanged} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/slider" component={SimpleSlider} />
      <Route path="/slider2" component={SimpleSlider2} />
      <Route path="/netflix" component={Netflix} />
    </HashRouter>
  );
}

export default App;
