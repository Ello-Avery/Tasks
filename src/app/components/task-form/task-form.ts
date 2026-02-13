import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService, Task, TaskStatus } from '../../service/task-service';
import { Button, iButton } from '../ui/button/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  db = inject(TaskService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  taskId: string | null = null;
  isEditMode = false;

  ngOnInit() {
    const taskIdParam = this.route.snapshot.queryParamMap.get('taskId');
    this.isEditMode = taskIdParam !== 'new' && taskIdParam !== null;
    this.taskId = this.isEditMode ? taskIdParam : null;

    if (this.isEditMode && this.taskId) {
      const task = this.db.tasks()[this.taskId];
      if (task) {
        this.form.patchValue({
          title: task.title,
          taskStatus: task.status,
          description: task.description,
          dueDate: task.dueDate,
        });
      }
    }
  }

  tasks = this.db.tasks;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    taskStatus: new FormControl<TaskStatus>('Not started'),
    description: new FormControl(),
    dueDate: new FormControl(),
  });

  saveButtonConfig: iButton = {
    btnType: 'primaryBtn',
    title: 'Save Task',
    showIcon: false,
    centered: true,
  };

  closeButtonConfig: iButton = {
    btnType: 'secondaryBtn',
    title: 'Close',
    showIcon: false,
    centered: true,
  };

  addOrUpdateTask() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    const task: Task = {
      id: this.taskId || crypto.randomUUID(),
      title: formValue.title!,
      status: formValue.taskStatus || 'Not started',
      description: formValue.description,
      dueDate: formValue.dueDate,
      createdAt:
        this.isEditMode && this.taskId ? this.db.tasks()[this.taskId].createdAt : Date.now(),
    };

    const success = this.db.addOrUpdateTasks(task, this.isEditMode);

    if (success) {
      this.form.reset({ taskStatus: 'Not started' });
      this.closeForm();
    }
  }

  closeForm() {
    this.router.navigate([], { queryParams: {} });
    this.db.openForm.set(false);
  }
}
