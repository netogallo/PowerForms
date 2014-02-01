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
	buttonClick: inputButtonClick,
	getUid: (function(){

	    var counter = 0;
	    var prefix = "input_" + 
		Math.floor(Math.random() * 10000000) +
		"_"
	
	    return function(){

		counter = counter + 1;
		return prefix + counter;
	    };
	})()
    };

    $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls.replace("rule ", "rule inputfield ");

    function inputButtonClick(e, data){

	var editor = data.editor;
	
	var uid = this.getUid();

	var html = '<input ' +
	    'type="text" ' + 
	    'class="form-input" ' +
	    'id="' + uid + '"' +
	    '></input>';
	console.log(this.getUid());
	editor.execCommand(data.command, html, null, data.button);
	editor.focus();

	var input = editor.$frame.contents().find('#'+uid);
	
	console.log(input);

	input.change(function(){

	    console.log(input.val());
	    input.attr('value',input.val());
	});
    };
    
})(jQuery);
