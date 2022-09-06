import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { DataService } from 'src/app/_shared/data.service';
import { EventData } from 'src/app/_shared/event.class';
import { EventService } from 'src/app/_shared/event.service';
import { AddcardDialogComponent } from '../addcard-dialog/addcard-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  isLoggedIn = false;
  board: Board = new Board('Board-it', []);
  private task?: string;
  private title?: string;
  private content?: string;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private dataService: DataService,
    private eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.storageService.getToken();

    this.dataService.currentData.subscribe((data) => {
      if (data) {
        this.title = data;
        this.board.columns.push(new Column(this.title, []));
        this.storeSessionData();
      }
    });
  }

  ngAfterViewInit() {
    this.fetchBoardData();
  }

  dropHorizontal(event: CdkDragDrop<Column[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.storeSessionData();
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
    this.storeSessionData();
  }

  openDialog(columnName: string): void {
    const dialogRef = this.dialog.open(AddcardDialogComponent, {
      width: '350px',
      data: { task: this.task },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.task = result;
        this.addCard(columnName, this.task);
      }
    });
  }

  deleteList(columnName: string): void {
    const objArray = this.board.columns;
    objArray.splice(
      objArray.findIndex((prop) => prop.name === columnName),
      1
    );
    this.storeSessionData();
  }

  addCard(columnName: string, task?: string): void {
    const objArray = this.board.columns;
    let index = objArray.findIndex((prop) => prop.name === columnName);
    if (task) {
      objArray[index].tasks.push(task);
    }
    this.storeSessionData();
  }

  storeSessionData(): void {
    if (this.isLoggedIn) {
      const boardData = this.board;
      if (boardData.columns.length === 0) {
        console.log('board is empty. need to fetch from backend');
      }
      this.storageService.setData(boardData);
    }
  }

  fetchBoardData(): void {
    if (this.isLoggedIn) {
      this.userService.fetchData().subscribe({
        next: (data) => {
          if (data) {
            this.content = data;
            if (this.content) {
              const boardData = JSON.parse(this.content);
              const boardName = boardData.board;
              const columns = JSON.parse(boardData.columns);
              this.board = new Board(boardName, columns);
              this.storeSessionData();
            }
          } else {
            this.board = new Board('Board-it', []);
          }
        },
        error: (err) => {
          console.log(err.error.message || err.error || err.message);

          if (err.status === 403) {
            this.eventService.emit(new EventData('logout', null));
          }
        },
      });
    }
  }
}
