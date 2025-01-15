export interface InsurancePolicy {
  id: string; // Primary Key
  policyNumber: string; // Unique Identifier for the policy
  policyHolderName: string; // Name of the policyholder
  policyType: string; // E.g., Health, Vehicle, Life, etc.
  startDate: Date; // Policy Start Date
  endDate: Date; // Policy End Date
  premiumAmount: number; // Policy premium cost
  isActive: boolean; // Indicates if the policy is currently active
}
