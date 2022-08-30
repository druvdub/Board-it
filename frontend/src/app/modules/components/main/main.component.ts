import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';
import { DataService } from 'src/app/_shared/data.service';
import { AddcardDialogComponent } from '../addcard-dialog/addcard-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isLoggedIn = false;
  board: Board = new Board('Board-it', []);
  private task?: string;
  private title?: string;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.storageService.getToken();

    console.log(this.isLoggedIn);
    this.dataService.currentData.subscribe((data) => {
      if (data) {
        this.title = data;
        this.board.columns.push(new Column(this.title, []));
      }
    });
    // this.sendBoardData();
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
    console.log(this.board);
    this.sendBoardData();
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
    // this.sendBoardData();
  }

  addCard(columnName: string, task?: string): void {
    const objArray = this.board.columns;
    let index = objArray.findIndex((prop) => prop.name === columnName);
    if (task) {
      objArray[index].tasks.push(task);
    }
    // this.sendBoardData();
  }

  sendBoardData(): void {
    if (this.isLoggedIn) {
      const boardData = this.board;
      if (boardData.columns.length === 0) {
        console.log('board is empty. need to fetch from backend');
      }
      const board = boardData.boardName;
      const columnData = JSON.stringify(boardData.columns);

      this.userService.sendData(board, columnData).subscribe({
        next: () => {
          console.log('data sent');
        },
        error: (error) => {
          console.log(`${error.error.message}`);
        },
      });
    }
  }
}
