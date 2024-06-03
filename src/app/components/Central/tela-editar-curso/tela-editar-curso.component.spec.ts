import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEditarCursoComponent } from './tela-editar-curso.component';

describe('TelaEditarCursoComponent', () => {
  let component: TelaEditarCursoComponent;
  let fixture: ComponentFixture<TelaEditarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaEditarCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaEditarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
