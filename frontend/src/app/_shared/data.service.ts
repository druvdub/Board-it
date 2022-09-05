import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // It stores the latest value emitted to its consumers,
  // and whenever a new Observer subscribes, it will immediately
  // receive the "current value" from the BehaviorSubject
  private data = new BehaviorSubject('');
  currentData = this.data.asObservable();

  constructor() {}

  setData(data: any) {
    // sends value
    this.data.next(data);
  }
}
