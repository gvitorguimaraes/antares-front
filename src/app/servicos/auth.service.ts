import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/Login';
import { Register } from '../model/Register';
import { catchError, map, Observable, of } from 'rxjs';
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

  public logout(): void
  {
    const token = this.getLocalStorageToken();
    if (token != null && token.token !== "")
    {
      localStorage.removeItem("authToken");
    }
  }

  public limparTokenInvalido()
  {
    localStorage.removeItem("authToken");
  }

  public setLocalStorageToken(authToken: AuthToken): void
  {
    localStorage.setItem("authToken", authToken.token);
  }

  public getLocalStorageToken(): AuthToken | null
  {
    const token = localStorage.getItem("authToken");
    return token != null ? new AuthToken(token) : null;
  }

  public tokenIsActive() : Observable<boolean> 
  {
    const token =  this.getLocalStorageToken();
    
    return this.http.get(environment.apiURL+"/isTokenActive", {
      headers: { Authorization: `Bearer ${token?.token}` }
    }).pipe(
      map(() => true),
      catchError(error => {
        console.error('Token verification failed', error);
        return of(false);
      })
    );
  }
}
