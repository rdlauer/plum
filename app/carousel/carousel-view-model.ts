import { Observable } from 'tns-core-modules/data/observable';
import { TapticEngine } from 'nativescript-taptic-engine';

import { SelectedPageService } from '../shared/selected-page-service';

export class CarouselViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Carousel');
  }

  onSlideTap(args) {
    // adding a taptic tap, just for fun :)
    let tapticEngine = new TapticEngine();
    tapticEngine.selection();
    alert('Hey, you tapped on the [' + args.index + '] slide!');
  }
}
