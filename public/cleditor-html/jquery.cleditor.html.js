(function($) {

    $.cleditor.buttons.inputfield = {

	name: "inputfield",
	image: "input.gif",
	title: "Insert Input Field",
	command: "inserthtml",
	popupName: "inputfield",
	popupClass: "cleditorPrompt",
	// popupContent: "test",
	//'<table><tr>'// +
	// '<td>Initial Text: <input type="text" name="initial"></input></td>' +
	// '<td><input type="submit" value=""'
	buttonClick: inputButtonClick
    };

    $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls.replace("rule ", "rule inputfield ");

    function inputButtonClick(e, data){

	var editor = data.editor;
	var html = '<input type="text"></input>';
	
	editor.execCommand(data.command, html, null, data.button);
	editor.focus();
    };
    
})(jQuery);
