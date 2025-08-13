import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionValoracionesComponent } from './gestion-valoraciones.component';

describe('GestionValoracionesComponent', () => {
  let component: GestionValoracionesComponent;
  let fixture: ComponentFixture<GestionValoracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionValoracionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionValoracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
