import {
  Observable,
  PropertyChangeData
} from 'tns-core-modules/data/observable';
import { RadListView } from 'nativescript-ui-listview';
import { ObservableProperty } from '../observable-property-decorator';
import { SearchBar } from 'tns-core-modules/ui/search-bar';
import { isIOS } from 'tns-core-modules/platform';
import { EventData } from 'tns-core-modules/data/observable';
import { Label } from 'tns-core-modules/ui/label';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { ValueList } from 'nativescript-drop-down';
import { Slider } from 'tns-core-modules/ui/slider';
import { SelectedIndexChangedEventData } from 'nativescript-drop-down';

declare const IQKeyboardManager: any;
const topmost = require('tns-core-modules/ui/frame').topmost;

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
}

export class ListsViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Lists');

    this.on(
      Observable.propertyChangeEvent,
      (propertyChangeData: PropertyChangeData) => {
        if (propertyChangeData.propertyName == 'searchPhrase') {
          this._refilter();
        } else if (
          propertyChangeData.propertyName == 'slider' ||
          propertyChangeData.propertyName == 'favorites' ||
          propertyChangeData.propertyName == 'titleIndex'
        ) {
          this._otherfilters();
        }
      }
    );

    if (isIOS) {
      var keyboard = IQKeyboardManager.sharedManager();
      keyboard.shouldResignOnTouchOutside = true;
    }
  }

  showDialog() {
    const page = topmost().currentPage;
    page.className = 'page dialogOpen';
  }

  closeDialog() {
    const page = topmost().currentPage;
    page.className = 'page';
  }

  @ObservableProperty() searchPhrase: string;

  allPeople: Array<Person> = require('./people.json');

  // *************
  // begin search
  // *************

  people = this.allPeople;

  _refilter() {
    let f = this.searchPhrase.trim().toLowerCase();

    this.people = this.allPeople.filter(
      e =>
        e.name.toLowerCase().includes(f) ||
        e.title.toLowerCase().includes(f) ||
        e.description.toLowerCase().includes(f)
    );

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

  // **********
  // end search
  // **********

  // navigate to item detail view

  itemDetail(args: EventData) {
    const tappedGrid = <GridLayout>args.object;
    const _person = <Person>tappedGrid.parent.bindingContext;

    topmost().navigate({
      moduleName: 'lists/detail-page',
      context: _person,
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease'
      }
    });
  }

  // favorites

  itemFavorite(args: EventData) {
    const page = topmost().currentPage;
    let listView = <RadListView>page.getViewById('list-view');

    const tappedLabel = <Label>args.object;
    let id = parseInt(tappedLabel.parent.bindingContext.id);

    let _people = <Array<Person>>listView.items;
    const person = _people.filter(p => p.id === id)[0];

    person.isFavorite = !person.isFavorite;
    let totalFavorites = _people.filter(p => p.isFavorite).length;

    // for some reason {{ itemFavorites }} is not updating in the action bar?
    let labelHeart = <Label>page.getViewById('heartLabel');
    labelHeart.text = totalFavorites.toString();

    listView.refresh();
  }

  // *************
  // begin filters
  // *************

  slider = 200;
  rate = 200;
  favorites = false;
  titleIndex = 0;

  // * below is an example of a dropdown list with separate text/value *
  // https://github.com/PeterStaev/NativeScript-Drop-Down

  itemSource = new ValueList<string>([
    { value: '', display: '' },
    { value: 'DA', display: 'Developer Advocate' },
    { value: 'SMC', display: 'Social Media Coordinator' },
    { value: 'PMM', display: 'Product Marketing Manager' },
    { value: 'CD', display: 'Company Dog' },
    { value: 'CSM', display: 'Customer Success Manager' },
    { value: 'VPE', display: 'VP Engineering' },
    { value: 'MI', display: 'Marketing Intern' }
  ]);

  onSliderLoaded(args) {
    const sliderComponent: Slider = <Slider>args.object;
    sliderComponent.on('valueChange', sargs => {
      this.rate = Math.round((<Slider>sargs.object).value);
    });
  }

  ddSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    this.titleIndex = args.newIndex;
  }

  _otherfilters() {
    // pay rate
    this.people = this.allPeople.filter(e => e.payRate <= this.rate);

    // only filter favorites if true
    if (this.favorites == true) {
      this.people = this.people.filter(e => e.isFavorite == this.favorites);
    }

    // only filter by title if something selected
    if (this.titleIndex > 0) {
      this.people = this.people.filter(
        e => e.title == this.itemSource.getDisplay(this.titleIndex)
      );
    }

    this.set('people', this.people.slice(0));
  }

  // ***********
  // end filters
  // ***********
}
