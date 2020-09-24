import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoddingPage } from './lodding.page';

describe('LoddingPage', () => {
  let component: LoddingPage;
  let fixture: ComponentFixture<LoddingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoddingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoddingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
