import { Observable } from 'tns-core-modules/data/observable';

import { SelectedPageService } from '../shared/selected-page-service';

interface Person {
  id: number;
  name: string;
  title: string;
  imageSrc: string;
  payRate: number;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  description: string;
  climber: boolean;
  punctual: boolean;
  reliable: boolean;
}

export class CardListViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('CardList');
  }

  people: Array<Person> = require('../lists/people.json');
}
