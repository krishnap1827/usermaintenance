import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from '../services/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {


  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  us = inject(Users);
  rt = inject(Router);
  snackBar = inject(MatSnackBar);


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    // console.log(this.loginForm, this.loginForm.get('email')?.value)
    let payload = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.us.loginUser(payload).subscribe((data) => {
      // console.log(data);
      if (data.statusCode === 200) {
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("Name", data.data.userInfo.firstName + " " + data.data.userInfo.lastName);
        sessionStorage.setItem("UserId", data.data.userInfo.id);
        this.rt.navigate(['users']);
        this.snackBar.open('Logged in successfully', 'Close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Login failed: ' + data.message, 'Close', {
          duration: 3000
        });
      }


    })
  }



}
