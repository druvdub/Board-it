import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { DataService } from 'src/app/_shared/data.service';
import { AddcardDialogComponent } from '../addcard-dialog/addcard-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  board: Board = new Board('Board-it', []);
  private task?: string = '';
  private title?: string = '';

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.board);
    this.dataService.currentData.subscribe((data) => {
      if (data) {
        this.title = data;
        this.board.columns.push(new Column(this.title, []));
      }
    });
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

  openDialog() {
    const dialogRef = this.dialog.open(AddcardDialogComponent, {
      width: '350px',
      data: { task: this.task },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.task = result;
        console.log(`${this.task}`);
      }
    });
  }

  deleteList(event: string): void {
    const array = this.board.columns;
    array.splice(
      array.findIndex((prop) => prop.name === event),
      1
    );
  }
}
