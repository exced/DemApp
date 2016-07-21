import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {MyUsers} from '../myUsers/myUsers';
import {Settings} from '../settings/settings';
import {MyAccount} from '../myAccount/myAccount';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class Tabs {
  // set the root pages for each tab
  tab1Root: any = MyUsers;
  tab2Root: any = Settings;
  tab3Root: any = MyAccount;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
