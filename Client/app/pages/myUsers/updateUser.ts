import { Component } from "@angular/core";
import { Platform, ActionSheet, NavController, NavParams, Alert } from 'ionic-angular';
import { AuthService } from '../../services/authService';

@Component({
	templateUrl: 'build/pages/myUsers/updateUser.html'
})

export class UpdateUser {

	detail;
	user;

	constructor(public platform: Platform, public nav: NavController, private navParams: NavParams, private authService : AuthService) {
		this.detail = navParams.get('detail');
		this.user = navParams.get('user');
	}

	updateUser(value) {
		this.authService.updateUser(this.user, {name: this.detail.name, value:value}).then((data) => {
			if(data) {
				this.nav.pop();
			}
			else {
				var alert = Alert.create({
					title: 'failed',
					subTitle: 'failed to update',
					buttons: ['ok']
				});
				this.nav.present(alert);
			}
		});
	}

}
