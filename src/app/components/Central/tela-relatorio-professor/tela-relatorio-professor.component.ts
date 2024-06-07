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
      () => {
        this.professores = this.professores.filter((p) => p !== professor);
        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = '🗑️';
        modalRef.componentInstance.mensagem = 'Professor excluído com sucesso.';
        modalRef.componentInstance.mostrarBotoes = false;

      },
      (error: any) => {
        console.error('Erro ao excluir professor:', error);
      }
    );
  }

  limpaFiltro() {

    const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>
    const inputs = document.querySelectorAll('input')

    checkboxes.forEach(checkbox => { //limpa todos os checkboxes.
      checkbox.checked = false 
      checkbox.dispatchEvent(new Event('change'));
    })

    inputs.forEach(input => { //limpa os inputs tipo texto, no caso, temos o nome.
      input.value = ""
    })
  }

  filtraProfessor(nome: string, cursos: string[], titulacoes: string[]) {
    this.professores = []

    this.professorService.filtrarProfessores(nome, cursos, titulacoes).subscribe(
      (professorEncontrado) => {

        this.professores.splice(0, this.professores.length, ...professorEncontrado)
      },
      (error) => {
        console.error(`Deu erro no ${this.filtraProfessor.name} - ${error.message}`)
      }
    )

  }

}