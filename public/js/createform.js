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
		if(message.err==false){
			alert("form successfully created");
		}
	});
}

