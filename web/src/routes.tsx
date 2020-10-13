import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//COMPONENTES
import Landding from './pages/Landding';
import Orphanages from './pages/OrphanagesMap';

function Routes(){
  return (
       <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landding} />
            <Route path="/app" component={Orphanages} />
          </Switch>  
       </BrowserRouter> 
  );
}

export default Routes;