import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      'Some random idea. My name is Peter Parker. And I am PSiderMAn. Welp My Lif is really fun',
      'This is another random idea',
      'build an awesome application',
    ]),
    new Column('Research', [
      'Lorem ipsum',
      'foo',
      "This was in the 'Research' column",
    ]),
    new Column('Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep',
    ]),
    new Column('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog',
    ]),
    new Column('Test', ['Lol']),
  ]);

  constructor() {}

  ngOnInit() {
    console.log(this.board);
  }

  dropHorizontal(event: CdkDragDrop<Column[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  test(event: any): void {
    console.log(event.target.parentElement.parentElement.id);
  }
}
