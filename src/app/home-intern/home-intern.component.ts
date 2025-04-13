import { Component } from '@angular/core';
import { WaitIconComponent } from '../components/wait-icon/wait-icon.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicos/auth.service';
import { Router, RouterModule } from '@angular/router';
import { TarefasComponent } from '../components/tarefas/tarefas.component';
import { Observable } from 'rxjs';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-intern',
  standalone: true,
  imports: [
            RouterModule, 
            WaitIconComponent,
            CommonModule,
            TarefasComponent,
            NgbModalModule
          ],
  templateUrl: './home-intern.component.html',
  styleUrl: './home-intern.component.css'
})
export class HomeInternComponent {

  public data: string = this.getDataFormatada();
  public mainPageTitle: string = "";
  public exibirBotaoPesquisa: boolean = false;
  public exibirBotaoCriarNovo: boolean = false;
  public exibirModal: boolean = false;
  public msgModal: string = "";

  // componentes dinamicos
  public exibicaoDeUniverso: boolean = false;
  public exibicaoDeAnotacoes: boolean = false;
  public exibicaoDeTarefas: boolean = false;
  public exibicaoDeEstatisticas: boolean = false;
  public exibicaoDeCalendario: boolean = false;
  public exibicaoDePerfil: boolean = false;

  public loading: boolean = false;

  public constructor(private route:Router, 
                     private authService: AuthService,
                     private modalService: NgbModal
                    )
  {
  }

  ngOnInit(): void {
    
    if (!this.authService.getLocalStorageToken()) 
    {
      this.route.navigate(['']);
      return;
    }

    // Verify token asynchronously
    this.tokenIsActive().subscribe({
      next: (isValid: any) => {
        if (isValid) {
          this.onChangeToInicio(); // Proceed to inicio if token is valid
        } else {
          this.route.navigate(['']); // Redirect to home or login if token is invalid
        }
      },
      error: (error: any) => {
        alert('A sua sessão expirou, faça login novamente!')
        this.route.navigate(['']); // Redirect on error
      }
    });
  }

  
  private getDataFormatada(): string {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0"); 
    const mes = String(hoje.getMonth() + 1).padStart(2, "0"); 
    const ano = hoje.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }
  
  private setarVariaveisDeExibicao(mainPageTitle: string, exibirBotaoPesquisa: boolean, exibirBotaoCriarNovo: boolean): void
  {
    this.mainPageTitle = mainPageTitle;
    this.exibirBotaoPesquisa = exibirBotaoPesquisa;
    this.exibirBotaoCriarNovo = exibirBotaoCriarNovo;

    this.exibicaoDeUniverso = false;
    this.exibicaoDeAnotacoes = false;
    this.exibicaoDeTarefas = false;
    this.exibicaoDeEstatisticas = false;
    this.exibicaoDeCalendario = false;
    this.exibicaoDePerfil = false;
  }

  public onChangeToInicio()
  {
    this.setarVariaveisDeExibicao("Início", true, false);
  }

  public onChangeToEstatisticas()
  {
    this.setarVariaveisDeExibicao("Estatísticas", false, false);
  }

  public onChangeToAnotacoes()
  {
    this.setarVariaveisDeExibicao("Anotações", true, true);
    this.exibicaoDeAnotacoes = true;
  }

  public onChangeToTarefas()
  {
    this.setarVariaveisDeExibicao("Tarefas", true, true);
    this.exibicaoDeTarefas = true;
  }

  public onChangeToCalendario()
  {
    this.setarVariaveisDeExibicao("Calendário", false, false);
  }

  public onChangeToPerfil()
  {
    this.setarVariaveisDeExibicao("Perfil", false, false);
  }

  public logout()
  {
    this.loading = true;
    this.authService.logout();
    this.loading = false;
    this.route.navigate([""]);
  }

  public tokenIsActive() : Observable<boolean>
  {
    return this.authService.tokenIsActive();
  }
}
