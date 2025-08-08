import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaBuscarComponent } from './persona-buscar.component';

describe('PersonaBuscarComponent', () => {
  let component: PersonaBuscarComponent;
  let fixture: ComponentFixture<PersonaBuscarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaBuscarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
