/**
 *  Visual Interface Button
 */

// TODO: Convert to and OOP style.

var LENS_OUTPUT_NAME = 'LENS_OUTPUT';
var SWITCH_INPUT_NAME = 'SWITCH_INPUT';

var onLens = null;
var offLens = null;
var textElement = null;
var lensOutput = null;
var switchInput = null;
var connection = null;

function prefixed ( localPart ) {
	if ( localPart === undefined || localPart == null )
		return controller.getProperty("prefix");
	else
		return controller.getProperty("prefix") + "." + localPart;
}

var logMessages = []

function log(msg) {
	
	var console = controller.getElement('console');
	//var text = console.getText();
	
	logMessages.push(msg);
	
	console.setText(logMessages.join('\n'));
}

function init()
{
	// Get item properties
	lensOutput = prefixed(controller.getProperty('lensOutput'));
	switchInput = prefixed(controller.getProperty('switchInput'));
	onLens = controller.getProperty('onLens');
	offLens = controller.getProperty('offLens');
		
	// Register items for change tracking
	connection = controller.getProperty("connection");
	controller.registerItem(LENS_OUTPUT_NAME, lensOutput, connection);
	controller.registerItem(SWITCH_INPUT_NAME, switchInput, connection);
	
	// Initialize with default values
	var text = controller.getProperty("text", "[Button]");
	textElement = controller.getElement('text');
	textElement.setText(text);
}

function setText(text) {
	textElement.setText(text);
}

function update() {
	
	var lensOutputValue = data.getPrimaryValue(LENS_OUTPUT_NAME).asBoolean();
	log(lensOutputValue);
	
	updateText(lensOutputValue);
}

function updateText(state) {
	if (state == true) {
		setText(onLens);
	}
	else {
		setText(offLens);
	}
}

function click()
{
	controller.startWrite(connection, switchInput, true);
}
