import { Observable, EventData } from 'tns-core-modules/data/observable';
import { Button } from 'tns-core-modules/ui/button';
import { Page } from 'tns-core-modules/ui/page';
//const frameModule = require('tns-core-modules/ui/frame');

import { SelectedPageService } from '../shared/selected-page-service';

export class HomeViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Login');
  }

  login(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.navigate('login/login-page');

    // const navEntry = {
    //   moduleName: 'login/login-page',
    //   animated: true
    // };

    // const topmost = frameModule.topmost();
    // topmost.navigate(navEntry);
  }

  signup(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.navigate('sign-up/sign-up-page');
  }
}
