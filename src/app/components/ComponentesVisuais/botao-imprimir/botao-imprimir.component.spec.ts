import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoImprimirComponent } from './botao-imprimir.component';

describe('BotaoImprimirComponent', () => {
  let component: BotaoImprimirComponent;
  let fixture: ComponentFixture<BotaoImprimirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoImprimirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotaoImprimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
