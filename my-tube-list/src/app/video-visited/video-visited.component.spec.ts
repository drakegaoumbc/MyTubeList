import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoVisitedComponent } from './video-visited.component';

describe('VideoVisitedComponent', () => {
  let component: VideoVisitedComponent;
  let fixture: ComponentFixture<VideoVisitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoVisitedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoVisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
