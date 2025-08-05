import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  token: string = '';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {}

  enviarToken() {
    if (!this.token) {
      this.alertService.show('error', 'Por favor, ingresa un token.');
      return;
    }

    this.http.post('http://localhost:3000/api/Invite/Validate', null, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: () => {
        localStorage.setItem('token', this.token);
        this.alertService.show('success', 'Token válido. Acceso permitido.');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 800);
      },
      error: () => {
        this.alertService.show('error', 'Token inválido. Intenta nuevamente.');
      }
    });
  }
}
