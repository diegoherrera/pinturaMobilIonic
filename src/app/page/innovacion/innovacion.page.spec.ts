import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InnovacionPage } from './innovacion.page';

describe('InnovacionPage', () => {
  let component: InnovacionPage;
  let fixture: ComponentFixture<InnovacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InnovacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
