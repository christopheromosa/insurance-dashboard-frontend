import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsurancePolicy } from '../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private apiUrl = 'http://localhost:5024/api/InsurancePolicies';
  constructor(private http: HttpClient) {}

  getPolicies(): Observable<InsurancePolicy[]> {
    return this.http.get<InsurancePolicy[]>(this.apiUrl);
  }

  addPolicy(policy: InsurancePolicy): Observable<InsurancePolicy> {
    return this.http.post<InsurancePolicy>(this.apiUrl, policy);
  }

  getPolicyById(policyId: string): Observable<InsurancePolicy> {
    // Ensure policyId is a string
    return this.http.get<InsurancePolicy>(`${this.apiUrl}/${policyId}`);
  }

  updatePolicy(policy: InsurancePolicy): Observable<InsurancePolicy> {
    return this.http.put<InsurancePolicy>(
      `${this.apiUrl}/${policy.policyNumber}`,
      policy
    );
  }

  deletePolicy(policyId: string): Observable<any> {
    // Ensure policyId is a string
    return this.http.delete(`${this.apiUrl}/${policyId}`);
  }
}
