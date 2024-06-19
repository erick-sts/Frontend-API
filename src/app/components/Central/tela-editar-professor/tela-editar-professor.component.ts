import { Component, ElementRef, OnInit, ViewChild, input } from '@angular/core';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { ProfessorService } from '../../../services/Professor/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../services/Curso/curso.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UtilidadesService } from '../../../services/Utilidades/utilidades.service';
import { FormsModule } from '@angular/forms';
import { ObservableInput, switchMap } from 'rxjs';

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

  retornoObservavel: ObservableInput<any> = ""
  cursosids: string[] = []



  constructor(private router: Router, private route: ActivatedRoute, protected professorService: ProfessorService, private cursoService: CursosService, private titulo: Title, private utilidadesService: UtilidadesService) { }


  ngAfterViewInit(): void {
    this.utilidadesService.somenteLetrasInput(this.nome)
  }

  //Método antigo...
  ngOnInit(): void {


    const nome = this.route.snapshot.paramMap.get('nome') ?? '';

    // Carrega dados do professor
    this.professorService.carregaProfessorPeloNome(nome).subscribe(
      (professor) => {
        this.professor = professor;

        // Inicializa cursosSelecionados com os IDs dos cursos associados ao professor
        this.cursosSelecionados = this.professor.coursesId.map((curso: any) => curso._id);
      },
      (error) => {
        console.error(error);
      }
    );

    // Define o título da página
    this.titulo.setTitle(`Editar Professor`);

    // Carrega a lista de cursos
    this.cursoService.listar().subscribe(
      (cursos) => {
        this.cursos = cursos;
      },
      (error) => {
        console.error('Erro ao carregar cursos:', error);
      }
    );
  }


  atualizarProfessor(): void {
    this.professorService.atualizar(
      this.professor._id,
      this.professor.nome,
      this.professor.matriculaId,
      this.professor.unidadeId,
      this.professor.titulacao,
      this.professor.referencia,
      this.professor.lattes,
      this.cursosSelecionados,
      this.professor.statusAtividade,
      this.professor.email,
      this.professor.notes
    );
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








