import { Component } from "@angular/core";
import { NavController, NavParams, Alert } from 'ionic-angular';
import { SignUp } from './signUp';
import { AuthService } from '../../services/authService';
import { Drawing } from '../drawing/drawing';
import { Tabs } from '../tabs/tabs';


@Component({
	templateUrl: 'build/pages/auth/signIn.html',
	providers: [AuthService]
})
export class SignIn {

	usercreds;
	valid;

	constructor(private nav: NavController, navParams: NavParams,private authService: AuthService) {
		this.usercreds = {
			name: '',
			password: ''
		}
		this.valid = {
			name: true,
			password: true,
			signin: true
		}
	}

	login(user) {
		this.valid.name = (user.name != '');
		this.valid.password = (user.password !== '');

		if ((user.name != '') && (user.password != '')){
			this.authService.authenticate(user).then(data => {
				if(data.success) {
					if(data.user.authority === 'admin' || data.user.authority === 'user'){
						this.nav.setRoot(Tabs, {
							user: data.user 
						});					
					}
					if(data.user.authority === 'guest'){
						this.nav.setRoot(Drawing, {
							user: data.user 
						});					
					}
				}
				else {
					this.valid.signin = false;
				}
			});
		}
	}

	gotoSignUp(){
		this.nav.push(SignUp);
	}
}
