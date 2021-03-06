import { Component, OnInit } from '@angular/core';
import{ FormBuilder ,FormGroup,FormControl,Validators} from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import{ AuthService } from '../auth.service';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  message = '';
  userError: any;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router) {
      this.myForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required ]
      }, {
        validators: this.checkIfMatchingPasswords('password','confirmPassword')
      });
   }

  ngOnInit() {
  }


  checkIfMatchingPasswords(passwordKey: string, confirmPasswordKey: string) {
     return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password.value === confirmPassword.value) {
        return;
      } else {
        confirmPassword.setErrors({
          notEqualToPassword: true
        });
      }
     };
  }

  onSubmit(signupform) {
      const email: string = signupform.value.email;
      const password: string = signupform.value.password;
      const firstName: string = signupform.value.firstName;
      const lastName: string = signupform.value.lastName;

      this.authService.signup(email, password, firstName, lastName)
      .then(() => {
        //this.message ="You have been signed up sucessfully. Please login."
        this.router.navigate(['/book']);

      }).catch((error) => {
        console.log(error);
        this.userError = error;
      });
  }



}
