import { Component } from "@angular/core";
import { Platform, Alert, NavController, NavParams } from 'ionic-angular';
import { DrawService } from '../../services/drawService';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Component({
  templateUrl: 'build/pages/draws/drawDetail.html',
  providers: [DrawService]
})

export class DrawDetail {

  /* users's draw */
  user;
  draw;
  image;
  mCanvas;

  constructor(private platform: Platform, private nav: NavController,private navParams: NavParams, private sanitizer: DomSanitizationService,private drawService: DrawService) {
    this.user = navParams.get('user');
    this.draw = navParams.get('draw');  
    this.image = 'http://localhost:3000/images/' + this.user.name + '/' + this.draw.image; 
  } 


}
