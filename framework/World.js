/**
 * 
 */
// wo.x 'x world' sc.x 'x screen'
function World (wo, sc, elements) {
	wo = MathUtils.validateVector(wo);
	sc = MathUtils.validateVector(sc);

	var scPx = MathUtils.blockToPx(sc);
	var woPx = MathUtils.blockToPx(wo);
	var people = [];

	// private
	var stripes = [wo.x];
	var worldElements = [elements.length + 1];
	// player position
	var player = {};
	player.pos = new MathUtils.vector(Math.round(scPx.x/2), Math.round(scPx.y/2));
	player.size = BLOCK_SIZE;


	function WorldStripe (elements, yStart) {
		this.pice = [wo.y];

		if (!ObjectUtils.hasValue(yStart)) {
			yStart = 0;
		}
		for (var i = 0; i < wo.y; i++) {
			if (i >= yStart && i < (elements.length + yStart)) {
				this.pice[i] = elements[i - yStart];
			} else {
				this.pice[i] = 0;
			}
		}
	};

	function draw () {

		var interval = null;
		var screenPos = new MathUtils.vector();

		function checkPos(dir) {
			if (player.pos[dir] < (scPx[dir]/2) ||
					player.pos[dir] > (woPx[dir] - (scPx[dir]/2))) {
					// do no move screen
				return;
			}
			screenPos[dir] = player.pos[dir] - Math.round((scPx[dir]/2));
		}
		function checkForScreen (block) {
			function checkDirection(dir) {
				return (block[dir] >= screenPos[dir] - BLOCK_SIZE[dir]
					&& block[dir] <= screenPos[dir] + scPx[dir] + BLOCK_SIZE[dir]);
			}
			return (checkDirection('x') && checkDirection('y'));
		}
		function transferToCanvas (point) {
			point.x = point.x - screenPos.x;
			point.y = point.y - screenPos.y;
		}
		return setInterval(function() {
			frame.context.fillStyle= "#000000";
			frame.context.fillRect(0,0,800,800);
			// screen position
			checkPos('x');
			checkPos('y');
			
			$.each(stripes, function(x, stripe) {
				$.each(stripe.pice, function(y, pice) {
					if (pice != 0) {
						var blockPos = new MathUtils.vector(x,y);
						var blockPosPx = new MathUtils.blockToPx(blockPos);
						
						if (checkForScreen(blockPosPx)) {
							transferToCanvas(blockPosPx);
							worldElements[pice].draw(blockPosPx.x, blockPosPx.y)
						}
					}
				});
			});
			$.each(people, function (i, p) {
				p.draw();
			});
		}, 25);
	};

	// init
	worldElements[0] = null;
	$.each(elements, function (i, item) {
		worldElements[i + 1] = new Sprite(SPRITES + item);
	});
	
	// public
	this.addStripe = function(elements, x, yStart) {
		var stripe = new WorldStripe(elements, yStart);

		if (x >= wo.x) {
			console.warn('Invalid value for x, by adding a Stripe');
			x = null;
		}
		if (!ObjectUtils.hasValue(x)) {
			console.debug('The world was extended');
			x = wo.x;
			stripes[wo.x] = stripe;
			wo.x++;
			return;
		}
		stripes[x] = stripe
	};
	this.move = function(mVec) {
		var newPos = new MathUtils.vector();

		mVec = MathUtils.validateVector(mVec);

		// collition detection

		// world
		function checkWorld(dir) {
			if (player.pos[dir] + mVec[dir] >= woPx[dir] - player.size[dir]) {
				newPos[dir] = woPx[dir] - player.size[dir];
				return;
			} 
			if (player.pos[dir] + mVec[dir] <= 0){
				newPos[dir] = 0;
				return;
			}
			newPos[dir] = player.pos[dir] + mVec[dir];
		}
		checkWorld('x');
		checkWorld('y');
		
		// TODO: objects
		player.pos = newPos;
	};
	this.create = function () {
		interval = draw();
	};
	this.destory = function () {
		// sopt drawing
		clearInterval(interval);
	};
	this.getPlayerRelPos = function () {
		var relPos = new MathUtils.vector();
		function setPos(dir) {
			if (player.pos[dir] > (woPx[dir] - (scPx[dir]/2))) {
				relPos[dir] = scPx[dir] - woPx[dir] + player.pos[dir];
				return;
			}
			if (player.pos[dir] < (scPx[dir]/2)) {
				relPos[dir] = player.pos[dir];
				return;
			}
			// center
			relPos[dir] = Math.round(scPx[dir]/2);
		}
		setPos('x');
		setPos('y');

		return relPos;
	};
	this.registerPeople = function(p) {
		people[people.length] = p;
	};
};