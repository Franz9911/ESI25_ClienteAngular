import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEditarMiperfilComponent } from './usuario-editar-miperfil.component';

describe('UsuarioEditarMiperfilComponent', () => {
  let component: UsuarioEditarMiperfilComponent;
  let fixture: ComponentFixture<UsuarioEditarMiperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioEditarMiperfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioEditarMiperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
