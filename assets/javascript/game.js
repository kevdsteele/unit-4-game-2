$(document).ready(function() {


var isPlayerChosen=false;
var isDefenderChosen=false;
var playerName="";
var playerHP=0;
var playerAP=0;
var defenderName="";
var defenderHP=0;
var defenderDP=0;
var round=1;
var attackMod=0;
var btnTxt="";
var characters = {
    "player1" : {
        "name": "Luke Skywalker",
        "HP": 135,
        "AP": 8,
        "DP": 10,
        "image": "assets/images/luke.jpg"

    },
    "player2" : {
        "name": "Yoda",
        "HP": 200,
        "AP": 25,
        "DP": 12,
        "image": "assets/images/yoda.png"
    },
    "player3" : {
        "name": "Darth Vader",
        "HP": 150,
        "AP": 15,
        "DP": 10,
        "image": "assets/images/dv.jpg"
    },
    "player4" : {
        "name": "Darth Sidiuus",
        "HP": 175,
        "AP": 25,
        "DP": 15,
        "image": "assets/images/ds.jpg"
    }

}

$("#attackBtn").attr("disabled", true);

function playGame(){

    $(".charBtn").on("click", function() {
        console.log("Clicked " + $(this).attr("name"));
        if (round > 1) {
            $("#defenderPlaceholder").empty();
            console.log("round:"+ round);
            defenderHP=parseInt($(this).attr("HP"));
            defenderDP=parseInt($(this).attr("DP"));
            playerName=$(this).attr("name");
            btnTxt=playerName;
            $("#defenderStats").html("HP:" + defenderHP + "DP:" + defenderDP);
            $(this).html(btnTxt);
            $(this).attr("id", "currentDefender");
           
            $(this).clone().appendTo("#defenderPlaceholder");
            console.log("Defender HP: " + defenderHP);
            console.log("Defender DP: " + defenderDP);
           $(this).remove();
           $(".charBtn").attr("disabled", true);
           $("#attackBtn").attr("disabled", false);
           

        } else if (isPlayerChosen){
             defenderHP=parseInt($(this).attr("HP"));
             defenderDP=parseInt($(this).attr("DP"));
             playerName=$(this).attr("name");
             btnTxt=playerName;
             $(this).html(btnTxt);
             $(this).attr("id", "currentDefender");
             $("#defenderStats").html("HP:" + defenderHP + "DP:" + defenderDP);
             $(this).clone().appendTo("#defenderPlaceholder");
             console.log("Defender HP: " + defenderHP);
             console.log("Defender DP: " + defenderDP);
            $(this).remove();
            $(".charBtn").attr("disabled", true);
            battle();
            
        }
        else {
           
            playerHP=parseInt($(this).attr("HP"));
            playerAP=parseInt($(this).attr("AP"));
            playerName=$(this).attr("name");
            btnTxt=playerName; 
            attackMod=playerAP;
            $(this).html(btnTxt);
            $("#playerStats").html("HP:" + playerHP + "AP:" + playerAP);
            $(this).clone().appendTo("#playerPlaceholder"); 
            console.log("Player HP: " + playerHP);
             console.log("Player DP: " + playerAP);
            $(this).remove();
            isPlayerChosen=true;
            
        }
        
        
        });    
}

function initializeChars () {
    for (x in characters) {
        var charBtn = $("<button>");
        btnTxt = characters[x].name + "<br>" +"<br>" + "<br>" + "<br>"+ "<br>" + "<br>" + "<br>" + "<br>" + "<br>" + "HP:" + characters[x].HP + "&nbsp" + "AP:" + characters[x].AP +  "&nbsp"+"DP:" + characters[x].DP;
        charBtn.addClass("charBtn");
        charBtn.attr("name", characters[x].name);
        charBtn.attr("HP", characters[x].HP);
        charBtn.attr("AP", characters[x].AP);
        charBtn.attr("DP", characters[x].DP);
        charBtn.html(btnTxt);
        charBtn.css({"background-image" : "url(" + characters[x].image + ")", "bacgroundRepeat": "no-repeat"});
        $("#playerChoices").append(charBtn);
    }

}

function battle(){
    $("#attackBtn").attr("disabled", false);
    $("#attackBtn").on("click", function() {
        
        
        console.log("player AP:"+ playerAP);
        if (playerHP && defenderHP > 0) {
            defenderHP-=playerAP;
            playerAP+=attackMod;
            $("#defenderStats").html("HP:" + defenderHP + "DP:" + defenderDP);
            console.log("Defender hp:" + defenderHP);
            if (defenderHP >0) {
                playerHP-=defenderDP;
                $("#playerStats").html("HP:" + playerHP + "AP:" + playerAP);
                console.log("Player HP:" + playerHP);
                if (playerHP <=0) {
                    console.log ("You Lose");
                }
            } else {
                console.log("You Win");
                $("#currentDefender").clone().appendTo("#defenderLosers");
                $("#defenderStats").html("");
                $("#defenderPlaceholder").empty();
                $(".charBtn").attr("disabled", false);
                round++;
                $("#attackBtn").attr("disabled", true);
                playGame();
                
                

            
                
            }

        }
        
    });
}


initializeChars();
playGame();






});





























