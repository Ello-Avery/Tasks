import { computed, Injectable, signal } from '@angular/core';

export type TaskStatus = 'Not started' | 'In progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface TaskCollection {
  [id: string]: Task;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = signal<TaskCollection>({
    '1': {
      id: '1',
      title: 'Complete Angular bootcamp module 5',
      status: 'In progress',
    },
    '2': {
      id: '2',
      title: 'Build Pokémon search feature',
      status: 'Done',
    },
    '3': {
      id: '3',
      title: 'Review TypeScript fundamentals',
      status: 'Done',
    },
    '4': {
      id: '4',
      title: 'Set up dark mode toggle',
      status: 'In progress',
    },
    '5': {
      id: '5',
      title: 'Implement task filtering by status',
      status: 'Not started',
    },
    '6': {
      id: '6',
      title: 'Add responsive design for mobile',
      status: 'In progress',
    },
    '7': {
      id: '7',
      title: 'Create custom form validators',
      status: 'Not started',
    },
    '8': {
      id: '8',
      title: 'Deploy app to production',
      status: 'Not started',
    },
    '9': {
      id: '9',
      title: 'Fix search input styling',
      status: 'Done',
    },
    '10': {
      id: '10',
      title: 'Write unit tests for components',
      status: 'Not started',
    },
  });

  tasks = this._tasks.asReadonly();

  tasksArray = computed(() => Object.values(this._tasks()));

  searchTerm = signal<string>('');

  filterTasks = computed(() => {
    const tasks = this.tasksArray();
    const search = this.searchTerm().toLowerCase().trim();

    if (!search) return tasks;

    return tasks.filter((tasks) => tasks.title.toLowerCase().includes(search));
  });

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this._tasks.update((tasks) => {
      if (!tasks[taskId]) return tasks;

      return {
        ...tasks,
        [taskId]: { ...tasks[taskId], status: newStatus },
      };
    });
  }
}
