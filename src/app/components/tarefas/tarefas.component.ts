import { Component } from '@angular/core';
import { Tarefa } from '../../model/Tarefa';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TarefasService } from '../../servicos/tarefas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: 
  [
    NgbModalModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent {

  listaTarefas: Tarefa[] = [];
  mensagemErro: string | null = null;
  loading = false;
  tarefaAcaoAtual: Tarefa = new Tarefa();
  modoEdicao : boolean = false;
  modoInclusao : boolean = false;

  public constructor(private modalService: NgbModal, private service: TarefasService) {}

  ngOnInit()
  {
    this.loading = true;

    this.recuperarTarefasAtivas();

    this.loading = false;
  }

  private recuperarTarefasAtivas(): void 
  {
    this.loading = true;
    this.service.recuperarTarefasAtivas().subscribe
      ({
        next: (tarefas: Tarefa[]) => 
          {
            this.listaTarefas = tarefas.map(t => Object.assign(new Tarefa(), t));
            this.loading=false; 
          },
        error: (error) => 
          {
            this.mensagemErro = error;
            this.listaTarefas = [];
            this.loading=false; 
          }
      });
  }

  public updateTarefa()
  {
    this.loading = true;
    this.service.updateTarefa(this.tarefaAcaoAtual).subscribe
      ({
        next: (tarefa: Tarefa) => 
          {
            this.recuperarTarefasAtivas();
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
  
  public criarTarefa()
  {
    this.loading = true;
    this.service.criarTarefa(this.tarefaAcaoAtual).subscribe
      ({
        next: (tarefa: Tarefa) => 
          {
            this.recuperarTarefasAtivas();
            this.loading=false; 
          },
        error: (error) => 
          {
            this.mensagemErro = error;
            this.loading=false;
          }
      });
  }

  public recuperarTarefa(id : string)
  {
    this.loading = true;
    this.service.recuperarTarefa(id).subscribe
      ({
        next: (tarefa: Tarefa) => 
          {
            this.recuperarTarefasAtivas();
            this.loading=false; 
          },
        error: (error) => 
          {
            this.mensagemErro = error;
            this.loading=false;
          }
      });
  }

  public deletarTarefa(id : string)
  {
    this.loading = true;
    this.service.deletarTarefa(id).subscribe
      ({
        next: (tarefa: Tarefa) => 
          {
            this.recuperarTarefasAtivas();
            this.loading=false; 
          },
        error: (error) => 
          {
            this.mensagemErro = error;
            this.loading=false;
          }
      });
  }




  //
  // CONTROLES MODAL
  //

  openModal(content: any, tarefa: Tarefa) 
  {
    this.mudarParaVisualizacao();
    this.tarefaAcaoAtual = tarefa;
    this.modalService.open(content, { centered: true });
  }

  openModalNovaTarefa(content: any) 
  {
    this.mudarParaInclusao();
    this.tarefaAcaoAtual = new Tarefa();
    this.modalService.open(content, { centered: true });
  }

  salvarConteudoModal()
  {
    if (this.modoInclusao)
    {
      this.criarTarefa();
    }
    else
    {
      this.updateTarefa();
    }

    this.modoInclusao = false;
    this.modoEdicao = false;
  }

  excluirTarefa(tarefa: Tarefa)
  {
    this.modoInclusao = false;
    this.modoEdicao = false;
    this.deletarTarefa(tarefa.id);
    this.recuperarTarefasAtivas();
  }

  public exibirBotaoAlterarModal() : boolean
  {
    return !this.modoEdicao && !this.modoInclusao;
  }

  public exibirBotaoSalvarModal() : boolean
  {
    return this.modoEdicao || this.modoInclusao;
  }

  public mudarParaAlteracao()
  {
    this.modoEdicao = true;
  }

  public mudarParaInclusao()
  {
    this.modoInclusao = true;
  }

  public mudarParaVisualizacao()
  {
    this.modoInclusao = false;
    this.modoEdicao = false;
  }

  public ehSomenteVisualizacao() : boolean
  {
    return !this.modoInclusao && !this.modoEdicao;
  }
}
