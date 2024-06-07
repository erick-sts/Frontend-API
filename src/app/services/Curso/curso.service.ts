import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertaComponent } from '../../components/ComponentesVisuais/alerta/alerta.component';


@Injectable({
  providedIn: 'root'
})
export class CursosService {


  constructor(private http: HttpClient, private modalService: NgbModal) { }


  //Banco de Dados, Interacao com o BackEnd 🎲

  baseUrl = 'https://backend-api-7cos.onrender.com'

  //Create 🆕
  cadastrar(
    nome: String,
    codCourse: String,
    disciplinas: [String],
    sigla: String,
    modalidade: String,
    professors: Object,
    coordenador: String) {

    const novoCurso = {
      nome,
      codCourse,
      disciplinas,
      sigla,
      modalidade,
      coordenador
    }

    this.http.post(`${this.baseUrl}/course/`, novoCurso).subscribe({
      next: (response) => {

        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = 'Cadastro de Curso.';
        modalRef.componentInstance.mensagem = 'Curso cadastrado com sucesso!';
        modalRef.componentInstance.mostrarBotoes = false;

      },
      error: (error) => {
        console.error(error);

        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = 'Cadastro de Curso.';
        modalRef.componentInstance.mensagem = 'Erro ao cadastrar Curso!';
        modalRef.componentInstance.mostrarBotoes = false;
      }
    })
  }

  //Read 📖
  listar() {
    return this.http.get<any[]>(`${this.baseUrl}/course/`);
  }

  //Update 🔁
  atualizar() { }

  //Delete 🗑️
  deletar(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/course/${id}`)
  }
  // ###








  // ❗Métodos que usarão o crud porém trabalhando de forma específica. ❗

  listarCursos(cursos: any[]) {
    this.listar().subscribe(
      (cursosCadastrados) => {
        cursos.splice(0, cursos.length, ...cursosCadastrados)
        //Splice está formatando a variável professores para poder receber os professores cadastrados vindo do banco de dados.

      },
      (error) => {
        alert(`Erro ao listar cursos: ${error.message}`);
      }
    )
  }



  //Filtra cursos com base nos dados selecionados na interface.

  filtrarCursos(nome: string, coordenador: string, modalidade: string[]): Observable<Object[]> {
    let params = new HttpParams();
    if (nome) {
      params = params.append('nome', nome);
    }
    if (modalidade && modalidade.length) {
      params = params.append('modalidade', modalidade.join(','));
    }
    if (coordenador) {
      params = params.append('coordenador', coordenador);
    }

    alert(params)


    return this.http.get<Object[]>(`${this.baseUrl}/course/filter/`, { params })

  }

}
