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

@Component({
  selector: 'app-policy-details',
  imports: [CommonModule, FilterPolicyPipe, FormsModule, MatDialogModule],
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css'],
})
export class PolicyDetailsComponent implements OnInit {
  policies: InsurancePolicy[] = [];
  searchQuery: string = '';

  constructor(private policyService: PolicyService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getPolicies().subscribe((policies) => {
      this.policies = policies;
    });
  }

  editPolicy(policy: InsurancePolicy): void {
    const dialogRef = this.dialog.open(EditPolicyDialogComponent, {
      width: '500px',
      data: { policy },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.policyService.updatePolicy(result).subscribe(
          (updatedPolicy) => {
            // Update successful
            const index = this.policies.findIndex(
              (p) => p.policyNumber === updatedPolicy.policyNumber
            );
            this.policies[index] = updatedPolicy;
            console.log('Policy updated successfully.');
          },
          (error) => {
            console.error('Error updating policy:', error);
          }
        );
      }
    });
  }

  deletePolicy(policy: InsurancePolicy): void {
    const dialogRef = this.dialog.open(DeletePolicyDialogComponent, {
      width: '500px',
      data: { policy },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.policyService.deletePolicy(policy.policyNumber).subscribe(
          () => {
            // Removal successful
            this.policies = this.policies.filter(
              (p) => p.policyNumber !== policy.policyNumber
            );
            console.log('Policy deleted successfully.');
          },
          (error) => {
            console.error('Error deleting policy:', error);
          }
        );
      }
    });
  }
}
