import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaRelatorioProfessorComponent } from './tela-relatorio-professor.component';

describe('TelaRelatorioProfessorComponent', () => {
  let component: TelaRelatorioProfessorComponent;
  let fixture: ComponentFixture<TelaRelatorioProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaRelatorioProfessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaRelatorioProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
