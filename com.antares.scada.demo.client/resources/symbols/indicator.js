/**
 *  Visual Interface Indicator Component
 */

// TODO: Rewrite in an OOP style.

/*
 * [0: {
 * 		label: 'label for state 0',
 * 		color: '#ffffff',
 * 		backgroundColor: '#ff0000'
 * 	},
 * 	1: {
 * 		label: 'label for state 1'
 * 		color: '#ffffff',
 * 		backgroundColor: '#00ff00'
 * 	}
 * ]
 * 
 */


var lensOutput = null;
var connection = null;

var LENS_OUTPUT_NAME = 'LENS_OUTPUT';

var lensState0Label = null;
var lensState1Label = null;

var labelElement = null

function prefixed ( localPart ) {
	if ( localPart === undefined || localPart == null )
		return controller.getProperty("prefix");
	else
		return controller.getProperty("prefix") + "." + localPart;
}

function init() {

	connection = controller.getProperty('connection');
	
	lensOutput = prefixed(controller.getProperty('lensOutput'));
	
	lensState0Label = controller.getProperty('lens.state.0.label');
	lensState1Label = controller.getProperty('lens.state.1.label');
	
	controller.registerItem(LENS_OUTPUT_NAME, lensOutput, connection);
	
	labelElement = controller.getElement('label');
	
}

function update() {

	var lensOutputValue = data.getPrimaryValue(LENS_OUTPUT_NAME).asBoolean();
	
	updateText(lensOutputValue);
}

function setText(text) {
	labelElement.setText(text);
}

function updateText(state) {
	if (state == true) {
		setText(lensState1Label);
	} else {
		setText(lensState0Label);
	}
}
