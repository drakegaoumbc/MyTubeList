import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoServiceComponent } from '../video-service/video-service.component';
import { VideoProperty } from '../video-property';
import { YoutubeClientComponent } from '../youtube-client/youtube-client.component';
import { AuthService } from '../auth-service';

//import * as gapi from 'gapi-client/index';

declare var $: any;

const youtubeAPI: string = "AIzaSyCnK8tBC8YKtiQ6dtH4oo-hPJJvHwZV3vU";

@Component({
  selector: 'app-video-visited',
  templateUrl: './video-visited.component.html',
  styleUrls: ['./video-visited.component.css']
})

export class VideoVisitedComponent implements OnInit, OnDestroy {
  private req: any;
  videoVisited: VideoProperty[];
  videosRet: any;

  constructor(private videoService: VideoServiceComponent, private authService: AuthService) {};

  getVideos(): void {
    // subscribe is for a observable return
    let userName: string = localStorage.getItem("userName");
  	this.req = this.videoService.getVideos(userName).subscribe(db_videos => {
  		this.videoVisited = db_videos;
      console.log(this.videoVisited);
  	});
  }

  delVideo(video: VideoProperty): void {
    console.log(video);
    this.req = this.videoService.delVideo(video._id, video.userName).subscribe(status => {
      if(status === "good") {
        console.log(status);
        this.getVideos();
      }
    });
  }

  ngOnInit() {
  	this.getVideos();
    if(!this.authService.userProfile) {
      this.authService.getProfile((err, profile) => {
        if(!localStorage.getItem("userName")) {
          localStorage.setItem("userName", profile.nickname);
        } 

        if(!localStorage.getItem("userPicture")) {
          localStorage.setItem("userPicture", profile.picture);
        }  
      });
    }

  }

  ngOnDestroy() {
  	//this.req.unsubscribe();
  }
}
