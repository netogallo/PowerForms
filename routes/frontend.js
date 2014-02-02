exports.init = function(models){

    var objs={};

    objs.top = function(req,res){

	res.render('homepage');
    };

    objs.editor = function(req,res){

	res.render('testing');
    };

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
    };

    objs.createform = function(req,res){
	res.render('create');
    };

    objs.searchLetters = function(req, res){

	var template = false;

	if(req.body.tag){
	    req.body.tags = [req.body.tag];
	    template = true;
	}

	if(req.body.tags 
	   && req.body.tags.length){

	    var tags = req.body.tags;
	    
	    var q = [];

	    for(var i=0; i < tags.length; i++){

		q.push(req.body.tags[i]);
	    }

	models.Tag.find(
	    {name: q},
	    function(err, tags){
		
		
		// var letters = function(rec,tags,letters){

		//     if(tags.length < 1){

		// 	res.json(letters);
		//     }else{

		// 	var t = tags.pop();
		// 	t.getLetters(function(letters){
		// 	    rec(rec,tags,
		//     }
		// }

		var letters = [];
		
		tags.forEach(function(t){
		    //console.log(t.letters);
		    letters = letters.concat(t.letters);
		});

		if(template){
		 
		    res.render('list',{letters:letters});
		}else{
		    
		    //console.log(letters);
		    res.json(letters);
		}
	    });
	}else{

	    res.json({error: 'No query given'});
	}
    };

    objs.searchTags = function(req,res){

	if(req.query){

	    models.Tag.find({
		name: orm.like('%'+req.query.query+'%')
	    },function(e,vals){

		var e = {};
		var suggestions = [];

		var ts = Prelude.map(function(t){
		    if(e[t.name] == undefined){

			e[t.name] = true;
			suggestions.push(t.name);
			return true;
		    }
		},vals);

		console.log(suggestions);

		res.json({
		    query: req.body.query,
		    suggestions: suggestions,
		    data: suggestions
		});
	    });
	}else{

	    res.json({
		query: req.body.query,
		suggestions: [],
		data: []
	    });
	}
	
    };

    objs.submitform = function(req,res){

	var tags = [];
	req.body.tags.split(';').forEach(function(t){
	    tags.push({name: t});
	});

	console.log(tags);

	var mkTags = function(tags, i){

	    if(i >= tags.length){
		
		console.log(tags);

		var letter = new models.Letter({
		    name:req.body.name.replace(' ',''), 
		    displayname:req.body.name,
		    tags: tags
		});

		letter.save(function(e,letter){
		    console.log(e);
		    res.json(letter);
		});
	    }else{

		var t = new models.Tag({name: tags[i].name});

		t.save(
		    function(e,x){
			tags[i] = x; 
			mkTags(tags,i+1)
		    });
	    }
	};

	mkTags(tags,0);
    }
			      
    
    return objs;
};
