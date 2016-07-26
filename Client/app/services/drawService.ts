import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import {AuthService} from './authService';

@Injectable()
export class DrawService {

	draws;
	draw;

	constructor(private http: Http, private events: Events, private authService: AuthService) {       
	}

	/* -----------------create----------------- */
	createDraw(img) {

		return new Promise(resolve => {
			this.authService.loadUser().then((user) => {
				var creds = "img=" + img;
				this.authService.loadHeaders().then((headers) => {
					this.http.post('http://localhost:3000/' + user.name + '/draws', creds, {headers: headers}).subscribe(data => {
						if(data.json().success){
							resolve(true);
						}
						else
							resolve(false);
					});
				});
			});
		});       
	}

	/* -----------------read----------------- */

	getDraws(user){

		if (this.draws) {
			return Promise.resolve(this.draws);
		}

		return new Promise(resolve => {
			this.authService.loadHeaders().then((headers) => {
				this.http.get('http://localhost:3000/' + user.name + '/draws' ,  {headers: headers}).subscribe(data => {
					if(data.json().success){
						resolve(data.json());
					}
					else
						resolve(false);
				});
			});
		});   
	}

	/* ---------------delete--------------- */

	deleteDraw(draw,user){

		return new Promise(resolve => {
			this.authService.loadHeaders().then((headers) => {
				this.http.delete('http://localhost:3000/' + user.name + '/draws/' + draw.image , {headers: headers}).subscribe(data => {
					if(data.json().success){
						this.events.publish('draw:event', {
						});
						resolve(true);
					}
					else
						resolve(false);
				});
			});
		});
	}

}