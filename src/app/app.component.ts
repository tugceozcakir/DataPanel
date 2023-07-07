import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'odev2';
  searchTerm: string = '';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route], { queryParams: { search: this.searchTerm } });
  }

 
}

