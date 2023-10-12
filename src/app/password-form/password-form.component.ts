import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getPasswordStrength } from '../helpers/getPasswordStrength';
@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent {
  form: FormGroup;
  pointer: "" | "all-Red" | "easy" | "medium" | "strong";

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
    });

    this.pointer = "";

    this.form.get('password')?.valueChanges.subscribe(value => {
      this.validatePassword(value);
    });
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const sanitizedValue = inputValue.replace(/\s/g, '');

    (event.target as HTMLInputElement).value = sanitizedValue;
  }

  validatePassword(password: string) {
    if (password.length === 0 || password === " ") {
      this.form.get('password')?.setErrors({ invalidPassword: true });
      this.pointer = "";
      return;
    }

    if (password.length < 8) {
      this.pointer = "all-Red";
      this.form.get('password')?.setErrors({ invalidPassword: true });
      return;
    }

    const result = getPasswordStrength(password);
    this.pointer = result;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
