import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalPolicies: number = 0;
  activePolicies: number = 0;
  expiredPolicies: number = 0;
  recentPolicies: any[] = []; // Assuming 'recentPolicies' is an array of policy objects

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    // Fetch policies data
    this.policyService.getPolicies().subscribe((policies) => {
      this.totalPolicies = policies.length;
      this.activePolicies = policies.filter((policy) => policy.isActive).length;
      this.expiredPolicies = policies.filter(
        (policy) => !policy.isActive
      ).length;
      this.recentPolicies = policies.slice(-5); // Assuming we want the last 5 policies
    });
  }
}
