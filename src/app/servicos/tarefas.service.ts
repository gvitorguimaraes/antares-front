import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthToken } from '../model/AuthToken';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { Tarefa } from '../model/Tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  public recuperarTarefas(): Observable<Tarefa[]> 
  {
    const token = this.authService.getLocalStorageToken();
    return this.http.get<Tarefa[]>(environment.apiURL+"/task", { headers: { Authorization: `Bearer ${token?.token}` }})
  }

  public salvarTarefaExistente(tarefa: Tarefa) : Observable<Tarefa> 
  {
    const token = this.authService.getLocalStorageToken();
    return this.http.put<Tarefa>(environment.apiURL+"/task", { headers: { Authorization: `Bearer ${token?.token}` }});
  }
}
