import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Level1 from "./views/Level1";
import Level2 from "./views/Level2";
import Home from "./views/Home";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Level1" component={Level1} />
        <Route exact path="/Level2" component={Level2} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
