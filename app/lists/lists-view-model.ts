import { Observable, PropertyChangeData } from 'data/observable';
import { ObservableProperty } from '../observable-property-decorator';
import { SearchBar } from 'ui/search-bar';
import { isIOS } from 'tns-core-modules/platform';
import { EventData } from 'tns-core-modules/data/observable';
import { Label } from 'tns-core-modules/ui/label';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';

declare const IQKeyboardManager: any;
const topmost = require('ui/frame').topmost;

import { SelectedPageService } from '../shared/selected-page-service';

export class ListsViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Lists');

    this.on(
      Observable.propertyChangeEvent,
      (propertyChangeData: PropertyChangeData) => {
        if (propertyChangeData.propertyName == 'searchPhrase') {
          this._refilter();
        }
      }
    );

    if (isIOS) {
      var keyboard = IQKeyboardManager.sharedManager();
      keyboard.shouldResignOnTouchOutside = true;
    }
  }

  @ObservableProperty() searchPhrase: string;

  allPeople: {
    id: number;
    name: string;
    title: string;
    imageSrc: string;
    payRate: number;
    rating: number;
    reviews: number;
    isFavorite: boolean;
    description: string;
  }[] = [
    {
      id: 1,
      name: 'Jane McDonald',
      title: 'Developer Advocate',
      imageSrc: 'https://placem.at/people?random=11&w=500&txt=0',
      payRate: 100,
      rating: 4.5,
      reviews: 20,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 2,
      name: 'Steven Philips',
      title: 'Social Media Coordinator',
      imageSrc: 'https://placem.at/people?random=2&w=500&txt=0',
      payRate: 120,
      rating: 3.9,
      reviews: 46,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 3,
      name: 'Mary Landow',
      title: 'Product Marketing Manager',
      imageSrc: 'https://placem.at/people?random=3&w=500&txt=0',
      payRate: 150,
      rating: 4.7,
      reviews: 30,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 4,
      name: 'Sam',
      title: 'Company Dog',
      imageSrc: 'https://placem.at/people?random=4&w=500&txt=0',
      payRate: 10,
      rating: 4.9,
      reviews: 98,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 5,
      name: 'Abby Keefer',
      title: 'Customer Success Manager',
      imageSrc: 'https://placem.at/people?random=5&w=500&txt=0',
      payRate: 99,
      rating: 4.9,
      reviews: 47,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 6,
      name: 'Michelle Rodgers',
      title: 'VP Engineering',
      imageSrc: 'https://placem.at/people?random=6&w=500&txt=0',
      payRate: 55,
      rating: 2.5,
      reviews: 7,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 7,
      name: 'Lucy Gold',
      title: 'Marketing Intern',
      imageSrc: 'https://placem.at/people?random=77&w=500&txt=0',
      payRate: 170,
      rating: 4.2,
      reviews: 90,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 8,
      name: 'Jerry Kramer',
      title: 'Senior Engineer',
      imageSrc: 'https://placem.at/people?random=99&w=500&txt=0',
      payRate: 140,
      rating: 4.7,
      reviews: 25,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 9,
      name: 'Kelna Cuevas',
      title: 'Principal Product Manager',
      imageSrc: 'https://placem.at/people?random=55&w=500&txt=0',
      payRate: 100,
      rating: 2.7,
      reviews: 3,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 10,
      name: 'Sierra Riley',
      title: 'Sales Coordinator',
      imageSrc: 'https://placem.at/people?random=44&w=500&txt=0',
      payRate: 95,
      rating: 4.2,
      reviews: 18,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 11,
      name: 'Lilly Morris',
      title: 'Engineering Intern',
      imageSrc: 'https://placem.at/people?random=123&w=500&txt=0',
      payRate: 180,
      rating: 4.9,
      reviews: 54,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 12,
      name: 'Ariel Rhodes',
      title: 'Customer Success Manager',
      imageSrc: 'https://placem.at/people?random=33&w=500&txt=0',
      payRate: 120,
      rating: 3.2,
      reviews: 10,
      isFavorite: false,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  // search/filter

  people = this.allPeople;

  _refilter() {
    let f = this.searchPhrase.trim().toLowerCase();

    this.people = this.allPeople.filter(function(e) {
      return (
        e.name.toLowerCase().includes(f) || e.title.toLowerCase().includes(f)
      );
    });

    this.set('people', this.people.slice(0));
  }

  onSearchSubmit(args): void {
    this._refilter();
    let searchBar = <SearchBar>args.object;
    searchBar.dismissSoftInput();
  }

  onClear(): void {
    this._refilter();
  }

  // navigate to item detail view

  itemDetail(args: EventData) {
    // const tappedLabel = <Label>args.object;
    // console.log('Tapped ', tappedLabel);
    //console.log('detail: ' + args);

    const tappedGrid = <GridLayout>args.object;
    let id = parseInt(tappedGrid.parent.bindingContext.id);

    console.log(id);

    // let _people = this.people;
    // const index = _people.findIndex(item => item.id === id);

    // if (_people[index].isFavorite) {
    //   _people[index].isFavorite = false;
    //   this.totalFavorites = this.totalFavorites - 1;
    // } else {
    //   _people[index].isFavorite = true;
    //   this.totalFavorites = this.totalFavorites + 1;
    // }

    // this.set('people', _people);

    // const page = topmost().currentPage;
    // let listView = page.getViewById('list-view');
    // listView.refresh();
  }

  // favorites

  totalFavorites = 0;

  itemFavorite(args: EventData) {
    const tappedLabel = <Label>args.object;
    let id = parseInt(tappedLabel.parent.bindingContext.id);

    // let _people = this.people; <-- can't access variables outside the scope of this function!?
    let _people = tappedLabel.page.bindingContext.allPeople;
    const index = _people.findIndex(item => item.id === id);

    if (_people[index].isFavorite) {
      _people[index].isFavorite = false;
      this.totalFavorites = this.totalFavorites - 1;
    } else {
      _people[index].isFavorite = true;
      this.totalFavorites = this.totalFavorites + 1;
    }

    console.log(_people);

    // this.set('people', _people);

    // const page = topmost().currentPage;
    // let listView = page.getViewById('list-view');
    // listView.refresh();
  }
}
