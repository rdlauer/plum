import { Observable } from 'tns-core-modules/data/observable';
import { AR, ARMaterial, ARTrackingMode } from 'nativescript-ar';
import { Color } from 'tns-core-modules/color';
import { Image } from 'tns-core-modules/ui/image';

import { SelectedPageService } from '../shared/selected-page-service';

export class ARViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('AR');

    const supported = AR.isSupported();
    this.message = supported
      ? 'AR is supported! 😅'
      : 'AR is not supported... 😥';

    //console.log(`Image tracking supported? ${AR.isImageTrackingSupported()}`);

    if (!supported) {
      return;
    }
  }

  public message: string;
  public ar: AR;
  public screenshot: Image;

  // All these are valid plane materials:
  // public planeMaterial = "Assets.scnassets/Materials/tron/tron-diffuse.png";
  // public planeMaterial = new Color("red");
  public planeMaterial = <ARMaterial>{
    diffuse: new Color('white'),
    transparency: 0.2
  };

  public grabScreenshot(): void {
    if (this.ar) {
      this.screenshot.src = this.ar.grabScreenshot();

      // let's animate the grabbed image on and off screen in an iOS-screenshot style fashion
      this.screenshot.animate({
        opacity: 0.8,
        scale: {
          x: 0.5,
          y: 0.5
        },
        translate: {
          x: -20,
          y: 40
        },
        duration: 500
      });
      setTimeout(() => {
        this.screenshot.animate({
          opacity: 0,
          scale: {
            x: 0.5,
            y: 0.5
          },
          translate: {
            x: -300,
            y: 40
          },
          duration: 500
        });

        setTimeout(() => {
          this.screenshot.animate({
            opacity: 0,
            scale: {
              x: 1,
              y: 1
            },
            translate: {
              x: 0,
              y: 0
            },
            duration: 0
          });
        }, 600);
      }, 2000);
    }
  }
}
