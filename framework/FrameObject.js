/**
 * 
 */
var DEFAULT_FRAME = 'DEFAULT_FRAME';

var frames = {
	frames : {},
	registerFrame : function (id, frame) {
		this.frames[id] = frame;
	},
	getFrame : function (id) {
		if (this.frames[id] === undefined) {
			return this.frames[DEFAULT_FRAME];
		}
		return this.frames[id];
	}
};

function FrameObject(canvas_id, dim, isDefault) {
	this.canvas = $("#" + canvas_id);
    this.context = this.canvas[0].getContext(dim);

    if (isDefault) {
    	frames.registerFrame(DEFAULT_FRAME, this);
    }
}