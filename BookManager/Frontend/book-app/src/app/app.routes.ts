import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'books', component: BookListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
