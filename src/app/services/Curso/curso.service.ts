import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CursosService {


  constructor(private http: HttpClient) { }


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
        alert(`Cadastro concluído com sucesso! ${JSON.stringify(novoCurso)}`)
        
      },
      error: (error) => {
        alert(`Deu erro no cadastramento de cursos: ${error.message}`)
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

  filtrarCursos(nome: string, coordenador: string, modalidade: string[]): Observable<Object[]>{
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


    return this.http.get<Object[]>(`${this.baseUrl}/course/filter/`,  {params} )

  }

}
