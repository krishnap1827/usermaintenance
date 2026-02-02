import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule,MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  protected readonly title = signal('usermaintenance');
  router = inject(Router)

  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  logout() {  
    sessionStorage.clear();
    this.router.navigate(['']);
  } 
}
