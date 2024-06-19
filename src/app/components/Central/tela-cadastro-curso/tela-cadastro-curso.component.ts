import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CursosService } from '../../../services/Curso/curso.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../../../services/Professor/professor.service';
import { Title } from '@angular/platform-browser';
import { UtilidadesService } from '../../../services/Utilidades/utilidades.service';

@Component({
  selector: 'app-tela-cadastro-curso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tela-cadastro-curso.component.html',
  styleUrls: ['./tela-cadastro-curso.component.css'],
})
export class TelaCadastroCursoComponent implements OnInit, AfterViewInit {

  professores: any[] = [];
  coordenador: string = '';
  disciplinasArray: string[] = [];

  @ViewChild('nome') nome!: ElementRef<HTMLInputElement>;
  @ViewChild('codigo') codigo!: ElementRef<HTMLInputElement>;
  @ViewChild('sigla') sigla!: ElementRef<HTMLInputElement>;
  @ViewChild('modalidade') modalidade!: ElementRef<HTMLSelectElement>;
  @ViewChild('coordenadorSelect') coordenadorSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('disciplinas') disciplinasInput!: ElementRef<HTMLTextAreaElement>

  constructor(
    protected cursoService: CursosService,
    private professorService: ProfessorService,
    private titulo: Title,
    private utilidadesService: UtilidadesService
  ) { }

  // ngAfterViewInit(): void {
  //   this.utilidadesService.previneNegativoInput(this.codigo);
  //   this.utilidadesService.somenteLetrasInput(this.nome);
  // }

  ngOnInit(): void {
    this.professorService.listarProfessores(this.professores);
    this.titulo.setTitle("Cadastrar Curso");
  }

  ngAfterViewInit(): void {
    // Verifica se os ViewChilds estão definidos após a inicialização
    if (this.nome && this.codigo && this.disciplinasInput && this.sigla && this.modalidade) {
      console.log('Todos os ViewChilds estão definidos e prontos para uso.');
    } else {
      console.error('Um dos ViewChilds não está definido após ngAfterViewInit.');
    }
  }

  cadastrarCurso(): void {
    // Verifica se os ViewChilds estão definidos antes de acessá-los
    if (this.nome && this.codigo && this.sigla && this.modalidade && this.coordenador && this.disciplinasInput) {
      const disciplinasStr = this.disciplinasInput.nativeElement.value;
      this.disciplinasArray = disciplinasStr.split(',').map(disciplina => disciplina.trim());

      const nome = this.nome.nativeElement.value;
      const codCourse = this.codigo.nativeElement.value;
      const sigla = this.sigla.nativeElement.value;
      const modalidade = this.modalidade.nativeElement.value;

      // coordenador já está acessível diretamente como this.coordenador
      console.log('Coordenador selecionado:', this.coordenador);
      this.cursoService.cadastrar(
        nome,
        codCourse,
        this.disciplinasArray,
        sigla,
        modalidade,
        this.professores,
        this.coordenador  // Passa o coordenador diretamente para o serviço
      );
    } else {
      console.error('Um dos ViewChilds não está definido ao tentar cadastrar.');
    }
  }
}