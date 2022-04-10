import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltrosustentablePage } from './filtrosustentable.page';

describe('FiltrosustentablePage', () => {
  let component: FiltrosustentablePage;
  let fixture: ComponentFixture<FiltrosustentablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosustentablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrosustentablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
