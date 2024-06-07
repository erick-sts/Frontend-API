import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  standalone: true,
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  ngOnInit(): void {
    this.graficoProfessor();

    // Caso queira adicionar o gráfico de cursos, é só descomentar 😊
    // this.graficoCurso();

  }

  graficoProfessor(): void {
    Chart.register(...registerables); // Registra todos os componentes necessários

    const ctx = document.getElementById('grafoProfessor') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Especialista', 'Doutor', 'Mestre'],
        datasets: [{
          label: 'Quantidade de Professores',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Relação de Professor e Especialidade',
            font: {
              size: 20, // Aumenta o tamanho da fonte do título

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

  // Caso queira adicionar o gráfico de cursos, é só descomentar 😊

  // graficoCurso(): void{
  //   Chart.register(...registerables);
  //   const ctx = document.getElementById('grafoCurso') as HTMLCanvasElement;
  //   new Chart(ctx, {
  //     type: 'pie',
  //     data: {
  //       labels: ['a', 'b', 'c'],
  //       datasets: [{
  //         label: 'Quantidade de Cursos',
  //         data: [1,2,3],
  //         borderWidth:1
  //       }]
  //     },
  //     options:{
  //       scales:{
  //         y:{
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   })
  // }



}
