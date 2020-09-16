import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AudiocallPage } from './audiocall.page';

describe('AudiocallPage', () => {
  let component: AudiocallPage;
  let fixture: ComponentFixture<AudiocallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiocallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AudiocallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
