import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Users {

  api: string = "http://localhost:3000/"

  constructor(private http: HttpClient) { }


  loginUser(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post(this.api + 'api/login', body, httpOptions)
  }

  getAllusers(): Observable<any> {
    return this.http.get(this.api + 'api/users');
  }

  getusersById(id: any): Observable<any> {
    return this.http.get(this.api + 'api/user/' + id);
  }

  updateUserStatus(payload: any): Observable<any> {
    return this.http.put(this.api + 'api/updateuserstatus', payload);
  }

  addUser(payload: any): Observable<any> {
    return this.http.post(this.api + 'api/saveuser', payload);
  }

  updateUser(payload: any): Observable<any> {
        return this.http.put(this.api + 'api/updateuser', payload);
  } 

}
