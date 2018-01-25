import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSpeakerComponent } from './text-speaker.component';

describe('TextSpeakerComponent', () => {
  let component: TextSpeakerComponent;
  let fixture: ComponentFixture<TextSpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSpeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
