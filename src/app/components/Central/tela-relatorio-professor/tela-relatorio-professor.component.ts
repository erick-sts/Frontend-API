import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../../../services/Professor/professor.service';
import { BotaoImprimirComponent } from '../../ComponentesVisuais/botao-imprimir/botao-imprimir.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Title } from '@angular/platform-browser';
import { AlertaComponent } from '../../ComponentesVisuais/alerta/alerta.component';
import { CursosService } from '../../../services/Curso/curso.service';


@Component({
  selector: 'app-tela-relatorio-professor',
  standalone: true,
  imports: [CommonModule, NavbarComponent, BotaoImprimirComponent, RouterOutlet, RouterLink, AlertaComponent],
  templateUrl: './tela-relatorio-professor.component.html',
  styleUrl: './tela-relatorio-professor.component.css'
})


export class TelaRelatorioProfessorComponent implements OnInit {
  selectedCursos: string[] = []
  selectedTitulacoes: string[] = []

  professores: any[] = []
  cursos: any[] = []


  constructor(protected professorService: ProfessorService, private cursoService: CursosService, private router: Router, private titulo: Title, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.professorService.listarProfessores(this.professores) //Lista os professores na tabela
    this.cursoService.listarCursos(this.cursos) //Lista os cursos em suas labels

    this.titulo.setTitle("Relatório de Professores")
  }

  onCheckboxChange(event: Event, type: string) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    let selectedList: string[];
    if (type === 'curso') {
      selectedList = this.selectedCursos;
    } else if (type === 'titulacao') {
      selectedList = this.selectedTitulacoes;
    } else {
      return;
    }

    if (checkbox.checked) {
      selectedList.push(value);
    } else {
      const index = selectedList.indexOf(value);
      if (index > -1) {
        selectedList.splice(index, 1);
      }
    }
  }

  openConfirmationModal(professor: any, mostrarBotoes: boolean) {
    const modalRef = this.modalService.open(AlertaComponent, { centered: true });
    modalRef.componentInstance.mensagem = `Tem certeza que deseja excluir o professor <strong>${professor.nome}</strong>?`;

    modalRef.componentInstance.acao = 'Excluir Professor';
    modalRef.componentInstance.mostrarBotoes = mostrarBotoes;

    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.excluirProfessor(professor);
      }
    });
  }

  excluirProfessor(professor: any): void {
    this.professorService.deletar(professor._id).subscribe(
      (response) => {
        this.professores = this.professores.filter((p) => p !== professor);
        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = '🗑️';
        modalRef.componentInstance.mensagem = response.message + " Professor excluído com sucesso!";
        modalRef.componentInstance.mostrarBotoes = false;

      },
      (error: any) => {
        console.error('Erro ao excluir professor:', error);
      }
    );
  }



  filtraProfessor(nome: string, cursos: string[], titulacoes: string[]): void {
    this.professores = [];

    this.professorService.filtrarProfessores(nome, cursos, titulacoes).subscribe(
      (professorEncontrado) => {
        if (professorEncontrado.length === 0) {
          // Se nenhum professor encontrado, abrir o modal de alerta
          this.openNenhumProfessorEncontradoModal();
        } else {
          // Caso contrário, atualizar a lista de professores
          this.professores = professorEncontrado;
        }
      },
      (error) => {
        console.error(`Erro ao filtrar professores: ${error.message}`);
      }
    );
  }

  openNenhumProfessorEncontradoModal(): void {
    const modalRef = this.modalService.open(AlertaComponent, { centered: true });
    modalRef.componentInstance.acao = 'Ops!';
    modalRef.componentInstance.mensagem = 'Nenhum professor encontrado com os filtros aplicados.';
    modalRef.componentInstance.mostrarBotoes = false;

    this.professorService.listarProfessores(this.professores)
    
  }

  getCoursesSigla(coursesId: any[]): string {
    return coursesId.map(course => course.sigla).join(', ');
  }
}