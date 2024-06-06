import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { ProfessorService } from '../../../services/Professor/professor.service'
import { Title } from '@angular/platform-browser';
import { AlertaComponent } from '../../ComponentesVisuais/alerta/alerta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GraficoComponent} from '../../ComponentesVisuais/grafico/grafico.component'




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent, AlertaComponent, GraficoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  professores: any[] = [];


  constructor(protected professorService: ProfessorService, private router: Router, private titulo: Title, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.professorService.listarProfessores(this.professores)
    this.titulo.setTitle("Página Inicial")

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
        modalRef.componentInstance.acao = 'Professor excluído com sucesso.';
        modalRef.componentInstance.mostrarBotoes = false;
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Erro ao excluir professor:', error);
      }
    );
  }

}
