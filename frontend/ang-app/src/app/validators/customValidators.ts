import { AbstractControl, ValidatorFn, FormControl } from "@angular/forms";

export class CustomValidators {
  static doesNotContain(vals: string[]): ValidatorFn {
    function f(fc: AbstractControl): Promise<string[]> {
      const containsAValue = vals.filter(val => {
        return val === fc.value;
      }).length;
      console.log(vals);
      return new Promise<string[]>(resolve => {
        if (containsAValue !== 0) {
          resolve(["existiert bereits"]);
        }
      });
    }
    return f;
  }

  static repeatedPasswordEqual(password: AbstractControl): ValidatorFn {
    function f(fc: AbstractControl) {
      if (fc.value !== password.value) {
        return { error: "password unequal" };
      }
      return null;
    }
    return f;
  }
}
