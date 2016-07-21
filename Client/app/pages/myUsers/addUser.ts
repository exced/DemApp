import { Component } from "@angular/core";
import { Platform, ActionSheet, NavController, NavParams, Alert } from 'ionic-angular';
import { AuthService } from '../../services/authService';

@Component({
	templateUrl: 'build/pages/myUsers/addUser.html'
})


export class AddUser {

	user;
	newUser;
	valid;
	authority:string="user";

	constructor(public platform: Platform, public nav: NavController, private navParams: NavParams, private authService : AuthService) {
		this.user = navParams.get('user');
		this.newUser = {
			name: '',
			password: '',
			firstname: '',
			lastname: ''
		}
		this.valid = {
			name: true,
			password: true,
			firstname: true,
			lastname: true,
			register: true
		}
	}

	registerUser(user) {
		this.valid.name = (user.name != '');
		this.valid.password = (user.password !== '');
		this.valid.firstname = (user.firstname != '');
		this.valid.lastname = (user.lastname !== '');


		this.authService.createUser(user).then((data) => {
			if(data.success) {
				this.nav.pop();
			}
			else {
				this.valid.register = false;
			}
		});
	}

}
