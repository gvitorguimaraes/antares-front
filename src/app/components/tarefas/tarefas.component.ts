import { Component } from '@angular/core';
import { Tarefa } from '../../model/Tarefa';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TarefasService } from '../../servicos/tarefas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: 
  [
    NgbModalModule,
    CommonModule
  ],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent {


  listaTarefas: Tarefa[] = [];
  mensagemErro: string | null = null;
  loading = false;
  tarefaSelecionada: Tarefa = new Tarefa();
  modoEdicao : boolean = false;


  public constructor(private modalService: NgbModal, private service: TarefasService) {}

  ngOnInit()
  {
    this.modoEdicao = false;
    this.carregarTarefas();
  }

  openModal(content: any, tarefa: Tarefa) 
  {
    this.tarefaSelecionada = tarefa;
    this.modalService.open(content, { centered: true });
  }

  private carregarTarefas(): void 
  {
    this.loading = true;
    this.service.recuperarTarefas().subscribe
        ({
            next: (tarefas: Tarefa[]) => 
              {
                this.listaTarefas = tarefas;
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

  public alterar()
  {
    this.modoEdicao = true;
  }

  public salvar(tarefa : Tarefa)
  {
    this.loading = true;
    this.service.salvarTarefaExistente(tarefa).subscribe
      ({
        next: (tarefa: Tarefa) => 
          {
            this.carregarTarefas();
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
}
