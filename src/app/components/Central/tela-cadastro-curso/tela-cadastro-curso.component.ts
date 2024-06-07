import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { RouterLinkActive } from '@angular/router';
import { CursosService } from '../../../services/Curso/curso.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../../../services/Professor/professor.service';
import { Title } from '@angular/platform-browser';
import { UtilidadesService } from '../../../services/Utilidades/utilidades.service';

@Component({
  selector: 'app-tela-cadastro-curso',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLinkActive, FormsModule],
  templateUrl: './tela-cadastro-curso.component.html',
  styleUrls: ['./tela-cadastro-curso.component.css'],
})
export class TelaCadastroCursoComponent implements OnInit, AfterViewInit {

  professores: any[] = [];
  @ViewChild('codigo') codigo!: ElementRef<HTMLInputElement>;
  @ViewChild('nome') nome!: ElementRef<HTMLInputElement>;

  constructor(
    protected cursoService: CursosService,
    private professorService: ProfessorService,
    private titulo: Title,
    private utilidadesService: UtilidadesService
  ) {}

  ngAfterViewInit(): void {
    this.utilidadesService.previneNegativoInput(this.codigo);
    this.utilidadesService.somenteLetrasInput(this.nome);
    
    
    this.codigo.nativeElement.addEventListener('input', () => {
      this.limitInput(this.codigo);
    });
  }

  ngOnInit(): void {
    this.professorService.listarProfessores(this.professores);
    this.titulo.setTitle("Cadastrar Curso");
  }

  limitInput(input: ElementRef<HTMLInputElement>) {
    if (input.nativeElement.value.length > 3) {
      input.nativeElement.value = input.nativeElement.value.slice(0, 3);
    }
  }
}
