import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProfessorService } from '../../../services/Professor/professor.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  standalone: true,
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit, AfterViewInit {

  professores: any[] = [];

  constructor(protected professorService: ProfessorService) { }

  ngOnInit(): void {
    // Registra todos os componentes necessários para o Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    // Chama a função para carregar os professores e criar o gráfico
    this.carregarProfessores();
  }

  carregarProfessores(): void {
    this.professorService.listarProfessores(this.professores);

    // Observa a variável 'professores' para detectar quando os dados estão prontos
    const checkProfessores = setInterval(() => {
      if (this.professores.length > 0) {
        clearInterval(checkProfessores);
        this.graficoProfessor();
      }
    }, 100);
  }

  graficoProfessor(): void {
    const titulacoes = this.professores.reduce((acc: any, professor: any) => {
      const titulacao = professor.titulacao;
      console.log(professor.titulacao)
      if (acc[titulacao]) {
        acc[titulacao]++;
      } else {
        acc[titulacao] = 1;
      }
      return acc;
    }, {});

    const label = Object.keys(titulacoes)
    const data = Object.values(titulacoes);

    const ctx = document.getElementById('grafoProfessor') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          label: 'Quantidade',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Relação de Professor e Especialidade',
            font: {
              size: 20,
            },
            color: '#000000'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
      }
    });
  }
}
