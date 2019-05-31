$(document).ready(function() {


var isPlayerChosen=false;
var isDefenderChosen=false;
var playerHP=0;
var playerAP=0;
var defenderHP=0;
var defenderDP=0;
var round=0;
var characters = {
    "player1" : {
        "name": "Luke Skywalker",
        "HP": 100,
        "AP": 5,
        "DP": 10,
        "image": "assets/images/luke.jpg"

    },
    "player2" : {
        "name": "Yoda",
        "HP": 200,
        "AP": 15,
        "DP": 25,
        "image": "assets/images/yoda.png"
    },
    "player3" : {
        "name": "Darth Vader",
        "HP": 150,
        "AP": 10,
        "DP": 15,
        "image": "assets/images/dv.jpg"
    },
    "player4" : {
        "name": "Darth Sidiuus",
        "HP": 175,
        "AP": 20,
        "DP": 25,
        "image": "assets/images/ds.jpg"
    }

}

for (x in characters) {
    var charBtn = $("<button>");
    var btnTxt = characters[x].name + "<br>" +"<br>" + "<br>" + "<br>"+ "<br>" + "<br>" + "<br>" + "<br>" + "<br>" + "HP:" + characters[x].HP + "&nbsp" + "AP:" + characters[x].AP +  "&nbsp"+"DP:" + characters[x].DP;
    charBtn.addClass("charBtn");
    charBtn.attr("HP", characters[x].HP);
    charBtn.attr("AP", characters[x].AP);
    charBtn.attr("DP", characters[x].DP);
    charBtn.html(btnTxt);
    charBtn.css({"background-image" : "url(" + characters[x].image + ")", "bacgroundRepeat": "no-repeat"});
    $("#playerChoices").append(charBtn);
}
$(".charBtn").on("click", function() {
console.log("Clicked");
if (isPlayerChosen){
    $(this).clone().appendTo("#defenderPlaceholder");
     defenderHP=parseInt($(this).attr("HP"));
     defenderDP=parseInt($(this).attr("DP"));
     console.log("Defender HP: " + defenderHP);
     console.log("Defender DP: " + defenderDP);
    $(this).remove();
    
}
else {
    $(this).clone().appendTo("#playerPlaceholder"); 
    playerHP=parseInt($(this).attr("HP"));
    playerDP=parseInt($(this).attr("DP"));
    console.log("Player HP: " + playerHP);
     console.log("Player DP: " + playerDP);
    $(this).remove();
}
isPlayerChosen=true;
});






});





























