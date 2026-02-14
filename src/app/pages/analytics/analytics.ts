import { Component, computed, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TaskService } from '../../service/task-service';

export var single = [
  {
    name: 'Germany',
    value: 8940000,
  },
  {
    name: 'USA',
    value: 5000000,
  },
  {
    name: 'France',
    value: 7200000,
  },
];

@Component({
  selector: 'app-analytics',
  imports: [NgxChartsModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics {
  db = inject(TaskService);

  chartData = computed(() => {
    const tasks = this.db.tasksArray();

    // Count tasks by status
    const statusCounts = tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Transform into chart format
    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  });

  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Status';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'No. of Tasks';
  legendPosition: string = 'below';
  showLabels: boolean = true;
  animations: boolean = true;

  colorScheme: any = {
    domain: ['#969eff', '#ffb595', '#b9ff96'],
  };

  tasks = this.db.tasksArray;

  sortedTasks = computed(() => {
    return [...this.tasks()].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );
  });
}
