import { Component, ViewChild } from "@angular/core";
import { NavController, Events, ItemSliding, Alert, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/authService';
import { UserDetail } from './userDetail';
import { AddUser } from './addUser';
import { MyUsersFilterPipe } from './myUsersFilterPipe';

@Component({
  templateUrl: 'build/pages/myUsers/myUsers.html',
  pipes: [MyUsersFilterPipe]
})
export class MyUsers {
  /* logged in user */
  user;
  users;
  query: string = "";
  msg: any;

  constructor(private nav: NavController, private navParams: NavParams, private authService: AuthService, private events: Events) {
    this.loadUsers();
    this.listenToUserEvents();
  }

  listenToUserEvents() {
    this.events.subscribe('user:event', (data) => {
      this.loadUsers();
    });
  }

  loadUsers(){
    this.authService.getUsers().then((data) => {
      this.users = data.users;
    });
  }

  setFilter(query){
    this.query = query;
  }

  gotoUserDetail(user) {
    this.nav.push(UserDetail, {
      user: user
    });
  }

  gotoAddUser(){
    this.authService.loadUser().then((user) => {
      this.nav.push(AddUser, {
        user: user
      });
    });
  }


  deleteUser(slidingItem: ItemSliding, user) {
    this.authService.deleteUser(user).then((data) => {
      if (!data) {  
        var alert = Alert.create({
          title: 'failed',
          subTitle: 'failed to delete',
          buttons: [{
            text:'ok',
            handler: () => {
              slidingItem.close();
            }
          }]
        });  
      }
      this.nav.present(alert);
    });
  }

}


