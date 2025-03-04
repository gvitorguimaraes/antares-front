import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/Login';
import { Register } from '../model/Register';
import { Observable } from 'rxjs';
import { AuthToken } from '../model/AuthToken';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(login: Login): Observable<AuthToken>
  {
    return this.http.post<AuthToken>(environment.apiURL+"/auth", login);
  }

  public registerNewUser(register: Register): Observable<any>
  {
    return this.http.post<Register>(environment.apiURL+"/register", register);
  }
}
