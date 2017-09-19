import { Component, OnInit } from '@angular/core';
import * as gapi from 'gapi-client/index';
import {Observable} from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { VideoProperty } from '../video-property'
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { Pipe, PipeTransform } from '@angular/core';
import 'rxjs/add/operator/map';

const youtubeAPI: string = "AIzaSyCnK8tBC8YKtiQ6dtH4oo-hPJJvHwZV3vU";

@Component({
  selector: 'app-youtube-client',
  templateUrl: './youtube-client.component.html',
  styleUrls: ['./youtube-client.component.css']
})

@Injectable()
export class YoutubeClientComponent implements OnInit {
  private req: any;
  private data: Observable<any>;
  private youtubeEmbedURL: string = "http://www.youtube.com/embed/";

  constructor( private http: Http ) { }

  searchVids(query: string): Observable<VideoProperty[]> {
    return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}`+
          '&maxResults=10' +
          '&type=video' +
          '&key=' + youtubeAPI
    ).map(res => {
      // returned json from google youtube api has a field called items which contains all the videos' data
      // loop through this array, and return an array of VideoProperty
      return res.json().items.map(item => {
         let vid = new VideoProperty();
         vid._id = localStorage.getItem("userName") + item.id.videoId;
         // sanitize the untrusted url in iframe src='' use
         let url = this.youtubeEmbedURL + item.id.videoId + "?rel=0&autoplay=0";
         vid.url = url;//this.youtubeEmbedURL + item.id.videoId
         vid.title = item.snippet.title;
         vid.thumbnailUrl = item.snippet.thumbnails.medium.url;
         vid.description = item.snippet.description;
         vid.userName = localStorage.getItem("userName");
         vid.videoId = item.id.videoId;
         vid.userEmail = "";
         return vid;
       });
    });
  }

  ngOnInit() {
  }

}

/*res.json().results.map(item => {
   let vid = new VideoProperty();
   vid.title = item.items.snippet.title;
   vid.videoId = item.items.id.videoId;
   vid.thumbnailUrl = item.items.snippet.thumbnails.medium.url;
   vid.description = item.items.snippet.description;
   return vid;
 });*/

/*{
   "kind": "youtube#searchResult",
   "etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/4v5RSvBAb3fLwDX-9GenZcKFcRA\"",
   "id": {
    "kind": "youtube#video",
    "videoId": "J-spazTn-4U"
   },
   "snippet": {
    "publishedAt": "2016-01-26T17:50:52.000Z",
    "channelId": "UCy1Ms_5qBTawC-k7PVjHXKQ",
    "title": "► WTF Is... - Darkest Dungeon ?",
    "description": "TotalBiscuit takes a look at the recently released turn-based dungeon crawler from Red Hook Studios. Review code was supplied by the publishers free of ...",
    "thumbnails": {
     "default": {
      "url": "https://i.ytimg.com/vi/J-spazTn-4U/default.jpg",
      "width": 120,
      "height": 90
     },
     "medium": {
      "url": "https://i.ytimg.com/vi/J-spazTn-4U/mqdefault.jpg",
      "width": 320,
      "height": 180
     },
     "high": {
      "url": "https://i.ytimg.com/vi/J-spazTn-4U/hqdefault.jpg",
      "width": 480,
      "height": 360
     }
    },
    "channelTitle": "TotalBiscuit, The Cynical Brit",
    "liveBroadcastContent": "none"
   }
  },*/

 /*searchVids(searchName: string, maxResults: number, type: string): Observable<any> {
    this.req = gapi.client.youtube.search.list({
      part: "snippet",
      q: searchName,
      maxResults: maxResults,
      type: type,
      order: "viewCount"
    });

    // return observable
    this.req.excute(res => {
      this.data = new Observable(observe => {
        setTimeout(() => {
          observe.next(res.result);
        });
      });
    });
    return this.data;
  }*/

  /*initYoutube(): void {
    gapi.client.init({
      'apiKey': youtubeAPI,
    }).then(function() {
      // 3. Initialize and make the API request.
      return gapi.client.request({
        'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
      })
    }).then(function(response) {
      console.log(response.result);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
    gapi.load('client', this.initYoutube);
    gapi.client.setApiKey(youtubeAPI);
  }*/

