import { Injectable } from '@angular/core';
import { filter, map, Subject, Subscription } from 'rxjs';
import { EventData } from './event.class';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private subject = new Subject<EventData>();

  constructor() {}

  emit(event: EventData) {
    this.subject.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject
      .pipe(
        filter((event: EventData) => event.name === eventName),
        map((event: EventData) => event['value'])
      )
      .subscribe(action);
  }
}
