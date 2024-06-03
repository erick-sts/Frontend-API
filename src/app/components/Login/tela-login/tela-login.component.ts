import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../../services/Usuario/usuario.service';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.css'
})
export class TelaLoginComponent {

  constructor(private router: Router, protected usuarioService: UsuarioService) { }


}
