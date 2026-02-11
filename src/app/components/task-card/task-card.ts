import { Component, inject, input } from '@angular/core';
import { Task, TaskService } from '../../service/task-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  db = inject(TaskService);
  router = inject(Router);

  task = input<Task>();

  editTask(taskId: string | undefined) {
    this.router.navigate([], {
      queryParams: { taskId: taskId },
    });
    this.db.openForm.set(true);
  }
}
