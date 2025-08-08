import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaRegistrarComponent } from './persona-registrar.component';

describe('PersonaRegistrarComponent', () => {
  let component: PersonaRegistrarComponent;
  let fixture: ComponentFixture<PersonaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
