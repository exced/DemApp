import { Component } from "@angular/core";
import { NavController, NavParams, Alert, Events } from 'ionic-angular';
import { AuthService } from '../../services/authService';
import { UpdateUser } from '../myUsers/updateUser';

@Component({
    templateUrl: 'build/pages/myAccount/myAccount.html',
    providers: [AuthService]
})

export class MyAccount {

    public info: any;
    detailsName;
    details = [];

    constructor(private nav: NavController, navParams: NavParams, private authService: AuthService, private events: Events) {
        this.initialize();
        this.listenToEvents();
    }

    initialize(){
        this.detailsName = [];
        this.details = [];
        /* details */
        this.authService.loadUser().then((user) => {
            this.detailsName = ['firstname', 'lastname', 'password'];
            for(var i=0; i < this.detailsName.length-1; i++){
                this.details.push({name:  this.detailsName[i], value:user[this.detailsName[i]]});
            }
            this.details.push({name: 'password', value: '*****'});
        });
    }

    listenToEvents(){
        this.events.subscribe('user:update', (data) => {
            this.initialize();
        });
    }
    
    gotoUpdateDetail(detail){
        this.authService.loadUser().then((user) => {
            this.nav.push(UpdateUser, {
                user: user,
                detail: detail
            });
        });
    }

    logout(){
        this.authService.logout();
    }
}