import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';
import { EventService } from 'src/app/_shared/event.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from 'src/app/_shared/data.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  eventBusSub?: Subscription;
  private title?: string = '';

  constructor(
    private router: Router,
    private storageService: StorageService,
    private eventService: EventService,
    private dataService: DataService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.storageService.getToken();

    this.eventBusSub = this.eventService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }

  logout(): void {
    const boardData = this.storageService.getData();
    this.userService
      .sendData(boardData.boardName, JSON.stringify(boardData.columns))
      .subscribe({
        next: () => {
          console.log('data sent');
        },
        error: (error) => {
          console.log(`${error.error.message}`);
        },
      });
    this.storageService.clean();
    this.isLoggedIn = false;
    window.location.reload();
    this.router.navigate(['.././login']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { title: this.title },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.title = result;
        this.sendDataToComponent(this.title);
      }
    });
  }

  sendDataToComponent(data: string | undefined): void {
    this.dataService.setData(data);
  }
}
