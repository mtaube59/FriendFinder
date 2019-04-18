
var friends = require("../data/friends.json")



module.exports = function(app) {
    app.get("/api/friends", function (req,res){
        res.json(friends)
    })

    app.post("/api/friends", function(req,res){
        //grab user sent over, then compare that user's scores with those of the ones already contained in the array. Once that is done the user is matched with the person with the lowest score.
        var newUser = req.body.scores;
        for (var i = 0; i < newUser.length; i++){
            newUser[i] = parseInt(newUser[i])
        }
        var sum = 0;
        var newUserSum = 0;
        for (var k = 0; k < newUser.length;k++){
            newUserSum = newUserSum + parseInt(newUser[k])
        }
        var minMatch = 100;
        var lowestPerson; 
        for (var i =0; i < friends.length; i++) {
            sum = 0
            for (var j = 0; j < friends[i].scores.length; j++){

            sum = sum + friends[i].scores[j];
            }
            if (Math.abs(sum - newUserSum) < minMatch){
                minMatch = Math.abs(sum - newUserSum);
                console.log(minMatch);
                lowestPerson = i;
                // console.log("this is the lowest person at index = " + lowestPerson);
            }
            console.log(sum);
        }
        console.log("this is the lowest person at index = " + lowestPerson);
        friends.push(req.body);
        res.json(friends[lowestPerson]);

    })

}