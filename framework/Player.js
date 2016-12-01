/**
 * 
 */
function Player(world, spritePath) {
	var sprites = {};
	var lastdir = 'down';
	world.registerPeople(this);
	
	function loadSprites(dir) {
		var sps = [3];
		sps[0] = new Sprite(spritePath + dir + '1.png');
		sps[1] = new Sprite(spritePath + dir + '2.png');
		sps[2] = new Sprite(spritePath + dir + '3.png');
		sps.pos = 0;
		return sps;
	};

	sprites.down = loadSprites('Down');
	sprites.up = loadSprites('Up');
	sprites.left = loadSprites('Left');
	sprites.right = loadSprites('Right');

	function move (dir) {
		lastdir = dir;
		if (sprites[dir].pos < sprites[dir].length - 1) {
			sprites[dir].pos++;
		} else {
			sprites[dir].pos = 0;
		}
		draw();
	};

	// movement
	KeyEvents.registerEvent(Keys.w, KeyTypes.keyDown, function() {
		move('up');
		world.move(new MathUtils.vector(0,-2));
	});
	KeyEvents.registerEvent(Keys.s, KeyTypes.keyDown, function() {
		move('down');
		world.move(new MathUtils.vector(0, 2));
	});
	KeyEvents.registerEvent(Keys.d, KeyTypes.keyDown, function() {
		move('right');
		world.move(new MathUtils.vector(2, 0));
	});
	KeyEvents.registerEvent(Keys.a, KeyTypes.keyDown, function() {
		move('left');
		world.move(new MathUtils.vector(-2, 0));
	});
	
	// public
	var draw = function () {
		var sp = sprites[lastdir][sprites[lastdir].pos];
		var pos = world.getPlayerRelPos();
		sp.draw(pos.x, pos.y);
	}
	this.draw = draw;
	
}