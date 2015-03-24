/**
 *  Label Component
 */


var LabelBehaviourFactory = LabelBehaviourFactory || {}

LabelBehaviourFactory.create = function (type, container) {
	
	if (type == 'indicator') {
		return new IndicatorBehaviour(container);
	} else if (type == 'dynamic') {
		return new NumericDisplayBehaviour(container);
	} else {
		return new StaticBehaviour(container);
	}
}

function NumericDisplayBehaviour(label) {
	var self = this;
	self.label = label;
	self.valueOutput = self.label.getProperty('valueOutput');
	if (self.valueOutput == null) {
		throw new Error("valueOutput property must be set.");
	}
	
	self.dataType = self.label.getProperty('dataType') || 'numeric';
}

NumericDisplayBehaviour.prototype.init = function () {
	var self = this;
	
	self.label.registerItem(self.valueOutput);
	
}

NumericDisplayBehaviour.prototype.update = function () {
	
	var self = this;
	var value = self.label.getValue(self.valueOutput);
	
	if (self.dataType == 'string') {
		value = value.asString();
	} else {
		value = value.asInteger();
		
		var expression = self.label.getProperty('expression');
		if (expression != null) {
			var expr = Parser.parse(expression);
			value = expr.evaluate({valueOutput: value});
		}
	}
		
	self.label.setText(value);
}

function StaticBehaviour(label) {
	var self = this;
	self.label = label;
	self.text = self.label.getProperty('text') || '[Label Text]'; 
}

StaticBehaviour.prototype.init = function () {
	var self = this;
	
	self.label.setText(self.text);
}

StaticBehaviour.prototype.update = function () {
	// Do nothig.
}

function IndicatorBehaviour(label) {
	var self = this;
	
	self.label = label;
	
	self.lensOutput = self.label.getProperty('lensOutput');
	self.onLensText = self.label.getProperty('onLens.text');
	self.onLensBackgroundColor = self.label.getProperty('onLens.backgroundColor');
	self.onLensForegroundColor = self.label.getProperty('onLens.foregroundColor');
	self.offLensText = self.label.getProperty('offLens.text');
	self.offLensBackgroundColor = self.label.getProperty('offLens.backgroundColor');
	self.offLensForegroundColor = self.label.getProperty('offLens.foregroundColor');
}

IndicatorBehaviour.prototype.init = function () {
	var self = this;
	
	self.label.registerItem(self.lensOutput);
	self.setOffLens();
}

IndicatorBehaviour.prototype.update = function () {
	var self = this;
	
	var value = self.label.getValue(self.lensOutput).asBoolean();
	if (value) {
		self.setOnLens();
	} else {
		self.setOffLens();
	}
}

IndicatorBehaviour.prototype.setOnLens = function () {
	var self = this;
	
	self.label.setBackgroundColor(self.onLensBackgroundColor);
	self.label.setForegroundColor(self.onLensForegroundColor);
	self.label.setText(self.onLensText);
}

IndicatorBehaviour.prototype.setOffLens = function () {
	var self = this;
	
	self.label.setBackgroundColor(self.offLensBackgroundColor);
	self.label.setForegroundColor(self.offLensForegroundColor);
	self.label.setText(self.offLensText);
}

function Label(controller, data) {
	var self = this;
	
	Component.call(self, controller, data);

	self.type = self.getProperty('type') || 'static';
	self.behaviour = LabelBehaviourFactory.create(self.type, self);
}

Label.prototype = Object.create(Component.prototype);
Label.prototype.constructor = Label;

Label.prototype.init = function () {
	
	var self = this;
	
	self.behaviour.init();
	
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
	
	self.behaviour.update();
}

Label.prototype.mouseIn = function () {
	// Do nothing.
}

Label.prototype.mouseOut = function () {
	// Do nothing.
}

