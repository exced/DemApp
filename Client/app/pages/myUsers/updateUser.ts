import { Component } from "@angular/core";
import { Platform, ActionSheet, NavController, NavParams, Alert } from 'ionic-angular';
import { AuthService } from '../../services/authService';

@Component({
	templateUrl: 'build/pages/myUsers/updateUser.html'
})

export class UpdateUser {

	detail;
	user;
	valid;

	constructor(public platform: Platform, public nav: NavController, private navParams: NavParams, private authService : AuthService) {
		this.detail = navParams.get('detail');
		this.user = navParams.get('user');
		this.valid = {
			name: true
		}
	}

	updateUser(value) {
		this.valid.name = (value != '');
		this.authService.updateUser(this.user, {name: this.detail.name, value:value}).then((data) => {
			if(data) {
				this.nav.pop();
			}
		});
	}

}
