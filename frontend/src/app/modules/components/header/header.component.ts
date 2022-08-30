import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';
import { EventService } from 'src/app/_shared/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  eventBusSub?: Subscription;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private eventService: EventService
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

  /*
  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        this.storageService.clean();
        this.storageService.setLogin(false);
        window.location.reload();
        this.router.navigate(['.././login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  */
}
