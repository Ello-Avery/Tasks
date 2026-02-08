import { Component, inject } from '@angular/core';
import { TaskService } from '../../service/task-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  db = inject(TaskService);

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.db.searchTerm.set(input.value);
  }

  toggleDarkModeOn() {
    document.documentElement.classList.add('dark-theme');
    document.getElementById('darkMode')?.classList.add('active');
    document.getElementById('lightMode')?.classList.remove('active');
  }
  toggleDarkModeOff() {
    document.documentElement.classList.remove('dark-theme');
    document.getElementById('lightMode')?.classList.add('active');
    document.getElementById('darkMode')?.classList.remove('active');
  }
}
