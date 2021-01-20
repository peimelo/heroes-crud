import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    const token = localStorage.getItem('token');

    if (!token) {
      const randomToken = Math.random().toString(36).substr(-10);
      localStorage.setItem('token', randomToken);
    }
  }
}
