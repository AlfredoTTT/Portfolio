import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alert } from './components/alert/alert';
import { RouterModule } from '@angular/router';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [CommonModule, Alert, RouterModule]
})
export class App {
  alerta: { type: 'success' | 'error'; message: string } | null = null;

  constructor(private alertService: AlertService) {
    this.alertService.alert$.subscribe((alert) => this.alerta = alert);
  }
}
