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


  cadastrarUsuario(event: Event, username: string, email: string, password: string) {
    const novoUsuario = { username, email, password };
    event.preventDefault();
    this.http.post<AuthResponse>(`${this.baseUrl}/user/`, novoUsuario).subscribe({
      next: (response) => {
        console.log('Resposta da atualização:', response);
        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.mensagem = response.message;
        modalRef.componentInstance.mostrarBotoes = false;
        this.router.navigate(["/tela-login"]);
      },
      error: (err) => {
        // alert('Erro ao cadastrar Usuário:' + err.message);
        const errorMessage = err.error.message || 'Erro desconhecido';
        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.mensagem = errorMessage;
        modalRef.componentInstance.mostrarBotoes = false;
      },
    });

  }



  login(event: Event, email: string, password: string) {
    const user = { email, password };
    event.preventDefault();
    this.http.post<AuthResponse>(`${this.baseUrl}/auth/`, user).subscribe({

      next: (response) => {

        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.mensagem = response.message;
        modalRef.componentInstance.mostrarBotoes = false;

        if (response.token) {
          // console.log('Login bem-sucedido, token:', response.token);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        } else {
          alert('Login falhou. Tente novamente.');
        }
      },
      error: (err) => {
        console.error('Erro ao realizar o login:', err);
        const errorMessage = err.error.message || 'Erro desconhecido';
        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = 'Ops!';
        modalRef.componentInstance.mensagem = errorMessage;
        ;
        modalRef.componentInstance.mostrarBotoes = false;
      },
    });
  }




}
