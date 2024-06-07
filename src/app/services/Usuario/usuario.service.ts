import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertaComponent } from '../../components/ComponentesVisuais/alerta/alerta.component';

interface AuthResponse {
  message: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'https://backend-api-7cos.onrender.com'

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) { }


  cadastrarUsuario(username: string, email: string, password: string) {
    const novoUsuario = { username, email, password };

    this.http.post(`${this.baseUrl}/user/`, novoUsuario).subscribe({
      next: (response) => {
        console.log('Resposta da atualização:', response);
      },
      error: (error) => {
        alert('Erro ao cadastrar Usuário:' + error.message);
      },
    });
    const modalRef = this.modalService.open(AlertaComponent, { centered: true });
    modalRef.componentInstance.acao = 'Usuário cadastrado com sucesso.';
    modalRef.componentInstance.mostrarBotoes = false;
    this.router.navigate(["/tela-login"]);
  }



  login(event: Event, email: string, password: string) {
    const user = { email, password };
    event.preventDefault();
    this.http.post<AuthResponse>(`${this.baseUrl}/auth/`, user).subscribe({

      next: (response) => {

        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.mensagem = 'Bem vindo!'; //adicionar o nome do Usuario aqui
        modalRef.componentInstance.mostrarBotoes = false;

        if (response.token) {
          console.log('Login bem-sucedido, token:', response.token);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        } else {
          alert('Login falhou. Tente novamente.');
        }
      },
      error: (error) => {
        console.error('Erro ao realizar o login:', error);
        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = 'Ops!';
        modalRef.componentInstance.mensagem = 'Algo deu errado, tente novamente';
        modalRef.componentInstance.mostrarBotoes = false;
      },
    });
  }




}
