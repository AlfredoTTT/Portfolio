import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'Login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  token: string = '';

  constructor(private http: HttpClient, private alertService: AlertService) {}

  enviarToken() {
    if (!this.token) {
      this.alertService.show('error', 'Por favor, ingresa un token.');
      return;
    }

    this.http.post('http://localhost:3000/api/validar-token', null, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: () => {
        localStorage.setItem('token', this.token);
        this.alertService.show('success', 'Token válido. Acceso permitido.');
      },
      error: () => {
        this.alertService.show('error', 'Token inválido. Intenta nuevamente.');
      }
    });
  }
}
