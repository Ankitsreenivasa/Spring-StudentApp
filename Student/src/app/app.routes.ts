import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  { path: 'info', component: StudentInfoComponent },
  { path: 'search', component: SearchComponent },
];
