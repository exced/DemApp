import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/authService';

@Component({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [AuthService]
})
export class Settings {

  constructor(private nav: NavController, navParams: NavParams, authService: AuthService) {

  }

}
