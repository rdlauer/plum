import { Observable } from 'tns-core-modules/data/observable';
const topmost = require('tns-core-modules/ui/frame').topmost;
import * as calendarModule from 'nativescript-ui-calendar';

import { SelectedPageService } from '../shared/selected-page-service';

export class CalendarViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Calendar');

    let _eventTitles = [
      'Grab Food with Steve',
      'Meeting with Jane',
      'Quarterly Recap Meeting',
      'Play Quake',
      'Customer Intro',
      'Revenue Guidance Meeting'
    ];

    let _events: Array<calendarModule.CalendarEvent> = new Array<
      calendarModule.CalendarEvent
    >();

    for (let i = 0; i < _eventTitles.length; i++) {
      const now: Date = new Date();
      const startDate: Date = new Date(
        now.getFullYear(), // year
        now.getMonth(), // month
        i * 2, // day
        i * 0.5, // hour
        i, // minute
        0, // second
        0 // ms
      );
      const endDate: Date = new Date(
        now.getFullYear(), // year
        now.getMonth(), // month
        i * 2 + (i % 3), // day
        i * 0.5, // hour
        i, // minute
        0, // second
        0 // ms
      );
      const event = new calendarModule.CalendarEvent(
        _eventTitles[i],
        startDate,
        endDate
      );
      _events.push(event);
    }
    this.set('events', _events);
  }
}
