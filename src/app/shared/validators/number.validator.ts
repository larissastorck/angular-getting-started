import { AbstractControl, Validators } from "@angular/forms";


export class NumberValidators {
  static range(min: number, max: number): Validators {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { range: true }
      }
      return null
    }
  }
}
