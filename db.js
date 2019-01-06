var database = function() {
    this.db = openDatabase('tweets', '1.0', 'Tweets database', 2*1024*1024);
    this.keyWords = ['affiliate', 'marketing', 'infulencer'];


    // check if it work!! (probably not)
    this.createTable = function(){
        db.transaction(function (tx) { 
            this.keyWords.forEach(element => {
                var q = generateCreateQuery(element);
                tx.executeSql(q); 
            });
        }); 
    };

    this.fillTables = function(){
        db.transaction(function(tx){
            insertToTable(tx, "affiliate");
            insertToTable(tx, "marketing");
            insertToTable(tx, "influencer");

        });
    }

    // after a long time trying to make it work in more generic way, i decided to write it this way 
    this.getAllTweets = function(callback){
        // build query
        var data = [];
        this.db.transaction(function(tx){
            tx.executeSql("select * from affiliate", [], function(tx, result){
                for(i = 0; i < result.rows.length; i++){
                    data.push(result.rows[i]);
                }
            }, null);

            tx.executeSql("select * from marketing", [], function(tx, result){
                for(i = 0; i < result.rows.length; i++){
                    data.push(result.rows[i]);
                }
            }, null);

            tx.executeSql("select * from influencer", [], function(tx, result){
                for(i = 0; i < result.rows.length; i++){
                    data.push(result.rows[i]);
                    
                }
                callback(data);
            }, null);
        });

        
    }

    
    this.report = function(callback){
        var query = "select COUNT(id) as tweetCount from marketing";

        this.db.transaction(function(tx){
            tx.executeSql(query, [], function(tx, result){
                callback(result.rows[0].tweetCount);
            });
        });
    }


    this.generateInsertQuery = function(id, word){
        return "INSERT INTO " + word.toUpperCase() + " VALUES ("+id+",'"+word+"','25/12/2018');";
    };

    this.generateCreateQuery = function(table){
        return 'CREATE TABLE ' + table.toUpperCase() + ' (id unique, tweet, date)'; 
    }

    this.generateSelectAllQuery = function(table){
        return 'select * from ' + table.toUpperCase();
    }

    this.insertToTable = function (context, table){
        for(i=0; i<10; i++){
            var q = generateInsertQuery(i, table);
            context.executeSql(q);
        }
    }

    this.getTweets = function(context, table){
        return JSON.stringify(context.executeSql('select * from ' + table));
    }

    this.getDB = function(){
        if(this.db == undefined)
            return new openDatabase('tweets', '1.0', 'Tweets database', 2*1024*1024);
        
        else
            return this.db;
    }
    
}