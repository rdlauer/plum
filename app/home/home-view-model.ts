import { Observable, EventData } from 'tns-core-modules/data/observable';
import { Button } from 'tns-core-modules/ui/button';
import { Page } from 'tns-core-modules/ui/page';

import { SelectedPageService } from '../shared/selected-page-service';

export class HomeViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Login');
  }

  login(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.navigate('./login/login-page');
  }

  signup(args: EventData) {
    const button: Button = <Button>args.object;
    const page: Page = button.page;
    page.frame.navigate('./sign-up/sign-up-page');
  }
}
