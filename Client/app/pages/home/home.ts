import { Component } from "@angular/core";
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/home/home.html'
})
export class Home {

	constructor(private nav: NavController, navParams: NavParams, events: Events) {
	}

}
