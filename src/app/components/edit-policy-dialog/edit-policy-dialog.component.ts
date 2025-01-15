import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsurancePolicy } from '../../models/policy.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PolicyService } from '../../services/policy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-policy-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    CommonModule,
  ],
  templateUrl: './edit-policy-dialog.component.html',
  styleUrls: ['./edit-policy-dialog.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class EditPolicyDialogComponent implements OnInit {
  policyForm!: FormGroup;
  isLoading = false;
  @Input() policy!: InsurancePolicy;
  @Input() isEditDialogOpen!: boolean;
  // @Output() isEditDialogOpen = new EventEmitter<boolean>();
  @Output() closeEditDialog = new EventEmitter<{ success: boolean }>();

  constructor(
    // private dialogRef: MatDialogRef<EditPolicyDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: { policy: InsurancePolicy },
    private fb: FormBuilder,
    private policyService: PolicyService
  ) {}
  ngOnInit() {
    console.log(this.policy);

    this.policyForm = this.fb.group({
      policyNumber: [this.policy.policyNumber, Validators.required],
      policyHolderName: [this.policy.policyHolderName, Validators.required],
      policyType: [this.policy?.policyType || '', Validators.required],
      startDate: [this.formatDate(this.policy.startDate), Validators.required],
      endDate: [this.formatDate(this.policy.endDate), Validators.required],
      premiumAmount: [
        this.policy.premiumAmount,
        [Validators.required, Validators.min(1)],
      ],
      isActive: [this.policy.isActive],
    });
  }

  onSave(): void {
    if (this.policyForm.valid) {
      console.log('Form Valid:', this.policyForm.valid);
      console.log('Form Errors:', this.policyForm.errors);

      this.isLoading = true;
      const updatedPolicy = this.policyForm.value;
      
      this.policyService.updatePolicy(this.policy.id, updatedPolicy).subscribe({
        next: (response) =>
          console.log('Policy updated successfully:', response),
        error: (error) => console.error('Error:', error),
      });
      this.closeEditDialog.emit(); // Send the updated policy back
    }
  }

  onCancel(): void {
    this.closeEditDialog.emit(); // Close the dialog without saving
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; //Returns YYYY-MM-DD format
  }
}
