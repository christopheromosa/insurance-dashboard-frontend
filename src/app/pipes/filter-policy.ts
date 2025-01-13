import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPolicy',
})
export class FilterPolicyPipe implements PipeTransform {
  transform(policies: any[], searchQuery: string): any[] {
    if (!searchQuery) return policies;

    searchQuery = searchQuery.toLowerCase();
    return policies.filter(
      (policy) =>
        policy.policyNumber.toLowerCase().includes(searchQuery) ||
        policy.policyHolderName.toLowerCase().includes(searchQuery)
    );
  }
}
