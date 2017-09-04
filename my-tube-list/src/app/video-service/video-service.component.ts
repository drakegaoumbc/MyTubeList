import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { VideoProperty } from '../video-property';

@Component({
  selector: 'app-video-service',
  templateUrl: './video-service.component.html',
  styleUrls: ['./video-service.component.css']
})

// make this class injectable
@Injectable()
export class VideoServiceComponent implements OnInit, OnDestroy {
  private req: any;
  videoListData: any;
  private videos_uri: string = 'http://71.163.115.221:3000/';

  constructor(private http: Http) { }

  getVideos(userName: string): Observable<[VideoProperty]> {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
    });
    let options = new RequestOptions({headers: headers});
  	return this.http.get(this.videos_uri + "getvideos/" + userName, options)
  					.map(res => res.json() as VideoProperty[]);
  }

  safeVideo(data: VideoProperty): any {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.post(this.videos_uri + "savevideo", JSON.stringify(data), {headers})
             .map(res => {
               return res => res.json();
             });
  }


  findOne(videoId: string, userName: string): any {
    return this.http.get(this.videos_uri + "getvideo/" + videoId + "/" + userName)
                    .map(res => res.json() as VideoProperty[]);
  }

  delVideo(videoId: string, userName: string): any {
    const headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
    });

    let options = new RequestOptions({headers: headers});
    return this.http.post(this.videos_uri + "delvideo/" + videoId + "/" + userName, options)
      .map(res => {
        console.log(res.json());
        return res.json();
      });
  }


  ngOnInit() {
    console.log("video service is inited");
  }

  ngOnDestroy() {
  }

}
