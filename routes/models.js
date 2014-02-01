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

    exports.Tag = db.define("tag", {
        name      : String        
    }, {
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
        }
    });

    exports.Letter.hasMany('tags',exports.Tag);

    db.sync();

    var tag1 =  {
        name:"yellow",
    };
    var tag2 = {
        name:"blue",
    };

    var tags = [tag1, tag2];
    exports.Tag.create(tags, function (err, models) {
        var tags_id = models.map(function(m) {
            return m.id;
        });
    exports.Letter.create({
            name:"cc",
            displayname: "O2 Contract Cancelation",
            letter:"Max Mustermann, Straße/Hausnummer, PLZ/Ort<br>" +
                    "O2 D2 GmbH<br>" +
                    "O2-Kundenbetreuung<br>" +
                    "40875 Ratingen<br><br><br>" +
                    "Kündigung des Handyvertrags mit der Rufnummer:<br>" +
                    "Kundennummer:<br><br>" +

                    "Sehr geehrte Damen und Herren,<br><br>" +

                    "hiermit möchte ich meinen Vertrag fristgerecht zum nächstmöglichen Zeitpunkt kündigen. Bitte senden Sie mir eine schriftliche Bestätigung der Kündigung unter Angabe des Beendigungszeitpunktes zu.<br><br>" +

                    "Vielen Dank.<br><br>" +

                    "Mit freundlichen Grüßen<br><br>" +

 

                    "Vorname Name",
            html:"#",
            tags: models,      
        }, function (err, model){});
    });
}
