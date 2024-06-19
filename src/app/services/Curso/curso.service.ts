import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertaComponent } from '../../components/ComponentesVisuais/alerta/alerta.component';

interface HttpResponse {
  message: string;

}

@Injectable({
  providedIn: 'root'
})
export class CursosService {



  constructor(private http: HttpClient, private modalService: NgbModal, private router: Router) { }



  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  //Banco de Dados, Interacao com o BackEnd 🎲

  baseUrl = 'https://backend-api-7cos.onrender.com'

  //Create 🆕
  cadastrar(
    nome: string,
    codCourse: string,
    disciplinas: string[],
    sigla: string,
    modalidade: string,
    professores: any[],
    coordenador: string
  ) {
    const novoCurso = {
      nome,
      codCourse,
      disciplinas,
      sigla,
      modalidade,
      professores,
      coordenador
    };
    console.log(novoCurso)
    const headers = this.getAuthHeaders();
    this.http.post<any>(`${this.baseUrl}/course/`, novoCurso, { headers }).subscribe({
      next: (response) => {
        console.log(response);
        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = 'Cadastro de Curso 📝';
        modalRef.componentInstance.mensagem = response.msg;
        modalRef.componentInstance.mostrarBotoes = false;
        this.router.navigate(['/tela-relatorio-curso']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar Curso:', err);
        let errorMessage = 'Erro desconhecido';

        if (err.error && err.error.err) {
          errorMessage = err.error.err.map((error: any) => error.msg).join('<br><br>');
        } else if (err.error && typeof err.error === 'string') {
          errorMessage = err.error;
        }

        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = 'Cadastro de Curso 📝';
        modalRef.componentInstance.mensagem = errorMessage || 'Erro ao cadastrar Curso.';
        modalRef.componentInstance.mostrarBotoes = false;
      }
    });
  }


  //Read 📖
  listar() {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/course/`, { headers });
  }

  //Update 🔁
  atualizar() { }

  //Delete 🗑️
  deletar(id: string) {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/course/${id}`, { headers })
  }
  // ###








  // ❗Métodos que usarão o crud porém trabalhando de forma específica. ❗




  //Versão Antiga...
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

    const headers = this.getAuthHeaders();


    return this.http.get<Object[]>(`${this.baseUrl}/course/filter/`, { params, headers })

  }

}
