var countdown = new Vue({
    el: '#countdown',
    data: {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    },
    mounted: function() {
        setInterval(function(){
            var now = new Date().getTime();
            var end = new Date(2020,1,13,18,55,49).getTime();
            var diff = parseInt((end - now)/1000);
            // since we know only count january days..
            // thus hardcode to 31..
            var months = diff/(31 * 24 * 60 * 60);
            this.months = parseInt(months);
            
            var rem = diff - parseInt(months) * (31 * 24 * 60 * 60);
            var days = rem/(24 * 60 * 60);
            this.days = parseInt(days);

            rem = rem - parseInt(days) * (24 * 60 * 60);
            var hours = rem/(60 * 60);
            this.hours = parseInt(hours);

            rem = rem - parseInt(hours) * (60 * 60);
            var minutes = rem/60;
            this.minutes = parseInt(minutes);

            rem = rem - parseInt(minutes) * 60;
            var seconds = rem;
            this.seconds = seconds;
            //alert(this.seconds);
        }.bind(this), 1000);
    }

});

var canvas = document.querySelector('canvas'),
	width = 300,
	height = 300,
	ctx = canvas.getContext('2d'),
	pSystemSize = 30,
	deform = {a:4, s:0.4, min:-200, max:200, dir:1}
	repaint = 'rgba(255,192,203,0.15)';

var mcos = Math.cos,
	  msin = Math.sin,
	  mpow = Math.pow,
	  mrandom = Math.random,
	  PI180=Math.PI / 180,
	  tau = Math.PI * 2;

canvas.width = width;
canvas.height = height;
ctx.lineWidth = 1;

var ParticleSystem = function(num){
    this.colour = '#f00';
	this.numParticles = num;
	this.allParticles = [];
	this.x = width * .5;
	this.y = height * .5;
	this.generate();
}
ParticleSystem.prototype.generate = function(){
	for(var i=0; i<this.numParticles; i++){
		var vo = {};
		vo.degrees = (360 / this.numParticles) * i * PI180;
		vo.parent = this;
		vo.scalar = 2 + (6 / this.numParticles) * i;
		vo.size = 2 + (3.5 / this.numParticles) * i;
		vo.speed = .01 + (.05 / this.numParticles) * (i * .5);
		vo.x = width / 2;
		vo.y = height / 2;
		vo.vx = 0;
		vo.vy = 0;
		this.allParticles.push(new Particle(vo));
	}
}
ParticleSystem.prototype.update = function(){
	for(var i=0; i<this.allParticles.length; i++){
		this.allParticles[i].update();
	}
}

var Particle = function(vo){
	this.degrees = vo.degrees;
	this.parent = vo.parent;
	this.scalar = vo.scalar;
	this.size = vo.size;
	this.speed = vo.speed;
	this.x = vo.x;
	this.y = vo.y;
	this.vx = 0;
	this.vy = 0;
}
Particle.prototype.update = function(){
	this.degrees += this.speed;
	// http://mathworld.wolfram.com/HeartCurve.html
	this.vx = 16 * mpow(msin(this.degrees), 3) * deform.dir;
	this.vy = ((13 * mcos(this.degrees)) - 
			   (6 * mcos(2 * this.degrees)) - // 5
			   (2 * mcos(3 * this.degrees)) -
			   (mcos(4 * this.degrees))) * -1;
	
	// update position
	this.x = this.vx * this.scalar + this.parent.x;
	this.y = this.vy * this.scalar + this.parent.y;
}

function update(){
	system.update();
}

function draw(){
	ctx.fillStyle = repaint;
	ctx.fillRect(0, 0, width, height);
	for(var i=0; i<system.numParticles; i++){
		var p = system.allParticles[i];
		ctx.fillStyle = system.colour;
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.size, 0, tau, false);
		ctx.fill();
	}
}
function animate(){
	update();
	draw();
	requestAnimationFrame(animate);
}
var system = new ParticleSystem(pSystemSize);
ctx.fillStyle = system.colour;
animate();

