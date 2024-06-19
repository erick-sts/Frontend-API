import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { AlertaComponent } from '../alerta/alerta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, private authGuard: AuthGuard, private modalService: NgbModal) {}

  logout() {
    this.authGuard.logout();
    this.router.navigate(['/tela-login']); 
    const modalRef = this.modalService.open(AlertaComponent, { centered: true });
    modalRef.componentInstance.mensagem = "Logout realizado com sucesso";
    modalRef.componentInstance.mostrarBotoes = false;
  }
}
