import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PolicyDetailsComponent } from './components/policy-details/policy-details.component';
import { AddPolicyFormComponent } from './components/add-policy-form/add-policy-form.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'policies',
    loadChildren: () =>
      import('./modules/policy-details/policy-details.module').then(
        (m) => m.PolicyDetailsModule
      ),
  },
  { path: 'add-policy', component: AddPolicyFormComponent },
  // { path: 'edit-policy', component: EditPolicyFormComponent },
  { path: '**', redirectTo: '/dashboard' },
];
