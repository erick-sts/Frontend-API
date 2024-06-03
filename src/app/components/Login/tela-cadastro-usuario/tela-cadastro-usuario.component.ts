import { Component } from '@angular/core';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/Usuario/usuario.service';


@Component({
  selector: 'app-tela-cadastro-usuario',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './tela-cadastro-usuario.component.html',
  styleUrl: './tela-cadastro-usuario.component.css'
})
export class TelaCadastroUsuarioComponent {


  constructor(private router: Router, protected usuarioService: UsuarioService){ }

}
