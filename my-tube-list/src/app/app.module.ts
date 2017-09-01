import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { VideoServiceComponent } from './video-service/video-service.component';
import { VideoVisitedComponent } from './video-visited/video-visited.component';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { FormControl } from '@angular/forms';

import { AppRoutingModule } from './app-routing';
import { YoutubeClientComponent } from './youtube-client/youtube-client.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { SafePipe } from './safepipe';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthService } from './auth-service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    MainBodyComponent,
    VideoServiceComponent,
    VideoVisitedComponent,
    YoutubeClientComponent,
    VideoPlayerComponent,
    SafePipe,
    LoginPageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
  	VideoServiceComponent,
  	YoutubeClientComponent,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
