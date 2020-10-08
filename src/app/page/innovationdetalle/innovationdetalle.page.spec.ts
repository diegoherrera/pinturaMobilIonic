import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InnovationdetallePage } from './innovationdetalle.page';

describe('InnovationdetallePage', () => {
  let component: InnovationdetallePage;
  let fixture: ComponentFixture<InnovationdetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovationdetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InnovationdetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
