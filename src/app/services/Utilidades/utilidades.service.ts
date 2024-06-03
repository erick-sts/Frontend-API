import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//Nesta classe teremos funcoes simples que poderão ser reutilzadas por todo projeto, caso aja necessidade 💻
export class UtilidadesService {

  constructor() { }

  
  previneNegativoInput(inputElementRef: ElementRef<HTMLInputElement>): void {
    const input = inputElementRef.nativeElement;
    if (input) {
      input.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === '-' || event.key === 'Subtract' || event.key === 'e' || event.key === ',' || event.key === '.') {
          event.preventDefault();
        }
      });

      input.addEventListener('input', () => {
        
        if (input.value.includes('-')) {
          input.value = input.value.replace('-', '');
        }
      });
    }
  }

  somenteLetrasInput(inputElementRef: ElementRef<HTMLInputElement>): void {
    const input = inputElementRef.nativeElement;
  
    if (input) {
      input.addEventListener('input', () => {
        const valor = input.value;
        input.value = valor.replace(/[^a-zA-Z\sçÇ]/g, ''); // Remove todos os caracteres que não são letras ou espaços
      });
    }
  }


}


