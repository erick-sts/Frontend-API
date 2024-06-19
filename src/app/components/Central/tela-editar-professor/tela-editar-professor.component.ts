import { Component, ElementRef, OnInit, ViewChild, input } from '@angular/core';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { ProfessorService } from '../../../services/Professor/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../services/Curso/curso.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UtilidadesService } from '../../../services/Utilidades/utilidades.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tela-editar-professor',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './tela-editar-professor.component.html',
  styleUrl: './tela-editar-professor.component.css'
})
export class TelaEditarProfessorComponent implements OnInit {
  @ViewChild('nome') nome!: ElementRef<HTMLInputElement>;


  cursos: any[] = []
  cursosSelecionados: any[] = []
  professor: any = {}

  
  constructor(private router: Router,private route: ActivatedRoute, protected professorService: ProfessorService, private cursoService: CursosService, private titulo: Title, private utilidadesService: UtilidadesService) { }

  
  ngAfterViewInit(): void {
    this.utilidadesService.somenteLetrasInput(this.nome)
  }



  ngOnInit(): void {
    
    
    const nome = this.route.snapshot.paramMap.get('nome') ?? '';
    
    //Sobreescreve os campos de input com o que o usuário clicou na home
    this.professorService.carregaProfessorPeloNome(nome).subscribe(
      (professor) => {
        this.professor = professor;
      },
      (error) => {
        console.error(error);
      })
    
    this.titulo.setTitle(`Editar Professor`)
    this.cursoService.listarCursos(this.cursos);
    
  }

  toggleCurso(cursoId: string): void {
    
    if (this.cursosSelecionados.includes(cursoId)) {
      this.cursosSelecionados = this.cursosSelecionados.filter(id => id !== cursoId); // Remove o curso selecionado
    } else {
      this.cursosSelecionados.push(cursoId); // Adiciona o curso selecionado
      
    }
    console.log('Cursos selecionados:', this.cursosSelecionados);
  }




} 




