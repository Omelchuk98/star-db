import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import Row from '../row';
import './people-page.css';
import SwapiService from '../../services/swapi-services';


export default class PeoplePage extends Component {
   swapiService = new SwapiService();
   state = {
      selectedPerson: 3,
      hasError: false,
   };

   componentDidCatch() {
      this.setState({
         hasError: true
      });
   };

   onPersonSelected = (id) => {
      this.setState({
         selectedPerson: id
      });
   };

   render() {
      if (this.state.hasError) {
         return <ErrorIndicator />;
      }
      const itemList = (<ItemList
         onItemSelected={this.onPersonSelected}
         getData={this.swapiService.getAllPeople}
         renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`} />);

      const personDetails = (<PersonDetails personId={this.state.selectedPerson} />);
      return (
         <Row left={itemList} right={personDetails} />
      )
   }
}