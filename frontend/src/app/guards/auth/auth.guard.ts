import { StorageService } from 'src/app/_services/storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}
  // authentication guard - reroutes to login page if not logged in
  canActivate(): boolean {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    return this.storageService.isLoggedIn();
  }
}
