exports.init = function(models){

	var objs={};

	objs.top = function(req,res){

	    res.render('homepage');
	}

	objs.editor = function(req,res){

	    res.render('testing');
	}

	objs.formname = function(req,res){
		models.Letter.find({name:req.params.name}, function(err, letter){
			var content = {letter: {name:letter[0].name, displayname:letter[0].displayname, letter:letter[0].letter}};
			if(letter.length>=1) {
				letter[0].getTags(function(err,arg) {
					console.log(arg);
					content.letter.tags=arg;
					res.render('letter',content);
				});
			} else {
				console.log("error");
			}
		});
	}

	return objs;
};