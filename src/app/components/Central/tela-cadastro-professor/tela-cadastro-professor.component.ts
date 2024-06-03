import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../../services/Curso/curso.service';
import { ProfessorService } from '../../../services/Professor/professor.service';
import { Title } from '@angular/platform-browser';
import { UtilidadesService } from '../../../services/Utilidades/utilidades.service';


@Component({
  selector: 'app-tela-cadastro-professor',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './tela-cadastro-professor.component.html',
  styleUrl: './tela-cadastro-professor.component.css'
})




export class TelaCadastroProfessorComponent implements OnInit {


  cursos: any[] = []
  @ViewChild('matriculaId') matriculaID!: ElementRef<HTMLInputElement>;
  @ViewChild('nome') nome!: ElementRef<HTMLInputElement>;

  constructor(public utilidadesService: UtilidadesService, private cursosService: CursosService, protected professorService: ProfessorService, private titulo: Title) { }

  ngAfterViewInit(): void {
    this.utilidadesService.previneNegativoInput(this.matriculaID);
    this.utilidadesService.somenteLetrasInput(this.nome)
  }

  ngOnInit(): void {
    this.cursosService.listarCursos(this.cursos);
    this.titulo.setTitle("Cadastrar Professor")

  }




}
