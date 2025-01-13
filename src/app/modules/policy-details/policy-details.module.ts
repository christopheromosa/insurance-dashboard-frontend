import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { policyDetailsRoutes } from './policy-details-routing';
import { FilterPolicyPipe } from '../../pipes/filter-policy';

@NgModule({
  declarations: [],
  imports: [
    FilterPolicyPipe,
    CommonModule,
    RouterModule.forChild(policyDetailsRoutes),
  ],
})
export class PolicyDetailsModule {}
