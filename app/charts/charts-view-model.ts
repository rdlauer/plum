import { Observable } from 'tns-core-modules/data/observable';

import { SelectedPageService } from '../shared/selected-page-service';

export class ChartsViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('Charts');
  }

  private _categoricalSource;
  private _categoricalSource2;
  private _areaSource;
  private _areaSource2;
  private _pieSource2;

  get categoricalSource() {
    if (this._categoricalSource) {
      return this._categoricalSource;
    }
    return (this._categoricalSource = [
      { Category: 'Mar', Amount: 65.0 },
      { Category: 'Apr', Amount: 62.0 },
      { Category: 'May', Amount: 55.0 },
      { Category: 'Jun', Amount: 71.0 }
    ]);
  }

  get categoricalSource2() {
    if (this._categoricalSource2) {
      return this._categoricalSource2;
    }
    return (this._categoricalSource2 = [
      { Category: 'Mar', Amount: 5 },
      { Category: 'Apr', Amount: 15 },
      { Category: 'May', Amount: 3 },
      { Category: 'Jun', Amount: 45 }
    ]);
  }

  get areaSource() {
    if (this._areaSource) {
      return this._areaSource;
    }
    return (this._areaSource = [
      { Category: 'Mar', Amount: 51 },
      { Category: 'Apr', Amount: 81 },
      { Category: 'May', Amount: 89 },
      { Category: 'Jun', Amount: 60 }
    ]);
  }

  get areaSource2() {
    if (this._areaSource2) {
      return this._areaSource2;
    }
    return (this._areaSource2 = [
      { Category: 'Mar', Amount: 60 },
      { Category: 'Apr', Amount: 87 },
      { Category: 'May', Amount: 91 },
      { Category: 'Jun', Amount: 95 }
    ]);
  }

  get pieSource2() {
    if (this._pieSource2) {
      return this._pieSource2;
    }
    return (this._pieSource2 = [
      { Company: 'Google', Amount: 20.0 },
      { Company: 'Apple', Amount: 30.0 },
      { Company: 'Microsoft', Amount: 10.0 },
      { Company: 'Oracle', Amount: 8.0 }
    ]);
  }
}
