import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEditarProfessorComponent } from './tela-editar-professor.component';

describe('TelaEditarProfessorComponent', () => {
  let component: TelaEditarProfessorComponent;
  let fixture: ComponentFixture<TelaEditarProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaEditarProfessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaEditarProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
