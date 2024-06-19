import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertaComponent } from '../components/ComponentesVisuais/alerta/alerta.component';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private modalService: NgbModal) { }

    canActivate(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        } else {
            const modalRef = this.modalService.open(AlertaComponent, { centered: true });
            modalRef.componentInstance.acao = 'Erro de autenticação!';
            modalRef.componentInstance.mensagem = 'Faça login novamente!';
            modalRef.componentInstance.mostrarBotoes = false;
            this.router.navigate(['/tela-login']); // Redirecione para a página de login ou outra página de sua escolha
            return false;
        }
    }

    logout() {

        localStorage.removeItem('token');
    }
}
