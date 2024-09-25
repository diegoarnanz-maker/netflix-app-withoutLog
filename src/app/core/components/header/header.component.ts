import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  navList = ["Home", "TV Shows", "New & Popular", "My List", "Language"];

  constructor(private router: Router) {}

  signOut() {
    this.router.navigate(['/']);
  }
}
