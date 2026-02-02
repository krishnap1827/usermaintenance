import { Routes } from '@angular/router';
import { Login } from './login/login';
import { UsersList } from './users-list/users-list';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'users', component: UsersList}
];
