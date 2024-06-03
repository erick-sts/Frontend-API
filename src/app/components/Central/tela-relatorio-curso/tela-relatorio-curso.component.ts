import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { BotaoImprimirComponent } from '../../ComponentesVisuais/botao-imprimir/botao-imprimir.component';

import { CursosService } from '../../../services/Curso/curso.service';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertaComponent } from '../../ComponentesVisuais/alerta/alerta.component';
@Component({
  selector: 'app-tela-relatorio-curso',
  standalone: true,
  imports: [CommonModule, NavbarComponent, BotaoImprimirComponent, RouterOutlet, RouterLink, AlertaComponent],
  templateUrl: './tela-relatorio-curso.component.html',
  styleUrl: './tela-relatorio-curso.component.css'
})
export class TelaRelatorioCursoComponent implements OnInit {
  cursos:any[] = []
  selectedModalidades: string[] = []


  constructor (private cursoService : CursosService, private titulo: Title, private router: Router ,private modalService: NgbModal){}

ngOnInit(): void {
  this.cursoService.listarCursos(this.cursos);
  this.titulo.setTitle("Relatório de Cursos")
}





limpaFiltro() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>
  const inputs = document.querySelectorAll('input')


  checkboxes.forEach(checkbox => { //limpa todos os checkboxes.
    checkbox.checked = false
  })

  inputs.forEach(input => { //limpa os inputs normais, no caso, temos o nome.
    input.value = ""
  })
}


openConfirmationModal(curso: any, mostrarBotoes: boolean) {
  const modalRef = this.modalService.open(AlertaComponent, { centered: true });
  modalRef.componentInstance.mensagem = `Tem certeza que deseja excluir o curso de <strong>${curso.nome}</strong>?`;

  modalRef.componentInstance.acao = 'Excluir Curso';
  modalRef.componentInstance.mostrarBotoes = mostrarBotoes;

  modalRef.result.then((result) => {
    if (result === 'confirm') {
      this.excluirCurso(curso);
    }
  });
}

excluirCurso(curso: any): void {
  this.cursoService.deletar(curso._id).subscribe(
    () => {
      this.cursos = this.cursos.filter((c) => c !== curso);
      const modalRef = this.modalService.open(AlertaComponent, { centered: true });
      modalRef.componentInstance.acao = 'Curso excluído com sucesso.';
      modalRef.componentInstance.mostrarBotoes = false;
    },
    (error: any) => {
      console.error('Erro ao excluir curso:', error);
    }
  );
}

onCheckboxChange(event: Event, list: string[]) {
  const checkbox = event.target as HTMLInputElement;
  const value = checkbox.value;

  if (checkbox.checked) {
    list.push(value);
  } else {
    const index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1);
    }
  }
}

filtraCurso(nome: string, coordenador: string, modalidade: string[]) {
  this.cursos = []

  this.cursoService.filtrarCursos(nome, coordenador, modalidade).subscribe(
    (cursoEncontrado) => {

      this.cursos.splice(0, this.cursos.length, ...cursoEncontrado)
    },
    (error) => {
      console.error(`Deu erro no ${this.filtraCurso.name} - ${error.message}`)
    }
  )

}







}
