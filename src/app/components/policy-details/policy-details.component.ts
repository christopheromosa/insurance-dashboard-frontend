import { Component, OnInit } from '@angular/core';
import { InsurancePolicy } from '../../models/policy.model';
import { PolicyService } from '../../services/policy.service';
import { CommonModule } from '@angular/common';
import { FilterPolicyPipe } from '../../pipes/filter-policy';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditPolicyDialogComponent } from '../edit-policy-dialog/edit-policy-dialog.component';
import { DeletePolicyDialogComponent } from '../delete-policy-dialog/delete-policy-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-details',
  imports: [
    CommonModule,
    FilterPolicyPipe,
    FormsModule,
    MatDialogModule,
    EditPolicyDialogComponent,
    DeletePolicyDialogComponent,
  ],
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css'],
})
export class PolicyDetailsComponent implements OnInit {
  policies: InsurancePolicy[] = [];
  searchQuery: string = '';
  isEditDialogOpen = false;
  isDeleteModalOpen = false;

  selectedPolicy: InsurancePolicy | null = null;

  constructor(
    private policyService: PolicyService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getPolicies().subscribe((policies) => {
      this.policies = policies;
    });
    console.log(this.policies);
    
  }

  editPolicy(policy: InsurancePolicy): void {
    this.selectedPolicy = policy;
    this.isEditDialogOpen = true;
  }
  deletePolicy(policy: InsurancePolicy): void {
    this.selectedPolicy = policy;
    this.isDeleteModalOpen = true;
  }

  closeEditDialog(event: { success: boolean }): void {
    this.isEditDialogOpen = false;
    if (event.success) {
      this.loadPolicies();
    }
  }
  closeDeleteDialog(event: { success: boolean }): void {
    this.isDeleteModalOpen = false;
    if (event.success) {
      this.loadPolicies();
    }
  }
}
  