import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from '../services/users';
import { AddUpdateUser } from '../add-update-user/add-update-user';

@Component({
  selector: 'app-users-list',
  imports: [MatButtonModule, MatTableModule, MatSlideToggleModule,MatSnackBarModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  standalone: true
})
export class UsersList implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'city', 'isActive', 'Actions'];
  dataSource = new MatTableDataSource<any>([]);
  dialog = inject(MatDialog);

  us = inject(Users);
  snackBar = inject(MatSnackBar);


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.us.getAllusers().subscribe((data) => {
      this.dataSource.data = data.data;
      this.table.renderRows();
    })
  }

  onToggleChange(event: MatSlideToggleChange, data: any) {
    // console.log('Toggle changed:', event.checked);
    // console.log('User data:', data);
    let payload = {
      id: data.id,
      isActive: event.checked
    }
    let message = payload.isActive ? 'activated' : 'deactivated';
    this.us.updateUserStatus(payload).subscribe((res) => {
      // console.log('User status updated:', res);
      this.snackBar.open(`User ${message} successfully`, 'Close', {
        duration: 3000
      });
      this.getData();
    })
  }

  openDialog() {
    this.dialog.open(AddUpdateUser, {
      width: '800px',
      height: '650px',
      data: null
    }).afterClosed().subscribe(() => {
      this.getData();
    });
  }

  editUser(data: any) {
    // console.log('Edit user:', data);
    this.dialog.open(AddUpdateUser, {
      width: '800px',
      height: '650px',
      data: data
    }).afterClosed().subscribe(() => {
      this.getData();
    });
  }

}
