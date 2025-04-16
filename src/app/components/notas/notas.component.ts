import { Component } from '@angular/core';
import { NotasService } from '../../servicos/notas.service';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Nota } from '../../model/Nota';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports:  
  [
    NgbModalModule,
    CommonModule
  ],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {

  listaNotas: Nota[] = [];
  mensagemErro: string | null = null;
  loading = false;
  notaAcaoAtual: Nota = new Nota();
  modoEdicao : boolean = false;

  public constructor(private modalService: NgbModal, private service: NotasService) {}

  ngOnInit()
  {
    this.loading = true;

    this.modoEdicao = false;
    this.recuperarNotasAtivas();

    this.loading = false;
  }


  private recuperarNotasAtivas(): void 
  {
    this.loading = true;
    this.service.recuperarNotasAtivas().subscribe
      ({
        next: (Notas: Nota[]) => 
          {
            this.listaNotas = Notas;
            this.loading=false; 
          },
        error: (error) => 
          {
            this.mensagemErro = error;
            this.listaNotas = [];
            this.loading=false; 
          }
      });
  }

  public mudarParaAlteracao()
  {
    this.modoEdicao = true;
  }

  public updateNota()
  {
    this.loading = true;
    this.service.updateNota(this.notaAcaoAtual).subscribe
      ({
        next: (Nota: Nota) => 
          {
            this.recuperarNotasAtivas();
            this.loading=false; 
            this.modoEdicao = true;
          },
        error: (error) => 
          {
            this.mensagemErro = error;
            this.loading=false;
          }
      });
  }

  public mudarParaInclusao()
  {
  }
  
  public criarNota()
  {
    this.loading = true;
    this.service.criarNota(this.notaAcaoAtual).subscribe
      ({
        next: (Nota: Nota) => 
          {
            this.recuperarNotasAtivas();
            this.loading=false; 
          },
        error: (error) => 
          {
            this.mensagemErro = error;
            this.loading=false;
          }
      });
  }

  public recuperarNota(id : string)
  {
    this.loading = true;
    this.service.recuperarNota(id).subscribe
      ({
        next: (Nota: Nota) => 
          {
            this.recuperarNotasAtivas();
            this.loading=false; 
          },
        error: (error) => 
          {
            this.mensagemErro = error;
            this.loading=false;
          }
      });
  }

  public deletarNota(id : string)
  {
    this.loading = true;
    this.service.deletarNota(id).subscribe
      ({
        next: (Nota: Nota) => 
          {
            this.recuperarNotasAtivas();
            this.loading=false; 
          },
        error: (error) => 
          {
            this.mensagemErro = error;
            this.loading=false;
          }
      });
  }
}
