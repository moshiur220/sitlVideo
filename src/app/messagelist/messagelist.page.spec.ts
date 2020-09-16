import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagelistPage } from './messagelist.page';

describe('MessagelistPage', () => {
  let component: MessagelistPage;
  let fixture: ComponentFixture<MessagelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
