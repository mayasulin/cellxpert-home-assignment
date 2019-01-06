$( document ).ready(function() {
    var db = new database();
    //var tweets = db.getAllTweets();
    
    $.ajax({
        method: "Get",
        url: 'https://twitter.com/search?l=&q=affiliate%20since%3A2018-01-01%20until%3A2018-12-31&src=typd',
        data:{
            username: 'may23527973',
            password: 'Aa123456'
        },
        success: function(data){
            console.log(data);
        }
    });

    $("#fetch").on("click", function(event){
        db.getAllTweets(insertTweetsToDom);

    });

    $("#report").on("click", function(event){
        db.report(insertReportToDom);

    });

    function insertTweetsToDom(tweets){
        console.log(tweets);
        var domCommand = "<table>";
        for(i = 0; i < tweets.length; i++){
            domCommand += "<tr><td>" + tweets[i].tweet + "</td> <td>" + tweets[i].date + "</td></tr>";
        }

        domCommand += "</table";
        $("#result").html("");
        $("#result").append(domCommand);
    }

    function insertReportToDom(data){
        $("#result").html("");
        $("#result").append("Total tweets: " + data);
    }
 
});