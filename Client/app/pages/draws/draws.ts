import { Component } from "@angular/core";
import { NavController, Events, NavParams } from 'ionic-angular';
import { DrawService } from '../../services/drawService';
import { DrawDetail } from './drawDetail';

@Component({
  templateUrl: 'build/pages/draws/draws.html',
  providers: [DrawService]
})
export class Draws {

  /* user's draws */
  user;
  /* draws */
  draws;

  constructor(private nav: NavController, private navParams: NavParams, private drawService: DrawService, private events: Events) {
    this.user = navParams.get('user'); 
    this.loadDraws();
    this.listenToDrawsEvents();
  }

  listenToDrawsEvents() {
    this.events.subscribe('draw:event', (data) => {
      this.loadDraws();
    });
  }

  loadDraws(){
    this.drawService.getDraws(this.user).then((data) => {

      for(var i=0; i<data.draws.length;i++){
        data.draws[i]['createdAt'] = data.draws[i]['createdAt'].split("T",1);
      }
      this.draws = data.draws;
    });
  }

  gotoDrawDetail(draw) {
    this.nav.push(DrawDetail, {
      draw: draw
    });
    this.loadDraws();
  }

}
