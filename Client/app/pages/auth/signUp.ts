import { Component } from "@angular/core";
import { NavController, NavParams, Alert } from 'ionic-angular';
import { AuthService } from '../../services/authService';
import { Tabs } from '../tabs/tabs';

@Component({
	templateUrl: 'build/pages/auth/signUp.html',
	providers: [AuthService]
})
export class SignUp {

	newcreds;
	valid;

	constructor(private nav: NavController,private navParams: NavParams,private authService: AuthService) {
		this.newcreds = {
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
			signup: true
		}
	}

	register(user) {
		this.valid.name = (user.name != '');
		this.valid.password = (user.password !== '');
		this.valid.firstname = (user.firstname != '');
		this.valid.lastname = (user.lastname !== '');

		if ((user.name != '') && (user.password != '') && (user.firstname != '') && (user.lastname != '')){
			this.authService.registerUser(user).then(data => {
				if(data.success) {
					if(data.user.authority === 'user'){
						this.nav.setRoot(Tabs, {
							user: data.user 
						});					
					}
				}
				else {
					this.valid.signup = false;
				}
			});
		}
	}


}
