import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeClientComponent } from './youtube-client.component';

describe('YoutubeClientComponent', () => {
  let component: YoutubeClientComponent;
  let fixture: ComponentFixture<YoutubeClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
