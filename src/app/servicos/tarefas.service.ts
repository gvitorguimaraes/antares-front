import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthToken } from '../model/AuthToken';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { Tarefa } from '../model/Tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

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

  public recuperarTarefasAtivas(): Observable<Tarefa[]> 
  {
    return this.http.get<Tarefa[]>(environment.apiURL+"/task", { headers: { Authorization: `Bearer ${this.token?.token}` }})
  }

  public updateTarefa(tarefa: Tarefa) : Observable<Tarefa> 
  {
    const headers = this.getHeaders();
    return this.http.put<Tarefa>(environment.apiURL+"/task", tarefa, { headers });
  }

  public criarTarefa(tarefa: Tarefa) : Observable<Tarefa>
  {
    if (tarefa.id.length > 0) tarefa.id = "";
    const headers = this.getHeaders();
    return this.http.post<Tarefa>(environment.apiURL+"/task", tarefa, { headers });
  }

  public recuperarTarefa(id: string) : Observable<Tarefa>
  {
    return this.http.get<Tarefa>(environment.apiURL+"/task/"+id, { headers: { Authorization: `Bearer ${this.token?.token}` }})
  }

  public deletarTarefa(id: string) : Observable<any>
  {
    return this.http.delete(environment.apiURL+"/task/"+id, { headers: { Authorization: `Bearer ${this.token?.token}` }})
  }
}
