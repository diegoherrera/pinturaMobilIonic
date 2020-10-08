import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlowPage } from './slow.page';

describe('SlowPage', () => {
  let component: SlowPage;
  let fixture: ComponentFixture<SlowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
