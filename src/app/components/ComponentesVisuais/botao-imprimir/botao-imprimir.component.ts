import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-botao-imprimir',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botao-imprimir.component.html',
  styleUrl: './botao-imprimir.component.css'
})
export class BotaoImprimirComponent {


imprimir(){
  window.print()
}
}


