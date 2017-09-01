import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoVisitedComponent } from './video-visited/video-visited.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { LoginPageComponent } from './login-page/login-page.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	
	{
		path: 'home',
		component: MainBodyComponent
	}, 
	
	{
		path: 'visited',
		component: VideoVisitedComponent
	},

	{
		path: 'login',
		component: LoginPageComponent
	}
]

@NgModule ({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {
	
}