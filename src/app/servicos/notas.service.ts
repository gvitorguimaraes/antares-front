import { Injectable } from '@angular/core';
import { Nota } from '../model/Nota';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthToken } from '../model/AuthToken';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  public token : AuthToken = new AuthToken("");
  
  constructor(private authService: AuthService, private http: HttpClient) 
  {
    const token = this.authService.getLocalStorageToken();
    if (token != null) this.token = token;
  }

  public getHeaders() : HttpHeaders
  {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token?.token}`,
      'Content-Type': 'application/json'
    });
  }

  public recuperarNotasAtivas(): Observable<Nota[]> 
  {
    return this.http.get<Nota[]>(environment.apiURL+"/note", { headers: { Authorization: `Bearer ${this.token?.token}` }})
  }

  public updateNota(Nota: Nota) : Observable<Nota> 
  {
    const headers = this.getHeaders();
    return this.http.put<Nota>(environment.apiURL+"/note", Nota, { headers });
  }

  public criarNota(Nota: Nota) : Observable<Nota>
  {
    if (Nota.id.length > 0) Nota.id = "";
    const headers = this.getHeaders();
    return this.http.post<Nota>(environment.apiURL+"/note", Nota, { headers });
  }

  public recuperarNota(id: string) : Observable<Nota>
  {
    return this.http.get<Nota>(environment.apiURL+"/note/"+id, { headers: { Authorization: `Bearer ${this.token?.token}` }})
  }

  public deletarNota(id: string) : Observable<any>
  {
    return this.http.delete(environment.apiURL+"/note/"+id, { headers: { Authorization: `Bearer ${this.token?.token}` }})
  }
}
