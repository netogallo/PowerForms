exports.models = function(err, db){
    
    exports.User = db.define("user", {
        name      : String,
        last      : String,
        fbid      : String,
    }, {
        methods: {
            fullName: function () {
                return this.name + ' ' + this.surname;
            }
        },
        validations: {
        }
    });
}


