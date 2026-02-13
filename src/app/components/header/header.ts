import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../service/task-service';
import { Button, iButton } from '../ui/button/button';
import { Export } from '../../service/export';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  db = inject(TaskService);
  export = inject(Export);

  exportButtonConfig: iButton = {
    btnType: 'headerBtn',
    title: 'Export',
    showIcon: true,
    iconString: 'bi bi-arrow-up-right-circle-fill',
    centered: true,
  };

  ngOnInit() {
    this.toggleDarkModeOff();
  }

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

  exportCSV() {
    this.export.generateCSV();
  }
}
