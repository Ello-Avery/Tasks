import { inject, Injectable } from '@angular/core';
import { TaskService } from './task-service';

@Injectable({
  providedIn: 'root',
})
export class Export {
  taskService = inject(TaskService);

  generateCSV() {
    const csvContent = [['ID', 'Title', 'Status', 'Description', 'Due Date', 'Created At']];

    this.taskService.tasksArray().forEach((task) => {
      csvContent.push([
        task.id,
        task.title,
        task.status,
        task.description,
        task.dueDate,
        `${new Date(task.createdAt).toISOString()}`,
      ]);
    });

    this.dowloadCSV(csvContent, `task_export_${new Date().toISOString()}.csv`);
  }

  dowloadCSV(data: string[][], filename: string = 'data.csv') {
    const escapeCSVValue = (value: string | number | boolean | null | undefined) => {
      if (value === null || value === undefined) return '';

      let strValue = value.toString();

      strValue = strValue.replace(/"/g, '""');

      return `"${strValue}"`;
    };

    const csv = data.map((row) => row.map((item) => escapeCSVValue(item)).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }
}
