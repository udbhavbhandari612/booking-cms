/// <reference  types="@types/googlemaps"  />

import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booking-cms';
  showNav: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (this.auth.isLoggedIn()) {
          this.showNav = true;
          if (res.url === '/login')
            this.router.navigate(['/'])
        }
        else
          this.showNav = false;
      }

    })

  }
}
