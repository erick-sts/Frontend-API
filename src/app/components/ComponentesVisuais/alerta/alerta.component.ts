import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {
  @Input() mensagem: string = '';
  @Output() confirmAction: EventEmitter<string> = new EventEmitter<string>();
  @Input() acao: string = '';
  @Input() mostrarBotoes: boolean = true;

  constructor(public modal: NgbActiveModal){  }

  confirm() {
    this.confirmAction.emit('confirm');
    this.modal.close('confirm');
  }
}
