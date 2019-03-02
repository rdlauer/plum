import { Observable } from 'tns-core-modules/data/observable';
import { ItemEventData } from 'tns-core-modules/ui/list-view';

import { SelectedPageService } from '../shared/selected-page-service';

interface Item {
  itemType: string;
  icon: string;
  text: string;
}

export class SettingsViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Settings');
  }

  items: Array<Item> = require('./settings.json');

  selectItemTemplate(item, index, items) {
    return item.itemType;
  }

  onItemTap(args: ItemEventData) {
    const index = args.index;
    console.log('You tapped on: ' + this.items[index].text);
  }
}
