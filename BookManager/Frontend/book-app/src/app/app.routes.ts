import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books', component: BookListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
