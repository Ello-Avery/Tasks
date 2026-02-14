import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

interface menuItem {
  id: number;
  path: string;
  name: string;
  icon: string;
  exact: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  menuItems: menuItem[] = [
    {
      id: 1,
      path: '/',
      name: 'board',
      icon: 'bi bi-kanban',
      exact: true,
    },
    {
      id: 2,
      path: '/analytics',
      name: 'analytics',
      icon: 'bi bi-clipboard-data',
      exact: false,
    },
  ];
}
