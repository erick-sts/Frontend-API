import { Component, ElementRef, OnInit, ViewChild, input } from '@angular/core';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { ProfessorService } from '../../../services/Professor/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../services/Curso/curso.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UtilidadesService } from '../../../services/Utilidades/utilidades.service';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

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

  
  cursosids: string[] = []
  
  
  
  constructor(private router: Router,private route: ActivatedRoute, protected professorService: ProfessorService, private cursoService: CursosService, private titulo: Title, private utilidadesService: UtilidadesService) { }

  
  ngAfterViewInit(): void {
    this.utilidadesService.somenteLetrasInput(this.nome)
  }


  ngOnInit(): void {
    const nome = this.route.snapshot.paramMap.get('nome') ?? '';

    // Carrega o professor pelo nome e encadeia com a listagem de cursos
    this.professorService.carregaProfessorPeloNome(nome).pipe(
        switchMap((professor) => {
            this.professor = professor;
            
            // Mapeia os IDs dos cursos para uso posterior
            this.cursosids = this.professor.coursesId.map((curso: any) => curso._id);
            
            // Atualiza o professor com os IDs dos cursos
            this.professor.coursesId = this.cursosids;
            
            // Configura o título da página
            this.titulo.setTitle(`Editar Professor ${this.professor.nome}`);
            
            // Retorna um Observable de listagem de cursos
            return this.cursoService.listarCursos();
        })
    ).subscribe(
        (cursos) => {
            this.cursos = cursos;
        },
        (error) => {
            console.error('Erro ao carregar cursos:', error);
        }
    );
}


//Método antigo...
// ngOnInit(): void {
    
    
//   const nome = this.route.snapshot.paramMap.get('nome') ?? '';
  
//   //Sobreescreve os campos de input com o que o usuário clicou na home
//   this.professorService.carregaProfessorPeloNome(nome).subscribe(
//     (professor) => {
//       this.professor = professor

//       //gambiarra para funcionar no back
//       this.cursosids = this.professor.coursesId.map((curso:any) => curso._id)
//       this.professor = {
//         ...this.professor, coursesId:this.cursosids
//       }
      

//     },
//     (error) => {
//       console.error(error);
//     })
  
//   this.titulo.setTitle(`Editar Professor`)
//   this.cursoService.listarCursos(this.cursos);

  
  


  
// }





  

  toggleCurso(cursoId: string): void {
    const index = this.professor.coursesId.indexOf(cursoId);
    if (index === -1) {
      this.professor.coursesId.push(cursoId); // Adiciona o curso selecionado
    } else {
      this.professor.coursesId.splice(index, 1); // Remove o curso selecionado
    }
    console.log('Cursos selecionados:', this.professor.coursesId);
  }
}

  






