import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PalletsPage } from './pallets.page';

describe('PalletsPage', () => {
  let component: PalletsPage;
  let fixture: ComponentFixture<PalletsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalletsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PalletsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
