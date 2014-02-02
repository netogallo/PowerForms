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

    objs.searchTags = function(req, res){

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
		
		console.log(tags);
		
		// var letters = function(rec,tags,letters){

		//     if(tags.length < 1){

		// 	res.json(letters);
		//     }else{

		// 	var t = tags.pop();
		// 	t.getLetters(function(letters){
		// 	    rec(rec,tags,
		//     }
		// }

		res.json(tags[0].letters);

	    });
	}else{

	    res.json({error: 'No query given'});
	}
    };

    return objs;
};
