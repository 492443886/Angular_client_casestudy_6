import { AbstractControl } from '@angular/forms';
export function ValidateEmail(control: AbstractControl) {
  const PHONE_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  return !PHONE_REGEXP.test(control.value) ? {invalidEmail: true} : null;
} // ValidatePhone
