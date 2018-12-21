import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { EventData } from 'tns-core-modules/data/observable';
import { topmost } from 'tns-core-modules/ui/frame';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';

import { AppRootViewModel } from './app-root-view-model';

declare const TKSideDrawerShadowMode: any;

export function onLoaded(args: EventData): void {
  const drawerComponent = <RadSideDrawer>args.object;
  drawerComponent.bindingContext = new AppRootViewModel();

  if (drawerComponent.ios) {
    const iosDrawer = drawerComponent.ios.defaultSideDrawer;
    iosDrawer.style.shadowMode = TKSideDrawerShadowMode.Hostview;
    iosDrawer.style.shadowOpacity = 0.75;
    iosDrawer.style.shadowRadius = 5;
    iosDrawer.transitionDuration = 0.25;
  }
}

export function onNavigationItemTap(args: EventData): void {
  const component = <GridLayout>args.object;
  const componentRoute = component.get('route');
  const componentTitle = component.get('title');
  const bindingContext = <AppRootViewModel>component.bindingContext;

  bindingContext.selectedPage = componentTitle;

  topmost().navigate({
    moduleName: componentRoute,
    transition: {
      name: 'fade'
    }
  });

  const drawerComponent = <RadSideDrawer>app.getRootView();
  drawerComponent.closeDrawer();
}
