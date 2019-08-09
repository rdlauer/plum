import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { EventData } from 'tns-core-modules/data/observable';
import { NavigatedData, Page } from 'tns-core-modules/ui/page';
import { SearchBar } from 'tns-core-modules/ui/search-bar';
import { isIOS } from 'tns-core-modules/platform';
import { Switch } from 'tns-core-modules/ui/switch';

import { ListsViewModel } from './lists-view-model';

declare var UISearchBarStyle: any;

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  page.bindingContext = new ListsViewModel();

  // grab the switch value from the checkedChange event
  let mySwitch = <Switch>page.getViewById('favSwitch');
  mySwitch.on('checkedChange', swargs => {
    this.favorites = (<Switch>swargs.object).checked;
  });
}

export function onDrawerButtonTap(args: EventData) {
  const sideDrawer = <RadSideDrawer>app.getRootView();
  sideDrawer.showDrawer();
}

export function onSearchLoaded(args) {
  // remove the top/bottom border of the search bar on iOS
  if (isIOS) {
    let sb = <SearchBar>args.object;
    sb.ios.searchBarStyle = UISearchBarStyle.UISearchBarStyleMinimal;
  }
}
