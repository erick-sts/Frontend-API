import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaRelatorioCursoComponent } from './tela-relatorio-curso.component';

describe('TelaRelatorioCursoComponent', () => {
  let component: TelaRelatorioCursoComponent;
  let fixture: ComponentFixture<TelaRelatorioCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaRelatorioCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaRelatorioCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
