/**
 *  Base Component
 */

function Component(controller, data) {
	
	var self = this;
	
	self.connection =  controller.getProperty('connection');
	if (self.connection == null) {
		throw new Error('The connection property must be set.');
	}
	
	self.controller = controller;
	if (self.controller == null) {
		throw new Error('You must set the controller for this component');
	}
	
	self.data = data;	
	if (self.data == null) {
		throw new Error('You must set the data for this component.');
	}
}

Component.prototype.getProperty = function (propertyName) {
	var self = this;
	
	return self.controller.getProperty(propertyName);
}

Component.prototype.getValue = function (itemName) {
	var self = this;
	
	var name = itemName.toUpperCase();
	
	return self.data.getPrimaryValue(name);
}

Component.prototype.registerItem = function (itemId) {
	var self = this;
	
	if (itemId == null) {
		throw new Error('Parameter itemId must be set.');
	}
	
	var name = itemId.toUpperCase();
	self.controller.registerItem(name, itemId, self.connection);
}

Component.prototype.getElement = function (name) {
	var self = this;
	
	return self.controller.getElement(name);
}

Component.prototype.setBackgroundColor = function (color) {
	
	var self = this;
	
	var backgroundElement = self.getElement('background');
	if (backgroundElement != null) {
		backgroundElement.setBackgroundColor(color);
	}
}

Component.prototype.setText = function (text) {
	var self = this;
	
	var textElement = self.getElement('text');
	if (textElement != null) {
		textElement.setText(text);	
	}
}



