import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { ProfessorService } from '../../../services/Professor/professor.service'
import { Title } from '@angular/platform-browser';
import { AlertaComponent } from '../../ComponentesVisuais/alerta/alerta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {GraficoComponent} from '../../ComponentesVisuais/grafico/grafico.component'




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent, AlertaComponent, GraficoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  professores: any[] = [];


  constructor(protected professorService: ProfessorService, private router: Router, private titulo: Title, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.titulo.setTitle("Página Inicial")

  }


}
