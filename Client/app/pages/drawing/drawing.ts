import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { DrawService } from '../../services/drawService';

@Component({
	templateUrl: 'build/pages/drawing/drawing.html',
	providers: [DrawService]
})
export class Drawing {

	canvas;
	context;
	toolbar;
	clockWidth;
	clockHeight;

	constructor(private drawService: DrawService, private nav:NavController) {
		this.clockWidth = 0;
		this.clockHeight = 0;
	}

	ngAfterViewInit() {

		/* get toolbar */
		this.toolbar = <HTMLElement> document.getElementById("toolbar");

		/* get canvas */
		let canvas = <HTMLCanvasElement> document.getElementById("canvas");
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;
		this.canvas = canvas;
		let context = canvas.getContext("2d");
		this.context = context;

		/* draw clack */
		this.drawClock(this.canvas, this.context, this.toolbar);

		/* draw circle */
		this.drawCircle(this.canvas, this.context);

		/* mouse position */
		var mouse = { x: 0, y: 0 };
		var last_mouse = { x: 0, y: 0 };

		/* Mouse Capturing Work */
		canvas.addEventListener('mousemove', function(e) {
			last_mouse.x = mouse.x;
			last_mouse.y = mouse.y;

			mouse.x = e.pageX - this.offsetLeft;
			mouse.y = e.pageY - this.offsetTop;
		}, false);

		var brushColor = 'black';

		/* Drawing on Paint App */
		context.lineWidth = 3;
		context.lineJoin = 'round';
		context.lineCap = 'round';
		context.strokeStyle = brushColor;

		canvas.addEventListener('mousedown', function(e) {
			canvas.addEventListener('mousemove', onPaint, false);
		}, false);

		canvas.addEventListener('mouseup', function() {
			canvas.removeEventListener('mousemove', onPaint, false);
		}, false);

		var onPaint = function() {
			context.beginPath();
			context.moveTo(last_mouse.x, last_mouse.y);
			context.lineTo(mouse.x, mouse.y);
			context.closePath();
			context.stroke();
		};
	}

	drawCircle(canvas, context){
		/* draw circle */
		var centerX = canvas.width / 2;
		var centerY = canvas.height / 2;
		var radius = 100;
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.lineWidth = 4;
		context.strokeStyle = 'black';
		context.stroke();
	}

	drawClock(canvas, context, toolbar){
		this.clockWidth = Math.floor(canvas.width / 3);
		this.clockHeight = Math.floor(canvas.height / 6);
		var img = new Image();
		img.onload = function(){
			context.drawImage(img,0,toolbar.offsetHeight,Math.floor(canvas.width / 3),Math.floor(canvas.height / 6));
		}
		img.src = 'img/clock.png';
	}

	saveAlert(){
		/* ask for permission */
		let alert = Alert.create({
			title: 'Confirm',
			message: 'Would you like to save your draw ?',
			buttons: [
			{
				text: 'Cancel',
				handler: () => {
				}
			},
			{
				text: 'Save',
				handler: () => {
					this.save();
					this.reset();
				}
			}
			]
		});
		this.nav.present(alert);
	}

	save(){
		/* remove clock img */
		this.context.clearRect(0,this.toolbar.offsetHeight,this.clockWidth,this.clockHeight);
		/* save */
		var img = this.canvas.toDataURL();
		this.drawService.createDraw(img);
	}

	resetAlert(){
		/* ask for permission */
		let alert = Alert.create({
			title: 'Confirm',
			message: 'Would you like to reset your draw ?',
			buttons: [
			{
				text: 'Cancel',
				handler: () => {

				}
			},
			{
				text: 'Reset',
				handler: () => {
					this.reset();
				}
			}
			]
		});
		this.nav.present(alert);
	}

	reset(){
		/* reset */
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
		this.drawClock(this.canvas, this.context, this.toolbar);
		this.drawCircle(this.canvas, this.context);
	}
}
