import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from '../services/users';

@Component({
  selector: 'app-add-update-user',
  imports: [ReactiveFormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './add-update-user.html',
  styleUrl: './add-update-user.scss',
})
export class AddUpdateUser implements OnInit {

  userForm!: FormGroup;

  formBuilder = inject(FormBuilder);
  us = inject(Users);
  snackBar = inject(MatSnackBar);
  heading = 'Add User';

  constructor(private dialogRef: MatDialogRef<AddUpdateUser>, @Inject(MAT_DIALOG_DATA) public data: any,) { }


  ngOnInit(): void {
    // console.log('Dialog data:', this.data);
    if (this.data) {
      this.heading = 'Update User';
      this.us.getusersById(this.data.id).subscribe((res) => {
        // console.log('User data for update:', res);
        this.userForm.patchValue({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          password: res.data.password,
          city: res.data.city,
          phoneNumber: res.data.phoneNumber
        });
      })
    }
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  saveData() {
    if (this.userForm.valid) {
      if (this.heading === 'Add User') {
        this.us.addUser(this.userForm.value).subscribe((res) => {
          if ((res.statusCode === 200)) {
            this.snackBar.open('User added successfully', 'Close', {
              duration: 3000
            });
          } else {
            this.snackBar.open('Failed to add user: ' + res.message, 'Close', {
              duration: 3000
            });
          }
          this.dialogRef.close(true);
        });
      } else {
        let payload = {
          ...this.userForm.value,
          id: this.data.id
        }
        this.us.updateUser(payload).subscribe((res) => {
          if (res.statusCode === 200) {
            this.snackBar.open('User updated successfully', 'Close', {
              duration: 3000
            });
          } else {
            this.snackBar.open('Failed to update user: ' + res.message, 'Close', {
              duration: 3000
            });
          }
          this.dialogRef.close(true);
        });
      }
    } else {
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000
      });
    }
  }
}
