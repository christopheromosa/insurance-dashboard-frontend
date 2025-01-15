import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InsurancePolicy } from '../../models/policy.model';
import { EditPolicyDialogComponent } from '../edit-policy-dialog/edit-policy-dialog.component';
import { PolicyService } from '../../services/policy.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-policy-dialog',
  imports: [CommonModule],
  templateUrl: './delete-policy-dialog.component.html',
  styleUrls: ['./delete-policy-dialog.component.css'],
})
export class DeletePolicyDialogComponent {
  policyForm!: FormGroup;
  @Input() policy: InsurancePolicy = {} as InsurancePolicy;
  @Input() isDeleteModalOpen!: boolean;
  @Output() closeDeleteDialog = new EventEmitter<InsurancePolicy>(); // Send the deleted policy back

  constructor(private policyService: PolicyService, private router: Router) {}

  onSave(): void {
    this.policyService.deletePolicy(this.policy?.id).subscribe({
      next: (response) => console.log('Policy deleted successfully:', response),
      error: (error) => console.error('Error:', error),
    });
    this.closeDeleteDialog.emit(); // Send the updated policy back
    this.router.navigate(['/policy-details']);
  }

  onCancel(): void {
    this.closeDeleteDialog.emit(); // Close the dialog without saving
  }
}
