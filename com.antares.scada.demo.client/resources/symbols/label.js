/**
 *  Label Component
 */

function NumericDisplayBehaviour() {
	
	
}

function IndicatorBehaviour() {
	
	
}

function Label(controller, data) {
	var self = this;
	
	Component.call(self, controller, data);

	self.type = self.getProperty('type') || 'static';
	self.lensOutput = self.getProperty('lensOutput');
	self.valueOutput = self.getProperty('valueOutput');
}

Label.prototype = Object.create(Component.prototype);
Label.prototype.constructor = Label;

Label.prototype.init = function () {
	
	var self = this;
	
	self.valueOutput = self.getProperty('valueOutput');
	
	if (self.valueOutput != null) {
		self.registerItem(self.valueOutput);
	}
	
	var foregroundColor = self.getProperty('foregroundColor');
	if (foregroundColor != null) {
		self.setForegroundColor(foregroundColor);	
	}
	
	var fontSize = self.getProperty('fontSize');
	if (fontSize != null) {
		self.setFontSize(fontSize);
	}
	
	self.setBackgroundColor(self.getProperty('backgroundColor'));
}	
	
Label.prototype.update = function () {
	var self = this;
	
	var value = self.getValue(self.valueOutput)
	
	var dataType = self.getProperty('dataType') || 'number';
	if (dataType == 'string') {
		value = value.asString();
	} else {
		value = value.asInteger();
		
		var expression = self.getProperty('expression');
		if (expression != null) {
			var expr = Parser.parse(expression);
			value = expr.evaluate({valueOutput: value});
		}
	}
		
	self.setText(value);
}

Label.prototype.mouseIn = function () {
	// Do nothing.
}

Label.prototype.mouseOut = function () {
	// Do nothing.
}

