import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-services';
import DummySwapiService from '../../services/dummy-swapi-service';

import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context.js';

import './app.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default class App extends Component {

   state = {
      swapiService: new SwapiService()
   };

   onServiceChange = () => {
      this.setState(({ swapiService }) => {
         const Service = swapiService instanceof SwapiService ?
            DummySwapiService : SwapiService;
         return {
            swapiService: new Service()
         };
      });
   };

   render() {

      return (
         <ErrorBoundry>
            <SwapiServiceProvider value={this.state.swapiService} >
               <Router>
                  <div className="stardb-app">
                     <Header onServiceChange={this.onServiceChange} />
                     <RandomPlanet />
                     <Routes>
                        <Route index element={<Navigate to={"/people"} />} />
                        <Route path='/people' element={<PeoplePage />} />
                        <Route path='/planets' element={<PlanetsPage />} />
                        <Route path="/starships" element={<StarshipsPage />} />
                     </Routes>
                  </div>
               </Router>
            </SwapiServiceProvider>
         </ErrorBoundry>
      );
   }
}