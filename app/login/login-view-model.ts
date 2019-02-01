import { Observable } from 'tns-core-modules/data/observable';
import * as dialogs from 'tns-core-modules/ui/dialogs';

import { SelectedPageService } from '../shared/selected-page-service';

export class LoginViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Home');
  }
  email: '';
  password: '';

  doLogin() {
    // this is where you'll want to implement your authentication mechanism!
    alert("Let's pretend you have successfully authenticated!");
  }

  recoverPassword() {
    dialogs
      .prompt({
        title: 'Forgot Password',
        message:
          'Enter the email address you used to register! Your password will be reset.',
        okButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        inputType: dialogs.inputType.email
      })
      .then(r => {
        if (r.result == true) {
          alert(
            'Your password was sucessfully reset. Please check your email for instructions on choosing a new password.'
          );
        }
      });
  }
}
