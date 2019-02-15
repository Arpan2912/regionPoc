import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: Http) { }

  public login(body) {
    return this.http.post(`http://localhost:3000/login`, body).toPromise();
  }

  public getUserCount(body) {
    return this.http.get(`http://localhost:3000/admin`).toPromise();
  }

  public addUser(body) {
    return this.http.post(`http://localhost:3000/add-user`, body).toPromise();
  }

  public getAdminUser(body) {
    return this.http.get(`http://localhost:3000/admin/get-users`, body).toPromise();
  }
}
