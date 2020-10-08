import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificarPage } from './verificar.page';

describe('VerificarPage', () => {
  let component: VerificarPage;
  let fixture: ComponentFixture<VerificarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
