import { Component, computed, inject, input, signal } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService, Task, TaskStatus } from '../../service/task-service';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskForm } from '../../components/task-form/task-form';
import { Button } from '../../components/ui/button/button';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notifications';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-home',
  imports: [CdkDropList, CdkDrag, TaskCard, TaskForm, Button, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  db = inject(TaskService);
  notificationService = inject(NotificationService);
  router = inject(Router);

  notStarted = computed(() =>
    this.db
      .filterTasks()
      .filter((t) => t.status === 'Not started')
      .sort((a, b) => b.createdAt - a.createdAt),
  );

  inProgress = computed(() =>
    this.db
      .filterTasks()
      .filter((t) => t.status === 'In progress')
      .sort((a, b) => b.createdAt - a.createdAt),
  );

  done = computed(() =>
    this.db
      .filterTasks()
      .filter((t) => t.status === 'Done')
      .sort((a, b) => b.createdAt - a.createdAt),
  );

  // showForm() {
  //   this.db.openForm.set(true);
  // }

  addNewTask() {
    this.router.navigate([], {
      queryParams: { taskId: 'new' },
    });
    this.db.openForm.set(true);
  }

  editTask(taskId: string) {
    this.router.navigate([], {
      queryParams: { taskId: taskId },
    });
    this.db.openForm.set(true);
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus) {
    const task = event.previousContainer.data[event.previousIndex];

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.db.updateTaskStatus(task.id, newStatus);
    }
  }
}
