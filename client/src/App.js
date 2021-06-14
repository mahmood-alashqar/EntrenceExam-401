import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Digimon from './components/Digimon';
import { BrowserRouter, Route, Switch } from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route exact path='/favorite'>
              <Digimon />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
