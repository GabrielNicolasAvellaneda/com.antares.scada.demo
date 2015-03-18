/**
 *  Button Component
 */

function ButtonBehaviourMomentary(button) {
	var self = this;
	self.button = button;
}

ButtonBehaviourMomentary.prototype.execute = function () {
	
	var self = this;
	
	self.button.write(true);
};

ButtonBehaviourMomentary.prototype.update = function () {
	var self = this;
	
	var value = self.button.getValue(self.button.getProperty('lensOutput')).asBoolean();
	
	self.button.updateText(value);
}

function ButtonBehaviourIncrement(button) {
	var self = this;
	
	self.button = button;
	self.incrementBy = parseInt(self.button.getProperty('incrementBy'));
	self.maximum = parseInt(self.button.getProperty('maximum'));
	self.switchInput = self.button.getProperty('switchInput');
}

ButtonBehaviourIncrement.prototype.execute = function () {
	var self = this;
	
	var value = self.button.getValue(self.switchInput).asInteger();
	
	if (value + self.incrementBy <= self.maximum) {
		
		var newValue = value + self.incrementBy;
		
		self.button.write(newValue);	
	}
};

ButtonBehaviourIncrement.prototype.update = function () {
	var self = this;
	
	// Do nothing.
}

function ButtonBehaviourDecrement(button) {
	var self = this;
	
	self.button = button;
	
	self.decrementBy = self.button.getProperty('decrementBy');
	if (self.decrementBy == null) {
		throw new Error('The decrementBy property must be set.');
	}
	
	self.minimum = self.button.getProperty('minimum');
	if (self.minimum == null) {
		throw new Error('The minimum property must be set.');
	}
	
	self.switchInput = self.button.getProperty('switchInput');
	if (self.switchInput == null) {
		throw new Error('The switchInput property must be set.');
	}
}

ButtonBehaviourDecrement.prototype.execute = function() {
	var self = this;
	
	var value = self.button.getValue(self.switchInput).asInteger();
	if (self.minimum <= value - self.decrementBy) {
		var newValue = value - self.decrementBy;
		self.button.write(newValue);
	}
	
};

ButtonBehaviourDecrement.prototype.update = function () {
	var self = this;
}

var ButtonBehaviourFactory = ButtonBehaviourFactory || {};

ButtonBehaviourFactory.create = function (type, button) {
	
	if (type == 'increment') {
		return new ButtonBehaviourIncrement(button);
	} else if (type == 'decrement') {
		return new ButtonBehaviourDecrement(button);
	} 
	else {
		return new ButtonBehaviourMomentary(button);
	}
};

function Button(controller, data) {
	var self = this;
	
	Component.call(self, controller, data);
	
	self.controller = controller;
	self.data = data;
	self.connection = controller.getProperty('connection');
	if (self.connection == null) {
		throw new Error('The connection property must be set.');
	}
	
	self.backgroundElement = controller.getElement('background');
	self.textElement = controller.getElement('text');
	self.mainContainerElement = controller.getElement('mainContainer');
	
	self.properties = self.getProperties();

	self.validateProperties();
	
	var type = self.getProperty('type') || 'momentary';
	self.behaviour = ButtonBehaviourFactory.create(type, self);
}

Button.prototype = Object.create(Component.prototype);
Button.prototype.constructor = Button;

Button.prototype.validateProperties = function() {
	var self = this;
	
	if (self.getProperty('switchInput') == null) {
		throw new Error('switchInput property is requried.');
	} else if (self.getProperty('lensOutput') == null) {
		throw new Error('lensOutput property is required.');
	}
}

Button.prototype.write = function (value) {
	var self = this;
	
	self.controller.startWrite(self.connection, self.getProperty('switchInput'), value);
}

Button.prototype.getProperties = function() {
	
	var self = this;
	
	return {
		'text': self.controller.getProperty('text'),
		'toolTip': self.controller.getProperty('toolTip'),
		'backgroundColor': '#02205c',
		'hoverBackgroundColor': '#da9c35',
		'offLens': self.controller.getProperty('offLens'),
		'onLens': self.controller.getProperty('onLens'),
		'switchInput': self.controller.getProperty('switchInput'),
		'lensOutput': self.controller.getProperty('lensOuptut')
	};
	
}

Button.prototype.init = function () {
	var self = this;
	
	self.setText(self.properties['text']);
	self.setToolTip(self.properties['toolTip']);
	
	self.registerItems();
}

Button.prototype.registerItems = function () {
	var self = this;
	
	self.registerItem(self.getProperty('lensOutput'));
	self.registerItem(self.getProperty('switchInput'));
}

Button.prototype.click = function () {
	var self = this;
	
	self.behaviour.execute();
} 

Button.prototype.update = function () {
	var self = this;
	
	self.behaviour.update();
}

Button.prototype.updateText = function (state) {
	var self = this;
	
	if (state == null) {
		self.setText(self.getProperty('text'));
		
	} else if (state == true) {
		self.setText(self.getProperty('onLens'));
	}
	else {
		self.setText(self.getProperty('offLens'));
	}
}

Button.prototype.mouseIn = function () {
	var self = this;
	
	self.setBackgroundColor(self.getProperty('hoverBackgroundColor'));
}

Button.prototype.mouseOut = function () {
	var self = this;
	
	self.setBackgroundColor(self.getProperty('backgroundColor'));
}

Button.prototype.dispose = function () {
	// TODO
}

Button.prototype.setBackgroundColor = function (color) {
	var self = this;
	
	self.backgroundElement.setBackgroundColor(color);
}

Button.prototype.setText = function (text) {
	var self = this;
	
	self.textElement.setText(text);
}

Button.prototype.setToolTip = function (toolTipText) {
	var self = this;
	
	self.mainContainerElement.setToolTip(toolTipText);
}
