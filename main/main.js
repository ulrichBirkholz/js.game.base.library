/**
 * 
 */
var SPRITES = '../resources/sprites/';
// pixel
var BLOCK_SIZE = new MathUtils.vector(48, 48);

// blocks
var WORLD = new MathUtils.vector(30, 30);

// TODO: should depend on canvas y = canvas.height / BLOCK_SIZE.y
var SCREEN = new MathUtils.vector(14, 10);

var frame;
$(document).ready(function(){
		// init frame
		frame = new FrameObject("game-frame", "2d", true);

		// init world
		elements = ['Water.png', 'Trees.png'];

		// TODO: use global vars at 'world'
		var world = new World (WORLD, SCREEN, elements);

		for (var x = 0; x < WORLD.x; x++) {
			var stripe = [WORLD.y];
			for (var y = 0; y < WORLD.y; y++) {
				stripe [y] = y%2 + 1;
			}
			stripe = MathUtils.rotateRight(stripe, x);
			world.addStripe(stripe, x, 0);
		}

		world.create();
		
		var player = new Player(world, SPRITES + '/cat/WhiteCat');

})