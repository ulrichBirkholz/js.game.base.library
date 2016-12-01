/**
 * 
 */
var KeyTypes = {
		keyDown : "KEY_DOWN",
		keyPress : "KEY_PRESS" 
};

function KeyEvent (code, callback, type) {
	if (!ObjectUtils.hasValue(type)) {
		type = KeyTypes.keyDown;
	}
	this.handle = function(eventCode) {
		if (eventCode === code) {
			callback();
		}
	}
};

var Keys = {
	a : 65,
	b : 66,
	c : 67,
	d : 68,
	s : 83,
	w : 87,
	z : 90
};

var KeyEvents = {
	events : {},
	registerEvent : function(code, type, callback) {
		if (!ObjectUtils.hasValue(type)) {
			type = KeyTypes.keyDown;
		}
		if (!ObjectUtils.hasValue(this.events[type])) {
			this.events[type] = [];
		}
		this.events[type][this.events[type].length] = new KeyEvent(code,
				callback);
	}
};

$(document).keydown(function(e){
	$.each(KeyEvents.events[KeyTypes.keyDown], function (i, handler) {
		handler.handle(e.keyCode);
	});
});
$(document).keypress(function(e){
	$.each(KeyEvents.events[KeyTypes.keyPress], function (i, handler) {
		handler.handle(e.keyCode);
	});
});
