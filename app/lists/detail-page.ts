import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { EventData } from 'tns-core-modules/data/observable';
import { NavigatedData, Page } from 'tns-core-modules/ui/page';
const topmost = require('tns-core-modules/ui/frame').topmost;

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

export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object;
  const navigationContext = <Person>page.navigationContext;
  page.bindingContext = navigationContext;
}

export function onDrawerButtonTap(args: EventData) {
  const sideDrawer = <RadSideDrawer>app.getRootView();
  sideDrawer.showDrawer();
}

export function goBack(): void {
  topmost().goBack();
}
