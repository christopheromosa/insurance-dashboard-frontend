import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PolicyService } from '../../services/policy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-policy-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-policy-form.component.html',
  styleUrls: ['./add-policy-form.component.css'],
})
export class AddPolicyFormComponent {
  policyForm: FormGroup;

  constructor(private policyService:PolicyService,private fb: FormBuilder,private router:Router) {
    this.policyForm = this.fb.group({
      policyNumber: ['', [Validators.required, Validators.maxLength(100)]],
      policyHolderName: ['', [Validators.required, Validators.maxLength(200)]],
      policyType: ['', [Validators.required, Validators.maxLength(100)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      premiumAmount: ['', [Validators.required, Validators.min(0)]],
      isActive: [true, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.policyForm.valid) {
      console.log('Policy Data:', this.policyForm.value);
      this.policyService.addPolicy(this.policyForm.value).subscribe({
        next: (response) => console.log('Response:', response),
        error: (error) => console.error('Error:', error),
      });
      alert('Policy added successfully!');
      this.router.navigate(['/policy-details']);
      this.policyForm.reset();
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
