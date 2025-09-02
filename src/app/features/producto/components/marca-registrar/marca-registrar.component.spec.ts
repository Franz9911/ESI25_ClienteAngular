import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaRegistrarComponent } from './marca-registrar.component';

describe('MarcaRegistrarComponent', () => {
  let component: MarcaRegistrarComponent;
  let fixture: ComponentFixture<MarcaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcaRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
