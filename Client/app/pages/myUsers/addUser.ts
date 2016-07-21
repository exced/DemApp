import { Component } from "@angular/core";
import { Platform, ActionSheet, NavController, NavParams, Alert } from 'ionic-angular';
import { AuthService } from '../../services/authService';

@Component({
	templateUrl: 'build/pages/myUsers/addUser.html'
})


export class AddUser {

	user;
	newUser;
	authority:string="user";

	constructor(public platform: Platform, public nav: NavController, private navParams: NavParams, private authService : AuthService) {
		this.user = navParams.get('user');
		this.newUser = {
			name: '',
			password: '',
			firstname: '',
			lastname: ''
		}
	}

	registerUser(user) {
		this.authService.createUser(user).then((data) => {
			if(data.success) {
				this.nav.pop();
			}
			else {
				var alert = Alert.create({
					title: 'failed',
					subTitle: 'failed to register user',
					buttons: ['ok']
				});
				this.nav.present(alert);
			}
		});
	}

}
