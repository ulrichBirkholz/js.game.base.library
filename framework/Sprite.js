/**
 * 
 */
function Sprite(src, pattern) {
	// intit
	if (StringUtils.isBlank(src)) {
		console.warn("Unable to load Sprite for src " + src);
		return;
	}

	// private
	var frame = frames.getFrame(src);
	var context = frame.context;

	function isPatternValid (ptr) {
		// "repeat|repeat-x|repeat-y|no-repeat"
		return (StringUtils.isNotBlank(pattern)
				&& (pattern == "repeat" || pattern == "repeat-x"
					|| pattern == "repeat-y" || pattern == "no-repeat"))
	}
	

	// public
	this.image = new Image();
	this.image.src = src;
	
	if (isPatternValid(pattern)) {
		this.pattern = context.createPattern(this.image, pattern);
	}

	// mthods
	this.draw = function(x,y,w,h) {
		if (isPatternValid(pattern)) {
			context.fillStyle = this.pattern;
			context.fillRect(x,y,w,h);
			return;
		}
		if (w === undefined || h === undefined) {
			w = this.image.width;
			h = this.image.height;
		}
		context.drawImage(this.image, x, y, w, h);
	};

	this.rotate = function(x, y, angle) {
		context.save();
		context.translate(x, y);
		// cotate frame not image
		context.rotate(MathUtils.toRadians(angle));
		context.drawImage(this.image, -(this.image.width / 2), 
				-(this.image.height / 2));
		
		context.restore();
	};
}