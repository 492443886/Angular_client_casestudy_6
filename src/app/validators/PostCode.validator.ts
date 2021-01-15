import { AbstractControl } from '@angular/forms';
export function ValidatePostCode(control: AbstractControl) {
  const PHONE_REGEXP = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return !PHONE_REGEXP.test(control.value) ? {invalidPostCode: true} : null;
} // ValidatePhone
