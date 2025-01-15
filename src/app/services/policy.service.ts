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
    // const formattedPolicy = {
    //   ...policy,
    //   startDate: new Date(policy.startDate).toISOString(),
    //   endDate: new Date(policy.endDate).toISOString(),
    // };
    // console.log('Policy Data:', formattedPolicy);

    return this.http.post<InsurancePolicy>(this.apiUrl, policy, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getPolicyById(policyId: string): Observable<InsurancePolicy> {
    // Ensure policyId is a string
    return this.http.get<InsurancePolicy>(`${this.apiUrl}/${policyId}`);
  }

  updatePolicy(
    policyId: string,
    policy: InsurancePolicy
  ): Observable<InsurancePolicy> {
    
    const formattedPolicy = {
      ...policy,
      id:policyId,
      startDate: policy.startDate + 'T00:00:00',
      endDate: policy.endDate + 'T00:00:00',
    };
    
console.log(formattedPolicy);
    return this.http.put<InsurancePolicy>(
      `${this.apiUrl}/${policyId}`,
      formattedPolicy
    );
  }

  deletePolicy(policyId: string): Observable<any> {
    // Ensure policyId is a string
    return this.http.delete(`${this.apiUrl}/${policyId}`);
  }
}
