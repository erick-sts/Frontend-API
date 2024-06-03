import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCadastroCursoComponent } from './tela-cadastro-curso.component';

describe('TelaCadastroCursoComponent', () => {
  let component: TelaCadastroCursoComponent;
  let fixture: ComponentFixture<TelaCadastroCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaCadastroCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaCadastroCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
