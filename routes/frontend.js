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

	objs.createform = function(req,res){
		res.render('create');
	}

	objs.submitform = function(req,res){
		console.log(req.body);
	    var tags = [];
	    req.body.tags.split(';').forEach(function(t){
	    	tags.push({name: t});
	    });
	    models.Tag.create(tags, function (err, tagsm) {
	        var tags_id = tagsm.map(function(m) {
	            return m.id;
	        });
			var letter = new models.Letter({name:req.body.name.replace(' ',''), displayname:req.body.name, tags: tags_id, letter: req.body.letter});
			letter.save(function(){
				res.json({err:false,letter:letter});
			});
		});
	}

	return objs;
};