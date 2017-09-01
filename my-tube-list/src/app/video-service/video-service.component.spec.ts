import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoServiceComponent } from './video-service.component';

describe('VideoServiceComponent', () => {
  let component: VideoServiceComponent;
  let fixture: ComponentFixture<VideoServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
