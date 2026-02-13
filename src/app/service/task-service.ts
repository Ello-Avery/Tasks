import { computed, Injectable, signal } from '@angular/core';

export type TaskStatus = 'Not started' | 'In progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  dueDate: string;
  createdAt: number;
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
      description: 'Work through the reactive forms and signals content',
      dueDate: '2026-02-15',
      createdAt: Date.now() - 1000000,
    },
    '2': {
      id: '2',
      title: 'Build Pokémon search feature',
      status: 'Done',
      description: 'Implement search with PokéAPI integration and display results',
      dueDate: '2026-02-10',
      createdAt: Date.now() - 1000000,
    },
    '3': {
      id: '3',
      title: 'Review TypeScript fundamentals',
      status: 'Done',
      description: 'Go over types, interfaces, generics, and utility types',
      dueDate: '2026-02-08',
      createdAt: Date.now() - 1000000,
    },
    '4': {
      id: '4',
      title: 'Set up dark mode toggle',
      status: 'In progress',
      description: 'Add theme switching functionality with local storage persistence',
      dueDate: '2026-02-14',
      createdAt: Date.now() - 1000000,
    },
    '5': {
      id: '5',
      title: 'Implement task filtering by status',
      status: 'Not started',
      description: 'Add filter buttons to show tasks by status category',
      dueDate: '2026-02-16',
      createdAt: Date.now() - 1000000,
    },
    '6': {
      id: '6',
      title: 'Add responsive design for mobile',
      status: 'In progress',
      description: 'Ensure app works well on tablet and mobile screen sizes',
      dueDate: '2026-02-18',
      createdAt: Date.now() - 1000000,
    },
    '7': {
      id: '7',
      title: 'Create custom form validators',
      status: 'Not started',
      description: 'Build reusable validators for task title and date validation',
      dueDate: '2026-02-20',
      createdAt: Date.now() - 1000000,
    },
    '8': {
      id: '8',
      title: 'Deploy app to production',
      status: 'Not started',
      description: 'Set up deployment pipeline and host on Vercel or Netlify',
      dueDate: '2026-02-25',
      createdAt: Date.now() - 1000000,
    },
    '9': {
      id: '9',
      title: 'Fix search input styling',
      status: 'Done',
      description: 'Adjust spacing and border radius to match design system',
      dueDate: '2026-02-09',
      createdAt: Date.now() - 1000000,
    },
    '10': {
      id: '10',
      title: 'Write unit tests for components',
      status: 'Not started',
      description: 'Add Jest/Jasmine tests for task service and main components',
      dueDate: '2026-02-22',
      createdAt: Date.now() - 1000000,
    },
  });

  tasks = this._tasks.asReadonly();

  tasksArray = computed(() => Object.values(this._tasks()));

  openForm = signal(false);

  searchTerm = signal<string>('');

  filterTasks = computed(() => {
    const tasks = this.tasksArray();
    const search = this.searchTerm().toLowerCase().trim();

    if (!search) return tasks;

    return tasks.filter((tasks) => tasks.title.toLowerCase().includes(search));
  });

  addOrUpdateTasks(update: Task, isUpdate = false): boolean {
    if (this._tasks()[update.id] && !isUpdate) {
      return false;
    }

    this._tasks.update((currentTasks) => ({
      ...currentTasks,
      [update.id]: {
        ...update,
        createdAt: isUpdate ? currentTasks[update.id]?.createdAt || Date.now() : Date.now(),
      },
    }));

    return true;
  }

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
