import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta pública
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
  },

  // Todas las demás rutas protegidas
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },

  // Agrega aquí más rutas protegidas
  // {
  //   path: 'proyectos',
  //   loadComponent: () => import('./pages/proyectos/proyectos').then(m => m.ProyectosComponent),
  //   canActivate: [authGuard]
  // },

  // Ruta no encontrada
  { path: '**', redirectTo: 'login' }
];
