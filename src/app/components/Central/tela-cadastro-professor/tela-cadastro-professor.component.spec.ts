import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCadastroProfessorComponent } from './tela-cadastro-professor.component';

describe('TelaCadastroProfessorComponent', () => {
  let component: TelaCadastroProfessorComponent;
  let fixture: ComponentFixture<TelaCadastroProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaCadastroProfessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaCadastroProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
