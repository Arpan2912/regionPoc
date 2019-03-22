import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public host = environment.host;
  public url = `http://${this.host}:3000`;
  constructor(private http: Http) { }

  public login(body) {
    return this.http.post(`${this.url}/login`, body).toPromise();
  }

  public getUserCount(body) {
    return this.http.get(`${this.url}/admin`).toPromise();
  }

  public addUser(body) {
    return this.http.post(`${this.url}/add-user`, body).toPromise();
  }

  public getAdminUser(body) {
    return this.http.get(`${this.url}/admin/get-users`, body).toPromise();
  }
}
