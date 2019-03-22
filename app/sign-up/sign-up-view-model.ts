import { Observable } from 'tns-core-modules/data/observable';
const topmost = require('tns-core-modules/ui/frame').topmost;

import { SelectedPageService } from '../shared/selected-page-service';

export class SignUpViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Sign Up');
  }

  mobile: '';
  email: '';
  password1: '';
  password2: '';

  submit() {
    const page = topmost().currentPage;

    let formValid = true;
    let txtMobile = page.getViewById('txtMobile');
    let txtEmail = page.getViewById('txtEmail');
    let txtPassword1 = page.getViewById('txtPassword1');
    let txtPassword2 = page.getViewById('txtPassword2');

    // TODO: this validation could be dramatically simplified I'm sure...

    if (!this.mobile) {
      txtMobile.className = 'form-input m-t-10 form-input-required';
      formValid = false;
    } else {
      txtMobile.className = 'form-input m-t-10';
    }

    if (!this.email) {
      txtEmail.className = 'form-input m-t-10 form-input-required';
      formValid = false;
    } else {
      txtEmail.className = 'form-input m-t-10';
    }

    if (!this.password1) {
      txtPassword1.className = 'form-input m-t-10 form-input-required';
      formValid = false;
    } else {
      txtPassword1.className = 'form-input m-t-10';
    }

    if (!this.password2) {
      txtPassword2.className = 'form-input m-t-5 form-input-required';
      formValid = false;
    } else {
      txtPassword2.className = 'form-input m-t-5';
    }

    if (formValid) {
      if (this.password1 != this.password2) {
        txtPassword1.className = 'form-input m-t-10 form-input-required';
        txtPassword2.className = 'form-input m-t-5 form-input-required';
        formValid = false;
      } else {
        txtPassword1.className = 'form-input m-t-10';
        txtPassword2.className = 'form-input m-t-5';
      }
    }

    if (formValid) {
      this.showDialog();
    }
  }
  showModal() {
    const page = topmost().currentPage;
    page.showModal(
      'modal/modal-page',
      {
        // Pass any context you want to use in the modal
        context: 'Some data',
        foodType: 'Veg',
        food: [
          {
            name: 'Carrot'
          },
          {
            name: 'Potatoe'
          }
        ]
      },
      function closeCallback(result) {
        // you can customize this callback the way you want
        console.log('Result was: ', result);
      },
      false // Full screen or not? (on iOS the modal is fullscreen regardless of this value!)
    );
  }

  showDialog() {
    const page = topmost().currentPage;
    page.className = 'page dialogOpen';
  }

  closeDialog() {
    const page = topmost().currentPage;
    page.className = 'page';
  }
}
