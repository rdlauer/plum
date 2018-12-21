import { Observable } from 'tns-core-modules/data/observable';
const topmost = require('ui/frame').topmost;
import { getCurrentLocation } from 'nativescript-geolocation';

import { SelectedPageService } from '../shared/selected-page-service';

export class MapsViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Maps');
  }

  doAddMarkers() {
    const page = topmost().currentPage;
    let mymap = page.getViewById('mymap');
    mymap
      .addMarkers([
        {
          id: 1,
          lat: 52.360216,
          lng: 4.889168,
          title: 'Here is a marker title!',
          subtitle: 'And this is the subtitle.',
          icon: 'https://nstestdata.com/images/marker1.png',
          selected: true // only one can be selected at a time!
        },
        {
          id: 2,
          lat: 52.360216,
          lng: 5,
          title: 'Here is a marker title!',
          subtitle: 'And this is the subtitle.',
          icon: 'https://nstestdata.com/images/marker2.png'
        },
        {
          id: 3,
          lat: 52.360216,
          lng: 4.789168,
          title: 'Here is a marker title!',
          subtitle: 'And this is the subtitle.',
          icon: 'https://nstestdata.com/images/marker3.png'
        },
        {
          id: 4,
          lat: 52.4,
          lng: 5.1,
          title: 'Here is a marker title!',
          subtitle: 'And this is the subtitle.',
          icon: 'https://nstestdata.com/images/marker4.png'
        }
      ])
      .then(
        mymap.setCenter({
          lat: 52.360216,
          lng: 4.889168,
          animated: true
        })
      );
  }

  doRemoveMarkers() {
    const page = topmost().currentPage;
    let mymap = page.getViewById('mymap');
    mymap.removeMarkers();
  }

  public zoomLevel: number = 8;

  doZoomIn() {
    const page = topmost().currentPage;
    let mymap = page.getViewById('mymap');
    this.zoomLevel = this.zoomLevel + 1;
    mymap.setZoomLevel({
      level: this.zoomLevel,
      animated: true
    });
  }

  doZoomOut() {
    const page = topmost().currentPage;
    let mymap = page.getViewById('mymap');
    this.zoomLevel = this.zoomLevel - 1;
    mymap.setZoomLevel({
      level: this.zoomLevel,
      animated: true
    });
  }

  doFindMe() {
    const page = topmost().currentPage;
    let mymap = page.getViewById('mymap');

    getCurrentLocation({
      desiredAccuracy: 3,
      updateDistance: 10,
      maximumAge: 20000,
      timeout: 20000
    }).then(
      function(loc) {
        if (loc) {
          //console.log('Current location is: ' + loc);
          mymap.setCenter({
            lat: loc.latitude,
            lng: loc.longitude,
            animated: true
          });
        }
      },
      function(e) {
        console.log('Error: ' + e.message);
      }
    );
  }
}
