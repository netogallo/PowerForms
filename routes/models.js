exports.models = function(err, db){
    
    exports.User = db.define("user", {
        name      : String,
        last      : String,
        fbid      : String,
    }, {
        methods: {},
	validations: {
	    fbid: db.validators.unique('User name already taken')
        }
    });

    exports.Tag = db.define("tag", {
        name      : String        
    }, {
	autoFetchLimit: 3,
        methods: {
            fullName: function () {
                return this.name + ' ';
            }
        },
        validations: {
        }
    });

    exports.Letter = db.define("letter", {
        name        : String,
        displayname : String,
        letter      : String,
        html        : String,
    }, {
        methods: {
            fullName: function () {
                return this.name + ' ' + this.tags;
            }
        },
        validations: {

	    name: db.validators.unique('name must be unique')
        }
    });

    //exports.Tag.hasMany('letter',exports.Letter);
    exports.Letter.hasMany('tags',exports.Tag,
			   {},
			   {
			       reverse: 'letters',
			       autoFetch: true
			   });

    db.sync();    
}
