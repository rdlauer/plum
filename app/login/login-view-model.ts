import { Observable } from 'tns-core-modules/data/observable';
import * as dialogs from 'tns-core-modules/ui/dialogs';
const topmost = require('tns-core-modules/ui/frame').topmost;

import { SelectedPageService } from '../shared/selected-page-service';

export class LoginViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Home');
  }
  email: '';
  password: '';

  doLogin() {
    // *********************************************************************
    // this is where you'll want to implement your authentication mechanism!
    // *********************************************************************
    const page = topmost().currentPage;
    let txtEmail = page.getViewById('txtEmail');
    let txtPassword = page.getViewById('txtPassword');

    if (!this.email) {
      txtEmail.className = 'form-input m-t-10 form-input-required';
    } else {
      txtEmail.className = 'form-input m-t-10';
    }

    if (!this.password) {
      txtPassword.className = 'form-input m-t-10 form-input-required';
    } else {
      txtPassword.className = 'form-input m-t-10';
    }

    if (this.email && this.password) {
      alert("Let's pretend you have successfully authenticated!");
    }
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
