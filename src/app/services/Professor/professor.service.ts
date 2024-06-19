import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertaComponent } from '../../components/ComponentesVisuais/alerta/alerta.component';


@Injectable({
  providedIn: 'root',
})
export class ProfessorService {



  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) { }

  baseUrl = 'https://backend-api-7cos.onrender.com'

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  //Banco de Dados, Interacao com o BackEnd 🎲

  //Create 🆕
  cadastrar(
    event: Event,
    nome: string,
    matriculaId: string,
    unidadeId: string,
    titulacao: string,
    referencia: string,
    lattes: string,
    coursesId: string[],
    statusAtividade: string,
    email: string,
    notes: string
  ) {
    const novoProfessor = {
      nome,
      matriculaId,
      unidadeId,
      titulacao,
      referencia,
      lattes,
      coursesId,
      statusAtividade,
      email,
      notes
    };

    const headers = this.getAuthHeaders();
    event.preventDefault();
    this.http
      .post<any>(`${this.baseUrl}/professors/`, novoProfessor, { headers })
      .subscribe({
        next: (response) => {
          console.log('Resposta da atualização:', response);
          const modalRef = this.modalService.open(AlertaComponent, { centered: true });
          modalRef.componentInstance.acao = 'Cadastro de Professor 📝';
          modalRef.componentInstance.mensagem = response.message;
          modalRef.componentInstance.mostrarBotoes = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar Professor:', err);
          let errorMessage = 'Erro desconhecido';

          if (err.error && err.error.err) {
            errorMessage = err.error.err.map((error: any) => error.msg).join('<br><br>');
          } else if (err.error && typeof err.error === 'string') {
            errorMessage = err.error;
          }

          const modalRef = this.modalService.open(AlertaComponent, { centered: true });
          modalRef.componentInstance.acao = 'Cadastro de Professor 📝';
          modalRef.componentInstance.mensagem = errorMessage || 'Erro ao cadastrar professor.';
          modalRef.componentInstance.mostrarBotoes = false;
        },
      });
  }

  //Read 📖
  listar(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/professors/`, { headers });
  }

  // Update 🔁
  atualizar(
    id: string,
    nome: string,
    matriculaId: string,
    unidadeId: string,
    titulacao: string,
    referencia: string,
    lattes: string,
    coursesId: string[],
    statusAtividade: string,
    email: string,
    notes: string
  ) {
    const professorAtualizado = {
      nome,
      matriculaId,
      unidadeId,
      titulacao,
      referencia,
      lattes,
      coursesId,
      statusAtividade,
      email,
      notes
    };
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.baseUrl}/professors/${id}`, professorAtualizado, { headers }).subscribe({
      next: (response) => {
        console.log('Resposta da atualização:', response);

        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = 'Atualização 🔁';
        modalRef.componentInstance.mensagem = " Atualizado com sucesso!";
        modalRef.componentInstance.mostrarBotoes = false;
        this.router.navigate(["/tela-relatorio-professor"]);
      },
      error: (error) => {
        console.error('Erro ao atualizar Professor:', error);

        let errorMessage = 'Erro desconhecido';

        if (error.error && error.error.err) {
          errorMessage = error.error.err.map((err: any) => err.msg).join('<br><br>');
        } else if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        }

        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = 'Atualização 🔁';
        modalRef.componentInstance.mensagem = errorMessage || 'Erro ao atualizar professor.';
        modalRef.componentInstance.mostrarBotoes = false;
      }
    });
  }

  //Delete 🗑️
  deletar(matriculaId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/professors/${matriculaId}`, { headers });
  }

  // ❗Métodos que usarão o crud porém trabalhando de forma específica. ❗


  //Retorna o professor de acordo com o nome.
  retornaProfessor(nome: String | null): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/professors/${nome}`, { headers });

  }

  //Retorna o professor de acordo com o nome.
  carregaProfessorPeloNome(nome: string | null): Observable<any> {
    return this.retornaProfessor(nome).pipe(
      map(data => {
        if (Array.isArray(data) && data.length > 0) {
          const objetoProfessor = data.find(prof => prof.nome === nome);
          if (objetoProfessor) {
            return Object.assign({}, objetoProfessor);
          } else {
            throw new Error('Professor não encontrado com o nome fornecido.');
          }
        } else {
          throw new Error('Lista de professores vazia ou inválida.');
        }
      }),
      catchError(error => {
        throw new Error('Erro ao obter professor:' + error);
      })
    );
  }

  //Popula a lista de professores do componente com o que está cadastrado no banco de dados.
  listarProfessores(professores: any[]): void {

    this.listar().subscribe(
      (professoresCadastrados) => {
        professores.splice(0, professores.length, ...professoresCadastrados)
        //Splice está formatando a variável professores para poder receber os professores cadastrados vindo do banco de dados.

      },
      (error) => {
        alert(`Erro ao listar professores: ${JSON.stringify(error)}`);
      }
    );

  }


  //filtra professor com base nos dados selecionados na interface.
  filtrarProfessores(nome: string, cursos: string[], titulacoes: string[]): Observable<Object[]> {
    let params = new HttpParams();
    if (nome) {
      params = params.append('nome', nome);
    }
    if (cursos && cursos.length) {
      params = params.append('cursos', cursos.join(','));
    }
    if (titulacoes && titulacoes.length) {
      params = params.append('titulacoes', titulacoes.join(','));
    }



    const headers = this.getAuthHeaders();

    return this.http.get<Object[]>(`${this.baseUrl}/professors/filter`, { params, headers });
  }
}
