import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../service/notifications';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {
  notificationService = inject(NotificationService);

  notification$ = this.notificationService.notification$;

  close(): void {
    this.notificationService.hide();
  }
}
