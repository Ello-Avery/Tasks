import { Component, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskService } from '../../../service/task-service';

export type BtnType = 'primaryBtn' | 'secondaryBtn';

export interface iButton {
  btnType: BtnType;
  title: string;
  showIcon?: boolean;
  iconString?: string;
  centered?: boolean;
}

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  btnDetails = input<iButton>({
    btnType: 'primaryBtn',
    title: 'Button Name',
    showIcon: true,
    iconString: 'bi bi-plus',
  });
}
