import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { RouterLinkActive } from '@angular/router';
import { CursosService } from '../../../services/Curso/curso.service';
import {HomeComponent} from '../home/home.component'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../../../services/Professor/professor.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tela-cadastro-curso',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLinkActive, FormsModule],
  templateUrl: './tela-cadastro-curso.component.html',
  styleUrl: './tela-cadastro-curso.component.css',
})
export class TelaCadastroCursoComponent implements OnInit {

  professores: any[] = [];

  constructor(
    protected cursoService: CursosService,
    private professorService: ProfessorService,
    private titulo: Title
  ) {}

  ngOnInit(): void {
    this.professorService.listarProfessores(this.professores)
    this.titulo.setTitle("Cadastrar Curso")
  }


}
