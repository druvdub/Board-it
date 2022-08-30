import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';
import { EventService } from 'src/app/_shared/event.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from 'src/app/_shared/data.service';

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
    this.storageService.clean();
    this.isLoggedIn = false;
    this.storageService.setLogin(false);
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
