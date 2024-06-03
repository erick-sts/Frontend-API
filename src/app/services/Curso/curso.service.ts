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

    this.http.post('http://localhost:3000/course/', novoCurso).subscribe({
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
    return this.http.get<any[]>('http://localhost:3000/course/');
  }

  //Update 🔁
  atualizar() { }

  //Delete 🗑️
  deletar(id: string) {
    return this.http.delete<any>('http://localhost:3000/course/' + id)
  }
  // ###








  //Métodos que usarão o crud porém trabalhando de forma específica.

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


    return this.http.get<Object[]>('http://localhost:3000/course/filter/',  {params} )

  }

}
