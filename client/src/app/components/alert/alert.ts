import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Alert',
  standalone: true,
  templateUrl: './alert.html',
  styleUrls: ['./alert.scss'],
  imports: [CommonModule]
})
export class Alert {
  @Input() type: 'success' | 'error' = 'success';
  @Input() message: string = '';
}
