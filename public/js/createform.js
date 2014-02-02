function uploadForm(){

	$.ajax({
		url: '/create-form/submit',
		type: "POST",
		data:{
			name: $("#letter-title").val(),
			tags: $("#letter-tags").val(),
			letter: $("#letter-text").val()
		} 
	}).done(function(message) {
		if(!message.err){
		    alert("form successfully created");
		}
	});
}

function renderPdf(){

    renderForm('pdf');
}

function renderForm(how){

    var letter = $('#form-content').clone();

    var is = letter.find('input');

    is.each(function(i){

	var e = $(is[i]);

	if(e.attr('type') != 'submit'){

	    e.after(e.val());
	    e.remove();
	}
    });

    $.ajax({
	url: '/render',
	type: 'post',
	data: {
	    type: how,
	    html: letter.html()
	}
    }).done(function(msg){

	window.location = '/render_res?file_id=' + msg.file_id;
    })

	
}
