import React from 'react';

import Counter from "./components/Counter";
import Info from "./components/Info";
import Info2 from "./components/Info2";
import Counter2 from "./components/Counter2";
import Info3 from './components/Info3';
import UseMemo from './components/UseMemo';
import UseCustomAct from './components/UseCustomAct';

import "./css/style.min.css"

function App() {

  return (
    <div>
      <Counter/>
      <Info/>
      <Info2/>
      <Counter2/>
      <Info3/>
      <UseMemo/>
      <UseCustomAct/>
    </div>
  );
}

export default App;