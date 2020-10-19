import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//COMPONENTES
import Landding from './pages/Landding';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage'

function Routes(){
  return (
       <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landding} />
            <Route path="/app" component={OrphanagesMap} />
            <Route path="/orphanage/create" component={CreateOrphanage} />
            <Route path="/orphanage/:id" component={Orphanage} />
          </Switch>  
       </BrowserRouter> 
  );
}

export default Routes;