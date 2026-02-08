import { Component, computed, inject, signal } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService, Task, TaskStatus } from '../../service/task-service';

@Component({
  selector: 'app-home',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  db = inject(TaskService);

  notStarted = computed(() => this.db.filterTasks().filter((t) => t.status === 'Not started'));

  inProgress = computed(() => this.db.filterTasks().filter((t) => t.status === 'In progress'));

  done = computed(() => this.db.filterTasks().filter((t) => t.status === 'Done'));

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
