import { Component, computed, inject, input } from '@angular/core';
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

  truncatedDescription = computed(() => {
    const description = this.task()?.description;
    if (!description) return '';
    return description.length > 80 ? description.slice(0, 80) + '...' : description;
  });

  formattedDueDate = computed(() => {
    const dueDate = this.task()?.dueDate;
    if (!dueDate) return '';

    const date = new Date(dueDate);
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  });

  isOverdue = computed(() => {
    const task = this.task();

    if (!task || task.status === 'Done') return false;

    const dueDate = new Date(task.dueDate);
    const today = new Date();

    today.setHours(0, 0, 0);

    return dueDate < today;
  });

  editTask(taskId: string | undefined) {
    this.router.navigate([], {
      queryParams: { taskId: taskId },
    });
    this.db.openForm.set(true);
  }
}
