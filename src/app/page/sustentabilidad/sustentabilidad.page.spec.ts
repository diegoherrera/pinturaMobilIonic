import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SustentabilidadPage } from './sustentabilidad.page';

describe('SustentabilidadPage', () => {
  let component: SustentabilidadPage;
  let fixture: ComponentFixture<SustentabilidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SustentabilidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SustentabilidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
