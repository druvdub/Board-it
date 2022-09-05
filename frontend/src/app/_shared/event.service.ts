import { Injectable } from '@angular/core';
import { filter, map, Subject, Subscription } from 'rxjs';
import { EventData } from './event.class';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // Special Observable that can be multicasted to multiple Observers
  private subject = new Subject<EventData>();

  constructor() {}

  emit(event: EventData) {
    // sends value
    this.subject.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return (
      this.subject
        .pipe(
          // filters items emitted by Observable that satisfy a predicate
          filter((event: EventData) => event.name === eventName),
          map((event: EventData) => event['value'])
        )
        // starts execution of Observable
        .subscribe(action)
    );
  }
}
