/**
 * 
 */
var MathUtils = {
	toRadians : function (angle) {
		return angle * (Math.PI/180);
	},

	vector : function (x, y) {
		if (!ObjectUtils.hasValue(x)) {
			x = 0;
		}
		if (!ObjectUtils.hasValue(y)) {
			y = 0;
		}
		this.x = x;
		this.y = y;
	},

	validateVector : function (vec) {
		if (ObjectUtils.hasValue(vec)) {
			if (!ObjectUtils.hasValue(vec.x)) {
				vec.x = 0;
			}
			if (!ObjectUtils.hasValue(vec.y)) {
				vec.y = 0;
			}
			return vec;
		}
		return new MathUtils.vector();
	},

	pxToBlock : function(pos) {
		// probably round up instead of down
		var validPos = MathUtils.validateVector(pos);
		var result = new MathUtils.vector();
		if (validPos.x > 0) {
			result.x = Math.floor(validPos.x / BLOCK_SIZE.x);
		}
		if (validPos.y > 0) {
			result.y = Math.floor(validPos.y / BLOCK_SIZE.y);
		}
		return result;
	},

	blockToPx : function (pos) {
		var validPos = MathUtils.validateVector(pos);
		var result = new MathUtils.vector();
		result.x = validPos.x * BLOCK_SIZE.x;
		result.y = validPos.y * BLOCK_SIZE.y;
		return result;
	},

	rotateRight : function (array, offset) {

		function rotate() {
			if (array instanceof Array) {
				var last = array[array.length -1];
				var result = [array.length];
				result[0] = last;
	
				for (var i = 0; i < array.length -1 ; i++) {
					result[i+1] = array[i];
				}
				return result;
			}
		}
		if (!ObjectUtils.hasValue(offset)) {
			offset = 1;
		}
		for (var times = 0; times < offset; times++) {
			array = rotate();
		}
		return array;
	}
};