import { Component } from "@angular/core";
import { Platform, Alert, NavController, NavParams, Events } from 'ionic-angular';
import { AuthService } from '../../services/authService';
import { DrawService } from '../../services/drawService';
import { Draws } from '../draws/draws';
import { UpdateUser } from './updateUser';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
  templateUrl: 'build/pages/myUsers/userDetail.html',
  providers: [DrawService],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class UserDetail {

  /* user detail */
  user;
  detailsName;
  details = [];
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
  averageScore;
  public lineChartOptions:any;
  public lineChartColours:Array<any>;
  public lineChartLegend:boolean;
  public lineChartType:string;

  constructor(private platform: Platform, private nav: NavController,private navParams: NavParams, private authService: AuthService, private drawService: DrawService, private events: Events) {
    this.user = navParams.get('user');
    this.initialize();	
  }

  initialize(){

    /* details */
    this.detailsName = ['firstname', 'lastname', 'user', 'password', 'createdAt'];

    for(var i=0; i < this.detailsName.length-2; i++){
      this.details.push({name: this.detailsName[i], value:this.user[this.detailsName[i]]});
    }
    this.details.push({name: 'password', value: '*****'});
    var d = this.user['createdAt'];
    var date = d.split("T", 1);
    this.details.push({name: 'createdAt', value: date});

    if(this.user.authority === 'guest'){

      this.drawService.getDraws(this.user).then((datas) => {

        if(datas.success){
          /* average score */
          var sum = 0;
          var scores = [];
          var timeStamps = [];

          for(var i=0; i < datas.draws.length; i++){
            sum += datas.draws[i].score;
            scores.push(datas.draws[i].score);
            var d = datas.draws[i]['createdAt'];
            var date = d.split("T", 1);
            timeStamps.push(date);
          }
          this.averageScore = Math.floor(sum / datas.draws.length);

          /* chart */
          this.lineChartData = [
          {data: scores, label: 'score'}
          ];
          this.lineChartLabels = timeStamps;
        }        
      });

      this.lineChartOptions= {
        animation: false,
        responsive: true
      };
      this.lineChartColours = [
    	{ // grey
    		backgroundColor: 'rgba(148,159,177,0.2)',
    		borderColor: 'rgba(148,159,177,1)',
    		pointBackgroundColor: 'rgba(148,159,177,1)',
    		pointBorderColor: '#fff',
    		pointHoverBackgroundColor: '#fff',
    		pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    	}
    	];
    	this.lineChartLegend = true;
    	this.lineChartType = 'line';
    }
  }

  listenToEvents(){
    this.events.subscribe('user:update', (data) => {
      this.initialize();
    });
  }

  	// events
  	public chartClicked(e:any):void {
  		console.log(e);
  	}

  	public chartHovered(e:any):void {
  		console.log(e);
  	}

  	gotoUpdateDetail(detail){
      if(detail.name !== 'createdAt'){
        this.nav.push(UpdateUser, {
          detail: detail,
          user: this.user
        });
      }
    }

    getDraws(user){
      this.nav.push(Draws, {
        user: user
      });
    }

    deleteUser(user){
      this.authService.deleteUser(user).then((data) => {
        if (data) {	
          this.nav.pop();
        }
        else {
          var alert = Alert.create({
            title: 'failed',
            subTitle: 'failed to delete',
            buttons: [{
              text:'ok',
              handler: () => {
              }
            }]
          });	
        }
        this.nav.present(alert);
        this.nav.pop();
      });
    }

    alertDeleteUser(){
      let confirm = Alert.create({
        title: 'Are you sure?',
        message: 'By deleting user, all data will be destroyed',
        buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.deleteUser(this.user);	
          }
        },
        {
          text: 'Cancel',
          handler: () => {

          }
        }
        ]
      });
      this.nav.present(confirm);
    }


  }
