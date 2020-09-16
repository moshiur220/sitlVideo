import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupcallPage } from './groupcall.page';

describe('GroupcallPage', () => {
  let component: GroupcallPage;
  let fixture: ComponentFixture<GroupcallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupcallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupcallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
