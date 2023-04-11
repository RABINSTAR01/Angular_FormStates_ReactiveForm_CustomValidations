import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title="form";
   form!:FormGroup;
   isSubmitting = false;
constructor(){

}
ngOnInit(): void {
  this.form = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    'mail': new FormControl('', {
      validators: Validators.required,
      asyncValidators: [this.emailValidator],
      updateOn: 'blur'
    }),
    'box': new FormControl(),
  });
}

emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  const email = control.value;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const isEmailValid = emailPattern.test(email);
  return of(isEmailValid ? null : { invalidEmail: true }).pipe(delay(2000)); // simulate a delay of 2 seconds
}

  formsubmit() 
   {
    console.log(this.form.value);
    console.log("touched :",this.form.touched);
    console.log("untouched :",this.form.untouched);
    console.log("valid :",this.form.valid);
    console.log("invalid :",this.form.invalid);
    console.log("dirty :",this.form.dirty);
    console.log("pristine :",this.form.pristine);
    console.log("pending :",this.form.pending);
  }
    
  
  
}
