import { Component, inject } from '@angular/core';
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

  notStarted: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  ngOnInit() {
    this.refreshLists();
  }

  refreshLists() {
    this.notStarted = this.db.getTasks.filter((t) => t.status === 'Not started');
    this.inProgress = this.db.getTasks.filter((t) => t.status === 'In progress');
    this.done = this.db.getTasks.filter((t) => t.status === 'Done');
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
