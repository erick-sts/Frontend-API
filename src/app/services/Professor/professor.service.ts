import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProfessorService {



  constructor(private http: HttpClient, private router: Router) { }

  baseUrl = 'https://backend-api-7cos.onrender.com'




  //Banco de Dados, Interacao com o BackEnd 🎲

  //Create 🆕
  cadastrar(
    nome: String,
    matriculaId: String,
    unidadeId: String,
    titulacao: String,
    referencia: String,
    lattes: String,
    coursesId: [String],
    statusAtividade: String,
    email: String,
    notes: String) {

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
    }

    this.http
      .post<any>(this.baseUrl + '/professors/', novoProfessor)
      .subscribe({
        next: (response) => {
          console.log('Resposta da atualização:', response);
          //trocar pelo modal
          alert("Professor Cadastrado com sucesso! ${JSON.stringify(novoProfessor)}");
          this.router.navigate(["/home"])
        },
        error: (error) => {
          //trocar pelo modal
          alert('Erro ao cadastrar Professor:' + error.message);
        },
      });


  }

  //Read 📖
  listar(): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/professors/`);
  }

  //Update 🔁
  atualizar(id: string, professorAtualizado: any) {
    return this.http.put<any>(`${this.baseUrl}/professors/${id}`, professorAtualizado).subscribe({
      next: (response) => {
        console.log('Resposta da atualização:', response);
        alert("Professor Atualizado com Sucesso!")
        this.router.navigate(["/tela-relatorio-professor"])
      },
      error: (error) => {
        console.error('Erro ao atualizar Professor:', error);
        alert('Erro ao atualizar Professor: ' + error.message);
      }
    })
  }

  //Delete 🗑️
  deletar(matriculaId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/professors/${matriculaId}`);
  }




  // ❗Métodos que usarão o crud porém trabalhando de forma específica. ❗


  //Retorna o professor de acordo com o nome.
  retornaProfessor(nome: String | null): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/professors/${nome}`);

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

    alert(params)

    return this.http.get<Object[]>(`${this.baseUrl}/professors/filter`, { params });
  }
}
