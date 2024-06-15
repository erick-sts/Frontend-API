import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../../services/Usuario/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.css'
})
export class TelaLoginComponent implements OnInit {

  loading = false;

  constructor(private router: Router, protected usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.loading.subscribe((loading) => {
      this.loading = loading;
    });
  }


}
