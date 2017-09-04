import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms'; // <-- NgModel lives here
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { VideoProperty } from '../video-property';
import { YoutubeClientComponent } from '../youtube-client/youtube-client.component';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})

export class MainBodyComponent implements OnInit, OnDestroy {
  
  //search_query: string = "hello";
  videoList: VideoProperty[];
  videoListObs: Observable<VideoProperty[]>;
  selectedVideo: VideoProperty;

  private userProfile: any;
  private vids_req: any;
  private searchField: FormControl;

  constructor( private tubeClient: YoutubeClientComponent, private authService: AuthService ) { 
     
  }

  // for search click
  /*searchVids(): void {
    this.vids_req = this.tubeClient.searchVids(this.search_query)
    .subscribe(videos => {
      this.videoList = videos;
    });
  }*/

  // auto pop 
  searchVidsObs(query: string): any {
    return this.tubeClient.searchVids(query);
  }

  // select video
  onSelect(video: VideoProperty) {
    
    this.selectedVideo = video;
    //console.log(this.selectedVideo);
  }

  ngOnInit() {
    this.getProfile();
    this.searchField = new FormControl();
    this.videoListObs = this.searchField.valueChanges
                    .debounceTime(1000)
                    .distinctUntilChanged()
                    .switchMap(query => this.searchVidsObs(query));
                    // returns a observable<...>
  }

  public getProfile(): void {
    if(this.authService.userProfile) {
      //this.userProfile = this.authService.userProfile;
      if(!localStorage.getItem("userName")) {
        localStorage.setItem("userName", this.authService.userProfile.nickname);
      } 

      if(!localStorage.getItem("userPicture")) {
          localStorage.setItem("userPicture", this.authService.userProfile.picture);
        }
      //console.log(this.userProfile);

    } else {
      const self = this;
      this.authService.getProfile((err, profile) => {
        //self.userProfile = profile;    
        if(!localStorage.getItem("userName")) {
          localStorage.setItem("userName", profile.nickname);
        }  

        if(!localStorage.getItem("userPicture")) {
          localStorage.setItem("userPicture", profile.picture);
        }
        //console.log(this.userProfile);
      });
    }
  }

  ngOnDestroy() { 	
  }
}
