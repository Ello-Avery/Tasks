import { Component, inject } from '@angular/core';
import { TaskService } from '../../service/task-service';
import { Button, iButton } from '../ui/button/button';

@Component({
  selector: 'app-toolbar',
  imports: [Button],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  db = inject(TaskService);

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.db.searchTerm.set(input.value);
  }

  exportButtonConfig: iButton = {
    btnType: 'primaryBtn',
    title: 'Export',
    showIcon: true,
    iconString: 'bi bi-arrow-up-right-circle-fill',
    centered: true,
  };
}
