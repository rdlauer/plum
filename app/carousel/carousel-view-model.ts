import { Observable } from 'tns-core-modules/data/observable';

import { SelectedPageService } from '../shared/selected-page-service';

export class CarouselViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Carousel');
  }

  onSlideTap(args) {
    alert('Hey, you tapped on the [' + args.index + '] slide!');
  }
}
