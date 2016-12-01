/**
 * 
 */
var SPRITES = '../resources/sprites/';

$(document).ready(function(){
		var frame = new FrameObject("game-frame", "2d", true);

		var sprite1 = new Sprite('../resources/sprites/Water.png');
		var sprite2 = new Sprite('../resources/sprites/Trees.png');
		var sprite3 = new Sprite('../resources/sprites/Trees.png', 'repeat');
		
		var angle = 0;
		setInterval(function() {
			frame.context.fillStyle= "#000000";
			frame.context.fillRect(0,0,800,800);
			
			sprite1.draw(0,0,64,64);
			sprite1.draw(0,74,256,32);
			sprite3.draw(160,160,256,180);
			
			sprite1.rotate(115,160, angle += 4);
			sprite2.rotate(115,260, -angle /2);
		}, 25);
})