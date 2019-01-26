import { Observable } from 'tns-core-modules/data/observable';
const topmost = require('tns-core-modules/ui/frame').topmost;

import { SelectedPageService } from '../shared/selected-page-service';

export class SignUpViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Sign Up');
  }
  password: '';
  confirmPassword: '';
  submit() {
    const page = topmost().currentPage;
    let confirmPassword = page.getViewById('confirmPassword');
    let passwordMatch = page.getViewById('passwordMatch');

    if (this.password != this.confirmPassword) {
      confirmPassword.className = 'form-input m-t-5 form-input-required';
      passwordMatch.visibility = 'visible';
    } else {
      confirmPassword.className = 'form-input m-t-5';
      passwordMatch.visibility = 'collapsed';
    }
  }
  showModal() {
    const page = topmost().currentPage;
    page.showModal(
      './modal/modal-page',
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
}
