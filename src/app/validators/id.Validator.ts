import { AbstractControl } from '@angular/forms';
export function ValidatorId(control: AbstractControl) {
  const PHONE_REGEXP = /^\d+$/;
  return !PHONE_REGEXP.test(control.value) ? {invalidId: true} : null;
} // ValidatePhone
