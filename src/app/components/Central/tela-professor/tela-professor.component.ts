import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../ComponentesVisuais/navbar/navbar.component';
import { ProfessorService } from '../../../services/Professor/professor.service'
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tela-professor',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './tela-professor.component.html',
  styleUrl: './tela-professor.component.css'
})
export class TelaProfessorComponent implements OnInit {

  professor: any

  constructor(private professorService: ProfessorService, private route: ActivatedRoute, private titulo: Title) { }



  ngOnInit(): void {
    const nome = this.route.snapshot.paramMap.get('nome');

    if (nome !== null) {
      this.professorService.retornaProfessor(nome).subscribe(
        (data) => {

          if (Array.isArray(data) && data.length > 0) {
            
            const objetoProfessor = data[0];
            this.professor = objetoProfessor
          }
          else {
            console.error('Lista de professores vazia ou inválida.');
          }
        },

        (error) => {
          console.error('Erro ao obter professor:', error);
        }
      );
    } else {
      console.error('Nome do professor não encontrado na rota.');
    };

    this.titulo.setTitle("Mais Informações")


  }



}
