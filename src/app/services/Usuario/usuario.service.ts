import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertaComponent } from '../../components/ComponentesVisuais/alerta/alerta.component';
import { BehaviorSubject } from 'rxjs';

interface AuthResponse {
  message?: string;
  token?: string;
  err?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = 'https://backend-api-7cos.onrender.com';

  loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal) { }

  cadastrarUsuario(event: Event, username: string, email: string, password: string) {
    const novoUsuario = { username, email, password };
    event.preventDefault();
    this.http.post<AuthResponse>(`${this.baseUrl}/user/`, novoUsuario).subscribe({
      next: (response) => {
        console.log('Resposta da atualização:', response);
        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.mensagem = response.message; // Exibir mensagem de sucesso
        modalRef.componentInstance.mostrarBotoes = false;
        this.router.navigate(["/tela-login"]);
      },
      error: (err) => {
        console.error('Erro ao cadastrar Usuário:', err);
        let errorMessage = 'Erro desconhecido';

        if (err.error && err.error.err) {
          if (Array.isArray(err.error.err)) {
            errorMessage = err.error.err.map((error: { msg: any; }) => error.msg).join('<br><br>'); // Concatena as mensagens de erro
          } else {
            errorMessage = err.error.err.msg; // Se for apenas um objeto de erro
          }
        } else if (err.error && typeof err.error === 'string') {
          errorMessage = err.error;
        }

        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.mensagem = errorMessage || "Erro ao cadastrar!";
        modalRef.componentInstance.mostrarBotoes = false;
      },
    });
  }

  login(event: Event, email: string, password: string) {
    const user = { email, password };
    event.preventDefault();
    this.loading.next(true);
    this.http.post<AuthResponse>(`${this.baseUrl}/auth/`, user).subscribe({
      next: (response) => {
        this.loading.next(false);
        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.mensagem = "Logado com sucesso!";
        modalRef.componentInstance.mostrarBotoes = false;

        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        } else {
          alert('Login falhou. Tente novamente.');
        }
      },
      error: (err) => {
        this.loading.next(false);
        console.error('Erro ao realizar o login:', err);
        let errorMessage = 'Erro desconhecido';

        if (err.error) {
          if (typeof err.error === 'string') {
            try {
              const errorResponse = JSON.parse(err.error);
              if (errorResponse && errorResponse.err) {
                errorMessage = errorResponse.err;
              }
            } catch (parseError) {
              errorMessage = err.error;
            }
          } else if (err.error.err) {
            errorMessage = err.error.err;
          }
        }

        const modalRef = this.modalService.open(AlertaComponent, { centered: true });
        modalRef.componentInstance.acao = 'Ops!';
        modalRef.componentInstance.mensagem = errorMessage;
        modalRef.componentInstance.mostrarBotoes = false;
      },
    });
  }
}
