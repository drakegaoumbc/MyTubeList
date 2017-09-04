import { Component, OnInit, Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

	userProfile: any;

	public auth0 = new auth0.WebAuth({
		clientID: 'VvUX5sBUVnvqJbPubsXLgeZkylR2OPa6',
	    domain: 'drakegao-test.auth0.com',
	    responseType: 'token id_token',
	    audience: 'https://drakegao-test.auth0.com/userinfo',
	    redirectUri: "http://71.163.115.221:4200", //'http://192.168.1.188:4200',      
	    scope: 'openid profile'
	});

	constructor(public router: Router){
	}

	public login(): void {
		this.auth0.authorize();
	}

	public handleAuthentication(): void {
		this.auth0.parseHash((err, authResult) => {
			if(authResult && authResult.accessToken && authResult.idToken) {
				let self = authResult;
				this.auth0.parseHash((err, authResult) => {
					console.log(self);
					window.location.hash = '';
					this.setSession(self);
					this.router.navigate(['/home']);
				});
			} else if(err) {
				this.router.navigate(['/login']);
			}
		});
	}

	public setSession(authResult): void {
		const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		localStorage.setItem('access_token', authResult.accessToken);
	    localStorage.setItem('id_token', authResult.idToken);
	    localStorage.setItem('expires_at', expiresAt);
	}

	public logout(): void {
	    // Remove tokens and expiry time from localStorage
	    localStorage.removeItem('access_token');
	    localStorage.removeItem('id_token');
	    localStorage.removeItem('expires_at');
	    if(localStorage.getItem("userName")) {
	      localStorage.removeItem("userName");
	    } 

	    if(localStorage.getItem("userPicture")) {
	      localStorage.removeItem("userPicture");
	    } 
	    console.log(localStorage);
	    // Go back to the home route
	    this.router.navigate(['/']);
	}

	public isAuthenticated(): boolean {
	    // Check whether the current time is past the
	    // access token's expiry time
	    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
	    return new Date().getTime() < expiresAt;
	}

	// get profile info using access token
	public getProfile(cb): void {
		const accessToken = localStorage.getItem('access_token');
		if(!accessToken) {
			throw new Error('Access token is either expired or not existed');
		}

		const self = this;
		this.auth0.client.userInfo(accessToken, (err, profile) => {
			if(profile) {
				self.userProfile = profile;
			}

			cb(err, profile);
		});
	}

}